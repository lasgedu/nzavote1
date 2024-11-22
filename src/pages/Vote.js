import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Vote.css";

const Vote = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/candidates", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const { candidates, hasVoted } = response.data;
        setCandidates(candidates);
        setHasVoted(hasVoted);
      } catch (error) {
        console.error("Error fetching candidates:", error);
        toast.error("Failed to load candidates. Please try again later.");
      }
    };
    fetchCandidates();
  }, []);

  const handleVote = async () => {
    if (!selectedCandidate) {
      toast.error("Please select a candidate before submitting your vote.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/vote",
        { candidateID: selectedCandidate },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Notify user with backend response message
      toast.success(response.data.message);
      setHasVoted(true);
    } catch (error) {
      console.error("Error while voting:", error);

      // Display backend error message
      toast.error(error.response?.data?.message || "Failed to cast vote. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2>Vote for a Candidate</h2>
      <ul className="list-group">
        {candidates.map((candidate) => (
          <li
            key={candidate._id}
            className={`list-group-item ${selectedCandidate === candidate._id ? "active" : ""}`}
            onClick={() => !hasVoted && setSelectedCandidate(candidate._id)}
            style={{ cursor: hasVoted ? "not-allowed" : "pointer" }}
          >
            {candidate.name}
          </li>
        ))}
      </ul>
      <button
        className={`btn btn-success mt-3 vote-button ${hasVoted ? "disabled" : ""}`}
        onClick={() => {
          console.log("Vote button clicked");
          handleVote();
        }}
        disabled={hasVoted || loading}
      >
        {loading ? "Submitting..." : hasVoted ? "You have already voted" : "Submit Vote"}
      </button>
    </div>
  );
};

export default Vote;
  
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./CandidateList.css";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isVoting, setIsVoting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch the list of candidates
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          alert("Authentication token missing. Redirecting to login.");
          window.location.href = "/login"; // Redirect to login if token is missing
          return;
        }

        const response = await axios.get("https://nzavote.onrender.com/api/v1/candidates", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCandidates(response.data.candidates);
      } catch (error) {
        console.error("Error fetching candidates:", error);
        alert("Failed to load candidates. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  // Handle vote selection
  const handleVote = (candidateId) => {
    console.log("Selected candidate ID:", candidateId); 
    setSelectedCandidate(candidateId);
    setIsVoting(true);
  };

  // Submit the vote
  const submitVote = async () => {
    if (!selectedCandidate) {
      alert("Please select a candidate to vote for.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Authentication token missing. Please log in again.");
        window.location.href = "/login";
        return;
      }

      const response = await axios.post(
        "https://nzavote.onrender.com/api/v1/vote",
        { candidateID: selectedCandidate },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert(`Vote submitted successfully for ${response.data.candidate.name}!`);
        // Optionally refresh candidates to update the vote count
        setCandidates((prevCandidates) =>
          prevCandidates.map((candidate) =>
            candidate.id === selectedCandidate
              ? { ...candidate, votes: candidate.votes + 1 }
              : candidate
          )
        );
      } else {
        alert("Error submitting vote. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting vote:", error);
      alert(error.response?.data?.message || "Error submitting vote. Please try again.");
    } finally {
      setIsVoting(false);
      setSelectedCandidate(null);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    alert("You have been logged out.");
    window.location.href = "/";
  };

  return (
    <div className="candidate-list">
      <header>
        <h1>Candidate List</h1>
      </header>

      {loading ? (
        <p>Loading candidates...</p>
      ) : (
        <div className="candidates">
          {candidates.length === 0 ? (
            <p>No candidates available.</p>
          ) : (
            candidates.map((candidate) => (
              <div key={candidate.id} className="candidate-card">
                <div>{console.log("Candidate:", candidate)}</div> 
                <div className="photo-holder">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/un.webp`} // Placeholder image
                    alt={candidate.name}
                    className="circle-photo"
                  />
                </div>
                <h3>{candidate.name}</h3>
                <p>
                  <strong>Party:</strong> {candidate.party}
                </p>
                <p>
                  <strong>Description:</strong> {candidate.description}
                </p>
                
                <button onClick={() => handleVote(candidate.id)}>Vote</button>
              </div>
            ))
          )}
        </div>
      )}

      <div className="logout">
        <button onClick={handleLogout}>Logout</button>
      </div>

      {isVoting && selectedCandidate && (
        <div className="vote-confirmation">
          <p>
            Are you sure you want to vote for{" "}
            {candidates.find((c) => c.id === selectedCandidate)?.name}?
          </p>
          <button onClick={submitVote}>Yes, submit vote</button>
          <button onClick={() => setIsVoting(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default CandidateList;

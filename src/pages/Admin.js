import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Admin.css";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("candidates");
  const [candidates, setCandidates] = useState([]);
  const [users, setUsers] = useState([]);
  const [newCandidate, setNewCandidate] = useState({
    name: "",
    party: "",
    description: "",
  });
  const [editCandidate, setEditCandidate] = useState(null); // Track candidate being edited
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === "candidates") fetchCandidates();
    if (activeTab === "users") fetchUsers();
  }, [activeTab]);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get("https://nzavote.onrender.com/api/v1/candidates");
      setCandidates(response.data.candidates);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://nzavote.onrender.com/api/v1/users");
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://nzavote.onrender.com/api/v1/candidates", newCandidate);
      setMessage(response.data.message);
      fetchCandidates();
      setNewCandidate({ name: "", party: "", description: "" });
    } catch (error) {
      console.error("Error adding candidate:", error);
      setMessage("Failed to add candidate.");
    }
  };

  const handleEditCandidate = (candidate) => {
    setEditCandidate(candidate);
    setActiveTab("edit-candidate");
  };

  const handleUpdateCandidate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://nzavote.onrender.com/api/v1/candidates/${editCandidate._id}`,
        editCandidate
      );
      setMessage(response.data.message);
      fetchCandidates();
      setEditCandidate(null);
      setActiveTab("candidates");
    } catch (error) {
      console.error("Error updating candidate:", error);
      setMessage("Failed to update candidate.");
    }
  };

  const handleDeleteCandidate = async (candidateID) => {
    try {
      const response = await axios.delete(`https://nzavote.onrender.com/api/v1/candidates/${candidateID}`);
      setMessage(response.data.message);
      fetchCandidates();
    } catch (error) {
      console.error("Error deleting candidate:", error);
      setMessage("Failed to delete candidate.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li
              className={activeTab === "candidates" ? "active" : ""}
              onClick={() => setActiveTab("candidates")}
            >
              Candidates
            </li>
            <li
              className={activeTab === "add-candidate" ? "active" : ""}
              onClick={() => setActiveTab("add-candidate")}
            >
              Add Candidate
            </li>
            <li
              className={activeTab === "users" ? "active" : ""}
              onClick={() => setActiveTab("users")}
            >
              Users
            </li>
            <li onClick={handleLogout} className="logout">
              Logout
            </li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        {activeTab === "candidates" && (
          <section>
            <h2>Candidates</h2>
            {candidates.length > 0 ? (
              <ul>
                {candidates.map((candidate) => (
                  <li key={candidate._id}>
                    <strong>{candidate.name}</strong> ({candidate.party}): {candidate.votes} votes
                    <button onClick={() => handleEditCandidate(candidate)}>Edit</button>
                    <button onClick={() => handleDeleteCandidate(candidate._id)}>Delete</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No candidates found.</p>
            )}
          </section>
        )}
        {activeTab === "add-candidate" && (
          <section>
            <h2>Add Candidate</h2>
            <form onSubmit={handleAddCandidate}>
              <input
                type="text"
                placeholder="Name"
                value={newCandidate.name}
                onChange={(e) =>
                  setNewCandidate({ ...newCandidate, name: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Party"
                value={newCandidate.party}
                onChange={(e) =>
                  setNewCandidate({ ...newCandidate, party: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Description"
                value={newCandidate.description}
                onChange={(e) =>
                  setNewCandidate({
                    ...newCandidate,
                    description: e.target.value,
                  })
                }
                required
              ></textarea>
              <button type="submit">Add Candidate</button>
            </form>
            {message && <p className="message">{message}</p>}
          </section>
        )}
        {activeTab === "edit-candidate" && (
          <section>
            <h2>Edit Candidate</h2>
            <form onSubmit={handleUpdateCandidate}>
              <input
                type="text"
                placeholder="Name"
                value={editCandidate.name}
                onChange={(e) =>
                  setEditCandidate({ ...editCandidate, name: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Party"
                value={editCandidate.party}
                onChange={(e) =>
                  setEditCandidate({ ...editCandidate, party: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Description"
                value={editCandidate.description}
                onChange={(e) =>
                  setEditCandidate({
                    ...editCandidate,
                    description: e.target.value,
                  })
                }
                required
              ></textarea>
              <button type="submit">Update Candidate</button>
            </form>
            {message && <p className="message">{message}</p>}
          </section>
        )}
        {activeTab === "users" && (
          <section>
            <h2>Users</h2>
            {users.length > 0 ? (
              <ul>
                {users.map((user) => (
                  <li key={user._id}>
                    {user.firstName} {user.lastName} - {user.email}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No users found.</p>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default Admin;

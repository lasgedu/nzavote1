import axios from 'axios';

const API_BASE_URL = 'http://localhost:8100';

export const getCandidates = async () => {
  const response = await axios.get(`${API_BASE_URL}/candidates`);
  return response.data;
};

export const voteCandidate = async (candidateID) => {
  const response = await axios.post(`${API_BASE_URL}/vote`, { candidateID });
  return response.data;
};

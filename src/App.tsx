import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Vote {
  voter_id: string;
  candidate_id: string;
}

interface Result {
  voter_id: string;
  candidate_id: string;
}

const App: React.FC = () => {
  const [voterId, setVoterId] = useState('');
  const [candidateId, setCandidateId] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [message, setMessage] = useState('');

  // Candidates with "monigotes" and names
  const candidates = [
    { id: 'candidate1', name: 'Candidate 1', image: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=1' },
    { id: 'candidate2', name: 'Candidate 2', image: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=2' },
    { id: 'candidate3', name: 'Candidate 3', image: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=3' },
    { id: 'candidate4', name: 'Candidate 4', image: 'https://via.placeholder.com/150/FFFF00/FFFFFF?text=4' },
  ];

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await axios.get<Result[]>('http://localhost:8080/results');
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const handleVote = async () => {
    if (!candidateId) {
      setMessage('Please select a candidate');
      return;
    }

    try {
      const vote: Vote = { voter_id: voterId, candidate_id: candidateId };
      await axios.post('http://localhost:8080/vote', vote);
      setMessage('Vote cast successfully!');
      fetchResults(); // Refresh the results after voting
    } catch (error) {
      console.error('Error casting vote:', error);
      setMessage('Error casting vote');
    }
  };

  return (
    <div style={styles.container}>
      <h1>Blockchain Voting App</h1>

      <div style={styles.voteContainer}>
        <h2>Cast Your Vote</h2>
        <input
          type="text"
          placeholder="Voter ID"
          value={voterId}
          onChange={(e) => setVoterId(e.target.value)}
          style={styles.input}
        />
        <div style={styles.candidatesContainer}>
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              style={{
                ...styles.candidateBox,
                borderColor: candidateId === candidate.id ? 'blue' : 'gray',
                cursor: 'pointer',
              }}
              onClick={() => setCandidateId(candidate.id)}
            >
              <img src={candidate.image} alt={candidate.name} style={styles.candidateImage} />
              <p>{candidate.name}</p>
            </div>
          ))}
        </div>
        <button onClick={handleVote} style={styles.button}>
          Submit Vote
        </button>
        <p>{message}</p>
      </div>

      <div style={styles.resultsContainer}>
        <h2>Results</h2>
        {results.length > 0 ? (
          <ul>
            {results.map((result, index) => (
              <li key={index}>
                Voter ID: {result.voter_id}, Candidate ID: {result.candidate_id}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results available.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center' as 'center', // This is valid now
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f9',
  },
  voteContainer: {
    marginBottom: '20px',
  },
  input: {
    margin: '5px',
    padding: '10px',
    fontSize: '16px',
    width: '200px',
  },
  candidatesContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '20px',
  },
  candidateBox: {
    padding: '10px',
    border: '2px solid gray',
    borderRadius: '8px',
    textAlign: 'center' as 'center',  // Explicitly setting the valid value
    width: '120px',
    transition: 'border-color 0.3s',
  },
  candidateImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    marginTop: '20px',
  },
  resultsContainer: {
    marginTop: '20px',
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
};


export default App;

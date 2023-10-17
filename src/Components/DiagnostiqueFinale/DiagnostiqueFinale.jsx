import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../../UserContext';

function DiagnostiqueFinale() {
  const { userData } = useContext(UserContext);
  const [score, setScore] = useState(null); // Use useState instead of useEffect

  useEffect(() => {
    getScore();
  }, []);

  const getScore = async () => {
    const response = await fetch('http://localhost:8080/user/getScore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (response.ok) {
      const data = await response.json(); // Parse the response as JSON
      setScore(data); // Update the score state
    }
  };

  return (
    <div>DiagnostiqueFinale {score}</div>
  )
}

export default DiagnostiqueFinale;

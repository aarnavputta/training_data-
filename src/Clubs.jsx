import React, { useEffect, useState } from "react";
import Papa from "papaparse";

const Clubs = ({ selectedInterests }) => {
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);

  useEffect(() => {
    // Load the CSV file
    Papa.parse("/clubs.csv", {
      download: true,
      header: true,
      complete: (result) => {
        setClubs(result.data);
      },
    });
  }, []);

  useEffect(() => {
    // Filter clubs based on selected interests
    const filtered = clubs.filter((club) =>
      selectedInterests.some((interest) =>
        club["Tagged Interests"]?.toLowerCase().includes(interest.toLowerCase())
      )
    );
    setFilteredClubs(filtered);
  }, [clubs, selectedInterests]);

  return (
    <div style={styles.container}>
      <h1>Matching Clubs</h1>
      {filteredClubs.length > 0 ? (
        <ul style={styles.list}>
          {filteredClubs.map((club, index) => (
            <li key={index} style={styles.listItem}>
              <h3>{club.Name}</h3>
            </li>
          ))}
        </ul>
      ) : (
        <p>No clubs match your interests. Try selecting different interests!</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    textAlign: "left",
  },
};

export default Clubs;


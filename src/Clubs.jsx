import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./Clubs.css";

const Clubs = ({ selectedInterests }) => {
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [currentClubIndex, setCurrentClubIndex] = useState(0);

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

  const handleYes = () => {
    moveToNextClub();
  };

  const handleNo = () => {
    moveToNextClub();
  };

  const moveToNextClub = () => {
    if (currentClubIndex < filteredClubs.length - 1) {
      setCurrentClubIndex(currentClubIndex + 1);
    } else {
      alert("You have reached the end of the list!");
    }
  };

  const currentClub = filteredClubs[currentClubIndex];

  // Calculate progress
  const progress =
    filteredClubs.length > 0
      ? Math.round(((currentClubIndex + 1) / filteredClubs.length) * 100)
      : 0;

  return (
    <div className="clubs-container">
      {/* Progress Bar */}
      <div className="progress-container">
        <ProgressBar
          animated
          now={progress}
          label={`${progress}%`}
        />
      </div>
      <h1 className="clubs-header">Matching Clubs</h1>
      {filteredClubs.length > 0 ? (
        currentClub ? (
          <div className="club-box">
            <h3 className="club-name">{currentClub.Name}</h3>
            <p className="club-tags">
              <b>Tags:</b> {currentClub["Tagged Interests"]}
            </p>
            <div className="club-buttons">
              <button className="no-button" onClick={handleNo}>
                No
              </button>
              <button className="yes-button" onClick={handleYes}>
                Yes
              </button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )
      ) : (
        <p>No clubs match your interests. Try selecting different interests!</p>
      )}
    </div>
  );
};

export default Clubs;






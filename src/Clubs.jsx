import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./Clubs.css";
import { db } from "./firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore"

const clubsData = {
  "yes": [],
  "no": []
};

// const newData = ['new']
//     getDocs(collection(db, 'users'))
//       .then((res) => {
//         res.forEach((doc) => {
//           newData.push(doc.id)
//         })
//         setData(newData);
//       }).catch((error) => {
//         newData.push("error happened reading data");
//       });
//     setDoc(doc(db, 'users', 'nzj5183'), {
//       clubs: "HackPSU",
//       interests: "coding",
//       test: "test"
//     }).then(() => {
//       setData("added data to database");
//     }).catch((err) => {
//       setData("error in adding data");
//     })

const Clubs = ({ userID, selectedInterests }) => {
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [currentClubIndex, setCurrentClubIndex] = useState(0);
  const [finished, setFinished] = useState(false);

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
    clubsData["yes"].push(currentClub.Name);
    moveToNextClub();
  };

  const handleNo = () => {
    clubsData["no"].push(currentClub.Name);
    moveToNextClub();
  };

  const sendData = () => {
    setDoc(doc(db, "users", userID.slice(0, 7)), {
      interests: selectedInterests.join(","),
      clubsYes: clubsData["yes"].join(","),
      clubsNo: clubsData["no"].join(",")
    }).catch((err) => {
      console.error("error while sending data");
    });
    setFinished(true);
  }

  const moveToNextClub = () => {
    if (currentClubIndex < filteredClubs.length - 1) {
      setCurrentClubIndex(currentClubIndex + 1);
    } else {
      // alert("You have reached the end of the list!");
      setFinished(true);
      sendData();
      // TODO: call method to push all data to database
    }
  };


  const currentClub = filteredClubs[currentClubIndex];

  // Calculate progress
  const progress = filteredClubs.length > 0 ? Math.round(((currentClubIndex + 1) / filteredClubs.length) * 100) : 0;
  
  if (finished) {
    return (
      <div>
        <h1 className="clubs-header">
          You're done
        </h1>
      </div>
    )
  }

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
            <button className="yes-button" onClick={sendData}>Submit</button>
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


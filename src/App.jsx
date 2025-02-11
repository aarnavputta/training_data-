import React, { useState } from "react";
import Login from "./Login";
import Clubs from "./Clubs";
import './App.css';

const interestsList = [
  "Advocacy", "Anime & Comics", "Art", "Asian Student Life", "Atheist & Secular Clubs", "Basketball", 
  "Black Student Life", "Board Games & Tabletop", "Books", "Broadcasting", "Business", "Christian Organizations", 
  "Climbing", "Coffee", "Community", "Content Creation", "DIY", "Dance", "Diversity", "Engineering", 
  "Entrepreneurship", "European Student Life", "Fashion", "Film", "Film Production", "Finance", "Fishing & Hunting", 
  "Fitness", "Food", "Football", "Fundraising", "Gaming", "Gardening", "General Student Organizations", "Heritage", 
  "Hindu Organizations", "Human Rights", "Indigenous Student Life", "International", "Jewish Organizations", 
  "Journalism", "LGBTQ+", "Latino", "Law & Pre-Law", "Leadership", "Marketing", "Martial Arts", "Mathematics", 
  "Medicine & Health", "Middle Eastern Student Life", "Music", "Muslim Organizations", "Outdoors", "Philanthropy", 
  "Photography", "Podcasting", "Political Organizations", "Psychology", "Public Relations", "Public Speaking", 
  "Religious", "Running", "Science", "Science Fiction & Fantasy", "Service", "Soccer", "Social Club", "Social Media", 
  "Special Interest", "Sustainability", "Technology", "Theater", "Travel", "Water Sports", "Women’s Empowerment", 
  "Writing", "Yoga"
];

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [showClubs, setShowClubs] = useState(false);

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interest)) {
        // Remove if already selected
        return prev.filter((i) => i !== interest);
      } else if (prev.length < 5) {
        // Add if not selected and less than 5 interests selected
        return [...prev, interest];
      } else {
        // Do nothing if more than 5 interests are already selected
        return prev;
      }
    });
  };

  const handleContinue = () => {
    setShowClubs(true); // Navigate to the Clubs component
  };

  if (!loggedIn) {
    return <Login setLoggedIn={setLoggedIn} />;
  }

  return (
    <div style={styles.container}>
      <img
        src="/penn_state.png"
        alt="Penn State Logo"
        className="penn-state-logo"
      />
      {!showClubs ? (
        <>
          <h1>Pick Your Interests</h1>
          <p>Select up to 5 interests</p>
          <div style={styles.grid}>
            {interestsList.map((interest) => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                style={{
                  ...styles.interestButton,
                  backgroundColor: selectedInterests.includes(interest)
                    ? "#FF6F61"
                    : "#f5f5f5",
                  color: selectedInterests.includes(interest)
                    ? "#ffffff"
                    : "#333333",
                }}
              >
                {interest}
              </button>
            ))}
          </div>
          <div style={styles.footer}>
            <button
              style={styles.continueButton}
              disabled={selectedInterests.length === 0}
              onClick={handleContinue}
            >
              Continue ({selectedInterests.length}/5)
            </button>
          </div>
        </>
      ) : (
        <Clubs selectedInterests={selectedInterests} />
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "10px",
    justifyContent: "center",
    marginTop: "20px",
  },
  interestButton: {
    border: "1px solid #ccc",
    borderRadius: "20px",
    padding: "10px 15px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.3s ease",
  },
  footer: {
    marginTop: "20px",
  },
  continueButton: {
    backgroundColor: "#FF6F61",
    color: "#ffffff",
    border: "none",
    borderRadius: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

export default App;

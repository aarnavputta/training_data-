import React, { useState } from "react";
import "./Login.css";

const Login = ({ setUserID, setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.endsWith("@psu.edu") && consent) {
      setUserID(email);
      setLoggedIn(true);
    } else {
      alert("Please enter a valid PSU email and consent to notifications.");
    }
  };

  return (
    <div className="login-container">
      <img
        src="/penn_state.png"
        alt="Penn State Logo"
        className="penn-state-logo"
      />
      <h1 className="login-header">Welcome to Interest Picker</h1>
      <p className="login-subtext">Please log in with your university email</p>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-label" htmlFor="email">
          University Email:
        </label>
        <div className="input-container">
          <input
            type="text"
            id="email"
            placeholder="username"
            value={email.replace("@psu.edu", "")} // Prevent autofill from adding "@psu.edu"
            onChange={(e) => setEmail(e.target.value + "@psu.edu")}
            className="email-input"
          />
          <span className="email-suffix">@psu.edu</span>
        </div>
        <div className="consent-container">
          <input
            type="checkbox"
            id="consent"
            checked={consent}
            onChange={() => setConsent(!consent)}
            className="consent-checkbox"
          />
          <label className="consent-label" htmlFor="consent">
            I consent to receive notifications
          </label>
        </div>
        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;


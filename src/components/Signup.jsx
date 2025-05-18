import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update profile with username
      await updateProfile(userCredential.user, {
        displayName: username,
      });
      navigate("/upload");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-heading">Sign Up</h2>
      {error && <p className="error-text">{error}</p>}
      <form onSubmit={handleSubmit} className="auth-form">
        <label>Username:</label>
        <input
          type="text"
          className="auth-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Enter your username"
        />
        <label>Email:</label>
        <input
          type="email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />
        <label>Password:</label>
        <input
          type="password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />
        <button type="submit" className="auth-button">Sign Up</button>
      </form>
      <p className="auth-footer">
        Already have an account? <Link to="/login" className="auth-link">Login here</Link>
      </p>
    </div>
  );
}

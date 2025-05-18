 

import { useState, useEffect, createContext, useContext } from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import "./App.css";
import logo from "./assets/logo.png";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

// Create Auth Context
const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

// Auth Provider Component
function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const logout = () => {
    signOut(auth);
  };

  const value = {
    currentUser,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Import Login, Signup, and MyTexts components
import Login from "./components/Login";
import Signup from "./components/Signup";
import MyTexts from "./components/MyTexts";
import About from "./components/About";

// Protected Route component
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const { currentUser, logout } = useAuth();

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          {currentUser && <Link to="/upload" className="nav-link">Upload</Link>}
          {currentUser && <Link to="/mytexts" className="nav-link">My Texts</Link>}
          {!currentUser && <Link to="/login" className="nav-link">Login</Link>}
          {currentUser && <button onClick={logout} className="nav-link">Logout</button>}
        </div>
        <div className="nav-profile">
          {currentUser && (
            <span className="profile-name">
              <span className="profile-pic-circle">
<img
  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.displayName || currentUser.email || 'User')}&background=random&rounded=true&size=32`}
  alt="User Avatar"
  style={{ width: "32px", height: "32px", borderRadius: "50%" }}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "/default-avatar.png";
  }}
/>
              </span>
              {currentUser.displayName || currentUser.email}
            </span>
          )}
        </div>
        <button onClick={() => setDarkMode(!darkMode)} className="theme-toggle">
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </nav>

      {/* Logo */}
      <img src={logo} alt="Logo" className="app-logo" />

      <Routes>
        <Route path="/" element={
          <div className={darkMode ? "home-container dark-bg" : "home-container"}>
            <h1 className="welcome-text">Welcome to Inksight!</h1>
          </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/upload" element={
          <PrivateRoute>
            <Upload darkMode={darkMode} />
          </PrivateRoute>
        } />
        <Route path="/mytexts" element={
          <PrivateRoute>
            <MyTexts />
          </PrivateRoute>
        } />
        <Route path="*" element={<h1 className="welcome-text">Page Not Found</h1>} />
      </Routes>
      </div>
  );
}

// Import Upload here to avoid circular dependency
import Upload from "./Upload";

export default function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

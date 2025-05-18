import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      <h1>About Inksight ✨</h1>

      <p>
        <strong>Inksight</strong> is a modern web application that uses Optical Character Recognition (OCR) to extract handwritten text from images. Designed for students, researchers, and professionals, the app helps digitize handwritten content quickly and accurately.
      </p>

      <h2>Key Features</h2>
      <ul>
        <li>Upload handwritten images and extract text instantly.</li>
        <li>Copy or download extracted text with one click.</li>
        <li>Dark/Light mode toggle for better accessibility.</li>
        <li>User authentication with Firebase (Login/Signup).</li>
        <li>Personal text storage and history (coming soon).</li>
        <li>Mobile and desktop responsive UI.</li>
      </ul>

      <h2>Technologies Used</h2>
      <ul>
        <li><strong>Frontend</strong>: React.js, Tailwind CSS, Framer Motion</li>
        <li><strong>Backend</strong>: FastAPI (Python), Tesseract OCR or TrOCR</li>
        <li><strong>Authentication & Database</strong>: Firebase Auth & Firestore</li>
        <li><strong>Deployment</strong>: Vercel (Frontend), Render/Fly.io (Backend)</li>
      </ul>

      <h2>Purpose</h2>
      <p>
        The goal of Inksight is to simplify the process of converting handwritten notes into editable digital format—reducing manual effort and making content searchable and shareable.
      </p>

      <h2>Future Enhancements</h2>
      <ul>
        <li>PDF export of recognized text</li>
        <li>Text recognition of whole page</li>
        <li>Real-time collaboration and cloud sync</li>
        <li>Support for multiple languages</li>
      </ul>

      <hr />

      <h2>Creator</h2>
      <p>
        <strong>Shivansh Srivastava</strong><br />
        📧 Email: <a href="mailto:shivansh.sri03@gmail.com">shivansh.sri03@gmail.com</a><br />
        🔗 LinkedIn: <a href="https://in.linkedin.com/in/shivansh-srivastava-01575a19b" target="_blank" rel="noopener noreferrer">linkedin.com/in/shivansh-srivastava-01575a19b</a>
      </p>
    </div>
  );
}

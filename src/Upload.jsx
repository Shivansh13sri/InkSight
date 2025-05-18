import "./Upload.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { saveAs } from "file-saver";
import { Clipboard, Download, UploadCloud } from "lucide-react";
import { useAuth } from "./App";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Upload() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile)); // Preview the image
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setText(data.extracted_text);

      // Save extracted text to Firestore
      if (currentUser) {
        const userTextsRef = collection(db, "users", currentUser.uid, "texts");
        await addDoc(userTextsRef, {
          text: data.extracted_text,
          createdAt: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to process image");
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(text);
    alert("Text copied to clipboard!");
  };

  const handleDownloadText = () => {
    const blob = new Blob([text], { type: "text/plain" });
    saveAs(blob, "extracted_text.txt");
  };

  return (
    <div className="upload-container">
      <motion.div
        className="upload-box"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="upload-heading">Upload Handwritten Image</h2>

        {/* File Upload Input */}
        <label className="file-upload">
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <UploadCloud size={24} className="upload-icon" />
          <span>Choose a file</span>
        </label>

        {/* Image Preview */}
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" />
          </div>
        )}

        {/* Upload Button */}
        <button onClick={handleUpload} className="upload-btn">
          Upload & Extract Text
        </button>

        {/* Extracted Text Display */}
        {text && (
          <motion.div className="text-output" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3>Extracted Text:</h3>
            <p>{text}</p>
            <div className="text-actions">
              <button onClick={handleCopyText} className="copy-btn">
                <Clipboard className="icon" size={16} /> Copy
              </button>
              <button onClick={handleDownloadText} className="download-btn">
                <Download className="icon" size={16} /> Download
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Upload;

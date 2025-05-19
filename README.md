# 🖋️ Inksight - Handwritten Text Recognition Web App

## 🔍 Overview

**Inksight** is a web application that allows users to upload handwritten images and extracts text from them using OCR (Tesseract/TrOCR). Users can log in, store extracted texts, and manage them securely with Firebase.

## 🛠️ Features

- Image upload and text recognition
- Light/Dark mode toggle
- Firebase authentication (Login/Signup)
- Firebase Firestore for storing extracted texts
- Download recognized text as PDF
- Clean, responsive UI

## 👨‍💻 Technologies Used

- Frontend: React (Vite), Tailwind CSS
- Backend: FastAPI (Python)
- OCR: Tesseract / TrOCR
- Authentication & DB: Firebase Auth + Firestore
- Deployment: Render

## 🔐 Authentication

- Email & Password Signup/Login via Firebase
- Google OAuth

## 🚀 Deployment

Frontend and backend are deployed separately.

## 🧪 How to Run Locally

### Frontend

```bash
cd inksight
npm install
npm run dev
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload
```

## 📝 Creator Info

Creator: Shivansh Srivastava
Email: shivansh.sri03@gmail.com
LinkedIn: shivansh-srivastava-01575a19b

## 📷 Screenshots

![Home page](./screenshots/Screenshot%202025-05-19%20004743.png>)
![Dark Home page](./screenshots/Screenshot%202025-05-19%20004526.png)
![Upload page](./screenshots/Screenshot%202025-05-19%20004559.png)
![Uploaded text image](./screenshots/Screenshot%202025-05-19%20004646.png)
![Extracted Text](./screenshots/Screenshot%202025-05-19%20004720.png)

## 📄 License

This project is open-source under the MIT License.

**`Fix: Proper markdown formatting for headings and code blocks`**

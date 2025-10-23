# 🎭 Face & Emotion Detection Web App

**Live Demo:** https://emotion-vision-ai.netlify.app/  
**Live Preview (StackBlitz):** https://stackblitz.com/~/github.com/YaadwinderKumar/face-emotion-detection

A real-time face and emotion detection web application built with **React**, **Vite**, and **face-api.js**. It uses your webcam to identify faces, track facial landmarks, and analyze emotional expressions such as **happy, sad, angry, surprised, disgusted, fearful, and neutral** — all displayed in a modern **glassmorphism UI**.

---

## ✅ Features

- 🔍 Real-time **Face Detection**  
- 😊 **Emotion Recognition** with confidence scores  
- 👁️ **Facial Landmarks** overlay  
- 🧠 Powered by **TinyFaceDetector** (fast and lightweight)  
- 🎨 Sleek **Glass UI** (modern + responsive)  
- 🌐 Works **fully in-browser** (no backend needed)  
- 🚀 **Live Deployed on Netlify**

---

## 🧠 Tech Stack

| Technology | Purpose |
|------------|---------|
| React + Vite | Frontend App |
| face-api.js | Face & Emotion Detection |
| HTML5 Canvas | Drawing face overlays |
| Netlify | Deployment |
| StackBlitz | Browser-based Dev Environment |

---

## 🛠️ How It Works

1. App loads AI models (TinyFaceDetector, LandmarkNet, ExpressionNet)
2. User allows webcam access
3. Video feed is analyzed frame-by-frame
4. App draws:
   - 📦 Bounding box around face
   - 📌 Landmarks (eyes, nose, lips, jawline)
   - 🎭 Emotion predictions with % scores
5. Results update in **real-time** on the UI

---

## 📌 Run Locally

```bash
# Clone the repo
git clone https://github.com/YaadwinderKumar/face-emotion-detection

# Go into the project folder
cd face-emotion-detection

# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build

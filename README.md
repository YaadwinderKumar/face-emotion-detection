# Face & Emotion Detection Web App

**Live Demo:** [Try It Online](https://emotion-vision-ai.netlify.app)

![Screenshot of app](./screenshot.png)

## 🧠 Project Overview
Built using React and :contentReference[oaicite:0]{index=0}, this realtime web application uses your webcam to detect faces, landmark features, and evaluate emotional expressions — all in a beautiful glass-UI interface. It runs entirely in the browser and is deployed live on Netlify.

## ✅ Features
- Real-time face detection using TinyFaceDetector  
- Facial landmarks tracking for eyes, nose & lips  
- Emotion recognition with confidence scores (happy, sad, neutral, angry, fearful, disgusted, surprised)  
- Stylish modern UI with glassmorphism & neon accents  
- Responsive layout for desktop & mobile  
- Zero backend — runs fully in browser (React + face-api.js)  
- Easy deployment and updating pipeline (GitHub → Netlify)

## 📚 Tech Stack
- React (v18+)  
- :contentReference[oaicite:1]{index=1} for face & emotion detection  
- Vite for faster build  
- Netlify for live deployment  
- JavaScript / JSX, CSS (modern styling)  
- Webcam access & HTML5 Canvas overlay  

## 🔧 How It Works
1. Load AI models from the CDN (TinyFaceDetector, Landmark68Net, ExpressionNet)  
2. Start webcam stream using `react-webcam`  
3. Detect faces in real-time, resize detection results to video size  
4. Draw boxes, landmarks and emotion labels on canvas overlay  
5. Display emotion panel showing top expressions and confidence scores  
6. Update automatically on Netlify on every push to the `main` branch  

## 🏁 Quick Start
```bash
# Clone repository
git clone https://github.com/YaadwinderKumar/face-emotion-detection.git

# Change directory
cd face-emotion-detection

# Install dependencies
npm install

# Start development server
npm run dev

# Build
npm run build

# You can deploy `dist/` folder to any static host

import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import "./App.css";

const MODEL_URL =
  "https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights";

export default function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const loopRef = useRef(null);

  const [modelsReady, setModelsReady] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [topExpressions, setTopExpressions] = useState([]);
  const [faceCount, setFaceCount] = useState(0);

  useEffect(() => {
    (async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      setModelsReady(true);
      startLoopIfReady();
    })();

    return () => {
      if (loopRef.current) clearInterval(loopRef.current);
    };
  }, []);

  const onUserMedia = () => {
    setVideoReady(true);
    startLoopIfReady();
  };

  const startLoopIfReady = () => {
    if (!modelsReady || !webcamRef.current?.video || !videoReady) return;
    if (loopRef.current) return; // loop already running

    loopRef.current = setInterval(async () => {
      const video = webcamRef.current.video;
      if (!video || video.readyState !== 4) return;

      const canvas = canvasRef.current;
      const vw = video.videoWidth;
      const vh = video.videoHeight;

      canvas.width = vw;
      canvas.height = vh;

      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const resized = faceapi.resizeResults(detections, {
        width: vw,
        height: vh,
      });

      faceapi.draw.drawDetections(canvas, resized);
      faceapi.draw.drawFaceLandmarks(canvas, resized);
      faceapi.draw.drawFaceExpressions(canvas, resized);

      setFaceCount(detections.length);

      if (detections.length > 0) {
        const withArea = detections.map((d) => ({
          area: d.detection.box.width * d.detection.box.height,
          expressions: d.expressions,
        }));
        withArea.sort((a, b) => b.area - a.area);

        const expr = withArea[0].expressions;
        const sorted = Object.entries(expr)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, score]) => ({ name, score }));

        setTopExpressions(sorted);
      } else {
        setTopExpressions([]);
      }
    }, 180);
  };

  return (
    <div className="app">
      <div className="bg-glow" />
      <div className="bg-glow right" />

      <header className="header">
        <h1>Face & Emotion Detection</h1>
        <p className="subtitle">Real-time face tracking + emotion analysis</p>
      </header>

      <main className="stage">
        {/* VIDEO CARD */}
        <div className="glass card video-wrap">
          {!modelsReady && (
            <div className="loader">
              <div className="spinner" />
              <p>Loading AI models…</p>
            </div>
          )}

          <div className={`video-area ${modelsReady ? "ready" : ""}`}>
            <Webcam ref={webcamRef} audio={false} onUserMedia={onUserMedia} className="video" />
            <canvas ref={canvasRef} className="overlay" />
          </div>

          <div className="chip-row">
            <span className="chip">Models: {modelsReady ? "Ready ✅" : "Loading…"}</span>
            <span className="chip">Camera: {videoReady ? "On ✅" : "Waiting…"}</span>
            <span className="chip">Faces: {faceCount}</span>
          </div>
        </div>

        {/* EMOTION PANEL */}
        <aside className="glass card panel">
          <h3>Emotion Panel</h3>
          {faceCount === 0 && <p className="muted">No face detected. Look at the camera.</p>}

          {topExpressions.length > 0 && (
            <ul className="bars">
              {topExpressions.map(({ name, score }) => (
                <li key={name}>
                  <div className="bar-row">
                    <span className="label">{iconFor(name)} {pretty(name)}</span>
                    <span className="val">{(score * 100).toFixed(0)}%</span>
                  </div>
                  <div className="bar">
                    <div
                      className="fill"
                      style={{ width: `${Math.min(100, Math.max(0, score * 100))}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}

          <p className="muted small">Tip: Good lighting improves emotion accuracy.</p>
        </aside>
      </main>

      <footer className="footer">
        <span>Built by Yaadwinder • Glass UI • React + face-api.js</span>
      </footer>
    </div>
  );
}

function pretty(name) {
  const map = {
    neutral: "Neutral",
    happy: "Happy",
    sad: "Sad",
    angry: "Angry",
    fearful: "Fearful",
    disgusted: "Disgusted",
    surprised: "Surprised",
  };
  return map[name] ?? name;
}

function iconFor(name) {
  const icons = {
    neutral: "😐",
    happy: "😄",
    sad: "😢",
    angry: "😠",
    fearful: "😨",
    disgusted: "🤢",
    surprised: "😮",
  };
  return icons[name] ?? "🙂";
}

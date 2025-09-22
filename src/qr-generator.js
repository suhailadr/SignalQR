import React, { useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./qr-generator.css";

export default function QRCodeGenerator() {
  const [text, setText] = useState("");
  const canvasRef = useRef(null);
  const boxRef = useRef(null);
  const [showAbout, setShowAbout] = useState(false);

  // After render, grab the inner canvas produced by QRCodeCanvas
  useEffect(() => {
    if (boxRef.current) {
      const c = boxRef.current.querySelector("canvas");
      if (c) canvasRef.current = c;
    }
  }, [text]);

  const onClear = () => setText("");

  const handleDownloadJPG = () => {
    if (!canvasRef.current) return;
    try {
      const dataUrl = canvasRef.current.toDataURL("image/jpeg", 0.95);
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `qr-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      console.error(e);
      alert("Could not export JPG. Try a different browser.");
    }
  };

  const handleDownloadPDF = async () => {
    if (!canvasRef.current) return;
    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 36; // 0.5 inch
      const maxW = pageWidth - margin * 2;
      const maxH = pageHeight - margin * 2;

      const pngData = canvasRef.current.toDataURL("image/png");
      // Calculate size to fit within page while keeping square shape
      const size = Math.min(maxW, maxH, 360);
      const x = (pageWidth - size) / 2;
      const y = (pageHeight - size) / 2;
      pdf.addImage(pngData, "PNG", x, y, size, size);
      pdf.save(`qr-${Date.now()}.pdf`);
    } catch (e) {
      console.error(e);
      alert(
        "PDF export requires the 'jspdf' package. Install it with: npm i jspdf\nThen try again."
      );
    }
  };

  return (
    <div className="page">
      <div className="card">
        <div className="header">
          <h1 className="title">SignalQR</h1>
          <span className="badge">Instant</span>
        </div>
        <p className="subtitle">Create a QR from any text or URL. It updates as you type.</p>

        <div className="input-row">
          <input
            className="input"
            type="text"
            placeholder="Paste a link or type anything..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="button" onClick={onClear} aria-label="Clear input">Clear</button>
        </div>

        <div className="content">
          <div className="qr-box" ref={boxRef}>
            {text ? (
              <QRCodeCanvas value={text} size={220} includeMargin={true} />
            ) : (
              <div className="placeholder">Your QR code will appear here</div>
            )}
          </div>

          <div className="hints">
            <h3>Tips</h3>
            <ul>
              <li>Works great with website links, Wi‑Fi passwords, or short notes.</li>
              <li>Make sure your screen brightness is up when scanning.</li>
              <li>Longer text still works — the pattern just gets denser.</li>
            </ul>
          </div>
        </div>

        <div className="actions">
          <button className="button secondary" onClick={handleDownloadJPG} disabled={!text}>
            Download JPG
          </button>
          <button className="button secondary" onClick={handleDownloadPDF} disabled={!text}>
            Download PDF
          </button>
        </div>

        <div className="footer">
          <span>Ma'din R&D Labs &copy; {new Date().getFullYear()}</span>
          <button
            className="icon-btn"
            onClick={() => setShowAbout((v) => !v)}
            aria-expanded={showAbout}
            aria-controls="about-panel"
            title="About Ma'din R&D Labs"
          >
            i
          </button>
        </div>

        <div id="about-panel" className={`about ${showAbout ? "open" : ""}`}>
          <p>
        &nbsp; Ma'din R&D Labs is the research and development hub of <a href="https://madin.edu.in/">Ma’din Academy</a>.
        We are a creative tech team dedicated to innovating and managing the Academy’s digital
        ecosystem — from mobile apps and ERP systems to new platforms that empower students,
        staff, and the community. As a center of innovation, we drive Ma’din’s digital transformation with purpose,
        combining research, development, and values. Our mission is to brighten today with solutions that work while shaping tomorrow with technology that inspires.
        At Ma'din R&D Labs, we believe technology is not just about tools — it’s about creating meaningful,
        human-centered experiences that reflect knowledge, guidance, and progress.
          </p>
        </div>
      </div>
    </div>
  );
}

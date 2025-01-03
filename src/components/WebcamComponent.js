import React, { useRef, useState, useEffect } from 'react';

// Define some styles for the dashboard
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
    width: '80%',
    margin: 'auto',
    marginTop: '30px',
    textAlign: 'center',
    fontFamily: "'Arial', sans-serif",
  },
  videoContainer: {
    marginBottom: '20px',
    border: '5px solid #4CAF50',
    borderRadius: '10px',
    padding: '10px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  detectedLabel: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#4CAF50',
    backgroundColor: '#ffffff',
    border: '2px solid #4CAF50',
    borderRadius: '5px',
    padding: '10px',
    boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
    marginTop: '15px',
    cursor: 'pointer',
  },
  detectedLabelHover: {
    transform: 'scale(1.1)',
    backgroundColor: '#4CAF50',
    color: '#ffffff',
  },
};

const WebcamComponent = () => {
  const videoRef = useRef(null);
  const [detectedSign, setDetectedSign] = useState(null); // State for detected sign label
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const getCameraFeed = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };

    getCameraFeed();

    // Store the current value of videoRef.current to avoid issues with cleanup
    const currentVideoRef = videoRef.current;

    return () => {
      if (currentVideoRef && currentVideoRef.srcObject) {
        const tracks = currentVideoRef.srcObject.getTracks();
        tracks.forEach((track) => track.stop()); // Stop the camera feed
      }
    };
  }, []);

  // Simulating sign detection (replace this with your actual sign detection logic)
  useEffect(() => {
    const simulateSignDetection = () => {
      // Example logic: After 3 seconds, set a detected sign label
      setTimeout(() => {
        setDetectedSign("Hello"); // Example label for the detected sign
      }, 3000);
    };

    simulateSignDetection();
  }, []);

  // Handle hover effect for detected label
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div style={styles.container}>
      <div style={styles.videoContainer}>
        <video
          ref={videoRef}
          autoPlay
          style={{
            width: '100%',
            borderRadius: '8px',
            border: '2px solid #4CAF50',
          }}
        ></video>
      </div>
      {detectedSign && (
        <div
          style={{
            ...styles.detectedLabel,
            ...(isHovered ? styles.detectedLabelHover : {}),
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Detected Sign: {detectedSign}
        </div>
      )}
    </div>
  );
};

export default WebcamComponent;

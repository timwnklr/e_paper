import React from 'react';

function PDFOverlay() {
  // Handler for click events on the overlay
  const handleOverlayClick = () => {
    // Redirect to google.com when the overlay is clicked
    window.location.href = 'https://www.google.com';
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Your PDF rendering component here */}

      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent overlay
          cursor: 'pointer',
        }}
        onClick={handleOverlayClick}
      />
    </div>
  );
}

export default PDFOverlay;
'use client'
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { extractTextAndCoordinates } from './components/extractTextandCoordinates';

const PDFViewer = dynamic(() => import('./components/pdfViewer'), { ssr: false });

const pdfUrl = '/Nordlicht_10_2023_web.pdf';
const titleText = 'TITELTHEMA';  // Replace with the actual title text or pattern

// Define a type for the coordinates
type Coordinates = {
  title_coordinates: { x: number, y: number } | null,
  end_coordinates: { x: number, y: number }
}[];

function PDFPage() {
  // Update the useState call to specify the type of the state
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  useEffect(() => {
    async function fetchCoordinates() {
      const coords = await extractTextAndCoordinates(pdfUrl, titleText);
      setCoordinates(coords);
    }
    fetchCoordinates();
  }, []);

  const handleOverlayClick = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div style={{ position: 'relative' }}>
      <PDFViewer file={pdfUrl} />
      {coordinates && coordinates.map((coord, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: coord.title_coordinates?.y ?? 0,  // Updated to handle null title_coordinates
            left: coord.title_coordinates?.x ?? 0,  // Updated to handle null title_coordinates
            right: 'auto',
            bottom: coord.end_coordinates.y,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            cursor: 'pointer',
          }}
          onClick={handleOverlayClick}
        />
      ))}
    </div>
  );
}

export default PDFPage;

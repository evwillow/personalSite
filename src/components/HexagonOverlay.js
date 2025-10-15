"use client";
import React, { useState, useEffect } from 'react';

const HexagonOverlay = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate hexagon rows to fill the screen
  const generateHexagonRows = () => {
    if (!isClient) {
      // Return a minimal set for SSR
      return Array.from({ length: 10 }, (_, i) => (
        <div key={i} className="hex-row">
          {Array.from({ length: 16 }, (_, j) => (
            <div key={j} className="hex-tile"></div>
          ))}
        </div>
      ));
    }

    const rows = [];
    const documentHeight = Math.max(
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight,
      document.body.scrollHeight,
      document.body.offsetHeight
    );
    const hexagonHeight = 110;
    const rowSpacing = 32;
    const numRows = Math.ceil(documentHeight / (hexagonHeight - rowSpacing)) + 10;
    
    for (let i = 0; i < numRows; i++) {
      const hexagons = [];
      const screenWidth = window.innerWidth;
      const hexagonWidth = 100;
      const numHexagons = Math.ceil(screenWidth / hexagonWidth) + 5;
      
      for (let j = 0; j < numHexagons; j++) {
        hexagons.push(
          <div key={j} className="hex-tile" onMouseEnter={(e)=>e.currentTarget.classList.add('is-hovered')} onMouseLeave={(e)=>e.currentTarget.classList.remove('is-hovered')}></div>
        );
      }
      
      // Use the exact class names from your example
      let rowClass = "hex-row";
      
      rows.push(
        <div key={i} className={rowClass}>
          {hexagons}
        </div>
      );
    }
    
    return rows;
  };

  return (
    <div className="hex-overlay">
      {generateHexagonRows()}
    </div>
  );
};

export default HexagonOverlay;

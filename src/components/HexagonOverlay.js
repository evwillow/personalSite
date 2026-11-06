"use client";
import React, { useState, useEffect } from 'react';

const HexagonOverlay = () => {
  const [isClient, setIsClient] = useState(false);

  // Tiles are invisible until hovered, so touch screens never see them. Build the grid only
  // on hover-capable devices, and only once the browser is idle: building ~500 nodes during
  // hydration is what held up first paint and interactivity on mobile.
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 768px)').matches) return;
    const idle = window.requestIdleCallback || ((f) => setTimeout(f, 200));
    const cancel = window.cancelIdleCallback || clearTimeout;
    const id = idle(() => setIsClient(true));
    return () => cancel(id);
  }, []);

  // Generate hexagon rows to fill the screen
  const generateHexagonRows = () => {
    if (!isClient) return null;

    const rows = [];
    // Generate hexagons for the full page height
    const documentHeight = Math.max(
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight,
      document.body.scrollHeight,
      document.body.offsetHeight
    );
    const hexagonHeight = 110;
    const rowSpacing = 32;
    const numRows = Math.ceil(documentHeight / (hexagonHeight - rowSpacing)) + 5;
    
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
    <div className="hex-overlay" aria-hidden="true">
      {generateHexagonRows()}
    </div>
  );
};

export default HexagonOverlay;

"use client";
import React from 'react';
import HexagonOverlay from './HexagonOverlay';
import Footer from './Footer';

const ContentWrapper = ({ children }) => {
  return (
    <div className="relative" style={{ pointerEvents: 'none' }}>
      {/* Hex overlay covers the entire page */}
      <HexagonOverlay />
      
      {/* Content sits above the hex overlay */}
      <div className="relative" style={{ zIndex: 2 }}>
        {children}
      </div>
      
      {/* Footer sits above the hex overlay */}
      <div className="relative" style={{ zIndex: 7, pointerEvents: 'auto' }}>
        <Footer />
      </div>
    </div>
  );
};

export default ContentWrapper;

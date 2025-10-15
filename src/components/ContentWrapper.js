"use client";
import React from 'react';
import HexagonOverlay from './HexagonOverlay';
import Footer from './Footer';

const ContentWrapper = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      {/* Hex overlay covers the entire page */}
      <HexagonOverlay />
      
      {/* Content sits above the hex overlay */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Footer sits above the hex overlay */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default ContentWrapper;

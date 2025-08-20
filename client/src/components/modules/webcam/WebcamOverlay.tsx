import React, { useState } from 'react';
import WebcamPanel from './WebcamPanel';

interface WebcamOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const WebcamOverlay: React.FC<WebcamOverlayProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-mirror-bg rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-mirror-text">Outfit Analysis</h2>
          <button
            onClick={onClose}
            className="text-mirror-text hover:text-mirror-accent text-2xl"
          >
            ×
          </button>
        </div>
        <WebcamPanel onAnalysisComplete={onClose} />
      </div>
    </div>
  );
};

export default WebcamOverlay;

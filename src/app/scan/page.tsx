'use client';

import { useState } from 'react';
import Navigation from '../components/Navigation';
import CameraScanner from '../components/scan/CameraScanner';
import FileUploadFallback from '../components/scan/FileUploadFallback';
import ScanResultModal from '../components/scan/ScanResultModal';

export default function ScanPage() {
  const [scanMode, setScanMode] = useState<'camera' | 'upload'>('camera');
  const [scannedDocument, setScannedDocument] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);

  const handleScanComplete = (documentData: any) => {
    setScannedDocument(documentData);
    setShowResult(true);
  };

  const handleScanAnother = () => {
    setScannedDocument(null);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      
      <main className="lg:pl-64">
        {/* Scanner Interface */}
        <div className="relative h-screen">
          {scanMode === 'camera' ? (
            <CameraScanner onScanComplete={handleScanComplete} />
          ) : (
            <FileUploadFallback onScanComplete={handleScanComplete} />
          )}

          {/* Mode Toggle */}
          <div className="absolute top-4 left-4 right-4 z-20">
            <div className="flex items-center justify-between">
              <div className="bg-black bg-opacity-50 rounded-lg p-2">
                <h1 className="text-white font-semibold text-lg">Document Scanner</h1>
                <p className="text-gray-300 text-sm">Position document in frame</p>
              </div>
              
              <div className="flex bg-black bg-opacity-50 rounded-lg p-1">
                <button
                  onClick={() => setScanMode('camera')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    scanMode === 'camera'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Camera
                </button>
                <button
                  onClick={() => setScanMode('upload')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    scanMode === 'upload'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Scan Result Modal */}
      {showResult && (
        <ScanResultModal
          document={scannedDocument}
          onClose={() => setShowResult(false)}
          onScanAnother={handleScanAnother}
        />
      )}
    </div>
  );
} 
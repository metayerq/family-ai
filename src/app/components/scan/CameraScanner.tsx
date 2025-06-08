'use client';

import { useEffect, useRef, useState } from 'react';
import { 
  CameraIcon, 
  PhotoIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface CameraScannerProps {
  onScanComplete: (document: any) => void;
}

export default function CameraScanner({ onScanComplete }: CameraScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string>('');
  const [guidance, setGuidance] = useState('Position document in the frame');
  const [isCapturing, setIsCapturing] = useState(false);
  const [documentDetected, setDocumentDetected] = useState(false);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Back camera on mobile
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsStreaming(true);
        setError('');
        
        // Simulate document detection
        setTimeout(() => {
          setDocumentDetected(true);
          setGuidance('Document detected! Tap to capture');
        }, 2000);
      }
    } catch (err) {
      console.error('Camera access denied:', err);
      setError('Camera access required. Please allow camera permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const captureDocument = () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsCapturing(true);
    setGuidance('Processing...');

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);

      // Convert to blob and simulate AI processing
      canvas.toBlob((blob) => {
        if (blob) {
          setTimeout(() => {
            const mockDocument = {
              id: Date.now(),
              name: `Scanned Document ${new Date().toLocaleTimeString()}`,
              type: 'image/jpeg',
              size: blob.size,
              blob: blob,
              aiExtracted: {
                documentType: 'Insurance Card',
                expiryDate: '12/25/2025',
                keyInfo: ['Policy Number: INS-123456', 'Member ID: MEM-789012']
              },
              confidence: 0.95
            };
            
            setIsCapturing(false);
            onScanComplete(mockDocument);
          }, 2000);
        }
      }, 'image/jpeg', 0.8);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-slate-900 text-white p-6">
        <ExclamationTriangleIcon className="h-16 w-16 text-red-400 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Camera Access Required</h2>
        <p className="text-gray-300 text-center mb-6">{error}</p>
        <button
          onClick={startCamera}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="relative h-full bg-black">
      {/* Video Stream */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
        muted
      />

      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Document Detection Overlay */}
      {isStreaming && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Detection Frame */}
          <div className="absolute inset-8 border-2 border-dashed border-white rounded-lg opacity-60">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-400"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-400"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-400"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-400"></div>
          </div>

          {/* Document detected indicator */}
          {documentDetected && (
            <div className="absolute inset-8 border-2 border-solid border-green-400 rounded-lg bg-green-400 bg-opacity-10">
              <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-sm flex items-center">
                <CheckCircleIcon className="h-4 w-4 mr-1" />
                Document Detected
              </div>
            </div>
          )}
        </div>
      )}

      {/* Guidance Text */}
      <div className="absolute bottom-32 left-4 right-4 text-center">
        <div className="bg-black bg-opacity-50 rounded-lg p-3">
          <p className="text-white text-sm font-medium">{guidance}</p>
        </div>
      </div>

      {/* Capture Button */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          onClick={captureDocument}
          disabled={!documentDetected || isCapturing}
          className={`w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-all ${
            documentDetected && !isCapturing
              ? 'bg-blue-600 hover:bg-blue-700 scale-110'
              : 'bg-gray-600'
          }`}
        >
          {isCapturing ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <CameraIcon className="h-8 w-8 text-white" />
          )}
        </button>
      </div>

      {/* Gallery Button */}
      <div className="absolute bottom-8 right-8">
        <button className="w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
          <PhotoIcon className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
} 
'use client';

import { useRef, useState } from 'react';
import { 
  CloudArrowUpIcon, 
  DocumentTextIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';

interface FileUploadFallbackProps {
  onScanComplete: (document: any) => void;
}

export default function FileUploadFallback({ onScanComplete }: FileUploadFallbackProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    processFile(file);
  };

  const processFile = (file: File) => {
    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      const mockDocument = {
        id: Date.now(),
        name: file.name.replace(/\.[^/.]+$/, ''),
        type: file.type,
        size: file.size,
        file: file,
        aiExtracted: {
          documentType: 'Uploaded Document',
          keyInfo: ['File processed successfully', 'Ready for organization']
        },
        confidence: 0.88
      };

      setIsProcessing(false);
      onScanComplete(mockDocument);
    }, 2000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-slate-900 text-white p-6">
      <div className="max-w-md w-full text-center">
        <PhotoIcon className="h-20 w-20 text-gray-400 mx-auto mb-6" />
        
        <h2 className="text-2xl font-bold mb-2">Upload Document</h2>
        <p className="text-gray-300 mb-8">
          Select an image of your document to scan and organize
        </p>

        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 mb-6 transition-colors ${
            isDragOver
              ? 'border-blue-400 bg-blue-900 bg-opacity-20'
              : 'border-gray-600 hover:border-gray-500'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {isProcessing ? (
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-blue-400 font-medium">Processing document...</p>
            </div>
          ) : (
            <>
              <CloudArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-300 mb-4">
                Drag and drop your document here, or
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Choose File
              </button>
            </>
          )}
        </div>

        {/* Supported Formats */}
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">Supported formats:</p>
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
            <span>JPG</span>
            <span>PNG</span>
            <span>PDF</span>
            <span>HEIC</span>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
      </div>
    </div>
  );
} 
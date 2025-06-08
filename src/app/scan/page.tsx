'use client';

import { useState } from 'react';
import Navigation from '../components/Navigation';

export default function ScanPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleCameraAccess = async () => {
    setIsLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop()); // Stop immediately for demo
      alert('Camera access granted! Scanner would open here.');
    } catch (error) {
      alert('Camera access denied. Please allow camera permissions.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <main className="lg:pl-64">
        <div className="px-4 py-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-4">Document Scanner</h1>
              <p className="text-slate-600 text-lg">
                Scan and digitize your family's important documents with AI-powered recognition
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Camera Scanner */}
              <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Camera Scanner</h3>
                  <p className="text-slate-600 mb-6">
                    Use your device's camera to scan documents in real-time with automatic edge detection
                  </p>
                  <button
                    onClick={handleCameraAccess}
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                  >
                    {isLoading ? 'Opening Camera...' : 'Start Camera Scan'}
                  </button>
                </div>
              </div>

              {/* File Upload */}
              <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Upload File</h3>
                  <p className="text-slate-600 mb-6">
                    Upload existing photos or scanned documents from your device for AI processing
                  </p>
                  <label className="w-full inline-block">
                    <input type="file" accept="image/*,.pdf" className="hidden" />
                    <span className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors cursor-pointer inline-block">
                      Choose File
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-6 text-center">AI-Powered Features</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-slate-900 mb-1">Auto Detection</h4>
                  <p className="text-sm text-slate-600">Automatically detects document boundaries and enhances quality</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-slate-900 mb-1">Text Extraction</h4>
                  <p className="text-sm text-slate-600">Extracts key information like dates, amounts, and important details</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-slate-900 mb-1">Smart Categories</h4>
                  <p className="text-sm text-slate-600">Automatically categorizes documents by type and importance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
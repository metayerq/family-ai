'use client';

import { useState } from 'react';
import { 
  XMarkIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  PencilIcon,
  FolderIcon
} from '@heroicons/react/24/outline';

interface ScanResultModalProps {
  document: any;
  onClose: () => void;
  onScanAnother: () => void;
}

export default function ScanResultModal({ document, onClose, onScanAnother }: ScanResultModalProps) {
  const [documentName, setDocumentName] = useState(document.name);
  const [category, setCategory] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const categories = [
    { id: '', name: 'Select Category' },
    { id: 'insurance', name: 'Insurance' },
    { id: 'identity', name: 'Identity' },
    { id: 'vehicle', name: 'Vehicle' },
    { id: 'medical', name: 'Medical' },
    { id: 'financial', name: 'Financial' },
    { id: 'legal', name: 'Legal' }
  ];

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
      onClose();
      // Could redirect to documents page or show success message
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Scan Complete!</h2>
                <p className="text-sm text-gray-600">AI extracted document information</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* AI Extracted Info */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">AI Detection Results</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">Document Type:</span>
                  <span className="font-medium text-blue-900">{document.aiExtracted.documentType}</span>
                </div>
                {document.aiExtracted.expiryDate && (
                  <div className="flex justify-between">
                    <span className="text-blue-700">Expiry Date:</span>
                    <span className="font-medium text-blue-900">{document.aiExtracted.expiryDate}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-blue-700">Confidence:</span>
                  <span className="font-medium text-blue-900">{Math.round(document.confidence * 100)}%</span>
                </div>
              </div>
              
              {document.aiExtracted.keyInfo && (
                <div className="mt-3">
                  <p className="text-blue-700 text-sm font-medium mb-1">Key Information:</p>
                  <ul className="text-sm text-blue-800 space-y-1">
                    {document.aiExtracted.keyInfo.map((info: string, index: number) => (
                      <li key={index}>• {info}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Document Details Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Document Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={documentName}
                    onChange={(e) => setDocumentName(e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <PencilIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  <FolderIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
            <button
              onClick={onScanAnother}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Scan Another
            </button>
            
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!documentName || !category || isSaving}
                className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center ${
                  !documentName || !category || isSaving
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <DocumentTextIcon className="h-5 w-5 mr-2" />
                    Save Document
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
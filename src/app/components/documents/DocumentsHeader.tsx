'use client';

import { useState } from 'react';
import { 
  PlusIcon, 
  CameraIcon,
  ArrowUpTrayIcon
} from '@heroicons/react/24/outline';
import UploadModal from './UploadModal';

interface DocumentsHeaderProps {
  onUploadComplete: (document: any) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export default function DocumentsHeader({ onUploadComplete, viewMode, onViewModeChange }: DocumentsHeaderProps) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleUploadComplete = (document: any) => {
    onUploadComplete(document);
    setIsUploadModalOpen(false);
  };

  return (
    <>
      <div className="mb-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Documents</h1>
            <p className="mt-1 text-sm text-slate-600">
              Manage and organize your family's important documents
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0 sm:flex sm:space-x-3">
            <button 
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors"
            >
              <ArrowUpTrayIcon className="h-4 w-4 mr-2" />
              Upload
            </button>
            
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              <CameraIcon className="h-4 w-4 mr-2" />
              Scan Document
            </button>
          </div>
        </div>
      </div>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadComplete={handleUploadComplete}
      />
    </>
  );
} 
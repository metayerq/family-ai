'use client';

import { PlusIcon } from '@heroicons/react/24/outline';

interface SimpleUploadButtonProps {
  onClick: () => void;
}

export default function SimpleUploadButton({ onClick }: SimpleUploadButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
    >
      <PlusIcon className="h-5 w-5 mr-2" />
      Upload Document
    </button>
  );
} 
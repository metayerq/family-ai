'use client';

import { 
  DocumentTextIcon,
  EyeIcon,
  ShareIcon,
  TrashIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface Document {
  id: number;
  name: string;
  category: string;
  uploadDate: string;
  expiryDate?: string | null;
  status: string;
  aiProcessing: string;
  size?: number;
  fileName?: string;
  description?: string;
}

interface DocumentsListProps {
  documents: Document[];
  searchQuery: string;
  selectedCategory: string;
  sortBy: string;
}

export default function DocumentsList({ documents, searchQuery, selectedCategory, sortBy }: DocumentsListProps) {
  
  const getAIStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-4 w-4 text-green-600" />;
      case 'processing':
        return <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      case 'failed':
        return <ExclamationTriangleIcon className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      insurance: 'bg-blue-100 text-blue-800',
      identity: 'bg-green-100 text-green-800',
      vehicle: 'bg-purple-100 text-purple-800',
      medical: 'bg-red-100 text-red-800',
      financial: 'bg-yellow-100 text-yellow-800',
      legal: 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size';
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Filter and sort documents (same logic as grid)
  const filteredDocuments = documents
    .filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'expiry':
          if (!a.expiryDate && !b.expiryDate) return 0;
          if (!a.expiryDate) return 1;
          if (!b.expiryDate) return -1;
          return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
        default: // date
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      }
    });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-700">
        <div className="col-span-5">Document</div>
        <div className="col-span-2">Category</div>
        <div className="col-span-2">Upload Date</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-1">Actions</div>
      </div>

      {/* Document Rows */}
      <div className="divide-y divide-slate-200">
        {filteredDocuments.map((document) => (
          <div key={document.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
            {/* Document Info */}
            <div className="col-span-5 flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                <DocumentTextIcon className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-slate-900">{document.name}</h3>
                  {new Date(document.uploadDate).getTime() > Date.now() - 24 * 60 * 60 * 1000 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      New
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500">{formatFileSize(document.size)}</p>
              </div>
            </div>

            {/* Category */}
            <div className="col-span-2 flex items-center">
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(document.category)}`}>
                {document.category.charAt(0).toUpperCase() + document.category.slice(1)}
              </span>
            </div>

            {/* Upload Date */}
            <div className="col-span-2 flex items-center text-sm text-slate-600">
              {new Date(document.uploadDate).toLocaleDateString()}
            </div>

            {/* Status */}
            <div className="col-span-2 flex items-center space-x-2">
              {getAIStatusIcon(document.aiProcessing)}
              <div>
                {document.status === 'expires-soon' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    <ClockIcon className="h-3 w-3 mr-1" />
                    Expires Soon
                  </span>
                )}
                {document.expiryDate && document.status !== 'expires-soon' && (
                  <span className="text-xs text-slate-500">
                    Expires: {new Date(document.expiryDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="col-span-1 flex items-center space-x-2">
              <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
                <EyeIcon className="h-4 w-4" />
              </button>
              <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
                <ShareIcon className="h-4 w-4" />
              </button>
              <button className="p-1 text-slate-400 hover:text-red-600 transition-colors">
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <DocumentTextIcon className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No documents found</h3>
          <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
} 
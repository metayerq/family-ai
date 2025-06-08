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

interface DocumentsGridProps {
  documents: Document[];
  searchQuery: string;
  selectedCategory: string;
  sortBy: string;
}

export default function DocumentsGrid({ documents, searchQuery, selectedCategory, sortBy }: DocumentsGridProps) {
  
  const getStatusBadge = (status: string, expiryDate: string | null) => {
    if (status === 'expires-soon') {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
          <ClockIcon className="h-3 w-3 mr-1" />
          Expires Soon
        </span>
      );
    }
    return null;
  };

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

  // Filter and sort documents
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredDocuments.map((document) => (
        <div key={document.id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
          {/* Document Thumbnail */}
          <div className="relative h-48 bg-slate-100 flex items-center justify-center">
            <DocumentTextIcon className="h-12 w-12 text-slate-400" />
            
            {/* AI Processing Status */}
            <div className="absolute top-2 right-2">
              {getAIStatusIcon(document.aiProcessing)}
            </div>
            
            {/* Status Badge */}
            {document.status === 'expires-soon' && (
              <div className="absolute top-2 left-2">
                {getStatusBadge(document.status, document.expiryDate)}
              </div>
            )}

            {/* New document indicator */}
            {new Date(document.uploadDate).getTime() > Date.now() - 24 * 60 * 60 * 1000 && (
              <div className="absolute top-2 left-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  New
                </span>
              </div>
            )}
          </div>
          
          {/* Document Info */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-slate-900 text-sm truncate">{document.name}</h3>
            </div>
            
            <div className="space-y-2">
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(document.category)}`}>
                {document.category.charAt(0).toUpperCase() + document.category.slice(1)}
              </span>
              
              <div className="text-xs text-slate-500 space-y-1">
                <p>Added: {new Date(document.uploadDate).toLocaleDateString()}</p>
                {document.expiryDate && (
                  <p>Expires: {new Date(document.expiryDate).toLocaleDateString()}</p>
                )}
                {document.description && (
                  <p className="truncate">{document.description}</p>
                )}
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
              <div className="flex space-x-2">
                <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
                  <EyeIcon className="h-4 w-4" />
                </button>
                <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
                  <ShareIcon className="h-4 w-4" />
                </button>
              </div>
              <button className="p-1 text-slate-400 hover:text-red-600 transition-colors">
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {filteredDocuments.length === 0 && (
        <div className="col-span-full text-center py-12">
          <DocumentTextIcon className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No documents found</h3>
          <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
} 
'use client';

import { useState } from 'react';
import Navigation from '../components/Navigation';
import DocumentsHeader from '../components/documents/DocumentsHeader';
import DocumentsFilters from '../components/documents/DocumentsFilters';
import DocumentsGrid from '../components/documents/DocumentsGrid';
import DocumentsList from '../components/documents/DocumentsList';

export default function DocumentsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Health Insurance Card',
      category: 'insurance',
      type: 'Insurance',
      uploadDate: '2024-01-15',
      expiryDate: '2024-12-31',
      status: 'expires-soon',
      size: '245 KB',
      aiProcessing: 'complete'
    },
    {
      id: 2,
      name: 'Car Registration',
      category: 'vehicle',
      type: 'Vehicle',
      uploadDate: '2024-01-10',
      expiryDate: '2025-03-15',
      status: 'active',
      size: '312 KB',
      aiProcessing: 'complete'
    },
    {
      id: 3,
      name: 'Passport - John',
      category: 'identity',
      type: 'Identity',
      uploadDate: '2024-01-05',
      expiryDate: '2029-01-05',
      status: 'active',
      size: '1.2 MB',
      aiProcessing: 'complete'
    },
    {
      id: 4,
      name: 'Home Insurance Policy',
      category: 'insurance',
      type: 'Insurance',
      uploadDate: '2023-12-20',
      expiryDate: '2024-12-20',
      status: 'active',
      size: '456 KB',
      aiProcessing: 'complete'
    },
    {
      id: 5,
      name: 'Medical Records - Sarah',
      category: 'medical',
      type: 'Medical',
      uploadDate: '2024-01-12',
      expiryDate: null,
      status: 'active',
      size: '789 KB',
      aiProcessing: 'processing'
    },
    {
      id: 6,
      name: 'Birth Certificate - Emma',
      category: 'identity',
      type: 'Identity',
      uploadDate: '2024-01-08',
      expiryDate: null,
      status: 'active',
      size: '567 KB',
      aiProcessing: 'complete'
    }
  ]);

  const handleUploadComplete = (newDocument: any) => {
    setDocuments(prev => [newDocument, ...prev]);
  };

  // Filter documents based on search and filters
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <main className="lg:pl-64">
        <div className="px-4 py-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <DocumentsHeader 
              onUploadComplete={handleUploadComplete}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />

            {/* Filters */}
            <DocumentsFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              documentCount={filteredDocuments.length}
            />

            {/* Documents Display */}
            {viewMode === 'grid' ? (
              <DocumentsGrid documents={filteredDocuments} />
            ) : (
              <DocumentsList documents={filteredDocuments} />
            )}

            {/* Empty State */}
            {filteredDocuments.length === 0 && (
              <div className="bg-white rounded-lg p-12 text-center shadow-sm border border-slate-200">
                <div className="max-w-md mx-auto">
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    No documents found
                  </h3>
                  <p className="text-slate-600 mb-6">
                    {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all'
                      ? 'Try adjusting your search or filters.'
                      : 'Start by uploading your first document.'}
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Upload Document
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 
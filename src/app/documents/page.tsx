'use client';

import { useState } from 'react';
import Navigation from '../components/Navigation';
import DocumentsHeader from '../components/documents/DocumentsHeader';
import DocumentsFilters from '../components/documents/DocumentsFilters';
import DocumentsGrid from '../components/documents/DocumentsGrid';
import DocumentsList from '../components/documents/DocumentsList';

// Define the Document type
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

export default function DocumentsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Move documents state to this component
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      name: 'Health Insurance Card',
      category: 'insurance',
      uploadDate: '2024-01-15',
      expiryDate: '2024-02-28',
      status: 'expires-soon',
      aiProcessing: 'completed'
    },
    {
      id: 2,
      name: 'Driver\'s License - John',
      category: 'identity',
      uploadDate: '2024-01-10',
      expiryDate: '2025-06-15',
      status: 'active',
      aiProcessing: 'completed'
    },
    {
      id: 3,
      name: 'Car Registration',
      category: 'vehicle',
      uploadDate: '2024-01-08',
      expiryDate: '2024-12-31',
      status: 'active',
      aiProcessing: 'processing'
    },
    {
      id: 4,
      name: 'Home Insurance Policy',
      category: 'insurance',
      uploadDate: '2024-01-05',
      expiryDate: '2024-11-30',
      status: 'active',
      aiProcessing: 'completed'
    },
    {
      id: 5,
      name: 'Medical Records - Sarah',
      category: 'medical',
      uploadDate: '2024-01-03',
      expiryDate: null,
      status: 'active',
      aiProcessing: 'failed'
    },
    {
      id: 6,
      name: 'Bank Statement',
      category: 'financial',
      uploadDate: '2024-01-01',
      expiryDate: null,
      status: 'active',
      aiProcessing: 'completed'
    }
  ]);

  // Function to add new document
  const handleDocumentUpload = (newDocument: Document) => {
    setDocuments(prevDocs => [newDocument, ...prevDocs]); // Add new document at the beginning
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      {/* Main Content */}
      <main className="lg:pl-64">
        <div className="px-4 py-6 lg:px-8">
          <DocumentsHeader onDocumentUpload={handleDocumentUpload} />
          
          <DocumentsFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewMode={viewMode}
            setViewMode={setViewMode}
            totalDocuments={documents.length}
          />

          {viewMode === 'grid' ? (
            <DocumentsGrid
              documents={documents}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              sortBy={sortBy}
            />
          ) : (
            <DocumentsList
              documents={documents}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              sortBy={sortBy}
            />
          )}
        </div>
      </main>
    </div>
  );
} 
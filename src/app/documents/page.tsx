import Navigation from '../components/Navigation';

export default function DocumentsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <main className="lg:pl-64">
        <div className="px-4 py-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-slate-900">Documents</h1>
              <p className="text-slate-600">Manage your family's important documents</p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-2">
                Document Management Coming Soon
              </h2>
              <p className="text-slate-600 mb-4">
                We're building an amazing document management system for your family.
              </p>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  ✅ Upload documents<br/>
                  ✅ AI document scanning<br/>
                  ✅ Smart categorization<br/>
                  ✅ Expiration alerts
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
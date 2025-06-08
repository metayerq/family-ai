import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      {/* Main Content */}
      <main className="lg:pl-64">
        <div className="px-4 py-6 lg:px-8">
          <Dashboard />
        </div>
      </main>
    </div>
  );
}

'use client';

import { 
  DocumentTextIcon, 
  CameraIcon, 
  BellIcon, 
  ChatBubbleLeftRightIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const stats = [
    { name: 'Total Documents', value: '24', icon: DocumentTextIcon, color: 'text-blue-600 bg-blue-100' },
    { name: 'Expiring Soon', value: '3', icon: ExclamationTriangleIcon, color: 'text-amber-600 bg-amber-100' },
    { name: 'Scanned This Month', value: '8', icon: CameraIcon, color: 'text-green-600 bg-green-100' },
    { name: 'AI Insights', value: '12', icon: ChatBubbleLeftRightIcon, color: 'text-purple-600 bg-purple-100' },
  ];

  const recentDocuments = [
    { name: 'Health Insurance Card', type: 'Insurance', date: '2 days ago', status: 'expires-soon' },
    { name: 'Car Registration', type: 'Vehicle', date: '1 week ago', status: 'active' },
    { name: 'Passport - John', type: 'Identity', date: '2 weeks ago', status: 'active' },
    { name: 'Home Insurance Policy', type: 'Insurance', date: '3 weeks ago', status: 'active' },
  ];

  const quickActions = [
    { name: 'Scan Document', icon: CameraIcon, href: '/scan', color: 'bg-blue-600 hover:bg-blue-700' },
    { name: 'Upload File', icon: PlusIcon, href: '/upload', color: 'bg-green-600 hover:bg-green-700' },
    { name: 'Ask AI', icon: ChatBubbleLeftRightIcon, href: '/chat', color: 'bg-purple-600 hover:bg-purple-700' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back to FamilyDocs AI</h1>
        <p className="text-blue-100 mb-4">Keep your family's important documents organized and never miss a deadline.</p>
        <div className="flex items-center text-sm text-blue-100">
          <BellIcon className="h-4 w-4 mr-1" />
          <span>You have 3 documents expiring in the next 30 days</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.name}
              className={`${action.color} text-white rounded-lg p-4 flex items-center justify-center space-x-2 transition-colors`}
            >
              <action.icon className="h-5 w-5" />
              <span className="font-medium">{action.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Documents */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Recent Documents</h2>
            <a href="/documents" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
              View all
              <ArrowRightIcon className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
        <div className="divide-y divide-slate-200">
          {recentDocuments.map((doc, index) => (
            <div key={index} className="p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                    <DocumentTextIcon className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{doc.name}</p>
                    <p className="text-sm text-slate-500">{doc.type} • {doc.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {doc.status === 'expires-soon' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      <ClockIcon className="h-3 w-3 mr-1" />
                      Expires Soon
                    </span>
                  )}
                  <button className="text-slate-400 hover:text-slate-600">
                    <ArrowRightIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Assistant Prompt */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <ChatBubbleLeftRightIcon className="h-6 w-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 mb-1">Need help with your documents?</h3>
            <p className="text-slate-600 text-sm mb-3">Ask our AI assistant about deadlines, document requirements, or get personalized organization tips.</p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Start Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
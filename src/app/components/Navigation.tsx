'use client';

import { useState } from 'react';
import { 
  DocumentTextIcon, 
  CameraIcon, 
  BellIcon, 
  ChatBubbleLeftRightIcon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  FolderIcon
} from '@heroicons/react/24/outline';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Documents', href: '/documents', icon: FolderIcon },
    { name: 'Scan', href: '/scan', icon: CameraIcon },
    { name: 'Alerts', href: '/alerts', icon: BellIcon },
    { name: 'AI Chat', href: '/chat', icon: ChatBubbleLeftRightIcon },
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden bg-white shadow-sm border-b border-slate-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <DocumentTextIcon className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-slate-900">FamilyDocs AI</h1>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-slate-200 bg-white">
            <nav className="px-4 py-2 space-y-1">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:bg-white lg:border-r lg:border-slate-200">
        <div className="flex items-center px-6 py-4 border-b border-slate-200">
          <DocumentTextIcon className="h-8 w-8 text-blue-600" />
          <h1 className="ml-2 text-xl font-bold text-slate-900">FamilyDocs AI</h1>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors group"
            >
              <item.icon className="h-5 w-5 group-hover:text-blue-600" />
              <span className="font-medium">{item.name}</span>
            </a>
          ))}
        </nav>

        <div className="px-6 py-4 border-t border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">F</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">Family Account</p>
              <p className="text-xs text-slate-500">Secure & Private</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
} 
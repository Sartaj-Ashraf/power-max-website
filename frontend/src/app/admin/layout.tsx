'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Package, MessageSquare, Phone, Star, Settings,
  Menu, X, LogOut, ChevronRight, Zap
} from 'lucide-react';

const sidebarItems = [
  { name: 'Dashboard', href: '/admin/', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products/', icon: Package },
  { name: 'Testimonials', href: '/admin/testimonials/', icon: Star },
  { name: 'Contacts', href: '/admin/contacts/', icon: Phone },
  { name: 'Enquiries', href: '/admin/enquiries/', icon: MessageSquare },
  { name: 'Settings', href: '/admin/settings/', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) setSidebarOpen(false);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {isMobile && (
              <div
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3 }}
              className={`fixed lg:sticky top-0 left-0 z-50 w-72 h-screen bg-slate-900 text-white flex flex-col ${
                isMobile ? 'shadow-2xl' : ''
              }`}
            >
              {/* Logo */}
              <div className="p-6 border-b border-slate-800">
                <Link href="/admin/" className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold">PowerMax</h1>
                    <p className="text-xs text-slate-400">Admin Panel</p>
                  </div>
                </Link>
              </div>

              {/* Nav */}
              <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname.startsWith(item.href) && item.href !== '/admin/';
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => isMobile && setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.name}
                      {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </Link>
                  );
                })}
              </nav>

              {/* Logout */}
              <div className="p-4 border-t border-slate-800">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all w-full"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
              View Website
            </Link>
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

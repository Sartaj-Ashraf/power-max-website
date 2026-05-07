'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Zap } from 'lucide-react';
import { navigation, companyInfo } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-900 text-white text-sm py-2 hidden md:block">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href={`tel:${companyInfo.phone}`} className="flex items-center gap-2 hover:text-blue-200 transition-colors">
              <Phone className="w-4 h-4" />
              <span>{companyInfo.phone}</span>
            </a>
            <span className="text-blue-300">|</span>
            <span>{companyInfo.businessHours}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-blue-200">15+ Years of Excellence</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-white shadow-sm'
        }`}
      >
        <div className="container-custom">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-slate-900 leading-tight">PowerMax</h1>
                <p className="text-xs text-slate-500 -mt-0.5">Solutions</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:${companyInfo.phone}`}
                className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                <Phone className="w-4 h-4" />
                {companyInfo.phone}
              </a>
              <Link
                href="/contact/"
                className="btn-primary text-sm"
              >
                Get Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="container-custom py-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <a
                    href={`tel:${companyInfo.phone}`}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600"
                  >
                    <Phone className="w-4 h-4" />
                    {companyInfo.phone}
                  </a>
                  <Link
                    href="/contact/"
                    className="btn-primary w-full text-center"
                  >
                    Get Free Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

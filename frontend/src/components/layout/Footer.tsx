import Link from 'next/link';
import { Zap, Phone, Mail, MapPin, Clock, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { companyInfo, navigation } from '@/lib/data';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer */}
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">PowerMax</h3>
                <p className="text-xs text-slate-400 -mt-0.5">Solutions</p>
              </div>
            </Link>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Leading provider of power backup systems, solar panels, and energy storage solutions. 
              Trusted by 10,000+ customers since 2010.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
                  aria-label="Social media"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products/?category=inverters"
                  className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                >
                  Inverters
                </Link>
              </li>
              <li>
                <Link
                  href="/products/?category=batteries"
                  className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                >
                  Batteries
                </Link>
              </li>
              <li>
                <Link
                  href="/products/?category=solar-panels"
                  className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                >
                  Solar Panels
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-5">Our Products</h4>
            <ul className="space-y-3">
              <li><span className="text-sm text-slate-400">Pure Sine Wave Inverters</span></li>
              <li><span className="text-sm text-slate-400">Hybrid Solar Inverters</span></li>
              <li><span className="text-sm text-slate-400">Tubular Batteries</span></li>
              <li><span className="text-sm text-slate-400">Lithium-ion Batteries</span></li>
              <li><span className="text-sm text-slate-400">Monocrystalline Panels</span></li>
              <li><span className="text-sm text-slate-400">Solar Charge Controllers</span></li>
              <li><span className="text-sm text-slate-400">UPS Systems</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-400">{companyInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400 shrink-0" />
                <a href={`tel:${companyInfo.phone}`} className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                  {companyInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                <a href={`mailto:${companyInfo.email}`} className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                  {companyInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-400 shrink-0" />
                <span className="text-sm text-slate-400">{companyInfo.businessHours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} PowerMax Solutions. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-blue-400 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

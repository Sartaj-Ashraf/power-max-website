'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, MessageSquare } from 'lucide-react';
import { companyInfo } from '@/lib/data';

export function CTASection() {
  const cleanPhone = companyInfo.whatsappNumber.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hi, I would like to get a quote for power backup/solar solutions.')}`;

  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 rounded-3xl p-8 md:p-16 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left max-w-2xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Ready to Power Your Future?
              </h2>
              <p className="text-lg text-blue-200 mb-8">
                Get a free consultation and quote for your power backup or solar energy needs. 
                Our experts are ready to help you choose the perfect solution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/contact/"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl active:scale-95"
                >
                  Get Free Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-all shadow-xl hover:shadow-2xl active:scale-95"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  WhatsApp Us
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm">Call us anytime</p>
                    <a href={`tel:${companyInfo.phone}`} className="text-xl font-bold text-white hover:text-cyan-400 transition-colors">
                      {companyInfo.phone}
                    </a>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <p className="text-blue-200 text-sm mb-1">Response Time</p>
                <p className="text-2xl font-bold text-white">Under 2 Hours</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

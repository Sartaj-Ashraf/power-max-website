'use client';

import { MessageCircle } from 'lucide-react';
import { companyInfo } from '@/lib/data';
import { getWhatsAppLink } from '@/lib/utils';

export function WhatsAppButton() {
  const whatsappUrl = getWhatsAppLink(
    companyInfo.whatsappNumber,
    'Hi PowerMax Solutions, I would like to enquire about your products.'
  );

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-green-500/30 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute right-16 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat on WhatsApp
      </span>
    </a>
  );
}

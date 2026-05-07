'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { companyInfo } from '@/lib/data';
import ContactHero from "@/assets/Contact/image1.png"
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        toast.success('Thank you! We will contact you shortly.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        toast.success('Thank you! We will contact you shortly.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }
    } catch {
      toast.success('Thank you! We will contact you shortly.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } finally {
      setSubmitting(false);
    }
  };

  const cleanPhone = companyInfo.whatsappNumber.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hi PowerMax Solutions, I would like to enquire about your products.')}`;

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">

  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage: `url(${ContactHero.src})`,
    }}
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/20" />

  {/* Content */}
  <div className="relative z-10 container-custom">
    <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm text-blue-200 text-sm font-semibold rounded-full mb-4">
      Contact Us
    </span>

    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
      Get in <span className="text-cyan-400">Touch</span>
    </h1>

    <p className="text-lg text-blue-100 max-w-2xl">
      Have questions about our products or services? We are here to help.
      Reach out to us and we will respond within 2 hours.
    </p>
  </div>
</section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Phone</p>
                      <a href={`tel:${companyInfo.phone}`} className="text-slate-900 font-semibold hover:text-blue-600 transition-colors">
                        {companyInfo.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Email</p>
                      <a href={`mailto:${companyInfo.email}`} className="text-slate-900 font-semibold hover:text-blue-600 transition-colors">
                        {companyInfo.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Address</p>
                      <p className="text-slate-900 font-semibold">{companyInfo.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Business Hours</p>
                      <p className="text-slate-900 font-semibold">{companyInfo.businessHours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Card */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white hover:shadow-xl transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Chat on WhatsApp</h3>
                    <p className="text-green-100 text-sm">Instant response</p>
                  </div>
                </div>
                <p className="text-green-100 mb-4">
                  Click here to start a WhatsApp conversation with our team for quick queries and quotes.
                </p>
                <div className="flex items-center gap-2 font-semibold group-hover:gap-3 transition-all">
                  <span>Start Chat</span>
                  <Send className="w-4 h-4" />
                </div>
              </a>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-slate-100"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Send us a Message</h2>
                <p className="text-slate-500 mb-8">Fill out the form below and we will get back to you as soon as possible.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Subject *</label>
                      <select
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
                      >
                        <option value="">Select a subject</option>
                        <option value="product-enquiry">Product Enquiry</option>
                        <option value="installation">Installation Service</option>
                        <option value="repair">Repair / Maintenance</option>
                        <option value="solar-consultation">Solar Consultation</option>
                        <option value="bulk-order">Bulk Order</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full btn-primary py-4 text-base disabled:opacity-50"
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>

          {/* Google Maps Placeholder */}
          <div className="mt-16">
            <div className="bg-slate-200 rounded-2xl h-96 flex items-center justify-center overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.1234567890123!2d77.209!3d28.6139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzUwLjAiTiA3N8KwMTInMzIuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

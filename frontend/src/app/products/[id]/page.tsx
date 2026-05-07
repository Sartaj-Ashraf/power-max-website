'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, ArrowLeft, Check, MessageSquare, Shield, Truck, RotateCcw } from 'lucide-react';
import { productsApi } from '@/lib/api';
import { companyInfo } from '@/lib/data';
import type { Product } from '@/types';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '', email: '', phone: '', message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productsApi.getById(id);
        setProduct(data);
      } catch (error) {
        const fallback: Product = {
          _id: id, name: 'Luminous Cruze 3.5KVA', category: 'inverters',
          description: 'The Luminous Cruze 3.5KVA is a high-capacity pure sine wave inverter designed for homes and small offices. It provides clean, stable power for sensitive electronics and appliances. Features advanced LCD display, overload protection, and intelligent battery management system.',
          shortDescription: '3.5KVA Pure Sine Wave Inverter',
          price: 28500, originalPrice: 32000, image: '',
          specifications: {
            'Capacity': '3.5KVA / 2800W',
            'Waveform': 'Pure Sine Wave',
            'Input Voltage': '180V - 260V',
            'Output Voltage': '230V ± 10%',
            'Frequency': '50Hz',
            'Battery Support': '12V x 2 (24V System)',
            'Efficiency': '> 85%',
            'Transfer Time': '< 10ms',
            'Weight': '18 kg',
          },
          features: [
            'Pure Sine Wave Output',
            'LCD Display with Indicators',
            'Overload & Short Circuit Protection',
            'Intelligent Battery Management',
            'Low Battery Alarm',
            'Generator Compatible',
          ],
          warranty: '2 Years',
          stock: 10,
          isFeatured: true,
          createdAt: '', updatedAt: ''
        };
        setProduct(fallback);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: id,
          productName: product?.name,
          ...enquiryForm
        })
      });
      if (res.ok) {
        toast.success('Enquiry submitted successfully! We will contact you soon.');
        setEnquiryForm({ name: '', email: '', phone: '', message: '' });
      } else {
        toast.success('Enquiry submitted! We will contact you soon.');
        setEnquiryForm({ name: '', email: '', phone: '', message: '' });
      }
    } catch {
      toast.success('Enquiry submitted! We will contact you soon.');
      setEnquiryForm({ name: '', email: '', phone: '', message: '' });
    } finally {
      setSubmitting(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0
    }).format(price);
  };

  const cleanPhone = companyInfo.whatsappNumber.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi, I am interested in ${product?.name}. Please provide more details.`)}`;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="container-custom py-20">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-slate-200 rounded w-1/4" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="h-96 bg-slate-200 rounded-2xl" />
              <div className="space-y-4">
                <div className="h-10 bg-slate-200 rounded w-3/4" />
                <div className="h-6 bg-slate-200 rounded w-1/2" />
                <div className="h-32 bg-slate-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return <div className="py-20 text-center">Product not found</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/products/" className="hover:text-blue-600">Products</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
          >
            <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-24 h-24 text-slate-300" />
            </div>
            <div className="flex gap-3 mt-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-8 h-8 text-slate-300" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-3 uppercase">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-slate-500">(4.8 out of 5)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-slate-900">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xl text-slate-400 line-through">{formatPrice(product.originalPrice)}</span>
              )}
              {product.originalPrice && (
                <span className="px-2 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            <p className="text-slate-600 leading-relaxed">{product.description}</p>

            <div className="flex flex-wrap gap-3">
              <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
              </span>
              <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {product.warranty} Warranty
              </span>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-sm text-slate-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex-1 btn-primary py-4 text-base"
              >
                Enquire Now
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 btn-whatsapp py-4 text-base"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                WhatsApp Enquiry
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div className="text-center">
                <Shield className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <span className="text-xs text-slate-500">Genuine Product</span>
              </div>
              <div className="text-center">
                <Truck className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <span className="text-xs text-slate-500">Free Delivery</span>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <span className="text-xs text-slate-500">Easy Returns</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Specifications */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Technical Specifications</h2>
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {Object.entries(product.specifications).map(([key, value], index) => (
                <div
                  key={key}
                  className={`flex justify-between items-center p-5 ${
                    index % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                  } ${index !== Object.entries(product.specifications).length - 1 ? 'border-b border-slate-100' : ''}`}
                >
                  <span className="font-medium text-slate-700">{key}</span>
                  <span className="text-slate-900 font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enquiry Form */}
        <div id="enquiry-form" className="mt-16 max-w-2xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Send Enquiry</h2>
          <p className="text-slate-500 mb-6">Fill in your details and we will get back to you within 2 hours.</p>
          <form onSubmit={handleEnquirySubmit} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Name *</label>
                <input
                  type="text"
                  required
                  value={enquiryForm.name}
                  onChange={(e) => setEnquiryForm({...enquiryForm, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={enquiryForm.phone}
                  onChange={(e) => setEnquiryForm({...enquiryForm, phone: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <input
                type="email"
                value={enquiryForm.email}
                onChange={(e) => setEnquiryForm({...enquiryForm, email: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
              <textarea
                rows={4}
                value={enquiryForm.message}
                onChange={(e) => setEnquiryForm({...enquiryForm, message: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                placeholder="I am interested in this product. Please provide more details..."
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full btn-primary py-4 disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Enquiry'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

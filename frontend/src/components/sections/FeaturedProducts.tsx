'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ArrowRight, ShoppingCart } from 'lucide-react';
import { productsApi } from '@/lib/api';
import type { Product } from '@/types';
import proimg from "@/assets/Product/productimage.png"

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsApi.getAll();
        setProducts(data.filter((p: Product) => p.isFeatured).slice(0, 4));
      } catch (error) {
        setProducts([
          {
            _id: '1', name: 'Luminous Cruze 3.5KVA', category: 'inverters',
            description: 'High capacity pure sine wave inverter', shortDescription: '3.5KVA Pure Sine Wave Inverter',
            price: 28500, originalPrice: 32000, image: '/images/inverter-1.jpg',
            specifications: { 'Capacity': '3.5KVA', 'Waveform': 'Pure Sine Wave' },
            
            features: ['Pure Sine Wave', 'LCD Display'], warranty: '2 Years', stock: 10,
            isFeatured: true, createdAt: '', updatedAt: ''
          },
          {
            _id: '2', name: 'Exide Invatubular 150AH', category: 'batteries',
            description: 'Long backup tubular battery', shortDescription: '150AH Tubular Battery',
            price: 18500, originalPrice: 21000, image: '/images/battery-1.jpg',
            specifications: { 'Capacity': '150AH', 'Type': 'Tubular' },
            features: ['Deep Cycle', 'Low Maintenance'], warranty: '4 Years', stock: 15,
            isFeatured: true, createdAt: '', updatedAt: ''
          },
          {
            _id: '3', name: 'Waaree 540W Mono Panel', category: 'solar-panels',
            description: 'High efficiency monocrystalline panel', shortDescription: '540W Mono PERC Panel',
            price: 22500, originalPrice: 25000, image: '/images/panel-1.jpg',
            specifications: { 'Wattage': '540W', 'Type': 'Mono PERC' },
            features: ['High Efficiency', '25yr Warranty'], warranty: '25 Years', stock: 20,
            isFeatured: true, createdAt: '', updatedAt: ''
          },
          {
            _id: '4', name: 'Microtek Hybrid 5KVA', category: 'inverters',
            description: 'Solar hybrid inverter with MPPT', shortDescription: '5KVA Solar Hybrid Inverter',
            price: 45000, originalPrice: 52000, image: '/images/inverter-2.jpg',
            specifications: { 'Capacity': '5KVA', 'Type': 'Hybrid' },
            features: ['MPPT Controller', 'Grid Tie'], warranty: '3 Years', stock: 8,
            isFeatured: true, createdAt: '', updatedAt: ''
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl h-96 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <section className="section-padding bg-slate-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-4"
            >
              Featured Products
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-slate-900"
            >
              Bestselling <span className="text-gradient">Products</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/products/"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all mt-4 md:mt-0"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100"
            >
              <div className="relative h-56 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
               
                  <img
                  src={proimg.src}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  />


                {product.originalPrice && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>

              <div className="p-6">
                <div className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-2">
                  {product.category}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2">{product.shortDescription}</p>

                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs text-slate-400 ml-1">(4.8)</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-slate-900">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-400 line-through ml-2">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  href={`/products/${product._id}/`}
                  className="mt-4 w-full btn-primary text-sm py-2.5"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

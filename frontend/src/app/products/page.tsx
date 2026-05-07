'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Filter, SlidersHorizontal } from 'lucide-react';
import { productsApi } from '@/lib/api';
import { productCategories } from '@/lib/data';
import type { Product } from '@/types';

function ProductList() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsApi.getAll();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        const fallback: Product[] = [
          { _id: '1', name: 'Luminous Cruze 3.5KVA', category: 'inverters', description: '', shortDescription: '3.5KVA Pure Sine Wave', price: 28500, image: '', specifications: {}, features: [], warranty: '2Y', stock: 10, isFeatured: true, createdAt: '', updatedAt: '' },
          { _id: '2', name: 'Exide Invatubular 150AH', category: 'batteries', description: '', shortDescription: '150AH Tubular Battery', price: 18500, image: '', specifications: {}, features: [], warranty: '4Y', stock: 15, isFeatured: true, createdAt: '', updatedAt: '' },
          { _id: '3', name: 'Waaree 540W Mono Panel', category: 'solar-panels', description: '', shortDescription: '540W Mono PERC', price: 22500, image: '', specifications: {}, features: [], warranty: '25Y', stock: 20, isFeatured: true, createdAt: '', updatedAt: '' },
          { _id: '5', name: 'Microtek E2 900VA', category: 'inverters', description: '', shortDescription: '900VA Home UPS', price: 8500, image: '', specifications: {}, features: [], warranty: '2Y', stock: 25, isFeatured: false, createdAt: '', updatedAt: '' },
          { _id: '6', name: 'Amaron 200AH Tall Tubular', category: 'batteries', description: '', shortDescription: '200AH Tall Tubular', price: 22000, image: '', specifications: {}, features: [], warranty: '5Y', stock: 12, isFeatured: false, createdAt: '', updatedAt: '' },
          { _id: '7', name: 'Adani 445W Bifacial', category: 'solar-panels', description: '', shortDescription: '445W Bifacial Panel', price: 18500, image: '', specifications: {}, features: [], warranty: '25Y', stock: 30, isFeatured: false, createdAt: '', updatedAt: '' },
        ];
        setProducts(fallback);
        setFilteredProducts(fallback);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === activeCategory));
    }
  }, [activeCategory, products]);

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 py-16 md:py-24">
        <div className="container-custom">
          <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm text-blue-200 text-sm font-semibold rounded-full mb-4">
            Our Products
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Power Solutions <span className="text-cyan-400">Catalog</span>
          </h1>
          <p className="text-lg text-blue-200 max-w-2xl">
            Browse our complete range of inverters, batteries, and solar panels. All products come with manufacturer warranty.
          </p>
        </div>
      </section>

      {/* Filter & Products */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <div className="flex items-center gap-2 text-slate-600 mr-2">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filter:</span>
            </div>
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Products
            </button>
            {productCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
              <p className="text-slate-500">Try selecting a different category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-100"
                >
                  <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <ShoppingCart className="w-12 h-12 text-slate-300" />
                    <div className="absolute top-3 right-3">
                      <span className="text-xs font-medium px-2 py-1 bg-white/90 rounded-md text-slate-600">
                        {product.warranty} Warranty
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-1">
                      {product.category}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-3">{product.shortDescription}</p>
                    <div className="flex items-center gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-slate-900">{formatPrice(product.price)}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    <Link
                      href={`/products/${product._id}/`}
                      className="mt-4 block w-full text-center py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 animate-pulse" />}>
      <ProductList />
    </Suspense>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Pencil, Trash2, X, Search, Package, Star, Image as ImageIcon
} from 'lucide-react';
import toast from 'react-hot-toast';
import ProductImage from '@/assets/Product/productimage.png';
import type { Product } from '@/types';

const categories = [
  { id: 'inverters', name: 'Inverters' },
  { id: 'batteries', name: 'Batteries' },
  { id: 'solar-panels', name: 'Solar Panels' },
];

const emptyProduct: Partial<Product> = {
  name: '', category: 'inverters', description: '', shortDescription: '',
  price: 0, originalPrice: 0, warranty: '', stock: 0, isFeatured: false,
  features: [''], specifications: {}, image: ''
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>(emptyProduct);
  const [submitting, setSubmitting] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${apiBase}/products`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) setProducts(await res.json());
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`${apiBase}/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        toast.success('Product deleted');
        fetchProducts();
      }
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editingProduct
        ? `${apiBase}/products/${editingProduct._id}`
        : `${apiBase}/products`;
      const method = editingProduct ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast.success(editingProduct ? 'Product updated' : 'Product created');
        setShowModal(false);
        setEditingProduct(null);
        setFormData(emptyProduct);
        fetchProducts();
      } else {
        const err = await res.json();
        toast.error(err.message || 'Failed to save');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setSubmitting(false);
    }
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setShowModal(true);
  };

  const openCreate = () => {
    setEditingProduct(null);
    setFormData(emptyProduct);
    setShowModal(true);
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="text-slate-500">Manage your product catalog</p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Product</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Stock</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Featured</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={6} className="p-8 text-center text-slate-400">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-slate-400">No products found</td></tr>
              ) : (
                filtered.map((product) => (
                  <tr key={product._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200">
                          <img
                          src={ProductImage.src}
                          alt="Product"
                          className="w-full h-full object-cover"
                          />
                          </div>
                        <div>
                          <p className="font-medium text-slate-900 text-sm">{product.name}</p>
                          <p className="text-xs text-slate-500">{product.shortDescription}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full capitalize">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900">
                      ₹{product.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900">{product.stock}</td>
                    <td className="px-6 py-4">
                      {product.isFeatured ? (
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(product)}
                          className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowModal(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900">
                    {editingProduct ? 'Edit Product' : 'Add Product'}
                  </h2>
                  <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Name *</label>
                      <input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Category *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none bg-white"
                      >
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Short Description *</label>
                    <input
                      required
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Description *</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Price (₹) *</label>
                      <input
                        type="number"
                        required
                        min={0}
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Original Price (₹)</label>
                      <input
                        type="number"
                        min={0}
                        value={formData.originalPrice || ''}
                        onChange={(e) => setFormData({...formData, originalPrice: Number(e.target.value)})}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Stock *</label>
                      <input
                        type="number"
                        required
                        min={0}
                        value={formData.stock}
                        onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Warranty *</label>
                      <input
                        required
                        value={formData.warranty}
                        onChange={(e) => setFormData({...formData, warranty: e.target.value})}
                        placeholder="e.g. 2 Years"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-3 pt-7">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={formData.isFeatured}
                        onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                        className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                      />
                      <label htmlFor="featured" className="text-sm font-medium text-slate-700">Featured Product</label>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-6 py-2.5 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary disabled:opacity-50"
                    >
                      {submitting ? 'Saving...' : editingProduct ? 'Update Product' : 'Create Product'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

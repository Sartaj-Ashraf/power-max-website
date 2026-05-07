'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Testimonial } from '@/types';

const emptyTestimonial: Partial<Testimonial> = {
  name: '', location: '', rating: 5, feedback: '', isActive: true
};

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<Partial<Testimonial>>(emptyTestimonial);
  const [submitting, setSubmitting] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  const fetchTestimonials = async () => {
    try {
      const res = await fetch(`${apiBase}/testimonials/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) setTestimonials(await res.json());
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      const res = await fetch(`${apiBase}/testimonials/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        toast.success('Deleted');
        fetchTestimonials();
      }
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editingItem
        ? `${apiBase}/testimonials/${editingItem._id}`
        : `${apiBase}/testimonials`;
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast.success(editingItem ? 'Updated' : 'Created');
        setShowModal(false);
        setEditingItem(null);
        setFormData(emptyTestimonial);
        fetchTestimonials();
      } else {
        toast.error('Failed to save');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setSubmitting(false);
    }
  };

  const openEdit = (item: Testimonial) => {
    setEditingItem(item);
    setFormData({ ...item });
    setShowModal(true);
  };

  const openCreate = () => {
    setEditingItem(null);
    setFormData(emptyTestimonial);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Testimonials</h1>
          <p className="text-slate-500">Manage customer reviews</p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Rating</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Feedback</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-400">Loading...</td></tr>
              ) : testimonials.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-400">No testimonials yet</td></tr>
              ) : (
                testimonials.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 text-sm">{item.name}</p>
                          <p className="text-xs text-slate-500">{item.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(star => (
                          <Star key={star} className={`w-4 h-4 ${star <= item.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">{item.feedback}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {item.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(item._id)} className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors">
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
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg pointer-events-auto">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900">
                    {editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
                  </h2>
                  <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Name *</label>
                      <input
                        required value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Location *</label>
                      <input
                        required value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Rating *</label>
                    <div className="flex gap-2">
                      {[1,2,3,4,5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({...formData, rating: star})}
                          className="p-1"
                        >
                          <Star className={`w-8 h-8 transition-colors ${
                            star <= (formData.rating || 0) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                          }`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Feedback *</label>
                    <textarea
                      required rows={4}
                      value={formData.feedback}
                      onChange={(e) => setFormData({...formData, feedback: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                      className="w-5 h-5 text-blue-600 rounded border-slate-300"
                    />
                    <label htmlFor="isActive" className="text-sm font-medium text-slate-700">Active (visible on website)</label>
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50">
                      Cancel
                    </button>
                    <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-50">
                      {submitting ? 'Saving...' : editingItem ? 'Update' : 'Create'}
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

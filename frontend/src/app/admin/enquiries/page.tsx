'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Phone, MailOpen, CheckCircle, Trash2, Search, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Enquiry } from '@/types';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Enquiry | null>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  const fetchEnquiries = async () => {
    try {
      const res = await fetch(`${apiBase}/enquiries`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) setEnquiries(await res.json());
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`${apiBase}/enquiries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        toast.success('Status updated');
        fetchEnquiries();
      }
    } catch {
      toast.error('Failed to update');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this enquiry?')) return;
    try {
      const res = await fetch(`${apiBase}/enquiries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        toast.success('Deleted');
        fetchEnquiries();
        if (selected?._id === id) setSelected(null);
      }
    } catch {
      toast.error('Failed to delete');
    }
  };

  const filtered = enquiries.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.productName.toLowerCase().includes(search.toLowerCase()) ||
    e.phone.includes(search)
  );

  const statusColors: Record<string, string> = {
    new: 'bg-amber-100 text-amber-700',
    read: 'bg-blue-100 text-blue-700',
    replied: 'bg-green-100 text-green-700',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Product Enquiries</h1>
        <p className="text-slate-500">Manage enquiries from product detail pages</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search enquiries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden max-h-[600px] overflow-y-auto">
          <div className="p-4 border-b border-slate-100">
            <p className="text-sm font-medium text-slate-500">{filtered.length} enquiries</p>
          </div>
          {loading ? (
            <div className="p-8 text-center text-slate-400">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-400">No enquiries</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <button
                  key={item._id}
                  onClick={() => setSelected(item)}
                  className={`w-full p-4 text-left hover:bg-slate-50 transition-colors ${
                    selected?._id === item._id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-slate-900 text-sm">{item.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[item.status]}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-1">{item.productName}</p>
                  <p className="text-xs text-slate-400">{new Date(item.createdAt).toLocaleDateString()}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail */}
        <div className="lg:col-span-2">
          {selected ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-slate-100 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900">Enquiry Details</h2>
                <div className="flex items-center gap-2">
                  {selected.status === 'new' && (
                    <button
                      onClick={() => updateStatus(selected._id, 'read')}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200"
                    >
                      <MailOpen className="w-4 h-4" />
                      Mark Read
                    </button>
                  )}
                  {selected.status !== 'replied' && (
                    <button
                      onClick={() => updateStatus(selected._id, 'replied')}
                      className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark Replied
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(selected._id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Product</p>
                    <p className="text-sm font-medium text-slate-900">{selected.productName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Phone</p>
                      <p className="text-sm font-medium text-slate-900">{selected.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <ExternalLink className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Submitted</p>
                      <p className="text-sm font-medium text-slate-900">
                        {new Date(selected.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-500 mb-2">Message</p>
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-12 text-center">
              <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">Select an enquiry to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, User, Bell, Globe, Database } from 'lucide-react';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'general', label: 'General', icon: Globe },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500">Manage your admin panel preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border border-slate-100 p-6"
          >
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-slate-900">Profile Settings</h2>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    A
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Admin User</p>
                    <p className="text-sm text-slate-500">admin@powermax.com</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Display Name</label>
                    <input defaultValue="Admin" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                    <input defaultValue="admin@powermax.com" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none" />
                  </div>
                </div>
                <button className="btn-primary">Save Changes</button>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-slate-900">Security Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Current Password</label>
                    <input type="password" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">New Password</label>
                    <input type="password" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm New Password</label>
                    <input type="password" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none" />
                  </div>
                </div>
                <button className="btn-primary">Update Password</button>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-slate-900">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { label: 'New contact form submissions', desc: 'Get notified when someone fills the contact form' },
                    { label: 'New product enquiries', desc: 'Get notified for product enquiries' },
                    { label: 'Low stock alerts', desc: 'Get notified when product stock is low' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-medium text-slate-900 text-sm">{item.label}</p>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
                    </div>
                  ))}
                </div>
                <button className="btn-primary">Save Preferences</button>
              </div>
            )}

            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-slate-900">General Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-900 text-sm">Maintenance Mode</p>
                      <p className="text-xs text-slate-500">Temporarily disable the website for maintenance</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-900 text-sm">Enable Registration</p>
                      <p className="text-xs text-slate-500">Allow new admin registrations</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
                  </div>
                </div>
                <button className="btn-primary">Save Settings</button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

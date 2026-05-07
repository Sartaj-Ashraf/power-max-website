'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Cpu, Battery, Sun, ArrowRight } from 'lucide-react';
import { productCategories } from '@/lib/data';

const iconMap: Record<string, React.ElementType> = {
  Cpu, Battery, Sun,
};

export function CategoriesSection() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-4"
          >
            Our Offerings
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            Power Solutions for <span className="text-gradient">Every Need</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            From residential backup to commercial solar installations, we have the right solution for you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {productCategories.map((category, index) => {
            const Icon = iconMap[category.icon] || Cpu;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Link
                  href={`/products/?category=${category.id}`}
                  className="group block bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full"
                >
                  <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{category.name}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{category.description}</p>
                  <div className="flex items-center text-blue-600 font-semibold group-hover:gap-3 transition-all">
                    <span>Explore {category.name}</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

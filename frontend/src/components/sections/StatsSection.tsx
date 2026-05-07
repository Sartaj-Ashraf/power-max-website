'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { stats } from '@/lib/data';

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/\D/g, ''));
  const hasPlus = value.includes('+');
  const hasPercent = value.includes('%');

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return (
    <span ref={ref}>
      {count}{hasPlus ? '+' : ''}{hasPercent ? '%' : ''}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-16 bg-blue-600">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-blue-100 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

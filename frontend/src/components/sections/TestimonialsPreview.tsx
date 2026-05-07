'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Quote, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonialsApi } from '@/lib/api';
import type { Testimonial } from '@/types';

export function TestimonialsPreview() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await testimonialsApi.getAll();
        setTestimonials(data.filter((t: Testimonial) => t.isActive).slice(0, 6));
      } catch (error) {
        setTestimonials([
          { _id: '1', name: 'Rajesh Kumar', location: 'New Delhi', rating: 5, feedback: 'Excellent service! The inverter installation was seamless and the team was very professional. Highly recommended for anyone looking for power backup solutions.', image: '', isActive: true, createdAt: '' },
          { _id: '2', name: 'Priya Sharma', location: 'Gurgaon', rating: 5, feedback: 'We installed a 5KW solar system and our electricity bill dropped by 70%. The quality of panels and installation was top-notch.', image: '', isActive: true, createdAt: '' },
          { _id: '3', name: 'Amit Patel', location: 'Noida', rating: 4, feedback: 'Great experience with PowerMax. Their battery backup solution keeps our office running smoothly during power cuts. Very reliable products.', image: '', isActive: true, createdAt: '' },
        ]);
      }
    };
    fetchTestimonials();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="section-padding bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm text-blue-200 text-sm font-semibold rounded-full mb-4"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            What Our <span className="text-cyan-400">Customers</span> Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-blue-200 max-w-2xl mx-auto"
          >
            Join thousands of satisfied customers who trust us for their power needs.
          </motion.p>
        </div>

        {currentTestimonial && (
          <motion.div
            key={currentTestimonial._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10">
              <Quote className="w-12 h-12 text-cyan-400 mb-6" />

              <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 italic">
                &ldquo;{currentTestimonial.feedback}&rdquo;
              </p>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-xl font-bold">
                    {currentTestimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{currentTestimonial.name}</h4>
                    <p className="text-blue-300 text-sm">{currentTestimonial.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= currentTestimonial.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'w-8 bg-cyan-400' : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/testimonials/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg text-white font-semibold hover:bg-white/20 transition-all"
          >
            Read All Reviews
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

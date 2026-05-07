'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonialsApi } from '@/lib/api';
import type { Testimonial } from '@/types';
import HeroSection  from '@/assets/Testimonials/heroBanner.png';
export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await testimonialsApi.getAll();
        setTestimonials(data.filter((t: Testimonial) => t.isActive));
      } catch (error) {
        setTestimonials([
          {
            _id: '1',
            name: 'Rajesh Kumar',
            location: 'New Delhi',
            rating: 5,
            feedback:
              'Excellent service! The inverter installation was seamless and the team was very professional. Highly recommended for anyone looking for power backup solutions.',
            image: '',
            isActive: true,
            createdAt: '',
          },
          {
            _id: '2',
            name: 'Priya Sharma',
            location: 'Gurgaon',
            rating: 5,
            feedback:
              'We installed a 5KW solar system and our electricity bill dropped by 70%. The quality of panels and installation was top-notch. The team explained everything clearly.',
            image: '',
            isActive: true,
            createdAt: '',
          },
          {
            _id: '3',
            name: 'Amit Patel',
            location: 'Noida',
            rating: 4,
            feedback:
              'Great experience with PowerMax. Their battery backup solution keeps our office running smoothly during power cuts. Very reliable products and prompt service.',
            image: '',
            isActive: true,
            createdAt: '',
          },
          {
            _id: '4',
            name: 'Sunita Verma',
            location: 'Faridabad',
            rating: 5,
            feedback:
              'Best decision to go with PowerMax for our home solar installation. The 3KW system is performing beyond expectations. Their after-sales support is excellent.',
            image: '',
            isActive: true,
            createdAt: '',
          },
          {
            _id: '5',
            name: 'Vikram Singh',
            location: 'Ghaziabad',
            rating: 5,
            feedback:
              'Purchased a 2KVA inverter with battery backup for my shop. Works flawlessly during long power cuts. The installation was quick and the pricing was very competitive.',
            image: '',
            isActive: true,
            createdAt: '',
          },
          {
            _id: '6',
            name: 'Neha Gupta',
            location: 'New Delhi',
            rating: 4,
            feedback:
              'Very satisfied with the solar panel installation at our factory. The team was knowledgeable and completed the work on schedule. Would definitely recommend.',
            image: '',
            isActive: true,
            createdAt: '',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <>
      {/* Hero Section with Background Image */}
      <section className="relative py-16 md:py-24 overflow-hidden">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:`url(${HeroSection.src})`,
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Hero Content */}
        <div className="relative z-10 container-custom text-center">
          <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm text-blue-200 text-sm font-semibold rounded-full mb-4">
            Testimonials
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Customer <span className="text-cyan-400">Reviews</span>
          </h1>

          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            See what our customers have to say about their experience with
            PowerMax Solutions.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl h-64 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
                >
                  <Quote className="w-10 h-10 text-blue-200 mb-4" />

                  <p className="text-slate-600 leading-relaxed mb-6 italic">
                    &ldquo;{testimonial.feedback}&rdquo;
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold">
                        {testimonial.name.charAt(0)}
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">
                          {testimonial.name}
                        </h4>

                        <p className="text-xs text-slate-500">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= testimonial.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '4.8', label: 'Average Rating' },
              { value: '10,000+', label: 'Happy Customers' },
              { value: '98%', label: 'Would Recommend' },
              { value: '500+', label: '5-Star Reviews' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center border border-slate-100"
              >
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {stat.value}
                </div>

                <div className="text-sm text-slate-500">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
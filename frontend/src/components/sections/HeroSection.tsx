'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Zap, Sun, Battery } from 'lucide-react';
import { heroSlides } from '@/lib/data';

const icons = [Zap, Sun, Battery];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  const slide = heroSlides[currentSlide];
  const CurrentIcon = icons[currentSlide];

  return (
    <section className="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
         <AnimatePresence >
  <motion.div
    key={currentSlide}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8 }}
    className="absolute inset-0"
    style={{
      backgroundImage: `url(${slide.image.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} opacity-70`} />
  </motion.div>
</AnimatePresence>

      <div className="absolute inset-0 opacity-10" style={{
       
      }} />

      <div className="relative z-10 container-custom h-full flex items-center">
        <div className="max-w-3xl">
          <AnimatePresence >
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
                <CurrentIcon className="w-4 h-4" />
                <span>
                  {currentSlide === 0 && 'Power Backup Solutions'}
                  {currentSlide === 1 && 'Solar Energy Systems'}
                  {currentSlide === 2 && 'Commercial Solutions'}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 whitespace-pre-line">
                {slide.title}
              </h1>

              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl leading-relaxed">
                {slide.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={slide.ctaLink} className="btn-primary bg-white text-blue-900 hover:bg-blue-50 text-base">
                  {slide.cta}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link href={slide.secondaryCtaLink} className="btn-secondary bg-blue-900 border-white text-white hover:bg-white/10">
                  {slide.secondaryCta}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button onClick={prevSlide} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`}
            />
          ))}
        </div>
        <button onClick={nextSlide} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute top-20 right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-40 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
    </section>
  );
}

import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { Shield, Award, Users, Target, CheckCircle, Zap } from 'lucide-react';
import { companyInfo, brandPartners } from '@/lib/data';
import aboutHero from "@/assets/About/image1.png"

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about PowerMax Solutions - 15+ years of experience in power backup and solar energy solutions.',
};

export default function AboutPage() {
  return (
    <>

      {/* Hero */}
      <section 
       className="relative py-24 md:py-32 overflow-hidden"
        style={{
        backgroundImage: `url(${aboutHero.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
  }}
      >
         <div className="absolute inset-0 bg-black/20 z-0" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm text-blue-200 text-sm font-semibold rounded-full mb-6">
              About PowerMax Solutions
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Powering India&apos;s Future Since <span className="text-cyan-400">2010</span>
            </h1>
            <p className="text-xl text-blue-200 leading-relaxed">
              We are a leading provider of power backup systems, solar panels, and energy storage solutions, 
              committed to delivering reliable and sustainable energy solutions for homes and businesses.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-4">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Dedicated to <span className="text-gradient">Reliable Power</span>
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Founded in 2010, PowerMax Solutions started with a simple mission: to ensure that no home 
                or business in India suffers from power outages. What began as a small inverter dealership 
                has grown into a comprehensive power solutions provider serving thousands of customers 
                across Delhi NCR.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Today, we offer a complete range of products including pure sine wave inverters, tubular 
                batteries, lithium-ion storage systems, and high-efficiency solar panels. Our team of 
                certified technicians ensures every installation meets the highest standards of safety and performance.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, label: 'BIS Certified Products' },
                  { icon: Award, label: 'Industry Awards' },
                  { icon: Users, label: 'Expert Team' },
                  { icon: Target, label: 'Customer Focused' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-xl p-4">
                    <item.icon className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-slate-700">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-8 md:p-12">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                    <div className="text-3xl font-bold text-blue-600 mb-1">15+</div>
                    <div className="text-sm text-slate-500">Years Experience</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                    <div className="text-3xl font-bold text-blue-600 mb-1">10K+</div>
                    <div className="text-sm text-slate-500">Happy Customers</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                    <div className="text-3xl font-bold text-blue-600 mb-1">50+</div>
                    <div className="text-sm text-slate-500">Product Range</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                    <div className="text-3xl font-bold text-blue-600 mb-1">25+</div>
                    <div className="text-sm text-slate-500">Expert Technicians</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-4">
              Our Mission
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What Drives Us <span className="text-gradient">Every Day</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Reliable Power',
                desc: 'To provide uninterrupted power solutions that keep homes and businesses running 24/7, regardless of grid conditions.',
              },
              {
                icon: Target,
                title: 'Sustainable Energy',
                desc: "To accelerate India's transition to clean, renewable solar energy with affordable and efficient systems.",
              },
              {
                icon: Users,
                title: 'Customer First',
                desc: 'To build lasting relationships through exceptional service, honest advice, and products that truly meet customer needs.',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Partners */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-4">
              Trusted Partners
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Brands We <span className="text-gradient">Work With</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We partner with India&apos;s most trusted power and solar brands to ensure you get only genuine, certified products.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {brandPartners.map((partner, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-slate-900 text-sm">{partner.name}</h4>
                <p className="text-xs text-slate-500 mt-1">{partner.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Details */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our <span className="text-gradient">Commitment</span> to You
            </h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              'Genuine products with manufacturer warranties',
              'Free site assessment and consultation',
              'Professional installation by certified technicians',
              '24/7 customer support and emergency service',
              'Annual maintenance contracts available',
              'Transparent pricing with no hidden costs',
              'Easy EMI and financing options',
              'Post-installation performance monitoring',
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-slate-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

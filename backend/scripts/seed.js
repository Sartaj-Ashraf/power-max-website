const mongoose = require('mongoose');
const Product = require('../models/Product');
const Testimonial = require('../models/Testimonial');
const User = require('../models/User');
require('dotenv').config();

const connectDB = require('../config/db');

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Product.deleteMany();
    await Testimonial.deleteMany();
    await User.deleteMany();

    // Create admin user
    await User.create({
      name: 'Admin',
      email: process.env.ADMIN_EMAIL || 'admin@powermax.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'admin'
    });
    console.log('Admin user created');

    // Seed products
    const products = [
      {
        name: 'Luminous Cruze 3.5KVA',
        category: 'inverters',
        description: 'High capacity pure sine wave inverter with advanced LCD display and intelligent battery management.',
        shortDescription: '3.5KVA Pure Sine Wave Inverter',
        price: 28500,
        originalPrice: 32000,
        image: '',
        specifications: {
          'Capacity': '3.5KVA / 2800W',
          'Waveform': 'Pure Sine Wave',
          'Input Voltage': '180V - 260V',
          'Output Voltage': '230V ± 10%',
          'Frequency': '50Hz',
          'Battery Support': '12V x 2',
          'Efficiency': '> 85%',
          'Transfer Time': '< 10ms'
        },
        features: ['Pure Sine Wave', 'LCD Display', 'Overload Protection', 'Generator Compatible'],
        warranty: '2 Years',
        stock: 10,
        isFeatured: true
      },
      {
        name: 'Exide Invatubular 150AH',
        category: 'batteries',
        description: 'Long backup tubular battery with deep cycle technology and low maintenance design.',
        shortDescription: '150AH Tubular Battery',
        price: 18500,
        originalPrice: 21000,
        image: '',
        specifications: {
          'Capacity': '150AH',
          'Type': 'Tubular',
          'Voltage': '12V',
          'Warranty': '4 Years',
          'Backup Time': '4-6 Hours',
          'Weight': '52 kg'
        },
        features: ['Deep Cycle', 'Low Maintenance', 'Fast Charging', 'Long Life'],
        warranty: '4 Years',
        stock: 15,
        isFeatured: true
      },
      {
        name: 'Waaree 540W Mono PERC',
        category: 'solar-panels',
        description: 'High efficiency monocrystalline PERC solar panel with 25-year performance warranty.',
        shortDescription: '540W Mono PERC Panel',
        price: 22500,
        originalPrice: 25000,
        image: '',
        specifications: {
          'Wattage': '540W',
          'Type': 'Mono PERC',
          'Efficiency': '21.5%',
          'Dimensions': '2278 x 1134 x 35mm',
          'Weight': '28 kg',
          'Warranty': '25 Years'
        },
        features: ['High Efficiency', 'PID Resistant', 'Low Light Performance', '25yr Warranty'],
        warranty: '25 Years',
        stock: 20,
        isFeatured: true
      },
      {
        name: 'Microtek Hybrid 5KVA',
        category: 'inverters',
        description: 'Solar hybrid inverter with built-in MPPT charge controller and grid-tie capability.',
        shortDescription: '5KVA Solar Hybrid Inverter',
        price: 45000,
        originalPrice: 52000,
        image: '',
        specifications: {
          'Capacity': '5KVA / 4000W',
          'Type': 'Hybrid',
          'MPPT Voltage': '120V - 450V',
          'Max PV Input': '6000W',
          'Efficiency': '> 93%',
          'Battery': '48V'
        },
        features: ['MPPT Controller', 'Grid Tie', 'Battery Backup', 'WiFi Monitoring'],
        warranty: '3 Years',
        stock: 8,
        isFeatured: true
      },
      {
        name: 'Microtek E2 900VA',
        category: 'inverters',
        description: 'Compact home UPS inverter perfect for small homes and basic power backup needs.',
        shortDescription: '900VA Home UPS',
        price: 8500,
        originalPrice: 9500,
        image: '',
        specifications: {
          'Capacity': '900VA / 720W',
          'Waveform': 'Modified Sine Wave',
          'Input': '100V - 300V',
          'Battery': '12V Single'
        },
        features: ['Compact Design', 'Silent Operation', 'Auto Restart'],
        warranty: '2 Years',
        stock: 25,
        isFeatured: false
      },
      {
        name: 'Amaron 200AH Tall Tubular',
        category: 'batteries',
        description: 'Premium tall tubular battery with 5-year warranty and exceptional deep discharge recovery.',
        shortDescription: '200AH Tall Tubular',
        price: 22000,
        originalPrice: 25000,
        image: '',
        specifications: {
          'Capacity': '200AH',
          'Type': 'Tall Tubular',
          'Voltage': '12V',
          'Warranty': '5 Years',
          'Weight': '62 kg'
        },
        features: ['Deep Discharge Recovery', 'Low Water Loss', 'High Heat Tolerance'],
        warranty: '5 Years',
        stock: 12,
        isFeatured: false
      },
      {
        name: 'Adani 445W Bifacial',
        category: 'solar-panels',
        description: 'Bifacial solar panel that captures light from both sides for increased energy generation.',
        shortDescription: '445W Bifacial Panel',
        price: 18500,
        originalPrice: 21000,
        image: '',
        specifications: {
          'Wattage': '445W',
          'Type': 'Bifacial Mono',
          'Efficiency': '20.8%',
          'Bifacial Gain': 'Up to 25%',
          'Warranty': '25 Years'
        },
        features: ['Dual Side Generation', 'Higher Yield', 'Better Low Light'],
        warranty: '25 Years',
        stock: 30,
        isFeatured: false
      }
    ];

    await Product.insertMany(products);
    console.log('Products seeded');

    // Seed testimonials
    const testimonials = [
      {
        name: 'Rajesh Kumar',
        location: 'New Delhi',
        rating: 5,
        feedback: 'Excellent service! The inverter installation was seamless and the team was very professional. Highly recommended!',
        isActive: true
      },
      {
        name: 'Priya Sharma',
        location: 'Gurgaon',
        rating: 5,
        feedback: 'We installed a 5KW solar system and our electricity bill dropped by 70%. Top-notch quality and service.',
        isActive: true
      },
      {
        name: 'Amit Patel',
        location: 'Noida',
        rating: 4,
        feedback: 'Great experience with PowerMax. Their battery backup solution keeps our office running smoothly during power cuts.',
        isActive: true
      },
      {
        name: 'Sunita Verma',
        location: 'Faridabad',
        rating: 5,
        feedback: 'Best decision to go with PowerMax for our home solar installation. The 3KW system is performing beyond expectations.',
        isActive: true
      },
      {
        name: 'Vikram Singh',
        location: 'Ghaziabad',
        rating: 5,
        feedback: 'Purchased a 2KVA inverter with battery backup for my shop. Works flawlessly during long power cuts.',
        isActive: true
      }
    ];

    await Testimonial.insertMany(testimonials);
    console.log('Testimonials seeded');

    console.log('\nSeed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
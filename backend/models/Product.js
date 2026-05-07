const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['inverters', 'batteries', 'solar-panels'] 
  },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number, min: 0 },
  image: { type: String, default: '' },
  gallery: [{ type: String }],
  specifications: { type: Map, of: String, default: {} },
  features: [{ type: String }],
  warranty: { type: String, required: true },
  stock: { type: Number, default: 0, min: 0 },
  isFeatured: { type: Boolean, default: false },
}, {
  timestamps: true
});

productSchema.index({ category: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
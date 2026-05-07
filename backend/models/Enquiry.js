const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, trim: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['new', 'read', 'replied'], 
    default: 'new' 
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Enquiry', enquirySchema);
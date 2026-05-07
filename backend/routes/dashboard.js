const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Contact = require('../models/Contact');
const Enquiry = require('../models/Enquiry');
const Testimonial = require('../models/Testimonial');
const auth = require('../middleware/auth');

// GET dashboard stats (admin)
router.get('/stats', auth, async (req, res) => {
  try {
    const [totalProducts, totalContacts, totalEnquiries, totalTestimonials] = await Promise.all([
      Product.countDocuments(),
      Contact.countDocuments(),
      Enquiry.countDocuments(),
      Testimonial.countDocuments()
    ]);

    const [newContacts, newEnquiries, featuredProducts] = await Promise.all([
      Contact.countDocuments({ status: 'new' }),
      Enquiry.countDocuments({ status: 'new' }),
      Product.countDocuments({ isFeatured: true })
    ]);

    res.json({
      totalProducts,
      totalContacts,
      totalEnquiries,
      totalTestimonials,
      newContacts,
      newEnquiries,
      featuredProducts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET recent contacts
router.get('/recent-contacts', auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(10);
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET recent enquiries
router.get('/recent-enquiries', auth, async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(10);
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
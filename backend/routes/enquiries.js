const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');
const auth = require('../middleware/auth');

// POST enquiry (public)
router.post('/', async (req, res) => {
  try {
    const { productId, productName, name, email, phone, message } = req.body;

    if (!productId || !productName || !name || !phone || !message) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const enquiry = new Enquiry({ productId, productName, name, email, phone, message });
    await enquiry.save();
    res.status(201).json({ message: 'Enquiry submitted successfully', enquiry });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET all enquiries (admin)
router.get('/', auth, async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE enquiry status (admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
    res.json(enquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE enquiry (admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
    res.json({ message: 'Enquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
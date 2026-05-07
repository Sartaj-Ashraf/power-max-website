const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

// POST contact form (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !phone || !subject || !message) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const contact = new Contact({ name, email, phone, subject, message });
    await contact.save();
    res.status(201).json({ message: 'Contact form submitted successfully', contact });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET all contacts (admin)
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE contact status (admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE contact (admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
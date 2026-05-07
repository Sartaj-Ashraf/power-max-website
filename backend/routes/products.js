const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// GET all products (public)
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'all') {
      query.category = category;
    }
    if (search) {
      query.$text = { $search: search };
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET categories (public)
router.get('/categories', async (req, res) => {
  try {
    const categories = ['inverters', 'batteries', 'solar-panels'];
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single product (public)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE product (admin only)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const productData = { ...req.body };
    if (req.file) productData.image = `/uploads/${req.file.filename}`;
    if (req.body.specifications) productData.specifications = JSON.parse(req.body.specifications);
    if (req.body.features) productData.features = JSON.parse(req.body.features);

    const product = new Product(productData);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE product (admin only)
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.image = `/uploads/${req.file.filename}`;
    if (req.body.specifications) updateData.specifications = JSON.parse(req.body.specifications);
    if (req.body.features) updateData.features = JSON.parse(req.body.features);

    const product = await Product.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE product (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
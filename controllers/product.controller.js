const productService = require('../services/product.service');

const getProducts = (req, res) => {
  const products = productService.getAll();
  res.json(products);
};

const getProductById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  const product = productService.getById(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

const createProduct = (req, res) => {
  const { name, price } = req.body || {};
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ message: 'Product name is required' });
  }
  if (price === undefined || typeof price !== 'number' || price < 0) {
    return res.status(400).json({ message: 'Valid non-negative product price is required' });
  }

  const product = productService.create({ name: name.trim(), price });
  res.status(201).json(product);
};

const updateProduct = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  const { name, price } = req.body || {};
  const updates = {};
  if (name !== undefined) {
    if (typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ message: 'Product name must be a non-empty string' });
    }
    updates.name = name.trim();
  }
  if (price !== undefined) {
    if (typeof price !== 'number' || price < 0) {
      return res.status(400).json({ message: 'Product price must be a non-negative number' });
    }
    updates.price = price;
  }

  const product = productService.update(id, updates);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

const deleteProduct = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  const product = productService.remove(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};

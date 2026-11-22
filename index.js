const express = require('express');
const productRoutes = require('./routes/product.routes');

const app = express();
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Product API is running',
    endpoints: {
      getAllProducts: 'GET /products',
      getProductById: 'GET /products/:id',
      createProduct: 'POST /products',
      updateProduct: 'PUT /products/:id',
      partialUpdateProduct: 'PATCH /products/:id',
      deleteProduct: 'DELETE /products/:id'
    }
  });
});

// Routes
app.use('/products', productRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: err.message || 'Something went wrong'
  });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;

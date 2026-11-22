let products = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 }
];

module.exports = {
  getProducts: () => [...products],
  getProductById: (id) => {
    const numId = parseInt(id, 10);
    return products.find(p => p.id === numId) || null;
  },
  createProduct: (product) => {
    const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = { ...product, id: nextId };
    products.push(newProduct);
    return newProduct;
  },
  updateProduct: (id, data) => {
    const numId = parseInt(id, 10);
    const index = products.findIndex(p => p.id === numId);
    if (index !== -1) {
      products[index] = { ...products[index], ...data, id: numId };
      return products[index];
    }
    return null;
  },
  deleteProduct: (id) => {
    const numId = parseInt(id, 10);
    const index = products.findIndex(p => p.id === numId);
    if (index !== -1) {
      const deleted = products.splice(index, 1);
      return deleted[0];
    }
    return null;
  }
};

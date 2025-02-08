import React, { useState, useEffect } from 'react';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch('http://localhost:8080/api/products');
    const data = await response.json();
    setProducts(data);
  };

  const addProduct = () => {
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });
    fetchProducts();
  };

  return (
    <div>
      <h1>Storage Management</h1>
      <AddProduct onAdd={addProduct} />
      <ProductList products={products} onDelete={deleteProduct} />
    </div>
  );
};

export default App;

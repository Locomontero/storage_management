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
    await fetch(`http://localhost:8080/api/products/${id}`, {
      method: 'DELETE',
    });
    fetchProducts();
  };

  const updateProduct = () => {
    fetchProducts();
  };

  return (
      <div>
        <h1>Storage Management</h1>
        <div className="main-content">
          <AddProduct onAdd={addProduct} />
          <ProductList products={products} onDelete={deleteProduct} />
        </div>
        <footer>
          <div className="footer-content">
            <p>© 2025 QIMA Storage Management - All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
};

export default App;

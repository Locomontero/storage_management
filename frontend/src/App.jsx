import React, { useState, useEffect } from "react";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import EditProduct from "./components/EditProduct";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("http://localhost:8080/api/products");
    const data = await response.json();
    setProducts(data);
  };

  const addProduct = () => {
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:8080/api/products/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setIsEditing(false);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditing(true);
  };

  return (
    <div>
      <h1>Storage Management</h1>
      <div className="main-content">
        <AddProduct onAdd={addProduct} />
        <ProductList products={products} onDelete={deleteProduct} onEdit={handleEdit} />
      </div>
      <footer>
        <div className="footer-content">
          <p>© 2025 QIMA Storage Management - All rights reserved.</p>
        </div>
      </footer>

      {isEditing && (
        <EditProduct
          product={selectedProduct}
          onUpdate={updateProduct}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default App;

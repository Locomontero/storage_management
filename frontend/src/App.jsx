import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import EditProduct from "./components/EditProduct";
import LoginPage from "./components/LoginPage";
import LogoutPage from "./components/LogoutPage";
import ProtectedRoute from "./components/security/ProtectedRoute";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token não encontrado. Usuário não autenticado.");
      }

      const response = await fetch("http://localhost:8080/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(`Status da resposta: ${response.status}`);

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      const responseBody = await response.text();

      console.log("Resposta do servidor:", responseBody);

      if (contentType && contentType.includes("application/json")) {
        const data = JSON.parse(responseBody);
        setProducts(data);
      } else {
        console.error("Resposta não é JSON:", responseBody);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const addProduct = () => {
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:8080/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchProducts();
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div>
                <h1>Storage Management</h1>
                <div className="main-content">
                  <AddProduct onAdd={addProduct} />
                  <ProductList
                    products={products}
                    onDelete={deleteProduct}
                    onEdit={handleEdit}
                  />
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
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

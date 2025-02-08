import React, { useState, useEffect } from 'react';

const EditProduct = ({ product, onUpdate, onClose }) => {
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });

  useEffect(() => {
    setUpdatedProduct({ ...product });
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:8080/api/products/${updatedProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: updatedProduct.name,
        description: updatedProduct.description,
        price: parseFloat(updatedProduct.price),
        categoryPath: updatedProduct.categoryPath,
        available: updatedProduct.available,
        categoryId: updatedProduct.categoryId,
      }),
    });

    if (response.ok) {
      onUpdate();
      onClose();
    } else {
      console.error('Erro ao atualizar produto');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={updatedProduct.name} onChange={handleChange} />
          <textarea name="description" value={updatedProduct.description} onChange={handleChange} />
          <input type="number" name="price" value={updatedProduct.price} onChange={handleChange} />
          <input type="text" name="categoryPath" value={updatedProduct.categoryPath} onChange={handleChange} />
          <select name="available" value={updatedProduct.available} onChange={handleChange}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;

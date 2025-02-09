import React, { useState, useEffect } from "react";

const EditProduct = ({ product, onUpdate, onClose }) => {
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    if (product) {
      setUpdatedProduct({ ...product });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: name === "available" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!updatedProduct.id) {
      console.error("Erro: Product ID inexistent!");
      return;
    }

    const productToUpdate = {
      id: updatedProduct.id,
      name: updatedProduct.name,
      description: updatedProduct.description,
      price: updatedProduct.price ? parseFloat(updatedProduct.price) : 0,
      categoryPath: updatedProduct.categoryPath,
      available: updatedProduct.available,
      categoryId: updatedProduct.categoryId,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/products/${updatedProduct.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productToUpdate),
        }
      );

      if (!response.ok) {
        throw new Error("Error Updating product!");
      }

      const updatedProductFromServer = await response.json();

      await onUpdate(updatedProductFromServer);
      setIsModalOpen(false);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    onClose();
  };

  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={handleClose}>
          ×
        </button>
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={updatedProduct.name || ""}
            onChange={handleChange}
          />
          <textarea
            name="description"
            value={updatedProduct.description || ""}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            value={updatedProduct.price || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="categoryPath"
            value={updatedProduct.categoryPath || ""}
            onChange={handleChange}
          />
          <select
            name="available"
            value={updatedProduct.available ? "true" : "false"}
            onChange={handleChange}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;

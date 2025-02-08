import React, { useState, useEffect } from 'react';

const AddProduct = ({ onAdd }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    categoryPath: '',
    available: true,
    categoryId: 1,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        categoryPath: product.categoryPath,
        available: product.available,
        categoryId: product.categoryId,
      }),
    });

    if (response.ok) {
      onAdd(); // Update the product list
      setProduct({
        name: '',
        description: '',
        price: '',
        categoryPath: '',
        available: true,
        categoryId: 1,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
      />
      <input
        type="text"
        name="categoryPath"
        placeholder="Category Path"
        value={product.categoryPath}
        onChange={handleChange}
      />
      <select
        name="categoryId"
        value={product.categoryId}
        onChange={handleChange}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <select
        name="available"
        value={product.available}
        onChange={handleChange}
      >
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </select>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;

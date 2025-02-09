import React, { useState } from 'react';
import Popup from './Popup';

const AddProduct = ({ onAdd }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    categoryPath: '',
    available: true,
    categoryId: '',
  });

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);

  const categories = [
    { id: '4', name: 'Clothes', parentId: null },
    { id: '1', name: 'Electronics', parentId: null },
    { id: '4-1', name: 'T-shirts', parentId: '4' },
    { id: '4-2', name: 'Jeans', parentId: '4' },
    { id: '1-1', name: 'Mobile', parentId: '1' },
    { id: '1-2', name: 'Notebooks', parentId: '1' },
  ];

  const getCategoryPath = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    let path = category ? category.name : '';

    if (category && category.parentId) {
      const parentCategory = categories.find((cat) => cat.id === category.parentId);
      path = parentCategory ? `${parentCategory.name} > ${path}` : path;
    }

    return path;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => {
      const updatedProduct = {
        ...prev,
        [name]: value,
      };

      if (name === 'categoryId') {
        const categoryPath = getCategoryPath(value);
        updatedProduct.categoryPath = categoryPath;
      }

      return updatedProduct;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/api/products/save', {
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
      setPopupMessage('Product added successfully');
      setIsSuccess(true);
      onAdd();
    } else {
      setPopupMessage('Error adding product');
      setIsSuccess(false);
    }

    setShowPopup(true);
    setProduct({
      name: '',
      description: '',
      price: '',
      categoryPath: '',
      available: true,
      categoryId: '',
    });
  };

  return (
    <div>
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

        <select
          name="categoryId"
          value={product.categoryId}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {categories
            .filter((category) => !category.parentId)
            .map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>

        {product.categoryId && (
          <select
            name="subCategoryId"
            value={product.subCategoryId || ''}
            onChange={handleChange}
          >
            <option value="">Select Subcategory</option>
            {categories
              .filter((subCategory) => subCategory.parentId === product.categoryId)
              .map((subCategory) => (
                <option key={subCategory.id} value={subCategory.id}>
                  {subCategory.name}
                </option>
              ))}
          </select>
        )}

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

      {showPopup && (
        <Popup
          message={popupMessage}
          onClose={() => setShowPopup(false)}
          isSuccess={isSuccess}
        />
      )}
    </div>
  );
};

export default AddProduct;

import React, { useState } from 'react';
import EditProduct from './EditProduct';

const ProductList = ({ products, onDelete, onUpdate }) => {
  const [editingProduct, setEditingProduct] = useState(null);

  return (
    <div>
      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.categoryPath}</td>
                <td>{product.available ? 'Yes' : 'No'}</td>
                <td className="actions">
                  <button className="update-btn" onClick={() => setEditingProduct(product)}>Update</button>
                  <button className="delete-btn" onClick={() => onDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No products available</td>
            </tr>
          )}
        </tbody>
      </table>

      {editingProduct && (
        <EditProduct
          product={editingProduct}
          onUpdate={onUpdate}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductList;

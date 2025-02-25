import React from "react";

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Price</th>
          <th>Category</th>
          <th>Image</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td className="product-title">
              {product.title.length > 30
                ? product.title.slice(0, 30) + "..."
                : product.title}
            </td>
            <td className="product-price">${product.price}</td>
            <td className="product-category">{product.category}</td>
            <td>
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
            </td>
            <td className="product-description">
              {product.description.length > 50
                ? product.description.slice(0, 50) + "..."
                : product.description}
            </td>
            <td>
              <button className="edit-btn" onClick={() => onEdit(product)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => onDelete(product.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;

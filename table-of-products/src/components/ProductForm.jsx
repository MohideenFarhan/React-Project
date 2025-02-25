import React, { useState, useEffect } from "react";

const ProductForm = ({ editingProduct, categories, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });

  // Reset form when editingProduct changes
  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
    } else {
      setFormData({
        title: "",
        price: "",
        category: "",
        image: "",
        description: "",
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h3 className="modal-title">
          {editingProduct ? "Update Product" : "Add Product"}
        </h3>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="modal-input"
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="modal-input"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="modal-select"
        >
          <option value="">Select Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
          className="modal-input"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="modal-textarea"
        />

        <button type="submit" className="add-btn">
          {editingProduct ? "Update" : "Add"}
        </button>

        <button type="button" className="close-btn" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ProductForm;

import React, { useState, useEffect } from "react";

const InitialFormData = () => ({
  title: "",
  price: "",
  category: "",
  image: "",
  description: "",
});

const ProductForm = ({ editingProduct, categories, onSave, onCancel }) => {
  const [formData, setFormData] = useState(InitialFormData);

  useEffect(() => {
    setFormData(editingProduct || InitialFormData());
  }, [editingProduct]);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.price ||
      !formData.category ||
      !formData.image ||
      !formData.description
    ) {
      alert("Fill all the Fields!");
      return;
    }
    onSave(formData);
  };

  return (
    <section className="modal">
      <form id="form-field" onSubmit={handleSubmit}>
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
    </section>
  );
};

export default ProductForm;

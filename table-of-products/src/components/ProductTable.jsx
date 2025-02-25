import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import ProductSearch from "./ProductSearch";
import DeletePopup from "./DeletePopup";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productId, setProductId] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setProducts(data);
    setFilteredProducts(data);
  };

  const fetchCategories = async () => {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    const data = await res.json();
    setCategories(data);
  };

  const fetchProductById = async (id) => {
    if (!id) {
      setFilteredProducts(products);
      return;
    }
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!res.ok) {
        alert("Product not found!");
        return;
      }
      const data = await res.json();
      setFilteredProducts([data]);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleProductIdChange = (e) => {
    const id = e.target.value;
    setProductId(id);
    fetchProductById(id);
  };

  const handleAddOrUpdate = (newProduct) => {
    if (editingProduct) {
      const updatedProducts = products.map((p) =>
        p.id === editingProduct.id ? { ...editingProduct, ...newProduct } : p
      );
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
    } else {
      const newProd = { id: products.length + 1, ...newProduct };
      setProducts([...products, newProd]);
      setFilteredProducts([...filteredProducts, newProd]);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteProductId(id);
    setShowDeletePopup(true); // Ensure popup is shown
  };

  const handleDelete = () => {
    if (deleteProductId !== null) {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== deleteProductId)
      );
      setFilteredProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== deleteProductId)
      );
    }
    setShowDeletePopup(false);
  };

  return (
    <div className="container">
      <h1>Product Table</h1>

      <ProductSearch
        value={productId}
        onChange={handleProductIdChange}
        className="input-box"
      />

      <button
        className="addNew-btn"
        onClick={() => {
          setEditingProduct(null); // Reset editing product
          setShowForm(true);
        }}
      >
        Add New Product
      </button>

      {showForm && (
        <ProductForm
          editingProduct={editingProduct}
          categories={categories}
          onSave={handleAddOrUpdate}
          onCancel={() => setShowForm(false)}
          className="modal"
        />
      )}

      <ProductList
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      {showDeletePopup && (
        <DeletePopup
          onConfirm={handleDelete}
          onCancel={() => setShowDeletePopup(false)}
        />
      )}
    </div>
  );
};

export default ProductTable;

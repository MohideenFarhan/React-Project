import React, { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../apiConfig";
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

  const isProductsFetched = useRef(false);
  const isCategoriesFetched = useRef(false);

  // Generic fetch function
  const fetchData = async (endpoint, callback) => {
    try {
      const res = await fetch(`${BASE_URL}/${endpoint}`);
      if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
      const data = await res.json();
      callback(data);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    }
  };

  useEffect(() => {
    if (!isProductsFetched.current) {
      fetchData("", (data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
      isProductsFetched.current = true;
    }
    if (!isCategoriesFetched.current) {
      fetchData("categories", setCategories);
      isCategoriesFetched.current = true;
    }
  }, []);

  const fetchProductById = (id) => {
    if (!id) {
      setFilteredProducts(products);
      return;
    }
    fetchData(id, (data) => setFilteredProducts([data]));
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
    setShowDeletePopup(true);
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
    <main className="container">
      <h1>Product Table</h1>

      <ProductSearch
        value={productId}
        onChange={handleProductIdChange}
        className="input-box"
      />

      <button
        className="addNew-btn"
        onClick={() => {
          setEditingProduct(null);
          setShowForm(true);
        }}
      >
        Add Product
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
    </main>
  );
};

export default ProductTable;

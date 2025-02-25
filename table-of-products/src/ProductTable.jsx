// import React, { useEffect, useState } from "react";

// const ProductTable = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [productForm, setProductForm] = useState({
//     title: "",
//     price: "",
//     category: "",
//     image: "",
//     description: "",
//   });

//   const [deleteProductId, setDeleteProductId] = useState(null);
//   const [showDeletePopup, setShowDeletePopup] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [productId, setProductId] = useState("");

//   // Fetch products
//   const fetchProducts = async () => {
//     const res = await fetch("https://fakestoreapi.com/products");
//     const data = await res.json();
//     setProducts(data);
//     setFilteredProducts(data);
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, []);

//   // Fetch categories
//   const fetchCategories = async () => {
//     const res = await fetch("https://fakestoreapi.com/products/categories");
//     const data = await res.json();
//     setCategories(data);
//   };

//   // Fetch single product by ID
//   const fetchProductById = async (id) => {
//     if (!id) {
//       setFilteredProducts(products);
//       return;
//     }
//     try {
//       const res = await fetch(`https://fakestoreapi.com/products/${id}`);
//       if (!res.ok) {
//         alert("Product not found!");
//         return;
//       }
//       const data = await res.json();
//       setFilteredProducts([data]);
//     } catch (error) {
//       console.error("Error fetching product:", error);
//     }
//   };

//   // Handle input change for fetching product by ID
//   const handleProductIdChange = (e) => {
//     const id = e.target.value;
//     setProductId(id);
//     if (id) {
//       fetchProductById(id);
//     } else {
//       setFilteredProducts(products);
//     }
//   };

//   const handleChange = (e) => {
//     setProductForm({ ...productForm, [e.target.name]: e.target.value });
//   };

//   // Add or Update Product
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (editingProduct) {
//       const updatedProducts = products.map((p) =>
//         p.id === editingProduct.id ? { ...editingProduct, ...productForm } : p
//       );
//       setProducts(updatedProducts);
//       setFilteredProducts(updatedProducts);
//     } else {
//       const newProduct = {
//         id: products.length + 1,
//         ...productForm,
//       };
//       setProducts([...products, newProduct]);
//       setFilteredProducts([...filteredProducts, newProduct]);
//     }

//     setShowForm(false);
//     setEditingProduct(null);
//     setProductForm({
//       title: "",
//       price: "",
//       category: "",
//       image: "",
//       description: "",
//     });
//   };

//   // Edit Product
//   const handleEdit = (product) => {
//     setEditingProduct(product);
//     setProductForm(product);
//     setShowForm(true);
//   };

//   // Delete Product
//   const handleDelete = () => {
//     const updatedProducts = products.filter((p) => p.id !== deleteProductId);
//     setProducts(updatedProducts);
//     setFilteredProducts(updatedProducts);
//     setShowDeletePopup(false);
//   };

//   return (
//     <div className="container">
//       <h1>Product Table</h1>
//       <input
//         className="input-box"
//         type="number"
//         placeholder="Enter product ID"
//         value={productId}
//         onChange={handleProductIdChange}
//       />
//       <button
//         className="addNew-btn"
//         onClick={() => {
//           setProductForm({
//             title: "",
//             price: "",
//             category: "",
//             image: "",
//             description: "",
//           });
//           setEditingProduct(null);
//           setShowForm(true);
//         }}
//       >
//         Add New Product
//       </button>

//       {showForm && (
//         <div className="modal">
//           <form onSubmit={handleSubmit}>
//             <h3>{editingProduct ? "Update Product" : "Add Product"}</h3>
//             <input
//               type="text"
//               name="title"
//               value={productForm.title}
//               onChange={handleChange}
//               placeholder="Title"
//               required
//             />
//             <input
//               type="number"
//               name="price"
//               value={productForm.price}
//               onChange={handleChange}
//               placeholder="Price"
//               required
//             />
//             <select
//               name="category"
//               value={productForm.category}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select Category</option>
//               {categories.map((category, index) => (
//                 <option key={index} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="text"
//               name="image"
//               value={productForm.image}
//               onChange={handleChange}
//               placeholder="Image URL"
//               required
//             />
//             <textarea
//               name="description"
//               value={productForm.description}
//               onChange={handleChange}
//               placeholder="Description"
//               required
//             />
//             <button className="add-btn" type="submit">
//               {editingProduct ? "Update" : "Add"}
//             </button>
//             <button type="button" onClick={() => setShowForm(false)}>
//               Cancel
//             </button>
//           </form>
//         </div>
//       )}

//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Title</th>
//             <th>Price</th>
//             <th>Category</th>
//             <th>Image</th>
//             <th>Description</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredProducts.map((product) => (
//             <tr key={product.id}>
//               <td>{product.id}</td>
//               <td>
//                 {product.title.length > 30
//                   ? product.title.slice(0, 30) + "..."
//                   : product.title}
//               </td>
//               <td>${product.price}</td>
//               <td>{product.category}</td>
//               <td>
//                 <img src={product.image} alt={product.title} width="50" />
//               </td>
//               <td>
//                 {product.description.length > 50
//                   ? product.description.slice(0, 50) + "..."
//                   : product.description}
//               </td>
//               <td>
//                 <button
//                   className="edit-btn"
//                   onClick={() => handleEdit(product)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="delete-btn"
//                   onClick={() => {
//                     setDeleteProductId(product.id);
//                     setShowDeletePopup(true);
//                   }}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {showDeletePopup && (
//         <div className="popup">
//           <p>Are you sure you want to delete this product?</p>
//           <button className="delete-popup" onClick={handleDelete}>
//             Delete
//           </button>
//           <button
//             className="cancel-popup"
//             onClick={() => setShowDeletePopup(false)}
//           >
//             Cancel
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductTable;

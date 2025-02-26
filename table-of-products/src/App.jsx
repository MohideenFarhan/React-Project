import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import ProductTable from "./components/ProductTable";

function App() {
  return (
    <main>
      <ProductTable />
    </main>
  );
}

export default App;

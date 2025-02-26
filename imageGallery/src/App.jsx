import React, { useState, useEffect } from "react";
import Slider from "./components/slider";
import Gallery from "./components/gallery";
import "./App.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setImages(data.map((product) => product.image)));
  }, []);

  return (
    <div className="container">
      <Slider images={images} index={index} setIndex={setIndex} />
      <Gallery images={images} index={index} setIndex={setIndex} />
    </div>
  );
};

export default App;

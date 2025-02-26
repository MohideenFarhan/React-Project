import React, { useState, useEffect } from "react";
import Slider from "./components/slider";
import Gallery from "./components/gallery";
import "./App.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch images");

        const data = await res.json();
        const imageUrls = data.map((product) => product.image);

        if (imageUrls.length === 0) throw new Error("No images available");

        setImages(imageUrls);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <main className="container">
      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !error && images.length > 0 ? (
        <>
          <Slider images={images} index={index} setIndex={setIndex} />
          <Gallery images={images} index={index} setIndex={setIndex} />
        </>
      ) : (
        !loading && !error && <p>No images available</p>
      )}
    </main>
  );
};

export default App;

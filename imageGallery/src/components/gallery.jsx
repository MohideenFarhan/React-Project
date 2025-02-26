import React, { useState, useEffect } from "react";

const Gallery = ({ images, index, setIndex }) => {
  const [galleryIndex, setGalleryIndex] = useState(0);

  const updateGallery = (newGalleryIndex) => {
    const newIndex = Math.max(0, Math.min(newGalleryIndex, images.length - 1));
    setGalleryIndex(newIndex);
    setIndex(newIndex);
  };

  useEffect(() => {
    if (index < galleryIndex || index >= galleryIndex + 4) {
      setGalleryIndex(Math.floor(index / 4) * 4);
    }
  }, [index, galleryIndex]);

  const visibleImages = images.slice(galleryIndex, galleryIndex + 4);

  return (
    <section className="gallery">
      <button
        id="gallery-prev"
        onClick={() => updateGallery(galleryIndex - 4)}
        disabled={galleryIndex === 0}
      >
        &#10094;
      </button>

      <figure id="gallery-container">
        {visibleImages.map((img, i) => (
          <img
            key={i}
            src={img}
            className={`gallery-img ${
              index === galleryIndex + i ? "active-img" : ""
            }`}
            onClick={() => setIndex(galleryIndex + i)}
            alt="Gallery"
          />
        ))}
      </figure>

      <button
        id="gallery-next"
        onClick={() => updateGallery(galleryIndex + 4)}
        disabled={galleryIndex + 4 >= images.length}
      >
        &#10095;
      </button>
    </section>
  );
};

export default Gallery;

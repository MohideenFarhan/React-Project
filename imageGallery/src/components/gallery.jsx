import React, { useState } from "react";

const Gallery = ({ images, index, setIndex }) => {
  const [galleryIndex, setGalleryIndex] = useState(0);

  const updateGallery = (newGalleryIndex) => {
    setGalleryIndex(newGalleryIndex);
    setIndex(newGalleryIndex);
  };

  return (
    <div className="gallery">
      <button
        id="gallery-prev"
        onClick={() => galleryIndex > 0 && updateGallery(galleryIndex - 4)}
      >
        &#10094;
      </button>

      <div id="gallery-container">
        {images.slice(galleryIndex, galleryIndex + 4).map((img, i) => (
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
      </div>

      <button
        id="gallery-next"
        onClick={() =>
          galleryIndex + 4 < images.length && updateGallery(galleryIndex + 4)
        }
      >
        &#10095;
      </button>
    </div>
  );
};

export default Gallery;

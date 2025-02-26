import React from "react";

const Slider = ({ images, index, setIndex }) => {
  if (!images.length) return <p>Loading...</p>;

  const showImage = (n) => {
    let newIndex = (n + images.length) % images.length;
    setIndex(newIndex);
  };

  return (
    <div className="slider-container">
      <button className="lightbox-prev" onClick={() => showImage(index - 1)}>
        &#10094;
      </button>
      <img id="slider-img" src={images[index]} alt="Slider" />
      <button className="lightbox-next" onClick={() => showImage(index + 1)}>
        &#10095;
      </button>
    </div>
  );
};

export default Slider;

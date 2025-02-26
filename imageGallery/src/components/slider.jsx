import React from "react";

const Slider = ({ images, index, setIndex }) => {
  if (!images.length) return <p>Loading...</p>;

  const showImage = (newIndex) => {
    setIndex((prevIndex) => (newIndex + images.length) % images.length);
  };

  return (
    <section className="slider-container">
      <button
        className="lightbox-prev"
        onClick={() => showImage(index - 1)}
        disabled={index === 0}
      >
        &#10094;
      </button>

      <figure>
        <img id="slider-img" src={images[index]} alt="Slider" />
      </figure>

      <button
        className="lightbox-next"
        onClick={() => showImage(index + 1)}
        disabled={index === images.length - 1}
      >
        &#10095;
      </button>
    </section>
  );
};

export default Slider;

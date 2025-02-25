import React from "react";

const ProductSearch = ({ value, onChange }) => {
  return (
    <input
      className="input-box"
      type="number"
      placeholder="Enter product ID"
      value={value}
      onChange={onChange}
    />
  );
};

export default ProductSearch;

import React from "react";

const DeletePopup = ({ onConfirm, onCancel }) => {
  return (
    <section className="popup">
      <p>Are you sure you want to delete this product?</p>

      <button className="delete-popup" onClick={onConfirm}>
        Delete
      </button>

      <button className="close-btn" onClick={onCancel}>
        Cancel
      </button>
    </section>
  );
};

export default DeletePopup;

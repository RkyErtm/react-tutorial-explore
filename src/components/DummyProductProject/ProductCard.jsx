import React, { useState } from "react";
import "../../css/product.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";

function ProductCard({ product, onToggleFavorite, isFavorite }) {
  return (
    <div className="product-card">
      <button
        className="product-favorite"
        onClick={() => onToggleFavorite(product.id)}
      >
        {isFavorite ? <FaHeart /> : <FaRegHeart />}
      </button>
      <img
        className="product-image"
        src={product.thumbnail}
        alt={product.title}
      />
      <div className="product-info">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-description">{product.description}</p>
        <div className="product-details">
          <p className="product-price">${product.price.toFixed(2)}</p>
          {product.brand && (
            <span className="product-brand">{product.brand}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

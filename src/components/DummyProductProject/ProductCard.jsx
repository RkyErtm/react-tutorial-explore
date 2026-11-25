import React from "react";
import "../../css/product.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">
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

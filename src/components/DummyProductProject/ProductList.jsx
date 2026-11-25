import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "../../css/product.css";

let BASE_URL = import.meta.env.VITE_DUMMY_URL;

function ProductList() {
  // States
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  // Filtered list
  const visibleProducts = showFavorites
    ? products.filter((product) => favorites.includes(product.id))
    : products;

  // Add / remove favorite
  const toggleFavorite = (id) => {
    setFavorites(
      favorites.includes(id)
        ? favorites.filter((favId) => favId !== id)
        : [...favorites, id],
    );
  };

  // API call
  const getProducts = async () => {
    setLoading(true);
    try {
      if (searchTerm) {
        const resp = (
          await axios.get(`${BASE_URL}/products/search?q=${searchTerm}`)
        ).data;
        setProducts(resp.products);
      } else {
        const resp = (await axios.get(`${BASE_URL}/products?limit=10`)).data;
        setProducts(resp.products);
      }
    } catch (err) {
      setError(err ? err.message : "Unexpected Error");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Search with delay
  useEffect(() => {
    const timer = setTimeout(getProducts, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="product-page">
      <header className="product-header">
        <h1>Product List</h1>
      </header>
      {/* Search */}
      <input
        className="product-search"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* All / Favorites toggle */}
      <div className="product-filter">
        <button
          className={`product-filter-button ${!showFavorites ? "active" : ""}`}
          onClick={() => setShowFavorites(false)}
        >
          All
        </button>
        <button
          className={`product-filter-button ${showFavorites ? "active" : ""}`}
          onClick={() => setShowFavorites(true)}
        >
          Favorites
        </button>
      </div>
      {/* Status messages */}
      {loading && <p className="product-status">Loading...</p>}
      {error && <p className="product-status error">Error: {error}</p>}
      {showFavorites && visibleProducts.length === 0 && (
        <p className="product-status">No favorites yet</p>
      )}
      {/* ProductCard area */}
      <div className="product-grid">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favorites.includes(product.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;

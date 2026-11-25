import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "../../css/product.css";

let BASE_URL = import.meta.env.VITE_DUMMY_URL;

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const timer = setTimeout(getProducts, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="product-page">
      <header className="product-header">
        <h1>Product List</h1>
      </header>
      <input
        className="product-search"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading && <p className="product-status">Loading...</p>}
      {error && <p className="product-status error">Error: {error}</p>}
      <div className="product-grid">
        {products
          ? products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          : null}
      </div>
    </div>
  );
}

export default ProductList;

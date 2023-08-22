import React from "react";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    fetch(process.env.REACT_APP_URL)
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products);
        console.log(res.products);
      });
  };
  return (
    <>
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-md-4">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

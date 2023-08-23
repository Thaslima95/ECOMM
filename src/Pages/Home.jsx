import React from "react";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useParams, useSearchParams } from "react-router-dom";

export default function Home() {
  const val = useParams().Electronics;
  console.log(val);
  const [products, setProducts] = useState([]);
  const [searchparam] = useSearchParams();
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
  let searchTerm = searchparam.get("search");
  console.log(searchparam.get("search"));
  return (
    <>
      <div className="container">
        <div className="row">
          {val
            ? products
                .filter(({ title, category }) =>
                  category.toLowerCase().includes(val)
                )
                .filter(
                  ({ title }) =>
                    !searchTerm || title.toLowerCase().includes(searchTerm)
                )
                .map((product) => (
                  <div key={product.id} className="col-md-4">
                    <ProductCard product={product} />
                  </div>
                ))
            : products
                .filter(
                  ({ title }) =>
                    !searchTerm || title.toLowerCase().includes(searchTerm)
                )
                .map((product) => (
                  <div key={product.id} className="col-md-4">
                    <ProductCard product={product} />
                  </div>
                ))}
        </div>
      </div>
    </>
  );
}

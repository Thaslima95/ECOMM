import React from "react";
import { useState, useEffect } from "react";
import SingleProduct from "./SingleProduct";
import { useParams } from "react-router-dom";

function Products() {
  const id = useParams().id;
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(process.env.REACT_APP_URL)
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products);
        console.log(res.products);
      });
  }, []);
  return (
    <>
      {products &&
        products.map((e) => {
          if (e.id == id) {
            return (
              <>
                <div className="container-fluid">
                  <div className="row pt-4 ">
                    <SingleProduct product={e} />
                  </div>
                </div>
              </>
            );
          }
        })}
    </>
  );
}

export default Products;

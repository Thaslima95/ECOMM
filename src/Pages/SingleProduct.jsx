import React from "react";
import { Card, Tabs } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductListItems from "./ProductListItems";
import { useState, useEffect } from "react";

const SingleProduct = ({ product }) => {
  const [cart, setCart] = useState([]);
  const [localcart, setLocalcart] = useState([]);
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("mycart")) || [];
    setLocalcart(savedTodos);
  }, []);
  console.log(product);
  const { images, title, thumbnail, stock } = product;
  console.log(title);
  const addtoCart = () => {
    console.log(product);
    setLocalcart([...localcart, product]);
    console.log(localcart);
    localStorage.setItem("mycart", JSON.stringify([...localcart, product]));
  };

  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((i, idx) => {
                return (
                  <div style={{ height: "500px" }}>
                    <img src={i} key={idx} />{" "}
                  </div>
                );
              })}
          </Carousel>
        ) : (
          <Card
            cover={<img src={thumbnail} className="mb-3 card-image" />}
          ></Card>
        )}
      </div>

      <div className="col-md-5">
        <h1 className=" p-3">{title}</h1>
        <Card
          actions={[
            <>
              <ShoppingCartOutlined
                className="text-success"
                onClick={() => addtoCart()}
              />{" "}
              <br />
              Add to Cart
            </>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};
export default SingleProduct;

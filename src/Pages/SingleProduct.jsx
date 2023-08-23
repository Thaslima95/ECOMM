import React from "react";
import { Card } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductListItems from "./ProductListItems";
import { useState, useEffect } from "react";

const SingleProduct = ({ product }) => {
  const user = JSON.parse(localStorage.getItem("userlogin"));
  const { id, images, title, thumbnail, brand, price, description, stock } =
    product;
  const [cartadd, setCartadd] = useState(false);
  const [localcart, setLocalcart] = useState([]);
  const [usercart, setUserCart] = useState({
    id: 0,
    title: "",
    brand: "",
    price: "",
    count: 0,
  });

  useEffect(() => {
    const savedcart = JSON.parse(localStorage.getItem(user)) || [];
    setLocalcart(savedcart);
    console.log(localcart);
    savedcart.find((e) => {
      if (e.id == id) {
        console.log("cart inside");
        setCartadd(e.id == id);
      }
    });
    console.log("useEffect");
  }, [usercart, id]);

  const addtoCart = () => {
    setCartadd(true);
    localStorage.setItem(
      "cartstatus",
      JSON.stringify({ productid: id, status: cartadd })
    );
    if (localcart.length == 0) {
      setUserCart({
        id: id,
        title: title,
        brand: brand,
        price: price,
        count: usercart.count + 1,
      });
      console.log(usercart);
      localStorage.setItem(
        user,
        JSON.stringify([
          ...localcart,
          {
            id: id,
            title: title,
            brand: brand,
            price: price,
            count: usercart.count + 1,
          },
        ])
      );
    } else {
      console.log(localcart);
      if (localcart.find((e) => e.id == id)) {
        localcart.forEach((e) => {
          if (e.id == id) {
            e.count = e.count + 1;
          }
        });
        console.log(localcart);
        localStorage.setItem(user, JSON.stringify([...localcart]));
      } else {
        localStorage.setItem(
          user,
          JSON.stringify([
            ...localcart,
            {
              id: id,
              title: title,
              brand: brand,
              price: price,
              count: usercart.count + 1,
            },
          ])
        );
      }
    }
  };

  return (
    <>
      {console.log(cartadd)}
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
              {cartadd ? "Go to Cart" : "Add to Cart"}
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

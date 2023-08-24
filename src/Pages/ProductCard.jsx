import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const { Meta } = Card;

function ProductCard({ product }) {
  const { id, images, title, description, thumbnail } = product;
  const [cart, setCart] = useState([]);
  const [localcart, setLocalcart] = useState([]);
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("mycart")) || [];
    setLocalcart(savedTodos);
  }, []);

  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0] : thumbnail}
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1"
        />
      }
      actions={[
        <Link to={`/product/${id}`}>
          <EyeOutlined className="text-warning" /> <br /> View Product
        </Link>,
        <a>
          <ShoppingCartOutlined className="text-success" /> <br /> Add to Cart
        </a>,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
}

export default ProductCard;

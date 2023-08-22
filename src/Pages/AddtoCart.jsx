import React from "react";

export default function AddtoCart({ product }) {
  const [cart, setCart] = useState([]);
  const [localcart, setLocalcart] = useState([]);
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("mycart")) || [];
    setLocalcart(savedTodos);
  }, []);
  const addtoCart = (product) => {
    console.log(product);
    setLocalcart([...localcart, product]);
    console.log(localcart);
    localStorage.setItem("mycart", JSON.stringify(localcart));
  };
  return <div>AddtoCart</div>;
}

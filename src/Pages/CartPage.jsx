import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function CartPage() {
  let user = JSON.parse(localStorage.getItem("userlogin"));
  let cart = user && JSON.parse(localStorage.getItem(user));
  let totalcart = cart && cart.map((e) => e.price * e.count);
  console.log(totalcart);
  let total = totalcart && totalcart.reduce((prev, curr) => prev + curr);
  console.log(total);
  const showCartItems = () => (
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Price</th>
          <th>Brand</th>
          <th>Count</th>
          <th>Remove</th>
        </tr>
      </thead>
    </table>
  );

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart / {cart && cart.length} Product</h4>

          {!cart ? (
            <p>
              No products in cart. <Link to="/">Continue Shopping.</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart &&
            cart.map((e, i) => (
              <div key={i}>
                <p>
                  {e.title} x {e.count} = ${e.price * e.count}
                </p>
              </div>
            ))}
          <hr />
          <p>Total:${total}</p>
          <hr />
          {user ? (
            <Button variant="primary" type="submit">
              Proceed to Checkout
            </Button>
          ) : (
            <Button variant="primary" type="submit">
              Login to Checkout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

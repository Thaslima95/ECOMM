import React from "react";

function ProductListItems({ product }) {
  return (
    <ul className="list-group">
      {Object.keys(product).map((e, idx, arr) => {
        if (
          e == "price" ||
          e == "rating" ||
          e == "category" ||
          e == "brand" ||
          e == "stock"
        )
          return (
            <>
              <li className="list-group-item">
                {e[0].toUpperCase() + e.slice(1)} <span> {product[e]}</span>
              </li>
            </>
          );
      })}
    </ul>
  );
}

export default ProductListItems;

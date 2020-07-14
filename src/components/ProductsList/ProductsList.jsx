import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../../store/products";

const ProductsList = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.entities.products.list);

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  return (
    <div>
      {products.map((product) => {
        return (
          <div key={product.id}>
            {product.id} | {product.title}
          </div>
        );
      })}
    </div>
  );
};

export default ProductsList;

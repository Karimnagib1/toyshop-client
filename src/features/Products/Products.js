/* eslint-disable react-hooks/rules-of-hooks */
import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductsByCategory,
  selectFilteredProducts,
  selectProductsStatus,
  clearProducts,
  getProducts,
} from "./ProductsSlice";
import ProductsList from "../../components/ProductsList/ProductsList";
import Loading from "../../components/Loading/Loading";
import "./Products.css";
import { useParams } from "react-router-dom";
import FilterProducts from "../FilterProducts/FilterProducts";

const Products = () => {
  const dispatch = useDispatch();
  const filteredProducts = useSelector(selectFilteredProducts);

  const status = useSelector(selectProductsStatus);
  const params = useParams();

  // To get Categories
  useEffect(() => {
    if (params.category) {
      dispatch(getProductsByCategory(params.category));
    } else {
    dispatch(getProducts());
    }
    return () => {
      dispatch(clearProducts());
    };
  }, [dispatch, params.category]);

  useEffect(() => {
    const myNav = document.getElementById("mynav");
    myNav.classList.add("nav-colored");
    myNav.classList.remove("nav-transparent");
  }, []);

  return (
    <div className="products">
      <h2 className="section-title">Products</h2>
      {status === "pending"   && <Loading />}
      {status === "fulfilled" && (
        <div className="wrap-products" >
          <FilterProducts />
          <ProductsList products={filteredProducts} />
        </div>
      )}
      {status === "rejected"  && (
        <div className="error">Something went wrong!</div>
      )}
    </div>
  );
};

export default Products;
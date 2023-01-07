import React from "react";
import { addToCart } from "../../features/Cart/CartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(addToCart(product.id));
    navigate("/cart");
  };
  return (
    <div className="card">
      <h1 className="title">{product.title}</h1>
      <div className="image-wrap">
        <img className="card-img" src={product.thumbnail} alt="productImage" />
      </div>
      <p className="price">{(product.price - product.price * product.discountPercentage/100).toFixed(2)}$ <small><s>{product.price}$</s></small></p>
      <p className="description">{product.description}</p>
      <div className="card_actions">
        <button className="btn" onClick = {handleClick}>Add to Cart</button>
        <button className="btn">Buy Now</button>
      </div>
    </div>
  );
};

export default ProductCard;

import React from 'react';

import {addToCart, removeFromCart} from './CartSlice';
import {useDispatch} from 'react-redux';
import './Cart.css';
const CartItemCard = ({item}) => {
    const dispatch = useDispatch();
    const handleMinusClick = () => {
        dispatch(removeFromCart(item.id));
    }
    const handlePlusClick = () => {
        dispatch(addToCart(item.id));
    }
    return (
        <div className = "cartItem" key = {item.id}>
        <img className = 'product_img' src = {item.thumbnail} alt= "Item"></img>
        <div className='title_col'>
            <p className = 'item_title'>{item.title}</p>
        </div>
        <div className='price_col'>
            <p className = 'item_price'>{(item.price - item.price * item.discountPercentage/100).toFixed(2)}$</p>
        </div>
        <p className = 'item_quantity'>Quantity: {item.quantity}</p>

        <div className='buttons'>
            <button className = "button" onClick = {handlePlusClick}>+</button>
            <button className = "button" onClick={handleMinusClick}>-</button>
        </div>
    </div>
    );
};

export default CartItemCard;
import {React, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectCartItems, selectCartStatus} from './CartSlice';
import {getCart} from './CartSlice';
import Loading from '../../components/Loading/Loading';
import CartItemCard from './CartItemCard';
import './Cart.css';
const Cart = () => {

    const cartItems = useSelector(selectCartItems);
    const cartStatus = useSelector(selectCartStatus);
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);
    return (
        <div id='cart'>
            {cartStatus === 'pending' && <Loading />}
            { cartStatus === 'fulfilled' && cartItems.map(item => {
                return (
                   <CartItemCard item = {item} key = {item.id} />
                );
            })
            }
            {cartStatus === 'rejected' && (<div>Something went wrong!</div>)}
            {cartStatus === 'fulfilled' && cartItems.length === 0 && (<div className = "empty-text">Cart is empty</div>)}
        </div>
    );
};

export default Cart;

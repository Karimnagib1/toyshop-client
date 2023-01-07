import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';



export const getCart = createAsyncThunk('cart/getCart', async () => {
    const response = await axios.get('https://toyshop-ekqp.onrender.com/carts');
    console.log(response.data.cart);
    if (response.status === 200) {
        console.log(response.data.cart);
        return response.data.cart;
    }
    else {
        return [];
    }
});

export const addToCart = createAsyncThunk('cart/addToCart', async (productId) => {   
    const response = await axios.post('https://toyshop-ekqp.onrender.com/carts/add-to-cart', {productId: productId});
    if (response.status === 200) {
        return response.data.cart;
    }
    else {
        return [];
    }
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productId) => { 
    const response = await axios.post('https://toyshop-ekqp.onrender.com/carts/remove-from-cart', {productId: productId});
    
    if (response.status === 200) {
        return response.data.cart;
    }
    else {
        return [];
    }

});



const cart = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        status: 'pending',

    },
    reducers: {
        clearCart: (state, action) => {
            state.cartItems = [];
            state.status = 'pending';
        },

    },
    extraReducers: builder => {
        builder
        .addCase(getCart.fulfilled, (state, action) => {
            state.cartItems = action.payload;
            state.status = 'fulfilled';
        })
        .addCase(getCart.pending, (state, action) => {
            state.status = 'pending';
        })
        .addCase(getCart.rejected, (state, action) => {
            state.status = 'rejected';
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            state.cartItems = action.payload;
            state.status = 'fulfilled';
        })
        .addCase(addToCart.pending, (state, action) => {
            state.status = 'pending';
        })
        .addCase(addToCart.rejected, (state, action) => {
            state.status = 'rejected';
        })
        .addCase(removeFromCart.fulfilled, (state, action) => {
            state.cartItems = action.payload;
            state.status = 'fulfilled';
        })
        .addCase(removeFromCart.pending, (state, action) => {
            state.status = 'pending';
        })
        .addCase(removeFromCart.rejected, (state, action) => {
            state.status = 'rejected';
        })

    }
});


export const selectCartItems = state => state.cart.cartItems;
export const selectCartStatus = state => state.cart.status;

export const {clearCart} = cart.actions;
export default cart.reducer;
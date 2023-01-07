import { createSlice } from "@reduxjs/toolkit";



const user = createSlice({
    name: 'user',
    initialState: {
        isAuthenticated: false,
        user: {}
    },
    reducers: {
        authUser: (state, {payload}) =>{
            state.isAuthenticated = true;
            console.log(payload);
            state.user = payload;

        },
        logout: (state, {payload}) => {
            state.isAuthenticated = false;
            state.user = {};
        }
    }
})
export const selectUser = state => {
    return state.user.user;
}
export const selectIsAuthenticated = state => {
    return state.user.isAuthenticated;
}


export const {authUser, logout} = user.actions;
export default user.reducer; 

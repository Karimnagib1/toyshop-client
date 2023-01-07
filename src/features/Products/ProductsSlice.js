import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (term = "") => {
    if (term === "") {
      let products = await fetch("https://toyshop-ekqp.onrender.com/products");
      products = await products.json();

      return products.products;
    } else {
      let products = await fetch(
        `https://toyshop-ekqp.onrender.com/products/search?q=${term}`
      );
      products = await products.json();
      return products.products;
    }
  }
);

export const getProductsByCategory = createAsyncThunk(
  "products/getProductsByCategory",
  async (term) => {
    let products = await fetch(
      `https://toyshop-ekqp.onrender.com/products/category/${term}`
    );

    products = await products.json();
    return products.products;
  }
);

const products = createSlice({
  name: "products",
  initialState: {
    products: [],
    filteredProducts: [],
    status: "pending",
  },
  reducers: {
    clearProducts: (state, action) => {
      state.products = [];
      state.status = "pending";
    },
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
      state.status = "fulfilled";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, { payload }) => {
      

        state.products = payload;
        state.filteredProducts = payload;

        state.status = "fulfilled";
      })
      .addCase(getProducts.pending, (state, { payload }) => {
        state.status = "pending";
      })
      .addCase(getProducts.rejected, (state, { payload }) => {
        state.status = "rejected";
      })
      .addCase(getProductsByCategory.fulfilled, (state, { payload }) => {
        state.filteredProducts = payload;
        state.status = "fulfilled";
      })
      .addCase(getProductsByCategory.pending, (state, { payload }) => {
        state.status = "pending";
      })
      .addCase(getProductsByCategory.rejected, (state, { payload }) => {
        state.status = "rejected";
      });
  },

});

export const selectProducts = (state) => {
  return state.products.products;
};
export const selectFilteredProducts = (state) => {
  return state.products.filteredProducts;
};
export const selectProductsStatus = (state) => {
  return state.products.status;
};

export const { clearProducts, setFilteredProducts } = products.actions;
export default products.reducer;

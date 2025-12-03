import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

// ===== GET ALL PRODUCTS =====
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await axios.get(API_URL);
    return res.data;
  }
);

// ===== ADD PRODUCT =====
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (newProduct, { getState }) => {
    const token = getState().auth.token;

    const res = await axios.post(API_URL, newProduct, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.product;
  }
);

// ===== DELETE PRODUCT =====
export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (id, { getState }) => {
    const token = getState().auth.token;

    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return id;
  }
);

// ===== UPDATE PRODUCT =====
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product, { getState }) => {
    const token = getState().auth.token;

    const res = await axios.put(`${API_URL}/${product._id}`, product, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data.updated;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })

      .addCase(removeProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p._id !== action.payload);
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        const updated = action.payload;
        const i = state.items.findIndex((p) => p._id === updated._id);
        if (i !== -1) state.items[i] = updated;
      });
  },
});


export default productsSlice.reducer;


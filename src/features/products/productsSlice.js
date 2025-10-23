import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Используем большое число для гарантированной уникальности новых ID
let nextId = 1000;

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("/products.json");
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // 💡 ФУНКЦИОНАЛ ДОБАВЛЕНИЯ ТОВАРА
    addProduct: (state) => {
      const newProduct = {
        id: nextId++, // Уникальный ID
        title: `Новый Товар #${nextId - 1000}`,
        price: 99.0,
        image: `https://placehold.co/150x150?text=NEW+ITEM`,
      };
      state.items.unshift(newProduct); 
    },
    
    removeProduct: (state, action) => {
      
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const maxId = action.payload.reduce(
          (max, item) => Math.max(max, item.id),
          0
        );
        nextId = Math.max(nextId, maxId + 1);
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addProduct, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;

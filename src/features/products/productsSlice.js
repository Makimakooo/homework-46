import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
    // ➕ Добавить новый товар
    addProduct: (state) => {
      const newProduct = {
        id: nextId++,
        title: `Новый Товар #${nextId - 1000}`,
        price: 99.0,
        image: `https://placehold.co/150x150?text=NEW+ITEM`,
      };
      state.items.unshift(newProduct);
    },

    // ❌ Удалить товар
    removeProduct: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // ✏️ Обновить (редактировать) товар
    updateProduct: (state, action) => {
      const updated = action.payload;
      const index = state.items.findIndex((item) => item.id === updated.id);
      if (index !== -1) {
        state.items[index] = updated;
      }
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

export const { addProduct, removeProduct, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
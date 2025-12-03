import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data; // { token, role }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password }) => {
    const res = await axios.post(`${API_URL}/register`, { email, password });
    return res.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.role = null;

      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.role = action.payload.role;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("role", action.payload.role);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        // можна нічого не робити після реєстрації
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
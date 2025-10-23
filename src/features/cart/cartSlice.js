import { createSlice } from '@reduxjs/toolkit';


const calculateTotals = (items) => {
  let totalQuantity = 0;
  let totalPrice = 0;

  items.forEach(item => {
    
    totalPrice += item.price * item.quantity; 
    totalQuantity += item.quantity;
  });

  
  return {
    totalQuantity,
    totalPrice: parseFloat(totalPrice.toFixed(2)),
  };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    
    totalQuantity: 0, 
    totalPrice: 0.00,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find(i => i.id === action.payload.id);
      
      if (item) {
        item.quantity += 1;
      } else {
        
        const price = parseFloat(action.payload.price); 
        state.items.push({ ...action.payload, price, quantity: 1 });
      }

      
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },
    
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);

      
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },
    
    
    increaseQuantity: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        
        
        const totals = calculateTotals(state.items);
        state.totalQuantity = totals.totalQuantity;
        state.totalPrice = totals.totalPrice;
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        
        state.items = state.items.filter(i => i.id !== action.payload);
      }

      
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },
    
    clearCart: (state) => {
      state.items = [];
     
      state.totalQuantity = 0;
      state.totalPrice = 0.00;
    },
  },
});


export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
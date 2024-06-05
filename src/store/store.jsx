import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { gproductsAPI } from '../redux/service/users';
import axios from 'axios';


export const fetchProducts = createAsyncThunk('v1/products-list', async () => {
    const response = await axios.get('https://665430221c6af63f4676bee4.mockapi.io/gproducts/api/v1/products-list');
    return response.data;
});

// Initial state
const initialState = {
    products: [],
    filters: {
        categories: []
    },
    status: 'idle',
    error: null,
};

// Create a slice
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters.categories = action.payload;
        }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchProducts.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.products = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
});

// Export the actions
export const { setFilters } = productSlice.actions;

const store = configureStore({
  reducer: {
    [gproductsAPI.reducerPath]: gproductsAPI.reducer,
    products: productSlice.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
      .concat(gproductsAPI.middleware),
});

export default store;
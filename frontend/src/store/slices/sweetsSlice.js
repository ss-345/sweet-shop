import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sweetsService } from "../../services/sweetsService.js";

// Async thunks
export const fetchSweets = createAsyncThunk(
  "sweets/fetchSweets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await sweetsService.getSweets();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch sweets"
      );
    }
  }
);

export const searchSweets = createAsyncThunk(
  "sweets/searchSweets",
  async (searchParams, { rejectWithValue }) => {
    try {
      const response = await sweetsService.searchSweets(searchParams);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Search failed");
    }
  }
);

export const addSweet = createAsyncThunk(
  "sweets/addSweet",
  async (sweetData, { rejectWithValue }) => {
    try {
      const response = await sweetsService.addSweet(sweetData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add sweet"
      );
    }
  }
);

export const updateSweet = createAsyncThunk(
  "sweets/updateSweet",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await sweetsService.updateSweet(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update sweet"
      );
    }
  }
);

export const deleteSweet = createAsyncThunk(
  "sweets/deleteSweet",
  async (id, { rejectWithValue }) => {
    try {
      await sweetsService.deleteSweet(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete sweet"
      );
    }
  }
);

export const purchaseSweet = createAsyncThunk(
  "sweets/purchaseSweet",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const response = await sweetsService.purchaseSweet(id, quantity);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Purchase failed"
      );
    }
  }
);

export const restockSweet = createAsyncThunk(
  "sweets/restockSweet",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const response = await sweetsService.restockSweet(id, quantity);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Restock failed");
    }
  }
);

const initialState = {
  sweets: [],
  filteredSweets: [],
  loading: false,
  error: null,
  searchParams: {
    name: "",
    category: "",
    priceMin: "",
    priceMax: "",
  },
};

const sweetsSlice = createSlice({
  name: "sweets",
  initialState,
  reducers: {
    setSearchParams: (state, action) => {
      state.searchParams = { ...state.searchParams, ...action.payload };
    },
    clearSearch: (state) => {
      state.searchParams = {
        name: "",
        category: "",
        priceMin: "",
        priceMax: "",
      };
      state.filteredSweets = state.sweets;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch sweets
      .addCase(fetchSweets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSweets.fulfilled, (state, action) => {
        state.loading = false;
        state.sweets = action.payload;
        state.filteredSweets = action.payload;
        state.error = null;
      })
      .addCase(fetchSweets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Search sweets
      .addCase(searchSweets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchSweets.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredSweets = action.payload;
        state.error = null;
      })
      .addCase(searchSweets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add sweet
      .addCase(addSweet.fulfilled, (state, action) => {
        state.sweets.unshift(action.payload);
        state.filteredSweets.unshift(action.payload);
      })
      // Update sweet
      .addCase(updateSweet.fulfilled, (state, action) => {
        const index = state.sweets.findIndex(
          (sweet) => sweet.id === action.payload.id
        );
        if (index !== -1) {
          state.sweets[index] = action.payload;
          const filteredIndex = state.filteredSweets.findIndex(
            (sweet) => sweet.id === action.payload.id
          );
          if (filteredIndex !== -1) {
            state.filteredSweets[filteredIndex] = action.payload;
          }
        }
      })
      // Delete sweet
      .addCase(deleteSweet.fulfilled, (state, action) => {
        state.sweets = state.sweets.filter(
          (sweet) => sweet.id !== action.payload
        );
        state.filteredSweets = state.filteredSweets.filter(
          (sweet) => sweet.id !== action.payload
        );
      })
      // Purchase sweet
      .addCase(purchaseSweet.fulfilled, (state, action) => {
        const index = state.sweets.findIndex(
          (sweet) => sweet.id === action.payload.id
        );
        if (index !== -1) {
          state.sweets[index] = action.payload;
          const filteredIndex = state.filteredSweets.findIndex(
            (sweet) => sweet.id === action.payload.id
          );
          if (filteredIndex !== -1) {
            state.filteredSweets[filteredIndex] = action.payload;
          }
        }
      })
      // Restock sweet
      .addCase(restockSweet.fulfilled, (state, action) => {
        const index = state.sweets.findIndex(
          (sweet) => sweet.id === action.payload.id
        );
        if (index !== -1) {
          state.sweets[index] = action.payload;
          const filteredIndex = state.filteredSweets.findIndex(
            (sweet) => sweet.id === action.payload.id
          );
          if (filteredIndex !== -1) {
            state.filteredSweets[filteredIndex] = action.payload;
          }
        }
      });
  },
});

export const { setSearchParams, clearSearch, clearError } = sweetsSlice.actions;
export default sweetsSlice.reducer;

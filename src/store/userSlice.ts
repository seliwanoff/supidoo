import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import { AppDispatch } from "./store"; // Import for dispatch types

interface UserState {
  user: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface LoginData {
  id: string;
  password: string;
}

const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
};

// Login user and store token in localStorage
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (loginData: LoginData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/login", loginData);
      // Store token in localStorage
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch user details with authorization token
export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/getdatils", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        // If unauthorized, log the user out and redirect to login
        dispatch(logout()); // Dispatch logout action
        window.location.href = "/login"; // Redirect to login
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// User slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirect to login page upon logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUserDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.user = action.payload;
        }
      )
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;

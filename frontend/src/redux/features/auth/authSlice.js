import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getLoginStatus, getUsers } from "../../../services/authService";

const name = JSON.parse(localStorage.getItem("name"));
const initialState = {
  isLoggedIn: false,
  name: name ? name : "",
  user: {
    name: "",
    email: "",
    type: "",
  },
  users: [],
  userID: "",
};

// GET ALL USERS
export const fetchUsers = createAsyncThunk(
  "auth/getAll",
  async (_, thunkAPI) => {
    try {
      return await getUsers();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const checkLoginStatus = createAsyncThunk(
  "auth/checkLoginStatus",
  async (_, thunkAPI) => {
    try {
      const status = await getLoginStatus();
      return status;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      localStorage.setItem("name", JSON.stringify(action.payload));
      state.name = action.payload;
    },
    SAVE_USER(state, action) {
      const profile = action.payload;
      state.user.name = profile.name;
      state.user.email = profile.email;
      state.user.type = profile.type;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload;
      })
      // getUsers in progress case
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      // getUsers sucessfull  case
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.users = action.payload;
      })
      //  error getting catgs case
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { SET_LOGIN, SET_NAME, SAVE_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;

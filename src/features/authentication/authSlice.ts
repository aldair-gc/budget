import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface User {
  id: number,
  name: string,
  email: string,
}

interface AuthState {
  user: User,
  token: string,
  isLoggedIn: boolean,
  isLoading: boolean
}

const initialState: AuthState = {
  user: { id: 0, name: "", email: "" },
  token: "",
  isLoggedIn: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authRequest: (state) => {
      state.isLoading = true;
    },
    authSuccess: (state, actions: PayloadAction<AuthState>) => {
      state.user = actions.payload.user;
      state.token = actions.payload.token;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    authFailure: (state) => {
      state.isLoading = false;
    },
    authLogout: (state) => {
      state.user = initialState.user;
      state.token = "";
      state.isLoggedIn = false;
      state.isLoading = false;
    },
    authUpdate: (state, actions: PayloadAction<{name?: string, email?: string}>) => {
      if (actions.payload.name) state.user.name = actions.payload.name;
      if (actions.payload.email) state.user.email = actions.payload.email;
    }
  }
});

export const { authRequest, authSuccess, authFailure, authLogout, authUpdate } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export const authReducer = authSlice.reducer;

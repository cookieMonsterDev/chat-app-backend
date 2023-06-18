import { createAction, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  AuthTypes,
  SignInPayload,
  SignUpPayload,
  AuthResponse,
} from "./auth.types";

const initialState: AuthTypes = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, _actions: PayloadAction<SignInPayload>) => {
      state.errorMessage = null;
      state.isLoading = true;
    },
    signUp: (state, _actions: PayloadAction<SignUpPayload>) => {
      state.errorMessage = null;
      state.isLoading = true;
    },
    signOut: (state) => {
      state.user = null;
      state.refreshToken = null;
      state.accessToken = null;
    },
    authSuccess: (state, { payload }: PayloadAction<AuthResponse>) => {
      state.user = payload.user;
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.errorMessage = null;
      state.isLoading = false;
    },
    authFailure: (state, { payload }: PayloadAction<string>) => {
      state.user = null;
      state.errorMessage = payload;
      state.isLoading = false;
    },
    resetError: (state) => {
      state.errorMessage = null;
    },
  },
});

export const refreshAuth = createAction("auth/refreshAuth");
export const { signUp, signIn, authSuccess, authFailure, resetError } =
  authSlice.actions;

export default authSlice.reducer;

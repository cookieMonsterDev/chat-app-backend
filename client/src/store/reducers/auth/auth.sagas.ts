import { call, put, select } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AuthTypes, SignInPayload, SignUpPayload } from "./auth.types";
import { authSuccess, authFailure } from "./auth.slice";
import chatApi from "../../../base/axiosConfig";

export function* workSignIn({ payload }: PayloadAction<SignInPayload>) {
  try {
    const { data } = yield call(() =>
      chatApi.post("/auth/login", {
        ...payload,
      })
    );

    yield put(authSuccess(data));
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(authFailure(error.response?.data.message));
      return;
    }

    yield put(authFailure("Unknown error"));
  }
}

export function* workSignUp({ payload }: PayloadAction<SignUpPayload>) {
  try {
    const { data } = yield call(() =>
      chatApi.post("/auth/register", {
        ...payload,
      })
    );

    yield put(authSuccess(data));
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
      return;
    }

    yield put(authFailure("Unknown error"));
  }
}

export function* workRefreshAuth() {
  try {
    const { refreshToken }: AuthTypes = yield select((state) => state.auth);

    const { data } = yield call(() =>
      chatApi.get("/auth/refresh", {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      })
    );

    yield put(authSuccess(data));
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(authFailure(error.response?.data));
      return;
    }

    yield put(authFailure("Unknown error"));
  }
}

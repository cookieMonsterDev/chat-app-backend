import { all, takeEvery } from "redux-saga/effects";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import authReducer from "./auth/auth.slice";
import { workRefreshAuth, workSignIn, workSignUp } from "./auth";

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: ["auth"],
};

const authPersistConfig = {
  key: "auth",
  storage,
  blacklist: ["accessToken", "isLoading", "errorMessage"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
});

export function* rootSaga() {
  yield all([
    takeEvery("auth/signIn", workSignIn),
    takeEvery("auth/signUp", workSignUp),
    takeEvery("auth/refreshAuth", workRefreshAuth),
  ]);
}

export default persistReducer(rootPersistConfig, rootReducer);

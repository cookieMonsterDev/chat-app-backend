import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ChatTypes } from "./chats.types";

const initialState: ChatTypes = {
  currentChat: null,
};

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setCurrentChat(state, { payload }: PayloadAction<string | null>) {
      state.currentChat = payload;
    },
  },
});

export const { setCurrentChat } = chatsSlice.actions;

export default chatsSlice.reducer;

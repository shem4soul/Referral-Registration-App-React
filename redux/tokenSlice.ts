import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  token: string | null;
};

const initialState: UserState = {
  token: null,
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (
      state,
      action: PayloadAction<{
        token: string;
      }>
    ) => {
      state.token = action.payload.token;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;

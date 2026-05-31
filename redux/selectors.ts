import { RootState } from "./store";

export const selectUserToken = (state: RootState) => state.token.token;
export const selectUserDetails = (state: RootState) => state.user.details;

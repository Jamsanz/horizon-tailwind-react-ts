import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IReduxState } from "../../interfaces/reduxState.interface";
import { IUser } from "../../interfaces/user.interface";

export interface IProfileState extends IReduxState {
  data?: IUser
};

const initialState: IProfileState = {
  data: undefined,
  isLoading: false,
  error: undefined,
  success: undefined,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getProfile: (state) => ({ ...state, isLoading: true }),
    getProfileSuccessful: (state, action) => ({
      ...state,
      isLoading: false,
      data: action.payload,
    }),
    getProfileError: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
  },
});

export const { getProfile, getProfileSuccessful, getProfileError } = profileSlice.actions;
export const profileSelector = (state: RootState) => state.profile;
export default profileSlice.reducer;
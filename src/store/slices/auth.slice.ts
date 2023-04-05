import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IUser } from "../../interfaces/user.interface";

export interface IAuthState {
  user?: IUser;
  error?: string;
  isLoading: boolean
}

const initialState: IAuthState = {
  user: undefined,
  error: undefined,
  isLoading: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: state => ({ ...state, isLoading: true }),
    authenticated: (state, action) => ({ ...state, isLoading: false, user: action.payload, error: "" }),
    authenticationError: (state, action) => ({ ...state, isLoading: false, error: action.payload })
  }
});

export const { authenticate, authenticated, authenticationError } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export default authSlice.reducer;
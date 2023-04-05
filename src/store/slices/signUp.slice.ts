import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IReduxState } from "../../interfaces/reduxState.interface";
import { IUser } from "../../interfaces/user.interface";

export interface ISignUpState extends IReduxState{
  data?: IUser
}

const initialState: ISignUpState = {
  data: undefined,
  isLoading: false,
  error: undefined,
  success: undefined
};

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    signUp: (state) => ({ ...state, isLoading: true }),
    signUpSuccessful: (state, action) => ({ ...state, isLoading: false, data: action.payload }),
    signUpError: (state, action) => ({ ...state, isLoading: false, error: action.payload })
  }
});

export const { signUp, signUpSuccessful, signUpError } = signUpSlice.actions;
export const signUpSelector = (state: RootState) => state.signUp;
export default signUpSlice.reducer;
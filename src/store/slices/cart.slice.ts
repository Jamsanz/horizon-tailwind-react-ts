import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ICartItem } from "../../interfaces/cart.interface";
import { IReduxState } from "../../interfaces/reduxState.interface";

export interface ICartState extends IReduxState {
  data?: ICartItem[];
}

const initialState: ICartState = {
  data: undefined,
  isLoading: false,
  success: undefined,
  error: undefined,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCart: (state) => ({ ...state, isLoading: true }),
    getCartSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      success: "true",
      data: action.payload,
    }),
    getCartError: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    // addToCart: (state, action) => ({...state, isLoading: false, data: state.data!.length > 0 ? [...state?.data!, action.payload ] : action.payload})
  },
});

export const { getCart, getCartSuccess, getCartError } = cartSlice.actions;
export const cartSelector = (state: RootState) => state.cart;
export default cartSlice.reducer;

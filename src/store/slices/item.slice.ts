import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Item } from "../../interfaces/item.interface";
import { IReduxState } from "../../interfaces/reduxState.interface";

export interface ItemState extends IReduxState {
  data?: Item;
}

const initialState: ItemState = {
  data: undefined,
  isLoading: false,
  error: undefined,
  success: undefined,
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    itemRequest: (state) => ({ ...state, isLoading: true }),
    itemSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      data: action.payload,
    }),
    itemError: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
  },
});

export const { itemRequest, itemSuccess, itemError } = itemSlice.actions;
export const itemSelector = (state: RootState) => state.item;
export default itemSlice.reducer;

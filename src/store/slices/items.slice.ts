import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Item } from "../../interfaces/item.interface";
import { IReduxState } from "../../interfaces/reduxState.interface";

export interface ItemsState extends IReduxState {
  data?: Item[] 
}

const initialState: ItemsState = {
  data: undefined,
  isLoading: false,
  error: undefined,
  success: undefined
}

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    itemsRequest: (state) => ({ ...state, isLoading: true }),
    itemsSuccess: (state, action) => ({ ...state, isLoading: false, data: action.payload }),
    itemsError: (state, action) => ({ ...state, isLoading: false, error: action.payload })
  }
});

export const { itemsRequest, itemsSuccess, itemsError } = itemsSlice.actions;
export const itemsSelector = (state: RootState) => state.items;
export default itemsSlice.reducer;

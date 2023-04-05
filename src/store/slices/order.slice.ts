import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IOrderInput } from "../../interfaces/order.interface";


export interface IOrderState extends IOrderInput { }

const initialState: IOrderState = {
  total: 0,
  payment_method: 'card',
  status: 'pending'
} 

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateOrder: (state, action) => ({ ...state, ...action.payload }),
    emptyOrder: () => initialState
  }
});

export const { updateOrder, emptyOrder } = orderSlice.actions;
export const orderSelector = (state: RootState) => state.order;
export default orderSlice.reducer

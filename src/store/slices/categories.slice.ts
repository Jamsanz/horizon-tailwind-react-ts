import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ICategory } from "../../interfaces/category.interface";
import { IReduxState } from "../../interfaces/reduxState.interface";

export interface ICategories extends IReduxState {
  data?: ICategory[]
}

const initialState: ICategories = {
  data: undefined,
  isLoading: false,
  error: undefined,
  success: undefined
}

const categoriesSlice = createSlice({
  "name": "categories",
  initialState,
  reducers: {
    categoriesRequest: (state) => ({ ...state, isLoading: true }),
    categoriesSuccess: (state, action) => ({ ...state, isLoading: false, data: action.payload }),
    categoriesError: (state, action) => ({ ...state, isLoading: false, error: action.payload })
  }
});

export const { categoriesRequest, categoriesSuccess, categoriesError } = categoriesSlice.actions;
export const categoriesSelector = (state: RootState) => state.categories;
export default categoriesSlice.reducer;
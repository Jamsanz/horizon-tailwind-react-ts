import { gql, TypedDocumentNode } from "@apollo/client";
import { Dispatch } from "react";
import { ICategory } from "../../interfaces/category.interface";
import { http } from "../../utils";
import { categoriesError, categoriesRequest, categoriesSuccess } from "../slices/categories.slice";

const catergoriesController = () => async (dispatch: Dispatch<any>) => {
  dispatch(categoriesRequest());
  try {
    const response = await http.get('/categories');
    dispatch(categoriesSuccess(response.data))
  } catch (error) {
    console.log((error as any).response.status);
    dispatch(categoriesError('Something went wrong!'));
  }
} 

export default catergoriesController;

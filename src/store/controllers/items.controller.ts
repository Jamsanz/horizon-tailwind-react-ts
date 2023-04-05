import { gql, TypedDocumentNode } from "@apollo/client";
import { Dispatch } from "react";
import { Item } from "../../interfaces/item.interface";
import { http } from "../../utils";
import { itemsError, itemsRequest, itemsSuccess } from "../slices/items.slice";

interface categoryItems {
  category_items: Item[]
}
interface varibles {
  categoryId: string
}
export const GET_ITEMS: TypedDocumentNode<categoryItems, varibles> = gql(`
  query items($categoryId: String!){
    category_items(categoryId: $categoryId) {
    _id
    name
    imageUrl
    description
    price
    categoryId
    rating
    }
  }
`);


const itemsController = (id: string, categoryId: string, callback: () => void) => async (dispatch: Dispatch<any>) => {
  dispatch(itemsRequest());
  try {
    const response = await http.get(`/items?categoryId=${id}`);
    dispatch(itemsSuccess(response.data));
    callback();
  } catch (error) {
    console.log((error as any).response.status);
    dispatch(itemsError('Something went wrong'));
  }
}

export default itemsController;

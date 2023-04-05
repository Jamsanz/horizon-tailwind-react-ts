import { gql, TypedDocumentNode } from "@apollo/client";
import { Dispatch } from "react";
import { ICrust, ISize, Item } from "../../interfaces/item.interface";
import { IToping } from "../../interfaces/toping.interface";
import { http } from "../../utils";
import { itemError, itemRequest, itemSuccess } from "../slices/item.slice";

const getItemController =
  (id: number, callback: () => void) => async (dispatch: Dispatch<any>) => {
    dispatch(itemRequest());
    try {
      const response = await http.get(`/items/${id}`);
      dispatch(itemSuccess(response.data));
      callback();
    } catch (error) {
      console.log((error as any).response.status);
      dispatch(itemError("Something went wrong"));
    }
  };

export default getItemController;

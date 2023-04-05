import { gql, TypedDocumentNode } from "@apollo/client";
import { Item } from "../../../interfaces/item.interface";
import { Crust, Size, Toping } from "../../__generated__/graphql";

interface itemData {
  item: Item;
  categorySize: Size[];
  categoryCrust: Crust[];
  categoryToping: Toping[];
}

interface varibles {
  id: string;
  categoryId: string;
}

export const GET_ITEM: TypedDocumentNode<itemData, varibles> = gql(`
  query itemDetails($id: String!, $categoryId: String!){
    item(id: $id){
      _id
      name
      description
      imageUrl
      price
    }
    
    categorySize(categoryId: $categoryId) {
      _id
      size
      price
    }
    
    categoryCrust(categoryId: $categoryId){
      _id
      crust
      price
    }
    
    categoryToping(categoryId: $categoryId){
      _id
      toping
      price
      qty
    }
  }
`);

interface IGetItems {
  category_items: Item[]
}
interface itemsVariables {
  categoryId: string;
}

export const GET_ITEMS: TypedDocumentNode<IGetItems, itemsVariables> = gql(`
  query items($categoryId: String!){
    category_items(categoryId: $categoryId){
      _id
      name
      description
      imageUrl
      price
    }
  }
`);

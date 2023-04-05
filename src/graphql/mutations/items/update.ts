import { gql, TypedDocumentNode } from "@apollo/client";
import { Item, UpdateItemInput } from "graphql/__generated__/graphql";

interface variables {
  id: string;
  updateItemInput: UpdateItemInput
}

export const UPDATE_ITEM: TypedDocumentNode<Item, variables> = gql`
  mutation update($id: String!, $updateItemInput: UpdateItemInput!){
    updateItem(
      id: $id,
      updateItemInput: $updateItemInput
      ){
        name
        description
        price
        imageUrl
      }
  }
`;
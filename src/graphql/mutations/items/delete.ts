import { gql, TypedDocumentNode } from "@apollo/client";
import { Item } from "graphql/__generated__/graphql";

interface variable {
  id: string
};

export const DELETE_ITEM: TypedDocumentNode<Item, variable> = gql`
  mutation delete($id: String!){
    removeItem(id: $id){
      _id
    }
  }
`
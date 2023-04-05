import { gql, TypedDocumentNode } from "@apollo/client";
import { Size } from "graphql/__generated__/graphql";

interface ISizeData {
  categorySize: Size[];
}

interface variables {
  categoryId: string;
}

export const GET_SIZES: TypedDocumentNode<ISizeData, variables> = gql`
  query size ($categoryId: String!){
    categorySize(categoryId: $categoryId){
      _id
      size
      price
    }
  }
`;

import { gql, TypedDocumentNode } from "@apollo/client";
import { Toping } from "graphql/__generated__/graphql";

interface ITopingData {
  categoryToping: Toping[];
}

interface variables {
  categoryId: string;
}

export const GET_TOPINGS: TypedDocumentNode<ITopingData, variables> = gql`
  query toping ($categoryId: String!){
    categoryToping(categoryId: $categoryId){
      _id
      toping
      price
    }

  }
`;

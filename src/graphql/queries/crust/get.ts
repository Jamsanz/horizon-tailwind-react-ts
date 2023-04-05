import { gql, TypedDocumentNode } from "@apollo/client";
import { Crust } from "graphql/__generated__/graphql";

interface ICrustData {
  categoryCrust: Crust[];
}

interface variables {
  categoryId: string;
}

export const GET_CRUSTS: TypedDocumentNode<ICrustData, variables> = gql`
  query crust ($categoryId: String!){
    categoryCrust(categoryId: $categoryId){
      _id
      crust
      price
    }
  }
`;

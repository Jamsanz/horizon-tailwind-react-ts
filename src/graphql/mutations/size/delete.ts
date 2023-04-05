import { gql, TypedDocumentNode } from "@apollo/client";
import { Size } from "graphql/__generated__/graphql";

export const DELETE_SIZE: TypedDocumentNode<Size, {id: string}> = gql`
mutation deleteSize($id: String!){
  removeSize(id: $id){
    _id
  }
}
`;
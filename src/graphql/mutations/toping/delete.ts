import { gql, TypedDocumentNode } from "@apollo/client";
import { Toping } from "graphql/__generated__/graphql";

export const DELETE_TOPING: TypedDocumentNode<Toping, {id: string}> = gql`
mutation deleteToping($id: String!){
  removeToping(id: $id){
    _id
  }
}
`;
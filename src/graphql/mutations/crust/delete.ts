import { gql, TypedDocumentNode } from "@apollo/client";
import { Crust } from "graphql/__generated__/graphql";

export const DELETE_CRUST: TypedDocumentNode<Crust, {id: string}> = gql`
mutation deleteCrust($id: String!){
  removeCrust(id: $id){
    _id
  }
}
`;
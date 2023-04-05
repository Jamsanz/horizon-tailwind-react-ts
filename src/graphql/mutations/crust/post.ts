import { gql, TypedDocumentNode } from "@apollo/client";
import { CreateCrustInput, Crust } from "graphql/__generated__/graphql";

export const ADD_CRUST: TypedDocumentNode<Crust, {createCrustInput: CreateCrustInput}> = gql`
mutation addCrust($createCrustInput: CreateCrustInput!){
  createCrust(createCrustInput: $createCrustInput){
    _id
  }
}
`;
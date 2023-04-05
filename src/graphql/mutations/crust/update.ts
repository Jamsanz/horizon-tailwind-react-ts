import { gql, TypedDocumentNode } from "@apollo/client";
import { UpdateCrustInput, Crust } from "graphql/__generated__/graphql";

export const UPDATE_CRUST: TypedDocumentNode<
  Crust,
  {id: string, updateCrustInput: UpdateCrustInput }
> = gql`
  mutation updateCrust($id: String!, $updateCrustInput: UpdateCrustInput!) {
    updateCrust(id: $id, updateCrustInput: $updateCrustInput) {
      _id
    }
  }
`;

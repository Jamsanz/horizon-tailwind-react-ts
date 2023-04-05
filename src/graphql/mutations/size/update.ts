import { gql, TypedDocumentNode } from "@apollo/client";
import { Size, UpdateSizeInput } from "graphql/__generated__/graphql";

interface variables {
  id: string;
  updateSizeInput: UpdateSizeInput;
}

export const UPDATE_SIZE: TypedDocumentNode<Size, variables> = gql`
  mutation updateSize($id: String!, $updateSizeInput: UpdateSizeInput!) {
    updateSize(id: $id, updateSizeInput: $updateSizeInput) {
      _id
    }
  }
`;

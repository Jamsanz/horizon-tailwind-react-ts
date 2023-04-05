import { gql, TypedDocumentNode } from "@apollo/client";
import { Toping, UpdateTopingInput } from "graphql/__generated__/graphql";

interface variables {
  id: string;
  updateTopingInput: UpdateTopingInput;
}

export const UPDATE_TOPING: TypedDocumentNode<Toping, variables> = gql`
  mutation updateToping($id: String!, $updateTopingInput: UpdateTopingInput!) {
    updateToping(id: $id, updateTopingInput: $updateTopingInput) {
      _id
    }
  }
`;

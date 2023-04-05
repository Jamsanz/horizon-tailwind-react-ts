import { gql, TypedDocumentNode } from "@apollo/client";
import { CreateTopingInput, Toping } from "graphql/__generated__/graphql";

export const ADD_TOPING: TypedDocumentNode<
  Toping,
  { createTopingInput: CreateTopingInput }
> = gql`
  mutation addToping($createTopingInput: CreateTopingInput!) {
    createToping(createTopingInput: $createTopingInput) {
      _id
    }
  }
`;

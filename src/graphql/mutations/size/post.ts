import { gql, TypedDocumentNode } from "@apollo/client";
import { CreateSizeInput, Size } from "graphql/__generated__/graphql";

export const ADD_SIZE: TypedDocumentNode<
  Size,
  { createSizeInput: CreateSizeInput }
> = gql`
  mutation addSize($createSizeInput: CreateSizeInput!) {
    createSize(createSizeInput: $createSizeInput) {
      _id
    }
  }
`;

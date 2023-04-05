import { gql, TypedDocumentNode } from "@apollo/client";
import { Category } from "graphql/__generated__/graphql";

interface variables {
  id: string;
}

export const DELETE_CATEGORY: TypedDocumentNode<Category, variables> = gql`
  mutation deleteCategory($id: String!) {
    removeCategory(id: $id) {
      _id
    }
  }
`;

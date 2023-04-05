import { gql, TypedDocumentNode } from "@apollo/client";
import { Category, UpdateCategoryInput } from "graphql/__generated__/graphql";

interface variables {
  id: string;
  updateCategoryInput: UpdateCategoryInput
}

export const UPDATE_CATEGORY: TypedDocumentNode<Category, variables> = gql`
  mutation update($id: String!, $updateCategoryInput: UpdateCategoryInput!){
      updateCategory(
        id: $id,
        updateCategoryInput: $updateCategoryInput
      ) {
        _id
      }
  }
`;

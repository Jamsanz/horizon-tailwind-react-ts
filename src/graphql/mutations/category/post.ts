import { gql, TypedDocumentNode } from "@apollo/client";
import { Category, CreateCategoryInput } from "graphql/__generated__/graphql";

interface ICategory {
  category: Category
}

interface variables {
  createCategoryInput: CreateCategoryInput
}
export const ADD_CATEGORY: TypedDocumentNode<ICategory, variables> = gql`
  mutation createCategory($createCategoryInput: CreateCategoryInput!){
    createCategory(createCategoryInput: $createCategoryInput){
      _id
    }
  }
`;
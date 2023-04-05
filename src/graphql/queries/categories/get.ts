import { gql, TypedDocumentNode } from "@apollo/client";
import { Category } from "graphql/__generated__/graphql";

interface ICategories {
  categories: Category[];
}

export const GET_CATEGORIES: TypedDocumentNode<ICategories> = gql(`
  query categories {
    categories {
      _id
      name
      imageUrl
      items
      sizes
      crusts
      topings
    }
  }
`);

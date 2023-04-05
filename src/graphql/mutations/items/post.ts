import { gql, TypedDocumentNode } from "@apollo/client";
import {
  Cart,
  CreateItemInput,
  Item,
} from "../../__generated__/graphql";

interface variables {
  createItemInput: CreateItemInput;
}
export const ADD_ITEM: TypedDocumentNode<Item, variables> = gql`
  mutation createItem($createItemInput: CreateItemInput!) {
    createItem(createItemInput: $createItemInput) {
      _id
      name
      price
      categoryId
      imageUrl
    }
  }
`;

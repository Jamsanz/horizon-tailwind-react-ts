import { gql, TypedDocumentNode } from "@apollo/client";
import { Cart, CreateOrderInput, Order } from "../../__generated__/graphql";

interface removeItem {
  removeCart: Cart
}

interface variables{
  id: string
}
export const DELETE_CART_ITEM: TypedDocumentNode<removeItem, variables> = gql`
  mutation deletItem($id: String! ){
    removeCart(id: $id){
      _id
    }
  }
`;

interface createOrder {
  createOrders: Order
}

interface inputVariable {
  createOrderInput: CreateOrderInput
}
export const CREATE_ORDER: TypedDocumentNode<createOrder, inputVariable> = gql`
  mutation order($createOrderInput: CreateOrderInput!){
    createOrders(createOrderInput: $createOrderInput){
      _id
    }
  }
`;

export const REMOVE_CART_ITEMS = gql`
  mutation deleteAll{
    removeAll 
  }
`;
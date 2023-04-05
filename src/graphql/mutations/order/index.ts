import { gql, TypedDocumentNode } from "@apollo/client";
import { CreateOrderInput, Order } from "../../__generated__/graphql";

interface createOrder {
  createOrders: Order;
}

interface inputVariable {
  createOrderInput: CreateOrderInput;
}
export const CREATE_ORDER: TypedDocumentNode<createOrder, inputVariable> = gql`
  mutation order($createOrderInput: CreateOrderInput!) {
    createOrders(createOrderInput: $createOrderInput) {
      _id
    }
  }
`;

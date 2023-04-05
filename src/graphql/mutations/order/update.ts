import { gql, TypedDocumentNode } from "@apollo/client";
import { Order, UpdateOrderInput } from "graphql/__generated__/graphql";

interface variables {
  updateOrderInput: UpdateOrderInput
}

interface updateOrder {
  order: Order
}

export const UPDATE_ORDER: TypedDocumentNode<updateOrder, variables> = gql`
  mutation updateOrder ($updateOrderInput: UpdateOrderInput!){
    updateOrder (updateOrderInput: $updateOrderInput){
      _id
    }
  }
`;
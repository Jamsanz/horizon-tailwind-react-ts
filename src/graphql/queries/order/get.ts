import { gql, TypedDocumentNode } from "@apollo/client";
import { Order } from "../../__generated__/graphql";

interface orders {
  Orders?: Order[];
}

export const GET_ORDERS: TypedDocumentNode<orders> = gql`
  query orders {
    Orders {
      _id
      status
      delivery_address
      total
      payment_method
      transaction_id
      delivery_option
      createdAt
      updatedAt
      user {
        name
        phone
      }
      items {
        _id
        crust
        size
        total
        topings {
          toping
        }
        qty
        item {
          _id
          name
          imageUrl
        }
      }
    }
  }
`;

interface getOrder{
  Order: Order,
}

interface variables {
    id: string
  }

export const GET_ORDER: TypedDocumentNode<getOrder, variables> = gql`
  query order($id: String!) {
    Order(id: $id) {
      _id
      status
      delivery_address
      total
      payment_method
      transaction_id
      createdAt
      updatedAt
      items {
        _id
        crust
        size
        total
        qty
        half
        special
        topings{
          toping
          price
          qty
        }
        item {
          _id
          name
          imageUrl
        }
      }
    }
  }
`;
import { ICartInput, ICartItem } from "./cart.interface";
import { Item } from "./item.interface";

export interface IOrder {
  _id?: string;
  userId?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  delivery_address?: string;
  items?: Item[];
  total: number;
  delivery_option?: string;
  payment_method: string;
  transaction_id?: string;
  status: string;
}

export interface IOrderInput extends Omit<IOrder, "items"> {
  items?: ICartInput[];
}

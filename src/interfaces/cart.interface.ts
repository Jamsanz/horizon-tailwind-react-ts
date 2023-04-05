import { ICrust, ISize, Item } from "./item.interface";
import { IToping } from "./toping.interface";

export interface ICartItem {
  _id?: string;
  item?: Item;
  itemId?: string;
  size?: ISize;
  crust?: ICrust;
  topings?: { [key: string]: IToping } | IToping[] | any;
  qty?: number;
  total?: number;
  half?: string;
  special?: string;
}

export interface ICartInput {
  _id?: string;
  item?: Item;
  itemId?: string;
  size?: string;
  crust?: string;
  topings?: { [key: string]: IToping } | IToping[] | any;
  qty?: number;
  total?: number;
  half?: string;
  special?: string;
}

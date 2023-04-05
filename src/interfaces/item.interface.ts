import { ICategory } from "./category.interface";

export interface Item {
  _id?: string;
  imageUrl: string;
  name: string;
  description: string;
  category?: ICategory;
  categoryId: string;
  price: number;
  rating: number;
}

export interface ICrust {
  _id?: string;
  crust: string;
  price: number;
  category?: ICategory;
  categoryId?: string; 
}

export interface ISize {
  _id?: string;
  size: string;
  price: number;
  category?: ICategory;
  categoryId?: string; 
}
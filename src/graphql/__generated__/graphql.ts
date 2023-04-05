/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Cart = {
  __typename?: 'Cart';
  /** Cart Id */
  _id: Scalars['String'];
  /** Cart crust */
  crust: Scalars['String'];
  /** half and half pizza */
  half?: Maybe<Scalars['String']>;
  /** Cart item */
  item?: Maybe<Item>;
  /** item id */
  itemId: Scalars['String'];
  /** Item qty */
  qty: Scalars['Int'];
  /** Cart size */
  size: Scalars['String'];
  /** make your own pizza */
  special?: Maybe<Scalars['String']>;
  /** Cart topings */
  topings?: Maybe<Array<Toping>>;
  /** item total */
  total: Scalars['Int'];
  /** Cart item */
  userId: Scalars['String'];
};

export type Category = {
  __typename?: 'Category';
  _id?: Maybe<Scalars['String']>;
  /** crusts count */
  crusts?: Maybe<Scalars['Int']>;
  /** Category image */
  imageUrl: Scalars['String'];
  /** items count */
  items?: Maybe<Scalars['Int']>;
  /** category name */
  name: Scalars['String'];
  /** sizes count */
  sizes?: Maybe<Scalars['Int']>;
  /** topings count */
  topings?: Maybe<Scalars['Int']>;
};

export type CreateCartInput = {
  /** Cart Id */
  _id?: InputMaybe<Scalars['String']>;
  /** Cart crust */
  crust: Scalars['String'];
  /** half and half name */
  half?: InputMaybe<Scalars['String']>;
  /** Item Id */
  itemId: Scalars['String'];
  /** item qty */
  qty: Scalars['Int'];
  /** Cart size */
  size: Scalars['String'];
  /** make your own name */
  special?: InputMaybe<Scalars['String']>;
  /** Cart topings */
  topings?: InputMaybe<Array<CreateTopingInput>>;
  /** cart item total amount */
  total: Scalars['Int'];
  /** user Id */
  userId?: InputMaybe<Scalars['String']>;
};

export type CreateCategoryInput = {
  /** Category image */
  imageUrl: Scalars['String'];
  /** category name */
  name: Scalars['String'];
};

export type CreateCrustInput = {
  /** Crust Id */
  _id?: InputMaybe<Scalars['String']>;
  /** Crust catefory */
  categoryId: Scalars['String'];
  /** Crust name */
  crust: Scalars['String'];
  /** Crust price */
  price: Scalars['Int'];
};

export type CreateItemInput = {
  _id?: InputMaybe<Scalars['String']>;
  categoryId: Scalars['String'];
  description: Scalars['String'];
  /** half and half name */
  half?: InputMaybe<Scalars['String']>;
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Int'];
  qty?: InputMaybe<Scalars['Int']>;
  rating?: InputMaybe<Scalars['Int']>;
  /** make your own name */
  special?: InputMaybe<Scalars['String']>;
};

export type CreateOrderInput = {
  /** delivery address */
  delivery_address?: InputMaybe<Scalars['String']>;
  /** Order delivery method */
  delivery_option?: InputMaybe<Scalars['String']>;
  /** items */
  items: Array<CreateCartInput>;
  /** payment method */
  payment_method: Scalars['String'];
  /** order status */
  status: Scalars['String'];
  /** total */
  total: Scalars['Int'];
  /** transaction id */
  transaction_id?: InputMaybe<Scalars['String']>;
  /** user id */
  userId?: InputMaybe<Scalars['String']>;
};

export type CreateRatingInput = {
  _id?: InputMaybe<Scalars['String']>;
  itemId: Scalars['String'];
  rating: Scalars['Float'];
};

export type CreateSizeInput = {
  /** size id */
  _id?: InputMaybe<Scalars['String']>;
  /** size category */
  categoryId: Scalars['String'];
  /** size price */
  price: Scalars['Int'];
  /** size field */
  size: Scalars['String'];
};

export type CreateTopingInput = {
  /** Toping Id */
  _id?: InputMaybe<Scalars['String']>;
  /** Toping category */
  categoryId?: InputMaybe<Scalars['String']>;
  /** Toping price */
  price: Scalars['Int'];
  /** Toping quantity default to 0 */
  qty: Scalars['Int'];
  /** Toping name */
  toping: Scalars['String'];
};

export type Crust = {
  __typename?: 'Crust';
  /** Crust Id */
  _id: Scalars['String'];
  /** Crust catefory */
  categoryId: Scalars['String'];
  /** Crust name */
  crust: Scalars['String'];
  /** Crust price */
  price: Scalars['Int'];
};

export type Dashboard = {
  __typename?: 'Dashboard';
  categories?: Maybe<Scalars['Int']>;
  monthlyEarnings?: Maybe<Scalars['Int']>;
  products?: Maybe<Scalars['Int']>;
  sales?: Maybe<Scalars['Int']>;
  topings?: Maybe<Scalars['Int']>;
  totalEarnings?: Maybe<Scalars['Int']>;
};

export type Item = {
  __typename?: 'Item';
  /** item Id */
  _id?: Maybe<Scalars['String']>;
  categoryId: Scalars['String'];
  description: Scalars['String'];
  /** half and half name */
  half?: Maybe<Scalars['String']>;
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Int'];
  /** item quantity */
  qty?: Maybe<Scalars['Int']>;
  rating?: Maybe<Scalars['Float']>;
  /** make your own name */
  special?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addItemToCart: Cart;
  createCategory: Category;
  createCrust: Crust;
  createItem: Item;
  createOrders: Order;
  createRating: Rating;
  createSize: Size;
  createToping: Toping;
  removeAll: Scalars['String'];
  removeCart: Cart;
  removeCategory: Category;
  removeCrust: Crust;
  removeItem: Item;
  removeOrder: Order;
  removeRating: Rating;
  removeSize: Size;
  removeToping: Toping;
  updateCart: Cart;
  updateCategory: Category;
  updateCrust: Crust;
  updateItem: Item;
  updateOrder: Order;
  updateRating: Rating;
  updateSize: Size;
  updateToping: Toping;
};


export type MutationAddItemToCartArgs = {
  createCartInput: CreateCartInput;
};


export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};


export type MutationCreateCrustArgs = {
  createCrustInput: CreateCrustInput;
};


export type MutationCreateItemArgs = {
  createItemInput: CreateItemInput;
};


export type MutationCreateOrdersArgs = {
  createOrderInput: CreateOrderInput;
};


export type MutationCreateRatingArgs = {
  createRatingInput: CreateRatingInput;
};


export type MutationCreateSizeArgs = {
  createSizeInput: CreateSizeInput;
};


export type MutationCreateTopingArgs = {
  createTopingInput: CreateTopingInput;
};


export type MutationRemoveCartArgs = {
  id: Scalars['String'];
};


export type MutationRemoveCategoryArgs = {
  id: Scalars['String'];
};


export type MutationRemoveCrustArgs = {
  id: Scalars['String'];
};


export type MutationRemoveItemArgs = {
  id: Scalars['String'];
};


export type MutationRemoveOrderArgs = {
  id: Scalars['String'];
};


export type MutationRemoveRatingArgs = {
  id: Scalars['String'];
};


export type MutationRemoveSizeArgs = {
  id: Scalars['String'];
};


export type MutationRemoveTopingArgs = {
  id: Scalars['String'];
};


export type MutationUpdateCartArgs = {
  id: Scalars['String'];
  updateCartInput: UpdateCartInput;
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['String'];
  updateCategoryInput: UpdateCategoryInput;
};


export type MutationUpdateCrustArgs = {
  id: Scalars['String'];
  updateCrustInput: UpdateCrustInput;
};


export type MutationUpdateItemArgs = {
  id: Scalars['String'];
  updateItemInput: UpdateItemInput;
};


export type MutationUpdateOrderArgs = {
  updateOrderInput: UpdateOrderInput;
};


export type MutationUpdateRatingArgs = {
  id: Scalars['String'];
  updateRatingInput: UpdateRatingInput;
};


export type MutationUpdateSizeArgs = {
  id: Scalars['String'];
  updateSizeInput: UpdateSizeInput;
};


export type MutationUpdateTopingArgs = {
  id: Scalars['String'];
  updateTopingInput: UpdateTopingInput;
};

export type Order = {
  __typename?: 'Order';
  /** order Id */
  _id: Scalars['String'];
  /** Created At */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** delivery address */
  delivery_address?: Maybe<Scalars['String']>;
  /** Order delivery method */
  delivery_option?: Maybe<Scalars['String']>;
  /** items */
  items: Array<Cart>;
  /** payment method */
  payment_method: Scalars['String'];
  /** order status */
  status: Scalars['String'];
  /** total */
  total: Scalars['Int'];
  /** transaction id */
  transaction_id?: Maybe<Scalars['String']>;
  /** Updated At */
  updatedAt?: Maybe<Scalars['DateTime']>;
  /** User */
  user?: Maybe<User>;
  /** user id */
  userId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  Cart: Cart;
  Order: Order;
  Orders: Array<Order>;
  cartItems: Array<Cart>;
  categories: Array<Category>;
  category: Category;
  categoryCrust: Array<Crust>;
  categorySize: Array<Size>;
  categoryToping: Array<Toping>;
  category_items: Array<Item>;
  crust: Crust;
  dashboard: Dashboard;
  item: Item;
  itemRating: Rating;
  items: Array<Item>;
  rating: Rating;
  ratings: Array<Rating>;
  sayHello: Scalars['String'];
  size: Array<Size>;
  sizeOne: Size;
  toping: Toping;
  userCartItems: Array<Cart>;
  userOrders?: Maybe<Array<Order>>;
};


export type QueryCartArgs = {
  id: Scalars['String'];
};


export type QueryOrderArgs = {
  id: Scalars['String'];
};


export type QueryCategoryArgs = {
  id: Scalars['String'];
};


export type QueryCategoryCrustArgs = {
  categoryId: Scalars['String'];
};


export type QueryCategorySizeArgs = {
  categoryId: Scalars['String'];
};


export type QueryCategoryTopingArgs = {
  categoryId: Scalars['String'];
};


export type QueryCategory_ItemsArgs = {
  categoryId: Scalars['String'];
};


export type QueryCrustArgs = {
  id: Scalars['String'];
};


export type QueryItemArgs = {
  id: Scalars['String'];
};


export type QueryItemRatingArgs = {
  id: Scalars['Int'];
};


export type QueryRatingArgs = {
  id: Scalars['Int'];
};


export type QuerySizeOneArgs = {
  id: Scalars['String'];
};


export type QueryTopingArgs = {
  id: Scalars['String'];
};


export type QueryUserCartItemsArgs = {
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryUserOrdersArgs = {
  userId?: InputMaybe<Scalars['String']>;
};

export type Rating = {
  __typename?: 'Rating';
  _id: Scalars['String'];
  itemId: Scalars['String'];
  rating: Scalars['Float'];
};

export type Size = {
  __typename?: 'Size';
  /** size id */
  _id: Scalars['String'];
  /** size category */
  categoryId: Scalars['String'];
  /** size price */
  price: Scalars['Int'];
  /** size field */
  size: Scalars['String'];
};

export type Toping = {
  __typename?: 'Toping';
  /** Toping Id */
  _id: Scalars['String'];
  /** Toping category */
  categoryId?: Maybe<Scalars['String']>;
  /** Toping price */
  price: Scalars['Int'];
  /** Toping quantity default to 0 */
  qty: Scalars['Int'];
  /** Toping name */
  toping: Scalars['String'];
};

export type UpdateCartInput = {
  /** Cart Id */
  _id?: InputMaybe<Scalars['String']>;
  /** Cart crust */
  crust?: InputMaybe<Scalars['String']>;
  /** half and half name */
  half?: InputMaybe<Scalars['String']>;
  /** Item Id */
  itemId?: InputMaybe<Scalars['String']>;
  /** item qty */
  qty?: InputMaybe<Scalars['Int']>;
  /** Cart size */
  size?: InputMaybe<Scalars['String']>;
  /** make your own name */
  special?: InputMaybe<Scalars['String']>;
  /** Cart topings */
  topings?: InputMaybe<Array<CreateTopingInput>>;
  /** cart item total amount */
  total?: InputMaybe<Scalars['Int']>;
  /** user Id */
  userId?: InputMaybe<Scalars['String']>;
};

export type UpdateCategoryInput = {
  _id?: InputMaybe<Scalars['String']>;
  /** update Category image */
  imageUrl?: InputMaybe<Scalars['String']>;
  /** update category name */
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateCrustInput = {
  /** Crust Id */
  _id?: InputMaybe<Scalars['String']>;
  /** Crust catefory */
  categoryId?: InputMaybe<Scalars['String']>;
  /** Crust name */
  crust?: InputMaybe<Scalars['String']>;
  /** Crust price */
  price?: InputMaybe<Scalars['Int']>;
};

export type UpdateItemInput = {
  _id?: InputMaybe<Scalars['String']>;
  categoryId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  /** half and half name */
  half?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Int']>;
  qty?: InputMaybe<Scalars['Int']>;
  rating?: InputMaybe<Scalars['Int']>;
  /** make your own name */
  special?: InputMaybe<Scalars['String']>;
};

export type UpdateOrderInput = {
  /** order Id */
  _id?: InputMaybe<Scalars['String']>;
  /** delivery address */
  delivery_address?: InputMaybe<Scalars['String']>;
  /** Order delivery method */
  delivery_option?: InputMaybe<Scalars['String']>;
  /** items */
  items?: InputMaybe<Array<CreateCartInput>>;
  /** payment method */
  payment_method?: InputMaybe<Scalars['String']>;
  /** order status */
  status?: InputMaybe<Scalars['String']>;
  /** total */
  total?: InputMaybe<Scalars['Int']>;
  /** transaction id */
  transaction_id?: InputMaybe<Scalars['String']>;
  /** user id */
  userId?: InputMaybe<Scalars['String']>;
};

export type UpdateRatingInput = {
  _id?: InputMaybe<Scalars['String']>;
  itemId?: InputMaybe<Scalars['String']>;
  rating?: InputMaybe<Scalars['Float']>;
};

export type UpdateSizeInput = {
  /** size id */
  _id?: InputMaybe<Scalars['String']>;
  /** size category */
  categoryId?: InputMaybe<Scalars['String']>;
  /** size price */
  price?: InputMaybe<Scalars['Int']>;
  /** size field */
  size?: InputMaybe<Scalars['String']>;
};

export type UpdateTopingInput = {
  /** Toping Id */
  _id?: InputMaybe<Scalars['String']>;
  /** Toping category */
  categoryId?: InputMaybe<Scalars['String']>;
  /** Toping price */
  price?: InputMaybe<Scalars['Int']>;
  /** Toping quantity default to 0 */
  qty?: InputMaybe<Scalars['Int']>;
  /** Toping name */
  toping?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['String']>;
  /** Address */
  address?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['String']>;
  /** E-mail */
  email: Scalars['String'];
  /** Name */
  name: Scalars['String'];
  /** Password */
  password: Scalars['String'];
  /** Phone */
  phone: Scalars['String'];
  /** Profile Photo */
  profileImg?: Maybe<Scalars['String']>;
};

import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/auth.slice";
import authFlowReducer from "../slices/authFlow.slice";
import cartReducer from "../slices/cart.slice";
import categoriesReducer from "../slices/categories.slice";
import itemReducer from "../slices/item.slice";
import itemsReducer from "../slices/items.slice";
import orderReducer from "../slices/order.slice";
import profileReducer from "../slices/profile.slice";
import signUpReducer from "../slices/signUp.slice";

export const rootReducer = combineReducers({
  categories: categoriesReducer,
  items: itemsReducer,
  item: itemReducer,
  cart: cartReducer,
  authFlow: authFlowReducer,
  auth: authReducer,
  order: orderReducer,
  signUp: signUpReducer,
  profile: profileReducer
});

export type RootState = ReturnType<typeof rootReducer>;

import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import Orders from "views/admin/order";
import Profile from "views/admin/profile";
import DataTables from "views/admin/category";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdPerson,
  MdLock,
} from "react-icons/md";
import { BiCategory, BiExpandAlt, BiDroplet } from 'react-icons/bi';
import { GiFullPizza } from 'react-icons/gi';
import { AiFillStop } from 'react-icons/ai'
import Categories from "views/admin/category/components/category.table";
import Items from "views/admin/item";
import Topings from "views/admin/toping";
import Crusts from "views/admin/crust";
import Sizes from "views/admin/size";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Orders",
    layout: "/admin",
    path: "orders",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <Orders />,
    secondary: true,
  },
  {
    name: "Categories",
    layout: "/admin",
    icon: <BiCategory className="h-6 w-6" />,
    path: "categories",
    component: <DataTables />
  },
  {
    name: "Products",
    layout: "/admin",
    icon: <GiFullPizza className="h-6 w-6" />,
    path: "products",
    component: <Items />
  },
  {
    name: "Topings",
    layout: "/admin",
    icon: <BiDroplet className="h-6 w-6" />,
    path: "topings",
    component: <Topings />
  },
  {
    name: "Crusts",
    layout: "/admin",
    icon: <AiFillStop className="h-6 w-6" />,
    path: "crusts",
    component: <Crusts />,
  },
  {
    name: "Sizes",
    layout: "/admin",
    icon: <BiExpandAlt className="h-6 w-6" />,
    path: "sizes",
    component: <Sizes />,
  },
  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "profile",
  //   icon: <MdPerson className="h-6 w-6" />,
  //   component: <Profile />,
  // },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
];
export default routes;

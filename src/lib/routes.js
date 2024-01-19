import { createBrowserRouter, useParams } from "react-router-dom";
import React from "react";

import Layout from "../components/Layout/Layout";
import Home from "../components/Home/Home";
import AdminIndex from "../components/Auth/AdminIndex.jsx";
import AddStock from "../components/AddStock/AddStock.jsx";
import ExpiredProducts from "../components/ExpiredProducts/ExpiredProducts.jsx";
import SubmitBugReport from "../components/BugReports/SubmitBugReport.jsx";

import Error404 from "../components/Error404/Error404.jsx";

import Login from "../components/Auth/Login.jsx";

export const ROOT = "/";
export const LOGIN = "/login";

/* export const ABOUT = "/about";
export const HOME = "/home";
export const CONTACT = "/contact";
export const LOGIN = "/login";
export const WORK = "/work";
export const SERVICES = "/services";
export const PROJECT = "/project/:id"; */

// Protected route
export const PROTECTED = "/protected";
export const HOME = "/protected/home";
export const ADD_STOCK = "/protected/add_stock";
export const EXPIRED_PRODUCTS = "/protected/expired_products";
export const ADD_BUG_REPORT = "/protected/add_bug_report";

/* 
export const MESSAGES = "/protected/messages";
export const MESSAGE = "/protected/message/:id";
export const EDIT = "/protected/edit/:id";
export const DELETE = "/protected/delete/:id";
export const PROJECTS_ADMIN = "/protected/projects/";
export const ADD_PROJECT = "/protected/add/";
export const ADMIN = "/protected/admin";
 */


// create routes
export const router = createBrowserRouter([
    { 
      path: ROOT,
      element: <Layout />,
      children: [
        {
            path: LOGIN,
            element: <Login />
        },
        /* {
          path: HOME,
          element: <Home />
        },
        {
            path: ADD_STOCK,
            element: <AddStock />
        },
        {
            path: EXPIRED_PRODUCTS,
            element: <ExpiredProducts />
        }, */
      ]
    },
    { 
      path: PROTECTED,
      element: <AdminIndex />, 
      children: [
        {
            path: HOME,
            element: <Home />
        },
        {
            path: ADD_STOCK,
            element: <AddStock />
        },
        {
            path: EXPIRED_PRODUCTS,
            element: <ExpiredProducts />
        },
        {
            path: ADD_BUG_REPORT,
            element: <SubmitBugReport />
        },
      ],
  },
    { path: "*", element: <Error404 /> }
  ]);

  
  
  export default router;
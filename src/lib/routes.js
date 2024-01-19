import { createBrowserRouter, useParams } from "react-router-dom";
import React from "react";

import Layout from "../components/Layout/Layout";
import Home from "../components/Home/Home";

import Error404 from "../components/Error404/Error404.jsx";

export const ROOT = "/";
export const HOME = "/home";
/* export const ABOUT = "/about";
export const HOME = "/home";
export const CONTACT = "/contact";
export const LOGIN = "/login";
export const WORK = "/work";
export const SERVICES = "/services";
export const PROJECT = "/project/:id"; */

// Protected route
/* export const PROTECTED = "/protected";
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
          path: HOME,
          element: <Home />
        },
        
      ]
    },
    /* { 
      path: PROTECTED,
      element: <AdminIndex />, 
      children: [
        {
          path: ADMIN,
          element: <Admin />
        },
      ],
  }, */
    { path: "*", element: <Error404 /> }
  ]);

  
  
  export default router;
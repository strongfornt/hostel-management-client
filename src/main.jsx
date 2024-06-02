import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router";
import ContextProvider from "./ContextProvider/ContextProvider";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async/lib";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
      <ToastContainer />
    </ContextProvider>
  </React.StrictMode>
);

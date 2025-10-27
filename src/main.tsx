import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import CatalogPage from "@/pages/CatalogPage";
import ItemDetailPage from "@/pages/ItemDetailPage";
import NotFoundPage from "@/pages/NotFoundPage";
import RootLayout from "./App";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <CatalogPage /> },
      { path: "catalog", element: <CatalogPage /> },
      { path: "items/:itemId", element: <ItemDetailPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

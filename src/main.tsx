import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import App from "./App"
import "./index.css"
import CatalogPage from "@/pages/catalog-page"
import ItemDetailPage from "@/pages/item-detail-page"
import NotFoundPage from "@/pages/not-found-page"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<CatalogPage />} />
          <Route path="items/:id" element={<ItemDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { CatalogProvider } from './providers/CatalogProvider'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CatalogProvider>
      <App />
    </CatalogProvider>
  </React.StrictMode>
)

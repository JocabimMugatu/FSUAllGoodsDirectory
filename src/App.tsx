import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/layout/app-layout'
import { CatalogDataProvider } from '@/providers/catalog-data-provider'
import { CatalogPage } from '@/routes/catalog-page'
import { ItemDetailPage } from '@/routes/item-detail-page'

function App() {
  return (
    <CatalogDataProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<CatalogPage />} />
          <Route path="item/:itemId" element={<ItemDetailPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </CatalogDataProvider>
  )
}

export default App

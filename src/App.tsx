import { Routes, Route } from 'react-router-dom'
import { useDb } from './useDb'
import { DbProvider } from './DbContext'
import { Landing } from './pages/Landing'
import { ProductDetail } from './pages/ProductDetail'

function AppContent() {
  const dbValue = useDb()

  return (
    <DbProvider value={dbValue}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
      </Routes>
    </DbProvider>
  )
}

export default function App() {
  return <AppContent />
}

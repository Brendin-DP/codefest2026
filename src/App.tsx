import { Routes, Route } from 'react-router-dom'
import { DbProvider } from './DbContext'
import { useDb } from './useDb'
import { Nav } from './components/Nav'
import { Landing } from './pages/Landing'
import { ProductDetail } from './pages/ProductDetail'

function AppContent() {
  const dbState = useDb()
  return (
    <DbProvider value={dbState}>
      <Nav />
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

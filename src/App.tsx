import { Routes, Route } from 'react-router-dom'
import { DbProvider } from './DbContext'
import { useDb } from './useDb'
import { Nav } from './components/Nav'
import { ScrollToTop } from './components/ScrollToTop'
import { Landing } from './pages/Landing'
import { ProductDetail } from './pages/ProductDetail'

function AppContent() {
  const dbState = useDb()
  return (
    <DbProvider value={dbState}>
      <ScrollToTop />
      <div className="app-layout">
        <Nav />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
          </Routes>
        </main>
      </div>
    </DbProvider>
  )
}

export default function App() {
  return <AppContent />
}

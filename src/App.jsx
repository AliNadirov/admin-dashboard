import { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import NotFound from './pages/NotFound/NotFound'
import Loader from './components/Loader/Loader'

const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'))
const Users = lazy(() => import('./pages/Users/Users'))
const Products = lazy(() => import('./pages/Products/Products'))
const Settings = lazy(() => import('./pages/Settings/Settings'))

function App() {
  useEffect(() => {
    const savedSettings = localStorage.getItem('dashboardSettings')

    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings)

      if (parsedSettings.darkMode) {
        document.body.classList.add('dark')
      } else {
        document.body.classList.remove('dark')
      }
    } else {
      document.body.classList.remove('dark')
    }
  }, [])

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="products" element={<Products />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard/Dashboard'
import Users from './pages/Users/Users'
import Products from './pages/Products/Products'
import Settings from './pages/Settings/Settings'
import NotFound from './pages/NotFound/NotFound'

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
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
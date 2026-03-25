import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import Navbar from '../components/Navbar/Navbar'
import './MainLayout.css'

function MainLayout() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="layout">
      <Sidebar />

      <div className="main-content">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <main className="page-content">
          <Outlet context={{ searchTerm, setSearchTerm }} />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
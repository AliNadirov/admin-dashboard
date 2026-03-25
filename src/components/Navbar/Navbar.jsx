import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar({ searchTerm, setSearchTerm }) {
  const location = useLocation()

  useEffect(() => {
    setSearchTerm('')
  }, [location.pathname, setSearchTerm])

  const isSearchVisible =
    location.pathname === '/users' || location.pathname === '/products'

  const getPlaceholder = () => {
    if (location.pathname === '/users') return 'Search users...'
    if (location.pathname === '/products') return 'Search products...'
    return 'Search...'
  }

  return (
    <header className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-title">Welcome Back</h1>
        <p className="navbar-subtitle">Here is what’s happening today.</p>
      </div>

      <div className="navbar-right">
        {isSearchVisible && (
          <div className="navbar-search">
            <input
              type="text"
              placeholder={getPlaceholder()}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        <button className="navbar-notification" aria-label="Notifications">
          <span className="notification-dot"></span>
          3
        </button>

        <div className="navbar-profile">
          <div className="navbar-avatar">A</div>
          <span className="navbar-name">Arthur</span>
        </div>
      </div>
    </header>
  )
}

export default Navbar
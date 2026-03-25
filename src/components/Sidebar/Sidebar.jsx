import { NavLink } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo-box">AD</div>
        <div>
          <h2 className="sidebar-logo">Admin Dashboard</h2>
          <p className="sidebar-subtitle">Management Panel</p>
        </div>
      </div>

      <nav>
        <ul className="sidebar-menu">
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" className={({ isActive }) => (isActive ? 'active' : '')}>
              Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={({ isActive }) => (isActive ? 'active' : '')}>
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
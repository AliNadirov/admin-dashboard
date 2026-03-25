import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  return (
    <section className="notfound-page">
      <h2>404</h2>
      <p>Page not found.</p>
      <Link to="/" className="back-home">
        Go back home
      </Link>
    </section>
  )
}

export default NotFound
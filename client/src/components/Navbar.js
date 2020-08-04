import React from 'react'
import { Link, useLocation } from 'react-router-dom';

function Navbar() {

  const location = useLocation();

  return (
    <nav class="navbar navbar-light bg-light">
      <div className="container">
        <div className="ml-auto">
          {
            (location.pathname === '/login')
              ?
              <Link to="/register"><button type="button" class="btn btn-outline-secondary">Register</button></Link>
              :
              <Link to="/login"><button type="button" class="btn btn-outline-secondary">Login</button></Link>
          }

        </div>
      </div>
    </nav>
  )
}

export default Navbar
import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../store/auth/actions'
import { Link, useLocation } from 'react-router-dom';

function Navbar(props) {

  const location = useLocation();

  const logoutHandler = () => {
    props.logout()
  }

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <div className="ml-auto">
          {
            (!props.token)
              ?
              (location.pathname === '/login')
                ?
                <Link to="/register"><button type="button" className="btn btn-outline-secondary">Register</button></Link>
                :
                <Link to="/login"><button type="button" className="btn btn-outline-secondary">Login</button></Link>
              :
              <button type="button" className="btn btn-outline-secondary" onClick={logoutHandler}>Logout</button>
          }

        </div>
      </div>
    </nav>
  )
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  }
}

const mapDispatchToProps = {
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
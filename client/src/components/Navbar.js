import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../store/auth/actions'
import { showModal } from '../store/modal/actions'
import { showAlert } from '../store/alert/actions'
import { Link, useLocation } from 'react-router-dom';
import { loader } from '../store/loader/actions'
import axios from 'axios'

function Navbar(props) {

  const location = useLocation();

  const logoutHandler = () => {
    props.logout()
  }

  const deleteAccount = async () => {

    props.loader(true)

    try {
      
      const response = await axios({
        url: '/api/user',
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${props.token}` },
      })

      props.showAlert({
        type: 'success',
        message: response.data.message,
        isShow: true,
      })

      logoutHandler()

    } catch (err) {
      
      props.showAlert({
        type: 'danger',
        message: 'Something went wrong, please try again!',
        isShow: true,
      })

    }

    props.loader(false)

  }

  const openModal = () => {
    props.showModal({
      isShow: true,
      activationFunction: async () => await deleteAccount(),
      message: `Are you sure you want to delete your account?`
    })
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
              <div>
                <button type="button" className="btn btn-outline-danger" onClick={openModal}>Delete account</button>
                <button type="button" className="btn btn-outline-secondary ml-3" onClick={logoutHandler}>Logout</button>
              </div>
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
  showAlert,
  showModal,
  logout,
  loader
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
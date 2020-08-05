import React, { useState } from 'react'
import loginValidator from '../validation/login'
import { connect } from 'react-redux'
import { showAlert } from '../store/alert/actions'
import { loader } from '../store/loader/actions'
import { login } from '../store/auth/actions'
import axios from 'axios'

function Login(props) {

  const [login, setLogin] = useState({
    login: '',
    password: ''
  })

  const changeHandler = event => {
    setLogin({ ...login, [event.target.name]: event.target.value })
  }

  const [validation, setValidation] = useState({
    classLoginInput: '',
    loginErrorMessage: null,

    classPasswordInput: '',
    passwordErrorMessage: null,
  })

  const clearValid = () => {
    setValidation({
      classLoginInput: '',
      loginErrorMessage: null,

      classPasswordInput: '',
      passwordErrorMessage: null,
    })
  }

  const showNotValidData = (data) => {

    if (data.login) {

      setValidation((state) => ({
        ...state,
        classLoginInput: 'is-invalid',
        loginErrorMessage: data.login,
      }))

    }

    if (data.password) {

      setValidation((state) => ({
        ...state,
        classPasswordInput: 'is-invalid',
        passwordErrorMessage: data.password
      }))

    }

  }

  const handleSubmit = async (event) => {

    event.preventDefault()

    props.loader(true)

    clearValid()

    const isValid = loginValidator(login)

    if (!Object.keys(isValid).length) {

      try {

        const data = await axios({
          url: '/api/auth/login',
          method: 'POST',
          data: login
        })

        props.login(data.data.token)

      } catch (err) {
        if (err.response.status === 403) {

          props.showAlert({
            type: 'danger',
            message: err.response.data.message,
            isShow: true,
          })
          
        } else {

          props.showAlert({
            type: 'danger',
            message: 'Something went wrong, please try again!',
            isShow: true,
          })

        }
      }

    } else {

      showNotValidData(isValid)

    }

    props.loader(false)

  }

  return (
    <div className="row mt-5">
      <div className="col col-lg-6 mx-auto">
        <div className="card">
          <div className="card-header">
            <h4 className="mb-0">Login</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="login">Login</label>
                <input
                  id="login"
                  name="login"
                  type="text"
                  className={`form-control ${validation.classLoginInput}`}
                  placeholder="Login"
                  onChange={changeHandler}
                />
                <div className="invalid-feedback">
                  {validation.loginErrorMessage}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className={`form-control ${validation.classPasswordInput}`}
                  placeholder="Password"
                  onChange={changeHandler}
                />
                <div className="invalid-feedback">
                  {validation.passwordErrorMessage}
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  showAlert,
  loader,
  login
}

export default connect(null, mapDispatchToProps)(Login)
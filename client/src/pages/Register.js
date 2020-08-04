import React, { useState } from 'react'
import registerValidator from '../validation/register'
import { useService } from '../hooks/service'
import { connect } from 'react-redux'
import { showAlert } from '../store/alert/actions'
import { loader } from '../store/loader/actions'
import { useHistory } from "react-router"

function Register(props) {

  const [register, setRegister] = useState({
    email: '',
    login: '',
    password: '',
    confirmPassword: ''
  })

  const { request } = useService()

  const history = useHistory()

  const [validation, setValidation] = useState({
    classLoginInput: '',
    loginErrorMessage: null,

    classEmailInput: '',
    emailErrorMessage: null,

    classPasswordInput: '',
    passwordErrorMessage: null,

    classConfirmPasswordInput: '',
    confirmPasswordErrorMessage: null,
  })

  const clearValid = () => {
    setValidation({
      classLoginInput: '',
      loginErrorMessage: null,

      classEmailInput: '',
      emailErrorMessage: null,

      classPasswordInput: '',
      passwordErrorMessage: null,

      classConfirmPasswordInput: '',
      confirmPasswordErrorMessage: null,
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

    if (data.email) {

      setValidation((state) => ({
        ...state,
        classEmailInput: 'is-invalid',
        emailErrorMessage: data.email
      }))

    }

    if (data.password) {

      setValidation((state) => ({
        ...state,
        classPasswordInput: 'is-invalid',
        passwordErrorMessage: data.password
      }))

    }

    if (data.confirmPassword) {

      setValidation((state) => ({
        ...state,
        classConfirmPasswordInput: 'is-invalid',
        confirmPasswordErrorMessage: data.confirmPassword
      }))

    }

  }

  const handleSubmit = async (event) => {

    event.preventDefault()

    props.loader(true)

    clearValid()

    const isValid = registerValidator(register)

    if (!Object.keys(isValid).length) {

      try {

        const data = await request({
          url: '/api/auth/register',
          method: 'POST',
          data: register
        })

        props.showAlert({
          type: 'success',
          message: data.data.message,
          isShow: true,
        })

        history.push("/login")

      } catch (err) {
        if (err.status === 403) {
          showNotValidData(err.data)
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

  const changeHandler = event => {
    setRegister({ ...register, [event.target.name]: event.target.value })
  }

  return (
    <div className="row mt-5">
      <div className="col col-lg-6 mx-auto">
        <div className="card">
          <div className="card-header">
            <h4 className="mb-0">Register</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  className={`form-control ${validation.classEmailInput}`}
                  placeholder="Email"
                  onChange={changeHandler}
                />
                <div className="invalid-feedback">
                  {validation.emailErrorMessage}
                </div>
              </div>
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
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className={`form-control ${validation.classConfirmPasswordInput}`}
                  placeholder="Confirm password"
                  onChange={changeHandler}
                />
                <div className="invalid-feedback">
                  {validation.confirmPasswordErrorMessage}
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
  loader
}

export default connect(null, mapDispatchToProps)(Register)
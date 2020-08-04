import React, { useState } from 'react'
import loginValidator from '../validation/login'
import { useService } from '../hooks/service'

function Login() {

  const [login, setLogin] = useState({
    login: '',
    password: ''
  })

  const { request } = useService()

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

    clearValid()

    const isValid = loginValidator(login)

    if (!Object.keys(isValid).length) {

      try {

        await request({
          url: '/api/auth/login',
          method: 'POST',
          data: login
        })

      } catch (err) {
        if (err.status === 403) {
          
        }
      }

    } else {
      showNotValidData(isValid)
    }

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

export default Login
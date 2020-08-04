import React, { useState } from 'react'

function Login() {

  const [login, setLogin] = useState({
    login: '',
    password: ''
  })

  const changeHandler = event => {
    setLogin({ ...login, [event.target.name]: event.target.value })
  }

  return (
    <div className="row mt-5">
      <div className="col col-lg-6 mx-auto">
        <div className="card">
          <div className="card-header">
            <h4 className="mb-0">Login</h4>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="login">Login</label>
                <input
                  id="login"
                  name="login"
                  type="text"
                  className="form-control"
                  placeholder="Login"
                  onChange={changeHandler}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={changeHandler}
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
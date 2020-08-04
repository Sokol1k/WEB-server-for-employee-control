import React from 'react'

function Register() {
  return (
    <div className="row mt-5">
      <div className="col col-lg-6 mx-auto">
        <div className="card">
          <div className="card-header">
            <h4 className="mb-0">Register</h4>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" type="text" className="form-control" placeholder="Email" />
              </div>
              <div className="form-group">
                <label htmlFor="login">Login</label>
                <input id="login" type="text" className="form-control" placeholder="Login" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" className="form-control" placeholder="Password" />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input id="confirmPassword" type="password" className="form-control" placeholder="Confirm password" />
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from './routes'
import Navbar from './components/Navbar'
import Alert from './components/Alert'
import Loader from './components/Loader'
import { connect } from 'react-redux'
import './styles/app.scss'

function App(props) {
  const routes = useRoutes(!!props.token)
  return (
    <BrowserRouter>
      <Loader />
      <Alert />
      <Navbar />
      <div className="container">
        {routes}
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
  }
}

export default connect(mapStateToProps, null)(App)

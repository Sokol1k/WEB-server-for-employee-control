import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from './routes'
import Navbar from './components/Navbar'
import Alert from './components/Alert'
import './styles/app.scss'

function App() {
  const routes = useRoutes(false)
  return (
    <BrowserRouter>
      <Alert />
      <Navbar />
      <div className="container">
        {routes}
      </div>
    </BrowserRouter>
  );
}

export default App;

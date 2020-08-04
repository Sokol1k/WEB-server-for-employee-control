import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from './routes'
import Navbar from './components/Navbar'
import './styles/app.scss'

function App() {
  const routes = useRoutes(false)
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        {routes}
      </div>
    </BrowserRouter>
  );
}

export default App;

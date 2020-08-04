import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from './routes'
import './styles/app.scss'

function App() {
  const routes = useRoutes(false)
  return (
    <BrowserRouter>
      <div className="container">
        {routes}
      </div>
    </BrowserRouter>
  );
}

export default App;

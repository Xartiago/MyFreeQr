import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from './Routes'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    {/* React router - simple routes */}
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

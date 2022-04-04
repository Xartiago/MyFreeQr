import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/authContext'
import { AppRoutes } from './Routes'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    {/* React Context Api */}
    <AuthProvider>
      {/* React router - simple routes */}
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

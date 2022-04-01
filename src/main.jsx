import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'jotai'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    {/* Jotai Global State */}
    <Provider>
      {/* React router - simple routes */}
      <BrowserRouter>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

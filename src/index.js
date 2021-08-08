import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ContextProvider } from './context/Context'
import axios from 'axios'

axios.defaults.baseURL = 'https://safe-dawn-28691.herokuapp.com/'

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

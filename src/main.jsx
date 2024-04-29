import React from 'react'
import ReactDOM from 'react-dom/client'
import { BandApp } from './BandApp.jsx'
import { SocketProvider } from './Context/SocketContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <SocketProvider>
    <BandApp />
  </SocketProvider>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'

import { AuthProvider } from './context/auth'
import { RelayEnvironmentProvider } from 'react-relay/hooks'
import { RelayEnvironment } from './relay/RelayEnvironment'
import App from './App'

import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </RelayEnvironmentProvider>
  </React.StrictMode >,
)

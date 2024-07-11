import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import ErrorPage from './pages/error'
import RegisterPage from './pages/register'
import LoginPage from './pages/login.tsx'

import './index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { AuthProvider } from './auth.tsx'
import PrivateRoute from './private.tsx'
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import environment from './relay/relayEnvironment.ts'

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><App /></PrivateRoute>,
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={environment}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </RelayEnvironmentProvider>
  </React.StrictMode >,
)

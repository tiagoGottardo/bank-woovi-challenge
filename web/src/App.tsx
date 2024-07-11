import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import HomePage from './pages/home'
import ErrorPage from './pages/error'
import PrivateRoute from './private'

import { Routes, Route, BrowserRouter } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} errorElement={<ErrorPage />} />
        <Route path="/login" element={<LoginPage />} errorElement={<ErrorPage />} />
        <Route path="/register" element={<RegisterPage />} errorElement={<ErrorPage />} />
      </Routes>
    </BrowserRouter >
  )
}

export default App

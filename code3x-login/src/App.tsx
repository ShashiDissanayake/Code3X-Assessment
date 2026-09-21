import { Navigate, Route, Routes } from 'react-router'
import AuthSuccessPage from './pages/AuthSuccessPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/auth-success" element={<AuthSuccessPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ContactsPage from './pages/ContactsPage'
import ProfilePage from './pages/ProfilePage'
import PrivateRoute from './components/PrivateRoute'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contacts" element={<PrivateRoute><ContactsPage /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App 

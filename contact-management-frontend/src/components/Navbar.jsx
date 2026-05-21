import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import LogoutConfirmModal from './LogoutConfirmModal'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const navLink = (path, label) => (
    <Link to={path} style={{
      fontSize: '14px', fontWeight: '500', padding: '6px 12px', borderRadius: '6px',
      textDecoration: 'none',
      color: location.pathname === path ? '#0f172a' : '#64748b',
      background: location.pathname === path ? '#f1f5f9' : 'transparent'
    }}>{label}</Link>
  )

  return (
    <>
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '28px', height: '28px', background: '#3b82f6', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            </svg>
          </div>
          <span style={{ fontWeight: '700', fontSize: '15px', color: '#0f172a' }}>ContactManager</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {navLink('/contacts', 'Contacts')}
          {navLink('/profile', 'Profile')}
          <button onClick={() => setIsLogoutModalOpen(true)} style={{
            marginLeft: '8px', fontSize: '14px', padding: '6px 14px', borderRadius: '6px',
            border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', cursor: 'pointer', fontWeight: '500'
          }}>Logout</button>
        </div>
      </div>

      <LogoutConfirmModal 
        isOpen={isLogoutModalOpen} 
        onClose={() => setIsLogoutModalOpen(false)} 
        onConfirm={handleLogout} 
      />
    </>
  )
}
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { identifier, password })
      localStorage.setItem('token', response.data.token)
      navigate('/contacts')
    } catch {
      setError('Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-transition" style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex' }}>
      {/* Left Panel */}
      <div style={{ width: '420px', background: '#0f172a', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '48px', flexShrink: 0 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '64px' }}>
            <div style={{ width: '32px', height: '32px', background: '#3b82f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              </svg>
            </div>
            <span style={{ color: '#fff', fontWeight: '600', fontSize: '16px' }}>ContactManager</span>
          </div>
          <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: '700', lineHeight: '1.3', marginBottom: '16px' }}>Manage your contacts efficiently</h1>
          <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.6' }}>A clean, fast contact management system built for professionals.</p>
        </div>
        <p style={{ color: '#475569', fontSize: '13px' }}>© 2026 ContactManager</p>
      </div>

      {/* Right Panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
        <div style={{ width: '100%', maxWidth: '380px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>Sign in</h2>
          <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '28px' }}>Enter your credentials to continue</p>

          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Email or Phone</label>
              <input
                type="text"
                placeholder="you@example.com"
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                required
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', outline: 'none', background: '#fff', color: '#0f172a' }}
              />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', outline: 'none', background: '#fff', color: '#0f172a' }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '11px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748b' }}>
            No account?{' '}
            <Link to="/register" style={{ color: '#3b82f6', fontWeight: '500', textDecoration: 'none' }}>Create one</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
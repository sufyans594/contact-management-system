import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

export default function RegisterPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', form)
      localStorage.setItem('token', response.data.token)
      navigate('/contacts')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = { width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', outline: 'none', background: '#fff', color: '#0f172a' }
  const labelStyle = { display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex' }}>
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
          <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: '700', lineHeight: '1.3', marginBottom: '16px' }}>Get started today</h1>
          <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.6' }}>Create your account and start managing contacts professionally.</p>
        </div>
        <p style={{ color: '#475569', fontSize: '13px' }}>© 2026 ContactManager</p>
      </div>

      {/* Right Panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>Create account</h2>
          <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '28px' }}>Fill in your details to get started</p>

          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>First Name</label>
                <input name="firstName" type="text" placeholder="John" value={form.firstName} onChange={handleChange} required style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Last Name</label>
                <input name="lastName" type="text" placeholder="Doe" value={form.lastName} onChange={handleChange} required style={inputStyle} />
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Email</label>
              <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Phone</label>
              <input name="phone" type="text" placeholder="+92 300 0000000" value={form.phone} onChange={handleChange} style={inputStyle} />
            </div>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '16px' }}>At least one of email or phone is required.</p>
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>Password</label>
              <input name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} required style={inputStyle} />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '11px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748b' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#3b82f6', fontWeight: '500', textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
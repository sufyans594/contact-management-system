import React, { useState, useEffect } from 'react'
import axiosInstance from '../api/axiosInstance'
import Navbar from '../components/Navbar'

export default function ProfilePage() {
  const [profile, setProfile] = useState(null)
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' })
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    axiosInstance.get('/api/auth/me').then(r => setProfile(r.data)).catch(console.error)
  }, [])

  const submitPasswordChange = async (e) => {
    e.preventDefault()
    setMessage(''); setError('')
    try {
      await axiosInstance.post('/api/auth/change-password', passwords)
      setMessage('Password updated successfully')
      setPasswords({ currentPassword: '', newPassword: '' })
      setShowPasswordForm(false)
    } catch (err) {
      setError(err.response?.data || 'Failed to change password')
    }
  }

  const inputStyle = { width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', outline: 'none', background: '#fff', marginBottom: '16px' }
  const card = { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', marginBottom: '16px' }

  if (!profile) return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Navbar />
      <p style={{ textAlign: 'center', marginTop: '80px', color: '#94a3b8', fontSize: '14px' }}>Loading...</p>
    </div>
  )

  const initials = `${profile.firstName?.[0] || ''}${profile.lastName?.[0] || ''}`.toUpperCase()

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Navbar />
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '32px 24px' }}>

        <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', marginBottom: '24px' }}>My Profile</h1>

        {/* Avatar + Name */}
        <div style={{ ...card, display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '700', color: '#fff', flexShrink: 0 }}>
            {initials}
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a' }}>{profile.firstName} {profile.lastName}</div>
            <div style={{ fontSize: '14px', color: '#64748b', marginTop: '2px' }}>{profile.email || profile.phone}</div>
          </div>
        </div>

        {/* Details */}
        <div style={card}>
          <h2 style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a', marginBottom: '16px' }}>Account Details</h2>
          {[
            { label: 'First Name', value: profile.firstName },
            { label: 'Last Name', value: profile.lastName },
            { label: 'Email', value: profile.email || '—' },
            { label: 'Phone', value: profile.phone || '—' },
          ].map((row, i, arr) => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < arr.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
              <span style={{ fontSize: '14px', color: '#64748b' }}>{row.label}</span>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#0f172a' }}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* Password */}
        <div style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: showPasswordForm ? '20px' : '0' }}>
            <h2 style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>Password</h2>
            {!showPasswordForm && (
              <button onClick={() => setShowPasswordForm(true)} style={{ padding: '7px 14px', border: '1px solid #e2e8f0', borderRadius: '7px', background: '#fff', fontSize: '13px', color: '#374151', cursor: 'pointer', fontWeight: '500' }}>
                Change Password
              </button>
            )}
          </div>

          {message && <p style={{ fontSize: '13px', color: '#16a34a', marginBottom: '12px' }}>{message}</p>}
          {error && <p style={{ fontSize: '13px', color: '#dc2626', marginBottom: '12px' }}>{error}</p>}

          {showPasswordForm && (
            <form onSubmit={submitPasswordChange}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Current Password</label>
              <input type="password" name="currentPassword" value={passwords.currentPassword} onChange={e => setPasswords({ ...passwords, currentPassword: e.target.value })} required style={inputStyle} />
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>New Password</label>
              <input type="password" name="newPassword" value={passwords.newPassword} onChange={e => setPasswords({ ...passwords, newPassword: e.target.value })} required style={inputStyle} />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" style={{ padding: '9px 18px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Update</button>
                <button type="button" onClick={() => { setShowPasswordForm(false); setError(''); setMessage('') }} style={{ padding: '9px 18px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', fontSize: '14px', color: '#64748b', cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
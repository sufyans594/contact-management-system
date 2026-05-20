import React, { useState, useEffect } from 'react'

const LABELS = ['work', 'personal', 'home', 'other']

const overlay = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '20px' }
const modal = { background: '#fff', borderRadius: '12px', width: '100%', maxWidth: '480px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }
const inputStyle = { width: '100%', padding: '9px 12px', border: '1px solid #e2e8f0', borderRadius: '7px', fontSize: '14px', outline: 'none', background: '#fff' }
const selectStyle = { padding: '9px 10px', border: '1px solid #e2e8f0', borderRadius: '7px', fontSize: '13px', outline: 'none', background: '#fff' }

export default function ContactModal({ isOpen, onClose, onSave, contact }) {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', title: '', emails: [], phones: [] })

  useEffect(() => {
    if (contact) {
      setFormData({ firstName: contact.firstName || '', lastName: contact.lastName || '', title: contact.title || '', emails: contact.emails ? [...contact.emails] : [], phones: contact.phones ? [...contact.phones] : [] })
    } else {
      setFormData({ firstName: '', lastName: '', title: '', emails: [], phones: [] })
    }
  }, [contact, isOpen])

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleArrayChange = (index, field, value, type) => {
    const updated = [...formData[type]]
    updated[index][field] = value
    setFormData({ ...formData, [type]: updated })
  }

  const addItem = (type) => setFormData({ ...formData, [type]: [...formData[type], type === 'emails' ? { email: '', label: 'work' } : { phoneNumber: '', label: 'work' }] })
  const removeItem = (index, type) => setFormData({ ...formData, [type]: formData[type].filter((_, i) => i !== index) })

  if (!isOpen) return null

  return (
    <div style={overlay}>
      <div style={modal}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a' }}>{contact ? 'Edit Contact' : 'New Contact'}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '20px', lineHeight: 1 }}>✕</button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSave(formData) }} style={{ padding: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required style={inputStyle} placeholder="John" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required style={inputStyle} placeholder="Doe" />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} style={inputStyle} placeholder="e.g. Software Engineer" />
          </div>

          {/* Emails */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Addresses</label>
              <button type="button" onClick={() => addItem('emails')} style={{ fontSize: '12px', color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' }}>+ Add</button>
            </div>
            {formData.emails.map((email, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                <input type="email" placeholder="email@example.com" value={email.email} onChange={e => handleArrayChange(idx, 'email', e.target.value, 'emails')} required style={{ ...inputStyle, flex: 1 }} />
                <select value={email.label} onChange={e => handleArrayChange(idx, 'label', e.target.value, 'emails')} style={selectStyle}>
                  {LABELS.map(l => <option key={l}>{l}</option>)}
                </select>
                <button type="button" onClick={() => removeItem(idx, 'emails')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '16px' }}>✕</button>
              </div>
            ))}
          </div>

          {/* Phones */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone Numbers</label>
              <button type="button" onClick={() => addItem('phones')} style={{ fontSize: '12px', color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' }}>+ Add</button>
            </div>
            {formData.phones.map((phone, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                <input type="text" placeholder="+92 300 0000000" value={phone.phoneNumber} onChange={e => handleArrayChange(idx, 'phoneNumber', e.target.value, 'phones')} required style={{ ...inputStyle, flex: 1 }} />
                <select value={phone.label} onChange={e => handleArrayChange(idx, 'label', e.target.value, 'phones')} style={selectStyle}>
                  {LABELS.map(l => <option key={l}>{l}</option>)}
                </select>
                <button type="button" onClick={() => removeItem(idx, 'phones')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '16px' }}>✕</button>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', fontSize: '14px', color: '#374151', cursor: 'pointer', fontWeight: '500' }}>Cancel</button>
            <button type="submit" style={{ flex: 1, padding: '10px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Save Contact</button>
          </div>
        </form>
      </div>
    </div>
  )
}
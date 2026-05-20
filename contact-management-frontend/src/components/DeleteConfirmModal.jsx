import React from 'react'

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, contactName }) {
  if (!isOpen) return null

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '20px' }}>
      <div style={{ background: '#fff', borderRadius: '12px', padding: '28px', width: '100%', maxWidth: '380px', boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}>
        <div style={{ width: '44px', height: '44px', background: '#fef2f2', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
          <svg width="20" height="20" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
          </svg>
        </div>
        <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a', marginBottom: '8px' }}>Delete Contact</h2>
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px', lineHeight: '1.5' }}>
          Are you sure you want to delete <strong style={{ color: '#0f172a' }}>{contactName}</strong>? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', fontSize: '14px', color: '#374151', cursor: 'pointer', fontWeight: '500' }}>Cancel</button>
          <button onClick={onConfirm} style={{ flex: 1, padding: '10px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Delete</button>
        </div>
      </div>
    </div>
  )
}
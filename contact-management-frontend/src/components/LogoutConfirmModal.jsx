import React from 'react'

export default function LogoutConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.3)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', width: '100%', maxWidth: '380px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', border: '1px solid #f1f5f9' }}>
        <div style={{ width: '48px', height: '48px', background: '#fef3c7', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
          <svg width="24" height="24" fill="none" stroke="#d97706" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </div>
        <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>Log Out</h2>
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px', lineHeight: '1.5' }}>
          Are you sure you want to log out?
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={onClose} 
            style={{ 
              flex: 1, 
              padding: '10px 16px', 
              border: '1px solid #e2e8f0', 
              borderRadius: '8px', 
              background: '#fff', 
              fontSize: '14px', 
              color: '#334155', 
              cursor: 'pointer', 
              fontWeight: '600',
              transition: 'all 0.2s' 
            }}
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            style={{ 
              flex: 1, 
              padding: '10px 16px', 
              background: '#d97706', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '8px', 
              fontSize: '14px', 
              fontWeight: '600', 
              cursor: 'pointer',
              transition: 'all 0.2s' 
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}

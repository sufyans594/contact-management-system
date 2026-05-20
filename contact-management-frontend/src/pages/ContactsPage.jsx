import React, { useState, useEffect } from 'react'
import axiosInstance from '../api/axiosInstance'
import Navbar from '../components/Navbar'
import ContactModal from '../components/ContactModal'
import DeleteConfirmModal from '../components/DeleteConfirmModal'

export default function ContactsPage() {
  const [contacts, setContacts] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [search, setSearch] = useState('')
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [contactToDelete, setContactToDelete] = useState(null)

  const fetchContacts = async () => {
    try {
      const response = await axiosInstance.get(`/api/contacts?page=${page}&size=10&search=${search}`)
      setContacts(response.data.content || [])
      setTotalPages(response.data.totalPages || 0)
    } catch (error) {
      console.error('Error fetching contacts', error)
    }
  }

  useEffect(() => { fetchContacts() }, [page, search])

  const handleSaveContact = async (formData) => {
    try {
      if (selectedContact) {
        await axiosInstance.put(`/api/contacts/${selectedContact.id}`, formData)
      } else {
        await axiosInstance.post('/api/contacts', formData)
      }
      setIsContactModalOpen(false)
      setSelectedContact(null)
      fetchContacts()
    } catch {
      alert('Failed to save contact')
    }
  }

  const handleConfirmDelete = async () => {
    try {
      await axiosInstance.delete(`/api/contacts/${contactToDelete.id}`)
      setIsDeleteModalOpen(false)
      setContactToDelete(null)
      fetchContacts()
    } catch {
      alert('Failed to delete contact')
    }
  }

  const getInitials = (c) => `${c.firstName?.[0] || ''}${c.lastName?.[0] || ''}`.toUpperCase()

  const avatarColors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4']
  const getColor = (name) => avatarColors[name.charCodeAt(0) % avatarColors.length]

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Navbar />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>Contacts</h1>
            <p style={{ fontSize: '14px', color: '#64748b' }}>{contacts.length} contacts total</p>
          </div>
          <button
            onClick={() => { setSelectedContact(null); setIsContactModalOpen(true) }}
            style={{ padding: '9px 18px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            + Add Contact
          </button>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search contacts..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(0) }}
            style={{ width: '100%', padding: '10px 14px 10px 38px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', outline: 'none', background: '#fff' }}
          />
        </div>

        {/* Table */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', padding: '10px 20px', borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</span>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Title</span>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Actions</span>
          </div>

          {contacts.length > 0 ? contacts.map((c, i) => (
            <div key={c.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', padding: '14px 20px', borderBottom: i < contacts.length - 1 ? '1px solid #f1f5f9' : 'none', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: getColor(c.firstName || 'A'), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '600', color: '#fff', flexShrink: 0 }}>
                  {getInitials(c)}
                </div>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#0f172a' }}>{c.firstName} {c.lastName}</span>
              </div>
              <span style={{ fontSize: '14px', color: '#64748b' }}>{c.title || '—'}</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => { setSelectedContact(c); setIsContactModalOpen(true) }}
                  style={{ padding: '6px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', background: '#fff', fontSize: '13px', color: '#374151', cursor: 'pointer', fontWeight: '500' }}
                >Edit</button>
                <button
                  onClick={() => { setContactToDelete(c); setIsDeleteModalOpen(true) }}
                  style={{ padding: '6px 12px', border: '1px solid #fecaca', borderRadius: '6px', background: '#fff', fontSize: '13px', color: '#ef4444', cursor: 'pointer', fontWeight: '500' }}
                >Delete</button>
              </div>
            </div>
          )) : (
            <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
              No contacts found
            </div>
          )}
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            style={{ padding: '8px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', fontSize: '14px', color: page === 0 ? '#cbd5e1' : '#374151', cursor: page === 0 ? 'not-allowed' : 'pointer' }}
          >← Previous</button>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Page {page + 1} of {Math.max(1, totalPages)}</span>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage(page + 1)}
            style={{ padding: '8px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', fontSize: '14px', color: page >= totalPages - 1 ? '#cbd5e1' : '#374151', cursor: page >= totalPages - 1 ? 'not-allowed' : 'pointer' }}
          >Next →</button>
        </div>
      </div>

      <ContactModal isOpen={isContactModalOpen} onClose={() => { setIsContactModalOpen(false); setSelectedContact(null) }} onSave={handleSaveContact} contact={selectedContact} />
      <DeleteConfirmModal isOpen={isDeleteModalOpen} onClose={() => { setIsDeleteModalOpen(false); setContactToDelete(null) }} onConfirm={handleConfirmDelete} contactName={contactToDelete ? `${contactToDelete.firstName} ${contactToDelete.lastName}` : ''} />
    </div>
  )
}
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../App'

const TABS = ['Overview', 'Products', 'Messages', 'Customers', 'Contact Forms', 'Customer Photos']

export default function AdminDashboard() {
  const { profile } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Overview')
  const [stats, setStats] = useState({ products: 0, messages: 0, customers: 0, contacts: 0 })
  const [products, setProducts] = useState([])
  const [messages, setMessages] = useState([])
  const [customers, setCustomers] = useState([])
  const [contacts, setContacts] = useState([])
  const [photos, setPhotos] = useState([])
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState({ show: false, msg: '', type: 'success' })

  // Product form
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [productForm, setProductForm] = useState({
    name: '', description: '', category: 'Grillz',
    style: '', material: '', base_price: '',
    price_per_tooth: '', image_url: '', in_stock: true,
  })
  const [savingProduct, setSavingProduct] = useState(false)

  // Active message thread
  const [activeCustomer, setActiveCustomer] = useState(null)
  const [threadMessages, setThreadMessages] = useState([])
  const [replyText, setReplyText] = useState('')
  const [sendingReply, setSendingReply] = useState(false)

  useEffect(() => {
    fetchAll()
  }, [])

  async function fetchAll() {
    setLoading(true)
    const [p, m, c, cf, ph] = await Promise.all([
      supabase.from('products').select('*').order('created_at', { ascending: false }),
      supabase.from('messages').select('*, profiles(full_name, email)').order('created_at', { ascending: false }),
      supabase.from('profiles').select('*').eq('is_admin', false).order('created_at', { ascending: false }),
      supabase.from('contact_forms').select('*').order('created_at', { ascending: false }),
      supabase.from('customer_photos').select('*').order('sort_order', { ascending: true }),
    ])
    setProducts(p.data || [])
    setMessages(m.data || [])
    setCustomers(c.data || [])
    setContacts(cf.data || [])
    setPhotos(ph.data || [])
    setStats({
      products: p.data?.length || 0,
      messages: m.data?.filter(msg => !msg.is_admin && !msg.read).length || 0,
      customers: c.data?.length || 0,
      contacts: cf.data?.length || 0,
    })
    setLoading(false)
  }

  function showToast(msg, type = 'success') {
    setToast({ show: true, msg, type })
    setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 3500)
  }

  // ── PRODUCT FUNCTIONS ──
  function openAddProduct() {
    setEditingProduct(null)
    setProductForm({
      name: '', description: '', category: 'Grillz',
      style: '', material: '', base_price: '',
      price_per_tooth: '', image_url: '', in_stock: true,
    })
    setShowProductForm(true)
  }

  function openEditProduct(product) {
    setEditingProduct(product)
    setProductForm({
      name: product.name || '',
      description: product.description || '',
      category: product.category || 'Grillz',
      style: product.style || '',
      material: product.material || '',
      base_price: product.base_price || '',
      price_per_tooth: product.price_per_tooth || '',
      image_url: product.image_url || '',
      in_stock: product.in_stock ?? true,
    })
    setShowProductForm(true)
  }

  async function handleSaveProduct(e) {
    e.preventDefault()
    setSavingProduct(true)
    const payload = {
      ...productForm,
      base_price: parseFloat(productForm.base_price),
      price_per_tooth: productForm.price_per_tooth ? parseFloat(productForm.price_per_tooth) : null,
    }
    let error
    if (editingProduct) {
      const res = await supabase.from('products').update(payload).eq('id', editingProduct.id)
      error = res.error
    } else {
      const res = await supabase.from('products').insert(payload)
      error = res.error
    }
    setSavingProduct(false)
    if (error) {
      showToast('Failed to save product.', 'error')
    } else {
      showToast(editingProduct ? 'Product updated! ✦' : 'Product added! ✦')
      setShowProductForm(false)
      fetchAll()
    }
  }

  async function handleDeleteProduct(id) {
    if (!window.confirm('Delete this product?')) return
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) {
      showToast('Failed to delete.', 'error')
    } else {
      showToast('Product deleted.')
      fetchAll()
    }
  }

  // ── MESSAGE FUNCTIONS ──
  function getUniqueCustomers() {
    const seen = new Set()
    return messages.filter(m => {
      if (!m.is_admin && !seen.has(m.sender_id)) {
        seen.add(m.sender_id)
        return true
      }
      return false
    })
  }

  async function openThread(customerId) {
    setActiveCustomer(customerId)
    const thread = messages.filter(m => m.sender_id === customerId)
    setThreadMessages(thread.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)))

    // Mark all customer messages in this thread as read
    await supabase
      .from('messages')
      .update({ read: true })
      .eq('sender_id', customerId)
      .eq('is_admin', false)
      .eq('read', false)

    // Refresh stats so unread badge updates
    fetchAll()
  }

  async function handleReply(e) {
    e.preventDefault()
    if (!replyText.trim()) return
    setSendingReply(true)
    const { error } = await supabase.from('messages').insert({
      sender_id: activeCustomer,
      is_admin: true,
      message: replyText.trim(),
      read: false,
    })
    if (error) {
      showToast('Failed to send reply.', 'error')
    } else {
      showToast('Reply sent! ✦')
      setReplyText('')
      fetchAll()
      openThread(activeCustomer)
    }
    setSendingReply(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/')
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#060606', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="spinner" />
    </div>
  )

  const uniqueCustomers = getUniqueCustomers()

  return (
    <div style={{ minHeight: '100vh', background: '#060606', display: 'flex' }}>

      {/* ── SIDEBAR ── */}
      <div style={{
        width: '240px', flexShrink: 0,
        background: '#0A0A0A',
        borderRight: '1px solid rgba(201,162,39,0.1)',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, bottom: 0,
        zIndex: 50, overflowY: 'auto',
      }}>
        {/* Logo */}
        <div style={{
          padding: '2rem 1.5rem',
          borderBottom: '1px solid rgba(201,162,39,0.08)',
        }}>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1.3rem', fontWeight: 300,
            color: '#C9A227', letterSpacing: '0.1em',
          }}>LAILA'S</div>
          <div style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.5rem', letterSpacing: '0.4em',
            color: '#7A7060', textTransform: 'uppercase',
            marginTop: '2px',
          }}>Admin Panel</div>
        </div>

        {/* Nav */}
        <nav style={{ padding: '1.5rem 0', flex: 1 }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              width: '100%', background: 'none', border: 'none',
              padding: '0.9rem 1.5rem',
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.7rem', letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: activeTab === tab ? '#C9A227' : '#7A7060',
              cursor: 'pointer', transition: 'all 0.2s',
              borderLeft: activeTab === tab ? '2px solid #C9A227' : '2px solid transparent',
              background: activeTab === tab ? 'rgba(201,162,39,0.04)' : 'transparent',
            }}
              onMouseEnter={e => { if (activeTab !== tab) e.currentTarget.style.color = '#B0A890' }}
              onMouseLeave={e => { if (activeTab !== tab) e.currentTarget.style.color = '#7A7060' }}
            >
              <span>{tab}</span>
              {tab === 'Messages' && stats.messages > 0 && (
                <span style={{
                  background: '#C9A227', color: '#080808',
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.6rem', fontWeight: 600,
                  padding: '0.15rem 0.5rem', borderRadius: '10px',
                  minWidth: '20px', textAlign: 'center',
                }}>{stats.messages}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div style={{
          padding: '1.5rem',
          borderTop: '1px solid rgba(201,162,39,0.08)',
        }}>
          <div style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.7rem', color: '#7A7060',
            marginBottom: '0.8rem', letterSpacing: '0.05em',
          }}>{profile?.full_name || 'Admin'}</div>
          <button onClick={handleLogout} style={{
            width: '100%', background: 'none',
            border: '1px solid rgba(201,162,39,0.15)',
            color: '#7A7060', padding: '0.6rem',
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.65rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', cursor: 'pointer',
            transition: 'all 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = '#C9A227'; e.currentTarget.style.borderColor = 'rgba(201,162,39,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#7A7060'; e.currentTarget.style.borderColor = 'rgba(201,162,39,0.15)' }}
          >Sign Out</button>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ marginLeft: '240px', flex: 1, padding: '3rem', minWidth: 0 }}>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === 'Overview' && (
          <div>
            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '2.5rem', fontWeight: 300,
              color: '#EDE8DC', marginBottom: '0.5rem',
            }}>Dashboard</h1>
            <p style={{
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.75rem', color: '#7A7060',
              marginBottom: '3rem',
            }}>Welcome back, {profile?.full_name || 'Admin'}</p>

            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1px', background: 'rgba(201,162,39,0.06)',
              marginBottom: '3rem',
            }}>
              {[
                { label: 'Total Products', value: stats.products, icon: '💎', tab: 'Products' },
                { label: 'Unread Messages', value: stats.messages, icon: '✉', tab: 'Messages' },
                { label: 'Customers', value: stats.customers, icon: '👥', tab: 'Customers' },
                { label: 'Contact Forms', value: stats.contacts, icon: '📋', tab: 'Contact Forms' },
              ].map(({ label, value, icon, tab }) => (
                <div key={label}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    background: '#0A0A0A', padding: '2rem',
                    cursor: 'pointer', transition: 'background 0.3s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#0E0E0E'}
                  onMouseLeave={e => e.currentTarget.style.background = '#0A0A0A'}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.8rem' }}>{icon}</div>
                  <div style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '2.5rem', fontWeight: 300,
                    color: '#C9A227', lineHeight: 1,
                    marginBottom: '0.3rem',
                  }}>{value}</div>
                  <div style={{
                    fontFamily: 'Josefin Sans, sans-serif',
                    fontSize: '0.65rem', letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: '#7A7060',
                  }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div style={{
              background: '#0A0A0A',
              border: '1px solid rgba(201,162,39,0.08)',
              padding: '2rem',
            }}>
              <div style={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.65rem', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: '#C9A227',
                marginBottom: '1.5rem',
              }}>Quick Actions</div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={() => { setActiveTab('Products'); openAddProduct() }} style={{
                  background: '#C9A227', color: '#080808', border: 'none',
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.7rem', letterSpacing: '0.2em',
                  textTransform: 'uppercase', padding: '0.8rem 1.5rem',
                  cursor: 'pointer', transition: 'background 0.3s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F0D060'}
                  onMouseLeave={e => e.currentTarget.style.background = '#C9A227'}
                >+ Add Product</button>
                <button onClick={() => setActiveTab('Messages')} style={{
                  background: 'transparent', color: '#C9A227',
                  border: '1px solid rgba(201,162,39,0.3)',
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.7rem', letterSpacing: '0.2em',
                  textTransform: 'uppercase', padding: '0.8rem 1.5rem',
                  cursor: 'pointer', transition: 'all 0.3s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,162,39,0.05)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >View Messages</button>
              </div>
            </div>
          </div>
        )}

        {/* ── PRODUCTS TAB ── */}
        {activeTab === 'Products' && (
          <div>
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', marginBottom: '2.5rem',
              flexWrap: 'wrap', gap: '1rem',
            }}>
              <div>
                <h2 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '2rem', fontWeight: 300, color: '#EDE8DC',
                }}>Products</h2>
                <p style={{
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.72rem', color: '#7A7060', marginTop: '0.3rem',
                }}>{products.length} products total</p>
              </div>
              <button onClick={openAddProduct} style={{
                background: '#C9A227', color: '#080808', border: 'none',
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.7rem', letterSpacing: '0.2em',
                textTransform: 'uppercase', padding: '0.9rem 1.8rem',
                cursor: 'pointer', transition: 'background 0.3s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#F0D060'}
                onMouseLeave={e => e.currentTarget.style.background = '#C9A227'}
              >+ Add Product</button>
            </div>

            {products.length === 0 ? (
              <div style={{
                textAlign: 'center', padding: '5rem',
                border: '1px solid rgba(201,162,39,0.08)',
              }}>
                <div style={{ fontSize: '2.5rem', opacity: 0.2, marginBottom: '1rem' }}>💎</div>
                <p style={{ fontFamily: 'Josefin Sans, sans-serif', color: '#7A7060' }}>
                  No products yet. Add your first product!
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(201,162,39,0.06)' }}>
                {products.map(product => (
                  <div key={product.id} style={{
                    background: '#0A0A0A',
                    display: 'grid',
                    gridTemplateColumns: '60px 1fr auto',
                    gap: '1.5rem', alignItems: 'center',
                    padding: '1.2rem 1.5rem',
                    transition: 'background 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = '#0E0E0E'}
                    onMouseLeave={e => e.currentTarget.style.background = '#0A0A0A'}
                  >
                    <div style={{
                      width: '60px', height: '60px',
                      background: product.image_url
                        ? `url(${product.image_url}) center/cover no-repeat`
                        : 'linear-gradient(135deg, #161616, #1E1800)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '1px solid rgba(201,162,39,0.1)',
                    }}>
                      {!product.image_url && <span style={{ opacity: 0.3 }}>💎</span>}
                    </div>

                    <div>
                      <div style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: '1.1rem', color: '#EDE8DC', marginBottom: '0.2rem',
                      }}>{product.name}</div>
                      <div style={{
                        fontFamily: 'Josefin Sans, sans-serif',
                        fontSize: '0.68rem', color: '#7A7060',
                        letterSpacing: '0.1em',
                        display: 'flex', gap: '1rem', flexWrap: 'wrap',
                      }}>
                        <span>{product.material}</span>
                        {product.style && <span>· {product.style}</span>}
                        <span style={{ color: '#C9A227' }}>${product.base_price}</span>
                        <span style={{ color: product.in_stock ? '#27AE60' : '#C0392B' }}>
                          {product.in_stock ? '● In Stock' : '● Out of Stock'}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => openEditProduct(product)} style={{
                        background: 'transparent', color: '#C9A227',
                        border: '1px solid rgba(201,162,39,0.25)',
                        fontFamily: 'Josefin Sans, sans-serif',
                        fontSize: '0.62rem', letterSpacing: '0.15em',
                        textTransform: 'uppercase', padding: '0.5rem 1rem',
                        cursor: 'pointer', transition: 'all 0.2s',
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,162,39,0.05)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >Edit</button>
                      <button onClick={() => handleDeleteProduct(product.id)} style={{
                        background: 'transparent', color: '#7A7060',
                        border: '1px solid rgba(122,112,96,0.2)',
                        fontFamily: 'Josefin Sans, sans-serif',
                        fontSize: '0.62rem', letterSpacing: '0.15em',
                        textTransform: 'uppercase', padding: '0.5rem 1rem',
                        cursor: 'pointer', transition: 'all 0.2s',
                      }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#C0392B'; e.currentTarget.style.borderColor = 'rgba(192,57,43,0.3)' }}
                        onMouseLeave={e => { e.currentTarget.style.color = '#7A7060'; e.currentTarget.style.borderColor = 'rgba(122,112,96,0.2)' }}
                      >Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── MESSAGES TAB ── */}
        {activeTab === 'Messages' && (
          <div>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '2rem', fontWeight: 300,
              color: '#EDE8DC', marginBottom: '2rem',
            }}>Customer Messages</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1px', background: 'rgba(201,162,39,0.06)', minHeight: '500px' }}>
              <div style={{ background: '#0A0A0A', overflowY: 'auto' }}>
                {uniqueCustomers.length === 0 ? (
                  <div style={{ padding: '3rem', textAlign: 'center' }}>
                    <p style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.75rem', color: '#7A7060' }}>No messages yet</p>
                  </div>
                ) : uniqueCustomers.map(msg => {
                  const unread = messages.filter(m => m.sender_id === msg.sender_id && !m.is_admin && !m.read).length
                  return (
                    <div key={msg.sender_id}
                      onClick={() => openThread(msg.sender_id)}
                      style={{
                        padding: '1.2rem 1.5rem',
                        borderBottom: '1px solid rgba(201,162,39,0.06)',
                        cursor: 'pointer',
                        background: activeCustomer === msg.sender_id ? 'rgba(201,162,39,0.06)' : 'transparent',
                        transition: 'background 0.2s',
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'space-between', gap: '0.5rem',
                      }}
                      onMouseEnter={e => { if (activeCustomer !== msg.sender_id) e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
                      onMouseLeave={e => { if (activeCustomer !== msg.sender_id) e.currentTarget.style.background = 'transparent' }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <div style={{
                          fontFamily: 'Josefin Sans, sans-serif',
                          fontSize: '0.78rem', color: '#EDE8DC',
                          letterSpacing: '0.05em', marginBottom: '0.2rem',
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>{msg.profiles?.full_name || 'Customer'}</div>
                        <div style={{
                          fontFamily: 'Josefin Sans, sans-serif',
                          fontSize: '0.65rem', color: '#7A7060',
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>{msg.message.substring(0, 40)}...</div>
                      </div>
                      {unread > 0 && (
                        <span style={{
                          background: '#C9A227', color: '#080808',
                          fontSize: '0.6rem', fontWeight: 600,
                          padding: '0.15rem 0.5rem', borderRadius: '10px',
                          flexShrink: 0,
                        }}>{unread}</span>
                      )}
                    </div>
                  )
                })}
              </div>

              <div style={{ background: '#080808', display: 'flex', flexDirection: 'column' }}>
                {!activeCustomer ? (
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.75rem', color: '#7A7060' }}>
                      Select a conversation to view
                    </p>
                  </div>
                ) : (
                  <>
                    <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid rgba(201,162,39,0.08)' }}>
                      <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.75rem', color: '#EDE8DC' }}>
                        {threadMessages[0]?.profiles?.full_name || 'Customer'}
                      </div>
                      <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.65rem', color: '#7A7060', marginTop: '0.2rem' }}>
                        {threadMessages[0]?.profiles?.email || ''}
                      </div>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {threadMessages.map(msg => (
                        <div key={msg.id} style={{ display: 'flex', justifyContent: msg.is_admin ? 'flex-end' : 'flex-start' }}>
                          <div style={{
                            maxWidth: '75%',
                            background: msg.is_admin ? '#C9A227' : '#161616',
                            color: msg.is_admin ? '#080808' : '#EDE8DC',
                            padding: '0.8rem 1.1rem',
                            border: msg.is_admin ? 'none' : '1px solid rgba(201,162,39,0.1)',
                            fontFamily: 'Josefin Sans, sans-serif',
                            fontSize: '0.82rem', fontWeight: 300,
                            lineHeight: 1.7, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                          }}>
                            {msg.is_admin && (
                              <div style={{ fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.3rem', opacity: 0.7 }}>
                                You (Admin)
                              </div>
                            )}
                            {msg.message}
                            <div style={{ fontSize: '0.6rem', marginTop: '0.4rem', opacity: 0.6, textAlign: 'right' }}>
                              {new Date(msg.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(201,162,39,0.08)' }}>
                      <form onSubmit={handleReply} style={{ display: 'flex', gap: '0.8rem' }}>
                        <textarea
                          value={replyText}
                          onChange={e => setReplyText(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleReply(e) } }}
                          placeholder="Type your reply..."
                          rows={2}
                          style={{
                            flex: 1, background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(201,162,39,0.15)',
                            color: '#EDE8DC', padding: '0.8rem 1rem',
                            fontFamily: 'Josefin Sans, sans-serif',
                            fontSize: '0.82rem', fontWeight: 300,
                            outline: 'none', resize: 'none', transition: 'border-color 0.3s',
                          }}
                          onFocus={e => e.target.style.borderColor = 'rgba(201,162,39,0.5)'}
                          onBlur={e => e.target.style.borderColor = 'rgba(201,162,39,0.15)'}
                        />
                        <button type="submit" disabled={sendingReply || !replyText.trim()} style={{
                          background: replyText.trim() ? '#C9A227' : 'rgba(201,162,39,0.2)',
                          color: replyText.trim() ? '#080808' : '#7A7060',
                          border: 'none', padding: '0 1.2rem',
                          fontFamily: 'Josefin Sans, sans-serif',
                          fontSize: '0.65rem', letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          cursor: replyText.trim() ? 'pointer' : 'not-allowed',
                          transition: 'all 0.3s', flexShrink: 0,
                        }}>Send</button>
                      </form>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── CUSTOMERS TAB ── */}
        {activeTab === 'Customers' && (
          <div>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '2rem', fontWeight: 300,
              color: '#EDE8DC', marginBottom: '2rem',
            }}>Customers ({customers.length})</h2>

            {customers.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '5rem', border: '1px solid rgba(201,162,39,0.08)' }}>
                <p style={{ fontFamily: 'Josefin Sans, sans-serif', color: '#7A7060' }}>No customers yet</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(201,162,39,0.06)' }}>
                <div style={{ background: '#0E0E0E', padding: '0.8rem 1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '1rem' }}>
                  {['Name', 'Email', 'Phone', 'Joined'].map(h => (
                    <div key={h} style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A227' }}>{h}</div>
                  ))}
                </div>
                {customers.map(customer => (
                  <div key={customer.id} style={{
                    background: '#0A0A0A', padding: '1rem 1.5rem',
                    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto',
                    gap: '1rem', alignItems: 'center', transition: 'background 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = '#0E0E0E'}
                    onMouseLeave={e => e.currentTarget.style.background = '#0A0A0A'}
                  >
                    <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.82rem', color: '#EDE8DC' }}>{customer.full_name || '—'}</div>
                    <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.78rem', color: '#7A7060' }}>{customer.email || '—'}</div>
                    <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.78rem', color: '#7A7060' }}>{customer.phone || '—'}</div>
                    <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.68rem', color: '#7A7060' }}>
                      {new Date(customer.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── CONTACT FORMS TAB ── */}
        {activeTab === 'Contact Forms' && (
          <div>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '2rem', fontWeight: 300,
              color: '#EDE8DC', marginBottom: '2rem',
            }}>Contact Forms ({contacts.length})</h2>

            {contacts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '5rem', border: '1px solid rgba(201,162,39,0.08)' }}>
                <p style={{ fontFamily: 'Josefin Sans, sans-serif', color: '#7A7060' }}>No contact forms yet</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {contacts.map(contact => (
                  <div key={contact.id} style={{
                    background: '#0A0A0A', border: '1px solid rgba(201,162,39,0.08)',
                    padding: '1.5rem', transition: 'border-color 0.3s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,162,39,0.2)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(201,162,39,0.08)'}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div>
                        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: '#EDE8DC' }}>{contact.name}</div>
                        <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.72rem', color: '#7A7060', marginTop: '0.2rem' }}>
                          {contact.email} {contact.phone && `· ${contact.phone}`}
                        </div>
                      </div>
                      <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.65rem', color: '#7A7060' }}>
                        {new Date(contact.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                    <div style={{
                      fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.82rem', fontWeight: 300,
                      color: '#7A7060', lineHeight: 1.8,
                      borderLeft: '2px solid rgba(201,162,39,0.2)',
                      paddingLeft: '1rem', whiteSpace: 'pre-wrap',
                    }}>{contact.message}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── CUSTOMER PHOTOS TAB ── */}
        {activeTab === 'Customer Photos' && (
          <div>
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', marginBottom: '2.5rem',
              flexWrap: 'wrap', gap: '1rem',
            }}>
              <div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, color: '#EDE8DC' }}>
                  Customer Photos
                </h2>
                <p style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.72rem', color: '#7A7060', marginTop: '0.3rem' }}>
                  {photos.length} photos · shown as carousel on home page
                </p>
              </div>

              <label style={{
                background: '#C9A227', color: '#080808',
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.7rem', letterSpacing: '0.2em',
                textTransform: 'uppercase', padding: '0.9rem 1.8rem',
                cursor: uploadingPhoto ? 'not-allowed' : 'pointer',
                opacity: uploadingPhoto ? 0.6 : 1,
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                {uploadingPhoto ? (
                  <>
                    <div style={{
                      width: '12px', height: '12px',
                      border: '2px solid rgba(8,8,8,0.3)',
                      borderTopColor: '#080808', borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite',
                    }} />
                    Uploading...
                  </>
                ) : '+ Upload Photos'}
                <input
                  type="file" accept="image/*" multiple
                  style={{ display: 'none' }}
                  disabled={uploadingPhoto}
                  onChange={async (e) => {
                    const files = Array.from(e.target.files)
                    if (!files.length) return
                    setUploadingPhoto(true)
                    for (const file of files) {
                      const ext = file.name.split('.').pop()
                      const filename = `customer-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
                      const { error: uploadError } = await supabase.storage
                        .from('product-images')
                        .upload(filename, file, { cacheControl: '3600', upsert: false })
                      if (!uploadError) {
                        const { data: urlData } = supabase.storage
                          .from('product-images')
                          .getPublicUrl(filename)
                        await supabase.from('customer_photos').insert({
                          image_url: urlData.publicUrl,
                          sort_order: photos.length,
                        })
                      }
                    }
                    setUploadingPhoto(false)
                    showToast(`${files.length} photo${files.length > 1 ? 's' : ''} uploaded! ✦`)
                    fetchAll()
                    e.target.value = ''
                  }}
                />
              </label>
            </div>

            {photos.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '5rem', border: '1px solid rgba(201,162,39,0.08)' }}>
                <div style={{ fontSize: '2.5rem', opacity: 0.2, marginBottom: '1rem' }}>📸</div>
                <p style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.82rem', color: '#7A7060', marginBottom: '0.5rem' }}>
                  No customer photos yet
                </p>
                <p style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.72rem', color: '#7A7060', opacity: 0.6 }}>
                  Upload photos and they'll appear as a carousel on the home page
                </p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {photos.map((photo, index) => (
                  <div key={photo.id} style={{ position: 'relative' }}>
                    <div style={{ aspectRatio: '3/4', overflow: 'hidden', border: '1px solid rgba(201,162,39,0.1)', position: 'relative' }}>
                      <img
                        src={photo.image_url}
                        alt={`Customer ${index + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div
                        onClick={async () => {
                          if (!window.confirm('Remove this photo?')) return
                          await supabase.from('customer_photos').delete().eq('id', photo.id)
                          showToast('Photo removed.')
                          fetchAll()
                        }}
                        style={{
                          position: 'absolute', inset: 0,
                          background: 'rgba(0,0,0,0)',
                          display: 'flex', alignItems: 'center',
                          justifyContent: 'center', cursor: 'pointer',
                          transition: 'background 0.3s',
                          fontSize: '2rem', color: 'transparent',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.55)'; e.currentTarget.style.color = '#fff' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0)'; e.currentTarget.style.color = 'transparent' }}
                      >🗑</div>
                    </div>
                    <div style={{
                      position: 'absolute', top: '0.5rem', right: '0.5rem',
                      background: 'rgba(0,0,0,0.7)', color: '#C9A227',
                      fontFamily: 'Josefin Sans, sans-serif',
                      fontSize: '0.6rem', letterSpacing: '0.1em',
                      padding: '0.2rem 0.5rem',
                    }}>#{index + 1}</div>
                  </div>
                ))}
              </div>
            )}

            {photos.length > 0 && (
              <p style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.68rem', color: '#7A7060', marginTop: '1.5rem', textAlign: 'center' }}>
                Hover over a photo and click to delete it
              </p>
            )}
          </div>
        )}

      </div>{/* ── END MAIN CONTENT ── */}

      {/* ── PRODUCT FORM MODAL ── */}
      {showProductForm && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.85)',
          zIndex: 200, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          padding: '1rem', overflowY: 'auto',
        }} onClick={e => { if (e.target === e.currentTarget) setShowProductForm(false) }}>
          <div style={{
            background: '#0E0E0E', border: '1px solid rgba(201,162,39,0.15)',
            width: '100%', maxWidth: '600px',
            padding: '2.5rem', position: 'relative',
            maxHeight: '90vh', overflowY: 'auto',
          }}>
            <button onClick={() => setShowProductForm(false)} style={{
              position: 'absolute', top: '1rem', right: '1rem',
              background: 'none', border: 'none', color: '#7A7060', cursor: 'pointer', fontSize: '1.2rem',
            }}>✕</button>

            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 300, color: '#EDE8DC', marginBottom: '2rem' }}>
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </div>

            <form onSubmit={handleSaveProduct}>
              {[
                { label: 'Product Name', key: 'name', type: 'text', required: true, placeholder: 'e.g. 6-Top Gold Cap' },
                { label: 'Image URL', key: 'image_url', type: 'text', required: false, placeholder: 'https://...' },
                { label: 'Base Price ($)', key: 'base_price', type: 'number', required: true, placeholder: '249' },
                { label: 'Price Per Tooth ($)', key: 'price_per_tooth', type: 'number', required: false, placeholder: '50' },
              ].map(({ label, key, type, required, placeholder }) => (
                <div key={key} style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A227', marginBottom: '0.5rem' }}>{label}</label>
                  <input
                    type={type} value={productForm[key]}
                    onChange={e => setProductForm({ ...productForm, [key]: e.target.value })}
                    required={required} placeholder={placeholder}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,162,39,0.15)', color: '#EDE8DC', padding: '0.85rem 1rem', fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.85rem', fontWeight: 300, outline: 'none', transition: 'border-color 0.3s' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(201,162,39,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(201,162,39,0.15)'}
                  />
                </div>
              ))}

              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A227', marginBottom: '0.5rem' }}>Style</label>
                <select value={productForm.style} onChange={e => setProductForm({ ...productForm, style: e.target.value })}
                  style={{ width: '100%', background: '#0E0E0E', border: '1px solid rgba(201,162,39,0.15)', color: '#EDE8DC', padding: '0.85rem 1rem', fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.85rem', fontWeight: 300, outline: 'none', appearance: 'none' }}>
                  <option value="">Select style...</option>
                  {['Open Face', 'Solid', 'Diamond Cut', 'Fang', 'Dust', 'Iced Out'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A227', marginBottom: '0.5rem' }}>Material</label>
                <select value={productForm.material} onChange={e => setProductForm({ ...productForm, material: e.target.value })}
                  style={{ width: '100%', background: '#0E0E0E', border: '1px solid rgba(201,162,39,0.15)', color: '#EDE8DC', padding: '0.85rem 1rem', fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.85rem', fontWeight: 300, outline: 'none', appearance: 'none' }}>
                  <option value="">Select material...</option>
                  {['10K Gold', '14K Gold', '18K Gold', 'Sterling Silver', 'Rose Gold', 'White Gold'].map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A227', marginBottom: '0.5rem' }}>Description</label>
                <textarea value={productForm.description} onChange={e => setProductForm({ ...productForm, description: e.target.value })} rows={3} placeholder="Describe this product..."
                  style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,162,39,0.15)', color: '#EDE8DC', padding: '0.85rem 1rem', fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.85rem', fontWeight: 300, outline: 'none', resize: 'vertical', transition: 'border-color 0.3s' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(201,162,39,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(201,162,39,0.15)'}
                />
              </div>

              <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <label style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A227' }}>In Stock</label>
                <button type="button" onClick={() => setProductForm({ ...productForm, in_stock: !productForm.in_stock })}
                  style={{ width: '48px', height: '26px', borderRadius: '13px', background: productForm.in_stock ? '#C9A227' : 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s' }}>
                  <div style={{ position: 'absolute', top: '3px', left: productForm.in_stock ? '24px' : '3px', width: '20px', height: '20px', borderRadius: '50%', background: '#fff', transition: 'left 0.3s' }} />
                </button>
                <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.72rem', color: productForm.in_stock ? '#27AE60' : '#C0392B' }}>
                  {productForm.in_stock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <button type="submit" disabled={savingProduct} style={{
                width: '100%', background: savingProduct ? 'rgba(201,162,39,0.5)' : '#C9A227',
                color: '#080808', border: 'none', padding: '1rem',
                fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.3em',
                textTransform: 'uppercase', fontWeight: 400,
                cursor: savingProduct ? 'not-allowed' : 'pointer', transition: 'background 0.3s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              }}>
                {savingProduct && <div style={{ width: '14px', height: '14px', border: '2px solid rgba(8,8,8,0.3)', borderTopColor: '#080808', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />}
                {savingProduct ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── TOAST ── */}
      <div style={{
        position: 'fixed', bottom: '2rem', right: '2rem',
        background: toast.type === 'success' ? '#C9A227' : '#C0392B',
        color: toast.type === 'success' ? '#080808' : '#fff',
        padding: '1rem 1.5rem',
        fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.8rem', letterSpacing: '0.05em',
        zIndex: 999,
        transform: toast.show ? 'translateY(0)' : 'translateY(100px)',
        opacity: toast.show ? 1 : 0,
        transition: 'all 0.4s ease',
      }}>{toast.msg}</div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 900px) {
          .admin-main { margin-left: 0 !important; }
        }
      `}</style>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../App'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [teethCount, setTeethCount] = useState(6)
  const [selectedMaterial, setSelectedMaterial] = useState('')
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState({ show: false, msg: '', type: 'success' })

  useEffect(() => {
    fetchProduct()
  }, [id])

  async function fetchProduct() {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    setProduct(data)
    if (data) setSelectedMaterial(data.material || '')
    setLoading(false)
  }

  function showToast(msg, type = 'success') {
    setToast({ show: true, msg, type })
    setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 3500)
  }

  function calcPrice() {
    if (!product) return 0
    const base = product.base_price || 0
    const perTooth = product.price_per_tooth || 0
    return base + (perTooth * teethCount)
  }

  async function handleSaveDesign() {
    if (!user) {
      navigate('/login')
      return
    }
    setSaving(true)
    const { error } = await supabase.from('saved_designs').insert({
      user_id: user.id,
      product_id: product.id,
      teeth_count: teethCount,
      material: selectedMaterial,
      total_price: calcPrice(),
      notes,
    })
    setSaving(false)
    if (error) {
      showToast('Failed to save design. Try again.', 'error')
    } else {
      showToast('Design saved! View it in Saved Designs. ✦')
    }
  }

  async function handleSendToMessages() {
    if (!user) {
      navigate('/login')
      return
    }
    const message = `Hi! I'm interested in ordering:\n\n✦ Product: ${product.name}\n✦ Material: ${selectedMaterial}\n✦ Teeth Count: ${teethCount}\n✦ Estimated Price: $${calcPrice()}\n${notes ? `✦ Notes: ${notes}` : ''}`
    const { error } = await supabase.from('messages').insert({
      sender_id: user.id,
      is_admin: false,
      message,
    })
    if (error) {
      showToast('Failed to send message. Try again.', 'error')
    } else {
      showToast('Message sent! We will reply shortly. ✦')
      setTimeout(() => navigate('/messages'), 1500)
    }
  }

  if (loading) return (
    <div className="loading-page">
      <div className="spinner" />
    </div>
  )

  if (!product) return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }}>💎</div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: '#EDE8DC', marginBottom: '1rem' }}>Product Not Found</h2>
        <Link to="/collection" style={{ color: '#C9A227', fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em' }}>← Back to Collection</Link>
      </div>
    </div>
  )

  return (
    <div style={{ background: '#080808', minHeight: '100vh', paddingTop: '80px' }}>

      {/* Breadcrumb */}
      <div style={{
        borderBottom: '1px solid rgba(201,162,39,0.08)',
        padding: '1rem 2rem',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.65rem', letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}>
            <Link to="/" style={{ color: '#7A7060', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: '#7A7060' }}>›</span>
            <Link to="/collection" style={{ color: '#7A7060', textDecoration: 'none' }}>Collection</Link>
            <span style={{ color: '#7A7060' }}>›</span>
            <span style={{ color: '#C9A227' }}>{product.name}</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'start',
        }} className="product-detail-grid">

          {/* ── LEFT: IMAGE ── */}
          <div>
            <div style={{
              aspectRatio: '1',
              background: product.image_url
                ? `url(${product.image_url}) center/cover no-repeat`
                : 'linear-gradient(135deg, #161616 0%, #1E1800 100%)',
              border: '1px solid rgba(201,162,39,0.1)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', position: 'relative',
              overflow: 'hidden',
            }}>
              {!product.image_url && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '5rem', opacity: 0.15, marginBottom: '1rem' }}>💎</div>
                  <div style={{
                    fontFamily: 'Josefin Sans, sans-serif',
                    fontSize: '0.65rem', letterSpacing: '0.3em',
                    color: '#7A7060', textTransform: 'uppercase',
                  }}>No Image</div>
                </div>
              )}

              {/* Style Badge */}
              {product.style && (
                <div style={{
                  position: 'absolute', top: '1.5rem', left: '1.5rem',
                  background: 'rgba(8,8,8,0.85)',
                  border: '1px solid rgba(201,162,39,0.25)',
                  color: '#C9A227',
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.6rem', letterSpacing: '0.25em',
                  textTransform: 'uppercase', padding: '0.4rem 0.9rem',
                }}>{product.style}</div>
              )}
            </div>

            {/* Trust Badges */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1px', marginTop: '1px',
              background: 'rgba(201,162,39,0.06)',
            }}>
              {[
                { icon: '✦', label: 'Handcrafted' },
                { icon: '💎', label: 'Solid Metal' },
                { icon: '👑', label: 'Custom Fit' },
              ].map(({ icon, label }) => (
                <div key={label} style={{
                  background: '#101010', padding: '1rem',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>{icon}</div>
                  <div style={{
                    fontFamily: 'Josefin Sans, sans-serif',
                    fontSize: '0.6rem', letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: '#7A7060',
                  }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: DETAILS ── */}
          <div>
            {/* Category */}
            <div style={{
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.65rem', letterSpacing: '0.35em',
              textTransform: 'uppercase', color: '#C9A227',
              marginBottom: '0.8rem',
            }}>{product.category || 'Custom Grillz'}</div>

            {/* Name */}
            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 300, letterSpacing: '0.05em',
              color: '#EDE8DC', lineHeight: 1.1,
              marginBottom: '1rem',
            }}>{product.name}</h1>

            {/* Material Badge */}
            <div style={{
              display: 'inline-block',
              background: 'rgba(201,162,39,0.1)',
              border: '1px solid rgba(201,162,39,0.2)',
              color: '#C9A227',
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.65rem', letterSpacing: '0.25em',
              textTransform: 'uppercase', padding: '0.4rem 1rem',
              marginBottom: '1.5rem',
            }}>{product.material}</div>

            {/* Description */}
            {product.description && (
              <p style={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.85rem', fontWeight: 300,
                color: '#7A7060', lineHeight: 1.9,
                marginBottom: '2rem',
              }}>{product.description}</p>
            )}

            {/* Divider */}
            <div style={{ height: '1px', background: 'rgba(201,162,39,0.1)', marginBottom: '2rem' }} />

            {/* ── TEETH COUNT ── */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', marginBottom: '1rem',
              }}>
                <label style={{
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.65rem', letterSpacing: '0.3em',
                  textTransform: 'uppercase', color: '#C9A227',
                }}>Teeth Count</label>
                <span style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.5rem', color: '#EDE8DC',
                }}>{teethCount} teeth</span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="1" max="14"
                value={teethCount}
                onChange={e => setTeethCount(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#C9A227', cursor: 'pointer' }}
              />
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.6rem', color: '#7A7060',
                letterSpacing: '0.1em', marginTop: '0.3rem',
              }}>
                <span>1 tooth</span>
                <span>14 teeth</span>
              </div>

              {/* Quick Select */}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                {[2, 4, 6, 8, 10, 14].map(n => (
                  <button key={n} onClick={() => setTeethCount(n)} style={{
                    fontFamily: 'Josefin Sans, sans-serif',
                    fontSize: '0.65rem', letterSpacing: '0.1em',
                    padding: '0.4rem 0.8rem',
                    background: teethCount === n ? '#C9A227' : 'transparent',
                    color: teethCount === n ? '#080808' : '#7A7060',
                    border: teethCount === n ? '1px solid #C9A227' : '1px solid rgba(201,162,39,0.15)',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}>{n}</button>
                ))}
              </div>
            </div>

            {/* ── PRICE DISPLAY ── */}
            <div style={{
              background: 'rgba(201,162,39,0.05)',
              border: '1px solid rgba(201,162,39,0.15)',
              padding: '1.5rem',
              marginBottom: '2rem',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{
                    fontFamily: 'Josefin Sans, sans-serif',
                    fontSize: '0.6rem', letterSpacing: '0.3em',
                    textTransform: 'uppercase', color: '#7A7060',
                    marginBottom: '0.3rem',
                  }}>Estimated Price</div>
                  <div style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '2.5rem', fontWeight: 300,
                    color: '#C9A227', lineHeight: 1,
                  }}>${calcPrice().toLocaleString()}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  {product.price_per_tooth && (
                    <div style={{
                      fontFamily: 'Josefin Sans, sans-serif',
                      fontSize: '0.7rem', color: '#7A7060',
                      letterSpacing: '0.1em',
                    }}>${product.price_per_tooth} / tooth</div>
                  )}
                  <div style={{
                    fontFamily: 'Josefin Sans, sans-serif',
                    fontSize: '0.65rem', color: '#7A7060',
                    letterSpacing: '0.1em', marginTop: '0.3rem',
                  }}>Base: ${product.base_price}</div>
                </div>
              </div>
            </div>

            {/* ── NOTES ── */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.65rem', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: '#C9A227',
                marginBottom: '0.5rem',
              }}>Custom Notes (optional)</label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Any special requests, engravings, or design details..."
                rows={3}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(201,162,39,0.15)',
                  color: '#EDE8DC',
                  padding: '0.85rem 1rem',
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.82rem', fontWeight: 300,
                  outline: 'none', resize: 'vertical',
                  transition: 'border-color 0.3s',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(201,162,39,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(201,162,39,0.15)'}
              />
            </div>

            {/* ── ACTION BUTTONS ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {/* Save Design */}
              <button onClick={handleSaveDesign} disabled={saving} style={{
                width: '100%', padding: '1rem',
                background: '#C9A227', color: '#080808',
                border: 'none',
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.75rem', letterSpacing: '0.3em',
                textTransform: 'uppercase', fontWeight: 400,
                cursor: saving ? 'not-allowed' : 'pointer',
                opacity: saving ? 0.7 : 1,
                transition: 'all 0.3s',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: '0.5rem',
              }}
                onMouseEnter={e => { if (!saving) e.currentTarget.style.background = '#F0D060' }}
                onMouseLeave={e => { if (!saving) e.currentTarget.style.background = '#C9A227' }}
              >
                {saving ? (
                  <div style={{ width: '14px', height: '14px', border: '2px solid rgba(8,8,8,0.3)', borderTopColor: '#080808', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                ) : '♡'} {saving ? 'Saving...' : 'Save This Design'}
              </button>

              {/* Send to Messages */}
              <button onClick={handleSendToMessages} style={{
                width: '100%', padding: '1rem',
                background: 'transparent', color: '#C9A227',
                border: '1px solid rgba(201,162,39,0.4)',
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.75rem', letterSpacing: '0.3em',
                textTransform: 'uppercase', fontWeight: 400,
                cursor: 'pointer', transition: 'all 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,162,39,0.05)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)' }}
              >✉ Send Inquiry to Store</button>

              {!user && (
                <p style={{
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.72rem', color: '#7A7060',
                  textAlign: 'center', letterSpacing: '0.05em',
                }}>
                  <Link to="/login" style={{ color: '#C9A227' }}>Sign in</Link> to save designs or send inquiries
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── TOAST ── */}
      <div style={{
        position: 'fixed', bottom: '2rem', right: '2rem',
        background: toast.type === 'success' ? '#C9A227' : '#C0392B',
        color: toast.type === 'success' ? '#080808' : '#fff',
        padding: '1rem 1.5rem',
        fontFamily: 'Josefin Sans, sans-serif',
        fontSize: '0.8rem', letterSpacing: '0.05em',
        zIndex: 999,
        transform: toast.show ? 'translateY(0)' : 'translateY(100px)',
        opacity: toast.show ? 1 : 0,
        transition: 'all 0.4s ease',
        maxWidth: '300px',
      }}>{toast.msg}</div>

      <style>{`
        @media (max-width: 768px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

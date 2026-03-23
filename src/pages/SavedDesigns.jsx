import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../App'

export default function SavedDesigns() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [designs, setDesigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState({ show: false, msg: '', type: 'success' })
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    fetchDesigns()
  }, [])

  async function fetchDesigns() {
    const { data } = await supabase
      .from('saved_designs')
      .select('*, products(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    setDesigns(data || [])
    setLoading(false)
  }

  function showToast(msg, type = 'success') {
    setToast({ show: true, msg, type })
    setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 3500)
  }

  async function handleDelete(id) {
    setDeleting(id)
    const { error } = await supabase
      .from('saved_designs')
      .delete()
      .eq('id', id)
    if (error) {
      showToast('Failed to remove design.', 'error')
    } else {
      setDesigns(designs.filter(d => d.id !== id))
      showToast('Design removed.')
    }
    setDeleting(null)
  }

  async function handleSendAll() {
    if (designs.length === 0) return
    const message = `Hi! I'm interested in ordering the following designs:\n\n${designs.map((d, i) =>
      `${i + 1}. ${d.products?.name || 'Product'}\n   Material: ${d.material}\n   Teeth: ${d.teeth_count}\n   Price: $${d.total_price}${d.notes ? `\n   Notes: ${d.notes}` : ''}`
    ).join('\n\n')}\n\nPlease let me know how to proceed. Thank you!`

    const { error } = await supabase.from('messages').insert({
      sender_id: user.id,
      is_admin: false,
      message,
    })
    if (error) {
      showToast('Failed to send. Try again.', 'error')
    } else {
      showToast('All designs sent to store! ✦')
      setTimeout(() => navigate('/messages'), 1500)
    }
  }

  if (loading) return (
    <div className="loading-page">
      <div className="spinner" />
    </div>
  )

  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>

      {/* ── PAGE HERO ── */}
      <div style={{
        padding: '8rem 2rem 4rem',
        borderBottom: '1px solid rgba(201,162,39,0.08)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,162,39,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
          <div style={{
            display: 'flex', alignItems: 'flex-end',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem',
          }}>
            <div>
              <div style={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.65rem', letterSpacing: '0.4em',
                textTransform: 'uppercase', color: '#C9A227',
                marginBottom: '1rem',
                display: 'flex', alignItems: 'center', gap: '0.8rem',
              }}>
                <span style={{ width: '2rem', height: '1px', background: '#C9A227', display: 'block' }} />
                My Account
              </div>
              <h1 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 300, letterSpacing: '0.05em',
                color: '#EDE8DC',
              }}>Saved Designs</h1>
              <p style={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.8rem', fontWeight: 300,
                color: '#7A7060', marginTop: '0.5rem',
              }}>{designs.length} {designs.length === 1 ? 'design' : 'designs'} saved</p>
            </div>

            {designs.length > 0 && (
              <button onClick={handleSendAll} style={{
                background: '#C9A227', color: '#080808',
                border: 'none',
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.7rem', letterSpacing: '0.3em',
                textTransform: 'uppercase', fontWeight: 400,
                padding: '1rem 2rem', cursor: 'pointer',
                transition: 'all 0.3s',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#F0D060'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#C9A227'; e.currentTarget.style.transform = 'translateY(0)' }}
              >✉ Send All to Store</button>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>

        {designs.length === 0 ? (
          /* ── EMPTY STATE ── */
          <div style={{
            textAlign: 'center', padding: '6rem 2rem',
            border: '1px solid rgba(201,162,39,0.08)',
          }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem', opacity: 0.2 }}>♡</div>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '2rem', fontWeight: 300,
              color: '#EDE8DC', marginBottom: '0.8rem',
            }}>No Saved Designs Yet</h2>
            <p style={{
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.8rem', fontWeight: 300,
              color: '#7A7060', marginBottom: '2.5rem',
              maxWidth: '350px', margin: '0 auto 2.5rem',
              lineHeight: 1.8,
            }}>
              Browse our collection, customize your grill, and save the ones you love.
            </p>
            <Link to="/collection" style={{
              background: '#C9A227', color: '#080808',
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.7rem', letterSpacing: '0.3em',
              textTransform: 'uppercase', padding: '1rem 2.5rem',
              textDecoration: 'none', display: 'inline-block',
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#F0D060'}
              onMouseLeave={e => e.currentTarget.style.background = '#C9A227'}
            >Browse Collection</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {designs.map(design => (
              <DesignCard
                key={design.id}
                design={design}
                onDelete={handleDelete}
                deleting={deleting === design.id}
                user={user}
                showToast={showToast}
                navigate={navigate}
              />
            ))}

            {/* Send All Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #0D0D0D, #1A1200)',
              border: '1px solid rgba(201,162,39,0.15)',
              padding: '2.5rem',
              textAlign: 'center',
              marginTop: '1rem',
            }}>
              <h3 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.8rem', fontWeight: 300,
                color: '#EDE8DC', marginBottom: '0.8rem',
              }}>Ready to Order?</h3>
              <p style={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.8rem', fontWeight: 300,
                color: '#7A7060', marginBottom: '1.5rem',
              }}>
                Send all your saved designs to us at once and we'll get back to you shortly.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={handleSendAll} style={{
                  background: '#C9A227', color: '#080808',
                  border: 'none',
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.7rem', letterSpacing: '0.3em',
                  textTransform: 'uppercase', padding: '1rem 2.5rem',
                  cursor: 'pointer', transition: 'all 0.3s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F0D060'}
                  onMouseLeave={e => e.currentTarget.style.background = '#C9A227'}
                >✉ Send All Designs</button>
                <Link to="/messages" style={{
                  background: 'transparent', color: '#C9A227',
                  border: '1px solid rgba(201,162,39,0.4)',
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.7rem', letterSpacing: '0.3em',
                  textTransform: 'uppercase', padding: '1rem 2.5rem',
                  textDecoration: 'none', transition: 'all 0.3s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,162,39,0.05)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >View Messages</Link>
              </div>
            </div>
          </div>
        )}
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
    </div>
  )
}

// ── DESIGN CARD ──
function DesignCard({ design, onDelete, deleting, user, showToast, navigate }) {
  const product = design.products

  async function handleSendThis() {
    const message = `Hi! I'm interested in ordering:\n\n✦ Product: ${product?.name || 'Custom Design'}\n✦ Material: ${design.material}\n✦ Teeth Count: ${design.teeth_count}\n✦ Estimated Price: $${design.total_price}${design.notes ? `\n✦ Notes: ${design.notes}` : ''}`
    const { error } = await supabase.from('messages').insert({
      sender_id: user.id,
      is_admin: false,
      message,
    })
    if (error) {
      showToast('Failed to send. Try again.', 'error')
    } else {
      showToast('Design sent to store! ✦')
      setTimeout(() => navigate('/messages'), 1500)
    }
  }

  return (
    <div style={{
      background: '#101010',
      border: '1px solid rgba(201,162,39,0.08)',
      display: 'grid',
      gridTemplateColumns: '200px 1fr auto',
      gap: '2rem',
      overflow: 'hidden',
      transition: 'border-color 0.3s',
    }}
      className="design-card"
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,162,39,0.2)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(201,162,39,0.08)'}
    >
      {/* Image */}
      <div style={{
        background: product?.image_url
          ? `url(${product.image_url}) center/cover no-repeat`
          : 'linear-gradient(135deg, #161616, #1E1800)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', minHeight: '160px',
      }}>
        {!product?.image_url && (
          <span style={{ fontSize: '2.5rem', opacity: 0.2 }}>💎</span>
        )}
      </div>

      {/* Details */}
      <div style={{ padding: '1.5rem 0' }}>
        <div style={{
          fontFamily: 'Josefin Sans, sans-serif',
          fontSize: '0.6rem', letterSpacing: '0.3em',
          textTransform: 'uppercase', color: '#C9A227',
          marginBottom: '0.5rem',
        }}>Saved Design</div>

        <h3 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '1.5rem', fontWeight: 400,
          color: '#EDE8DC', marginBottom: '1rem',
        }}>{product?.name || 'Custom Design'}</h3>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '1rem', marginBottom: '1rem',
        }}>
          {[
            { label: 'Material', value: design.material },
            { label: 'Teeth', value: `${design.teeth_count} teeth` },
            { label: 'Est. Price', value: `$${design.total_price}` },
          ].map(({ label, value }) => (
            <div key={label}>
              <div style={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.6rem', letterSpacing: '0.2em',
                textTransform: 'uppercase', color: '#7A7060',
                marginBottom: '0.2rem',
              }}>{label}</div>
              <div style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.1rem', color: '#EDE8DC',
              }}>{value}</div>
            </div>
          ))}
        </div>

        {design.notes && (
          <p style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.75rem', fontWeight: 300,
            color: '#7A7060', fontStyle: 'italic',
            borderLeft: '2px solid rgba(201,162,39,0.3)',
            paddingLeft: '0.8rem',
          }}>"{design.notes}"</p>
        )}

        <div style={{ marginTop: '1rem' }}>
          <span style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.6rem', letterSpacing: '0.15em',
            color: '#7A7060',
          }}>Saved {new Date(design.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Actions */}
      <div style={{
        padding: '1.5rem',
        display: 'flex', flexDirection: 'column',
        gap: '0.8rem', justifyContent: 'center',
        borderLeft: '1px solid rgba(201,162,39,0.06)',
      }}>
        <button onClick={handleSendThis} style={{
          background: '#C9A227', color: '#080808',
          border: 'none', padding: '0.7rem 1.2rem',
          fontFamily: 'Josefin Sans, sans-serif',
          fontSize: '0.65rem', letterSpacing: '0.2em',
          textTransform: 'uppercase', cursor: 'pointer',
          transition: 'all 0.3s', whiteSpace: 'nowrap',
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#F0D060'}
          onMouseLeave={e => e.currentTarget.style.background = '#C9A227'}
        >✉ Send</button>

        <Link to={`/product/${design.product_id}`} style={{
          background: 'transparent', color: '#C9A227',
          border: '1px solid rgba(201,162,39,0.3)',
          padding: '0.7rem 1.2rem',
          fontFamily: 'Josefin Sans, sans-serif',
          fontSize: '0.65rem', letterSpacing: '0.2em',
          textTransform: 'uppercase', textDecoration: 'none',
          textAlign: 'center', transition: 'all 0.3s',
          whiteSpace: 'nowrap',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,162,39,0.05)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >View</Link>

        <button
          onClick={() => onDelete(design.id)}
          disabled={deleting}
          style={{
            background: 'transparent', color: '#7A7060',
            border: '1px solid rgba(122,112,96,0.2)',
            padding: '0.7rem 1.2rem',
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.65rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', cursor: 'pointer',
            transition: 'all 0.3s', whiteSpace: 'nowrap',
            opacity: deleting ? 0.5 : 1,
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#C0392B'; e.currentTarget.style.borderColor = 'rgba(192,57,43,0.3)' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#7A7060'; e.currentTarget.style.borderColor = 'rgba(122,112,96,0.2)' }}
        >{deleting ? '...' : 'Remove'}</button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .design-card {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../App'

export default function Contact() {
  const { user, profile } = useAuth()
  const [form, setForm] = useState({
    name: profile?.full_name || '',
    email: user?.email || '',
    phone: profile?.phone || '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.from('contact_forms').insert({
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
    })

    if (error) {
      setError('Failed to send message. Please try again.')
      setLoading(false)
    } else {
      setSubmitted(true)
      setLoading(false)
    }
  }

  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>

      {/* ── PAGE HERO ── */}
      <div style={{
        padding: '8rem 2rem 5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(201,162,39,0.08)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(201,162,39,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative' }}>
          <div style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.65rem', letterSpacing: '0.5em',
            textTransform: 'uppercase', color: '#C9A227',
            marginBottom: '1rem',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '1rem',
          }}>
            <span style={{ width: '2rem', height: '1px', background: '#C9A227', display: 'block' }} />
            Get In Touch
            <span style={{ width: '2rem', height: '1px', background: '#C9A227', display: 'block' }} />
          </div>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: 300, letterSpacing: '0.08em',
            color: '#EDE8DC', marginBottom: '1rem',
          }}>Contact Us</h1>
          <p style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.82rem', fontWeight: 300,
            color: '#7A7060', maxWidth: '400px',
            margin: '0 auto', lineHeight: 1.8,
          }}>
            Have a question or ready to order? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: '5rem',
          alignItems: 'start',
        }} className="contact-grid">

          {/* ── LEFT: INFO ── */}
          <div>
            <div style={{
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.65rem', letterSpacing: '0.4em',
              textTransform: 'uppercase', color: '#C9A227',
              marginBottom: '1rem',
              display: 'flex', alignItems: 'center', gap: '0.8rem',
            }}>
              <span style={{ width: '2rem', height: '1px', background: '#C9A227', display: 'block' }} />
              Store Info
            </div>

            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '2.2rem', fontWeight: 300,
              color: '#EDE8DC', marginBottom: '1.5rem',
              lineHeight: 1.2,
            }}>Let's Create Something Beautiful Together</h2>

            <p style={{
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.82rem', fontWeight: 300,
              color: '#7A7060', lineHeight: 1.9,
              marginBottom: '2.5rem',
            }}>
              Whether you have a specific design in mind or need guidance, our team is here to help you create the perfect custom piece.
            </p>

            {/* Contact Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { icon: '📧', label: 'Email', value: 'lailastreasureshattiesburg@gmail.com' },
                { icon: '📱', label: 'Phone', value: '+1 (601) 466 6788' },
                { icon: '🕐', label: 'Hours', value: 'Mon–Sat, 10am–8pm Sun, 12pm-6pm' },
                { icon: '📍', label: 'Location', value: 'Custom Orders — Shipped Worldwide' },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{
                  display: 'flex', alignItems: 'flex-start',
                  gap: '1rem', padding: '1.2rem 0',
                  borderBottom: '1px solid rgba(201,162,39,0.08)',
                }}>
                  <span style={{ fontSize: '1rem', marginTop: '0.1rem' }}>{icon}</span>
                  <div>
                    <div style={{
                      fontFamily: 'Josefin Sans, sans-serif',
                      fontSize: '0.6rem', letterSpacing: '0.25em',
                      textTransform: 'uppercase', color: '#C9A227',
                      marginBottom: '0.2rem',
                    }}>{label}</div>
                    <div style={{
                      fontFamily: 'Josefin Sans, sans-serif',
                      fontSize: '0.82rem', fontWeight: 300,
                      color: '#EDE8DC', letterSpacing: '0.05em',
                    }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>

{/* Social Links */}
            <div style={{ marginTop: '2rem' }}>
              <div style={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.6rem', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: '#7A7060',
                marginBottom: '1rem',
              }}>Follow Us</div>
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                {[
                  { name: 'Instagram', href: 'https://www.instagram.com/treasures_hattiesburg' },
                  { name: 'TikTok', href: 'https://www.tiktok.com/@lailastreasures' },
                  { name: 'Facebook', href: 'https://www.facebook.com/lailas.treasures' },
                ].map(social => (
                  <a key={social.name} href={social.href} target="_blank" rel="noreferrer" style={{
                    fontFamily: 'Josefin Sans, sans-serif',
                    fontSize: '0.65rem', letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#7A7060', textDecoration: 'none',
                    border: '1px solid rgba(201,162,39,0.15)',
                    padding: '0.5rem 1rem',
                    transition: 'all 0.3s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#C9A227'; e.currentTarget.style.borderColor = 'rgba(201,162,39,0.4)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#7A7060'; e.currentTarget.style.borderColor = 'rgba(201,162,39,0.15)' }}
                  >{social.name}</a>
                ))}
              </div>
            </div>

            {/* Messenger CTA */}
            {user && (
              <div style={{
                marginTop: '2.5rem',
                background: 'rgba(201,162,39,0.05)',
                border: '1px solid rgba(201,162,39,0.15)',
                padding: '1.5rem',
              }}>
                <div style={{
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.65rem', letterSpacing: '0.25em',
                  textTransform: 'uppercase', color: '#C9A227',
                  marginBottom: '0.5rem',
                }}>Already a customer?</div>
                <p style={{
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.78rem', fontWeight: 300,
                  color: '#7A7060', marginBottom: '1rem',
                  lineHeight: 1.7,
                }}>Use our direct messenger for faster responses.</p>
                <Link to="/messages" style={{
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.65rem', letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: '#C9A227',
                  textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                }}>✉ Open Messenger →</Link>
              </div>
            )}
          </div>

          {/* ── RIGHT: FORM ── */}
          <div>
            {submitted ? (
              /* Success State */
              <div style={{
                background: '#101010',
                border: '1px solid rgba(201,162,39,0.15)',
                padding: '4rem 2.5rem',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>✦</div>
                <h3 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '2rem', fontWeight: 300,
                  color: '#EDE8DC', marginBottom: '1rem',
                }}>Message Received!</h3>
                <p style={{
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.82rem', fontWeight: 300,
                  color: '#7A7060', lineHeight: 1.8,
                  marginBottom: '2rem',
                }}>
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', message: '' }) }}
                    style={{
                      background: 'transparent', color: '#C9A227',
                      border: '1px solid rgba(201,162,39,0.3)',
                      fontFamily: 'Josefin Sans, sans-serif',
                      fontSize: '0.7rem', letterSpacing: '0.25em',
                      textTransform: 'uppercase', padding: '0.8rem 1.8rem',
                      cursor: 'pointer',
                    }}>Send Another</button>
                  <Link to="/collection" style={{
                    background: '#C9A227', color: '#080808',
                    fontFamily: 'Josefin Sans, sans-serif',
                    fontSize: '0.7rem', letterSpacing: '0.25em',
                    textTransform: 'uppercase', padding: '0.8rem 1.8rem',
                    textDecoration: 'none',
                  }}>Browse Collection</Link>
                </div>
              </div>
            ) : (
              /* Form */
              <div style={{
                background: '#101010',
                border: '1px solid rgba(201,162,39,0.1)',
                padding: '2.5rem',
              }}>
                <div style={{
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.65rem', letterSpacing: '0.4em',
                  textTransform: 'uppercase', color: '#C9A227',
                  marginBottom: '0.5rem',
                }}>Send a Message</div>
                <h3 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.6rem', fontWeight: 300,
                  color: '#EDE8DC', marginBottom: '2rem',
                }}>We'll Reply Within 24 Hours</h3>

                {error && (
                  <div style={{
                    background: 'rgba(192,57,43,0.1)',
                    border: '1px solid rgba(192,57,43,0.2)',
                    color: '#E74C3C',
                    fontFamily: 'Josefin Sans, sans-serif',
                    fontSize: '0.75rem', padding: '0.9rem 1rem',
                    marginBottom: '1.5rem',
                  }}>{error}</div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Name + Email Row */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem', marginBottom: '1.2rem',
                  }} className="form-row-contact">
                    <div>
                      <label style={{
                        display: 'block',
                        fontFamily: 'Josefin Sans, sans-serif',
                        fontSize: '0.62rem', letterSpacing: '0.3em',
                        textTransform: 'uppercase', color: '#C9A227',
                        marginBottom: '0.5rem',
                      }}>Full Name</label>
                      <input
                        type="text" name="name"
                        value={form.name} onChange={handleChange}
                        required placeholder="Your name"
                        style={{
                          width: '100%',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(201,162,39,0.15)',
                          color: '#EDE8DC', padding: '0.85rem 1rem',
                          fontFamily: 'Josefin Sans, sans-serif',
                          fontSize: '0.82rem', fontWeight: 300,
                          outline: 'none', transition: 'border-color 0.3s',
                        }}
                        onFocus={e => e.target.style.borderColor = 'rgba(201,162,39,0.5)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(201,162,39,0.15)'}
                      />
                    </div>
                    <div>
                      <label style={{
                        display: 'block',
                        fontFamily: 'Josefin Sans, sans-serif',
                        fontSize: '0.62rem', letterSpacing: '0.3em',
                        textTransform: 'uppercase', color: '#C9A227',
                        marginBottom: '0.5rem',
                      }}>Email</label>
                      <input
                        type="email" name="email"
                        value={form.email} onChange={handleChange}
                        required placeholder="your@email.com"
                        style={{
                          width: '100%',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(201,162,39,0.15)',
                          color: '#EDE8DC', padding: '0.85rem 1rem',
                          fontFamily: 'Josefin Sans, sans-serif',
                          fontSize: '0.82rem', fontWeight: 300,
                          outline: 'none', transition: 'border-color 0.3s',
                        }}
                        onFocus={e => e.target.style.borderColor = 'rgba(201,162,39,0.5)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(201,162,39,0.15)'}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div style={{ marginBottom: '1.2rem' }}>
                    <label style={{
                      display: 'block',
                      fontFamily: 'Josefin Sans, sans-serif',
                      fontSize: '0.62rem', letterSpacing: '0.3em',
                      textTransform: 'uppercase', color: '#C9A227',
                      marginBottom: '0.5rem',
                    }}>Phone (optional)</label>
                    <input
                      type="tel" name="phone"
                      value={form.phone} onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(201,162,39,0.15)',
                        color: '#EDE8DC', padding: '0.85rem 1rem',
                        fontFamily: 'Josefin Sans, sans-serif',
                        fontSize: '0.82rem', fontWeight: 300,
                        outline: 'none', transition: 'border-color 0.3s',
                      }}
                      onFocus={e => e.target.style.borderColor = 'rgba(201,162,39,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(201,162,39,0.15)'}
                    />
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: '2rem' }}>
                    <label style={{
                      display: 'block',
                      fontFamily: 'Josefin Sans, sans-serif',
                      fontSize: '0.62rem', letterSpacing: '0.3em',
                      textTransform: 'uppercase', color: '#C9A227',
                      marginBottom: '0.5rem',
                    }}>Message</label>
                    <textarea
                      name="message"
                      value={form.message} onChange={handleChange}
                      required rows={6}
                      placeholder="Tell us about your order, style preferences, material, teeth count, or any questions..."
                      style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(201,162,39,0.15)',
                        color: '#EDE8DC', padding: '0.85rem 1rem',
                        fontFamily: 'Josefin Sans, sans-serif',
                        fontSize: '0.82rem', fontWeight: 300,
                        outline: 'none', resize: 'vertical',
                        transition: 'border-color 0.3s',
                        lineHeight: 1.7,
                      }}
                      onFocus={e => e.target.style.borderColor = 'rgba(201,162,39,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(201,162,39,0.15)'}
                    />
                  </div>

                  <button type="submit" disabled={loading} style={{
                    width: '100%',
                    background: loading ? 'rgba(201,162,39,0.5)' : '#C9A227',
                    color: '#080808', border: 'none',
                    padding: '1rem',
                    fontFamily: 'Josefin Sans, sans-serif',
                    fontSize: '0.75rem', letterSpacing: '0.3em',
                    textTransform: 'uppercase', fontWeight: 400,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: '0.5rem',
                  }}
                    onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#F0D060' }}
                    onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#C9A227' }}
                  >
                    {loading ? (
                      <>
                        <div style={{
                          width: '14px', height: '14px',
                          border: '2px solid rgba(8,8,8,0.3)',
                          borderTopColor: '#080808', borderRadius: '50%',
                          animation: 'spin 0.8s linear infinite',
                        }} />
                        Sending...
                      </>
                    ) : 'Send Message ✦'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .form-row-contact {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

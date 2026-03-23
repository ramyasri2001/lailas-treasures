import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

// ── CHANGE THESE TO YOUR ADMIN CREDENTIALS ──
const ADMIN_EMAIL = 'admin@lailastreasures.com'
const ADMIN_PASSWORD = 'Laila@Admin2024'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError('Invalid credentials.')
      setLoading(false)
      return
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', data.user.id)
      .single()

    if (!profile?.is_admin) {
      await supabase.auth.signOut()
      setError('Access denied. Admin only.')
      setLoading(false)
      return
    }

    navigate('/admin')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#060606',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Grid Background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(201,162,39,0.02) 60px, rgba(201,162,39,0.02) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(201,162,39,0.02) 60px, rgba(201,162,39,0.02) 61px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(201,162,39,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '400px',
        animation: 'fadeUp 0.6s ease forwards',
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            width: '60px', height: '60px',
            background: 'linear-gradient(135deg, #C9A227, #8B6914)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', margin: '0 auto 1.5rem',
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1.8rem', color: '#080808', fontWeight: 600,
          }}>L</div>
          <div style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.6rem', letterSpacing: '0.4em',
            textTransform: 'uppercase', color: '#C9A227',
            marginBottom: '0.5rem',
          }}>Admin Portal</div>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '2rem', fontWeight: 300,
            color: '#EDE8DC', letterSpacing: '0.05em',
          }}>Laila's Treasures</h1>
          <p style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.72rem', fontWeight: 300,
            color: '#7A7060', marginTop: '0.5rem',
          }}>Restricted access — authorized personnel only</p>
        </div>

        {/* Form */}
        <div style={{
          background: '#0E0E0E',
          border: '1px solid rgba(201,162,39,0.12)',
          padding: '2.5rem',
        }}>
          {error && (
            <div style={{
              background: 'rgba(192,57,43,0.1)',
              border: '1px solid rgba(192,57,43,0.25)',
              color: '#E74C3C',
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.75rem', padding: '0.9rem 1rem',
              marginBottom: '1.5rem', letterSpacing: '0.05em',
            }}>{error}</div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{
                display: 'block',
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.62rem', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: '#C9A227',
                marginBottom: '0.5rem',
              }}>Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="admin@lailastreasures.com"
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(201,162,39,0.15)',
                  color: '#EDE8DC', padding: '0.85rem 1rem',
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.85rem', fontWeight: 300,
                  outline: 'none', transition: 'border-color 0.3s',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(201,162,39,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(201,162,39,0.15)'}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.62rem', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: '#C9A227',
                marginBottom: '0.5rem',
              }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="Enter admin password"
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(201,162,39,0.15)',
                    color: '#EDE8DC', padding: '0.85rem 3rem 0.85rem 1rem',
                    fontFamily: 'Josefin Sans, sans-serif',
                    fontSize: '0.85rem', fontWeight: 300,
                    outline: 'none', transition: 'border-color 0.3s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(201,162,39,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(201,162,39,0.15)'}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '1rem', top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none', border: 'none',
                    color: '#7A7060', cursor: 'pointer', fontSize: '0.85rem',
                  }}
                >{showPassword ? '🙈' : '👁'}</button>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%',
              background: loading ? 'rgba(201,162,39,0.5)' : '#C9A227',
              color: '#080808', border: 'none', padding: '1rem',
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
                  Verifying...
                </>
              ) : '🔐 Access Admin Panel'}
            </button>
          </form>
        </div>

        {/* Warning */}
        <div style={{
          marginTop: '1.5rem', textAlign: 'center',
          fontFamily: 'Josefin Sans, sans-serif',
          fontSize: '0.65rem', letterSpacing: '0.1em',
          color: '#7A7060',
        }}>
          ⚠ Unauthorized access attempts are logged
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

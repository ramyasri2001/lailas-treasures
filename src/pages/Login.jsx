import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Login() {
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

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Invalid email or password. Please try again.')
      setLoading(false)
    } else {
      navigate('/')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#080808',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6rem 1.5rem 3rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Effect */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 60% at 50% 40%, rgba(201,162,39,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '420px',
        animation: 'fadeUp 0.6s ease forwards',
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '2.5rem', fontWeight: 300,
              letterSpacing: '0.15em', color: '#C9A227',
              lineHeight: 1,
            }}>LAILA'S</div>
            <div style={{
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.55rem', letterSpacing: '0.5em',
              color: '#7A7060', textTransform: 'uppercase',
              marginTop: '4px',
            }}>TREASURES</div>
          </Link>
          <div style={{
            width: '40px', height: '1px',
            background: 'linear-gradient(90deg, transparent, #C9A227, transparent)',
            margin: '1.5rem auto',
          }} />
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1.8rem', fontWeight: 300,
            letterSpacing: '0.1em', color: '#EDE8DC',
          }}>Welcome Back</h2>
          <p style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.75rem', fontWeight: 300,
            color: '#7A7060', marginTop: '0.5rem',
            letterSpacing: '0.05em',
          }}>Sign in to your account</p>
        </div>

        {/* Form Card */}
        <div style={{
          background: '#101010',
          border: '1px solid rgba(201,162,39,0.12)',
          padding: '2.5rem',
        }}>

          {/* Error Message */}
          {error && (
            <div style={{
              background: 'rgba(192,57,43,0.1)',
              border: '1px solid rgba(192,57,43,0.2)',
              color: '#E74C3C',
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.75rem', letterSpacing: '0.05em',
              padding: '0.9rem 1rem',
              marginBottom: '1.5rem',
            }}>{error}</div>
          )}

          <form onSubmit={handleLogin}>

            {/* Email */}
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{
                display: 'block',
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.65rem', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: '#C9A227',
                marginBottom: '0.5rem',
              }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(201,162,39,0.15)',
                  color: '#EDE8DC',
                  padding: '0.85rem 1rem',
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.85rem', fontWeight: 300,
                  outline: 'none',
                  transition: 'border-color 0.3s',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(201,162,39,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(201,162,39,0.15)'}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.65rem', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: '#C9A227',
                marginBottom: '0.5rem',
              }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(201,162,39,0.15)',
                    color: '#EDE8DC',
                    padding: '0.85rem 3rem 0.85rem 1rem',
                    fontFamily: 'Josefin Sans, sans-serif',
                    fontSize: '0.85rem', fontWeight: 300,
                    outline: 'none',
                    transition: 'border-color 0.3s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(201,162,39,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(201,162,39,0.15)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '1rem', top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none', border: 'none',
                    color: '#7A7060', cursor: 'pointer',
                    fontSize: '0.85rem', transition: 'color 0.3s',
                  }}
                  onMouseEnter={e => e.target.style.color = '#C9A227'}
                  onMouseLeave={e => e.target.style.color = '#7A7060'}
                >{showPassword ? '🙈' : '👁'}</button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: loading ? 'rgba(201,162,39,0.5)' : '#C9A227',
                color: '#080808',
                border: 'none',
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
                    borderTopColor: '#080808',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                  }} />
                  Signing In...
                </>
              ) : 'Sign In'}
            </button>
          </form>
        </div>
        {/* Forgot Password */}
        <div style={{ textAlign: 'right', marginTop: '-0.5rem', marginBottom: '1.5rem' }}>
          <button
            type="button"
            onClick={async () => {
              if (!email) {
                setError('Please enter your email address first.')
                return
              }
              const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: 'https://lailas-treasures.netlify.app/reset-password',
              })
              if (error) {
                setError('Failed to send reset email. Please try again.')
              } else {
                setError('')
                alert('Password reset email sent! Check your inbox.')
              }
            }}
            style={{
              background: 'none', border: 'none',
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.7rem', letterSpacing: '0.1em',
              color: '#7A7060', cursor: 'pointer',
              transition: 'color 0.3s',
              textDecoration: 'underline',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#C9A227'}
            onMouseLeave={e => e.currentTarget.style.color = '#7A7060'}
          >Forgot Password?</button>
        </div>
        {/* Register Link */}
        <p style={{
          textAlign: 'center', marginTop: '1.5rem',
          fontFamily: 'Josefin Sans, sans-serif',
          fontSize: '0.75rem', fontWeight: 300,
          color: '#7A7060', letterSpacing: '0.05em',
        }}>
          Don't have an account?{' '}
          <Link to="/register" style={{
            color: '#C9A227', textDecoration: 'none',
            transition: 'color 0.3s',
          }}
            onMouseEnter={e => e.target.style.color = '#F0D060'}
            onMouseLeave={e => e.target.style.color = '#C9A227'}
          >Create one here</Link>
        </p>
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

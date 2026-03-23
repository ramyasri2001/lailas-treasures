import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleRegister(e) {
    e.preventDefault()
    setError('')

    // Validation
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (!form.fullName.trim()) {
      setError('Please enter your full name.')
      return
    }

    setLoading(true)

    // Create auth user
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    // Create profile
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          full_name: form.fullName,
          phone: form.phone,
          email: form.email,
          is_admin: false,
        })

      if (profileError) {
        setError('Account created but profile setup failed. Please contact support.')
        setLoading(false)
        return
      }
    }

    navigate('/')
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(201,162,39,0.15)',
    color: '#EDE8DC',
    padding: '0.85rem 1rem',
    fontFamily: 'Josefin Sans, sans-serif',
    fontSize: '0.85rem',
    fontWeight: 300,
    outline: 'none',
    transition: 'border-color 0.3s',
  }

  const labelStyle = {
    display: 'block',
    fontFamily: 'Josefin Sans, sans-serif',
    fontSize: '0.65rem',
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: '#C9A227',
    marginBottom: '0.5rem',
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
        maxWidth: '460px',
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
          }}>Create Account</h2>
          <p style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.75rem', fontWeight: 300,
            color: '#7A7060', marginTop: '0.5rem',
            letterSpacing: '0.05em',
          }}>Join Laila's Treasures today</p>
        </div>

        {/* Form Card */}
        <div style={{
          background: '#101010',
          border: '1px solid rgba(201,162,39,0.12)',
          padding: '2.5rem',
        }}>

          {/* Error */}
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

          <form onSubmit={handleRegister}>

            {/* Full Name */}
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                placeholder="Your full name"
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(201,162,39,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(201,162,39,0.15)'}
              />
            </div>

            {/* Phone */}
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(201,162,39,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(201,162,39,0.15)'}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(201,162,39,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(201,162,39,0.15)'}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Min. 6 characters"
                  style={{ ...inputStyle, paddingRight: '3rem' }}
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

              {/* Password Strength */}
              {form.password && (
                <div style={{ marginTop: '0.5rem' }}>
                  <div style={{
                    height: '2px', background: 'rgba(255,255,255,0.05)',
                    borderRadius: '1px', overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%',
                      width: form.password.length < 6 ? '33%' : form.password.length < 10 ? '66%' : '100%',
                      background: form.password.length < 6 ? '#C0392B' : form.password.length < 10 ? '#F39C12' : '#27AE60',
                      transition: 'all 0.3s',
                    }} />
                  </div>
                  <span style={{
                    fontFamily: 'Josefin Sans, sans-serif',
                    fontSize: '0.65rem', color: '#7A7060',
                    letterSpacing: '0.1em',
                  }}>
                    {form.password.length < 6 ? 'Too short' : form.password.length < 10 ? 'Good' : 'Strong'}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={labelStyle}>Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Repeat your password"
                  style={{
                    ...inputStyle,
                    paddingRight: '3rem',
                    borderColor: form.confirmPassword
                      ? form.confirmPassword === form.password
                        ? 'rgba(39,174,96,0.4)'
                        : 'rgba(192,57,43,0.4)'
                      : 'rgba(201,162,39,0.15)',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(201,162,39,0.5)'}
                  onBlur={e => e.target.style.borderColor = form.confirmPassword
                    ? form.confirmPassword === form.password ? 'rgba(39,174,96,0.4)' : 'rgba(192,57,43,0.4)'
                    : 'rgba(201,162,39,0.15)'}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  style={{
                    position: 'absolute', right: '1rem', top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none', border: 'none',
                    color: '#7A7060', cursor: 'pointer', fontSize: '0.85rem',
                  }}
                >{showConfirm ? '🙈' : '👁'}</button>
              </div>
              {form.confirmPassword && form.confirmPassword !== form.password && (
                <p style={{
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.7rem', color: '#E74C3C',
                  marginTop: '0.4rem', letterSpacing: '0.05em',
                }}>Passwords do not match</p>
              )}
              {form.confirmPassword && form.confirmPassword === form.password && (
                <p style={{
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.7rem', color: '#27AE60',
                  marginTop: '0.4rem', letterSpacing: '0.05em',
                }}>✓ Passwords match</p>
              )}
            </div>

            {/* Submit */}
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
                  Creating Account...
                </>
              ) : 'Create My Account'}
            </button>
          </form>
        </div>

        {/* Login Link */}
        <p style={{
          textAlign: 'center', marginTop: '1.5rem',
          fontFamily: 'Josefin Sans, sans-serif',
          fontSize: '0.75rem', fontWeight: 300,
          color: '#7A7060', letterSpacing: '0.05em',
        }}>
          Already have an account?{' '}
          <Link to="/login" style={{
            color: '#C9A227', textDecoration: 'none',
            transition: 'color 0.3s',
          }}
            onMouseEnter={e => e.target.style.color = '#F0D060'}
            onMouseLeave={e => e.target.style.color = '#C9A227'}
          >Sign in here</Link>
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

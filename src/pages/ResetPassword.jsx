import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  async function handleReset(e) {
    e.preventDefault()
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setError('Failed to reset password. Please try again.')
      setLoading(false)
    } else {
      alert('Password updated successfully!')
      navigate('/login')
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#080808',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '2rem',
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.65rem', letterSpacing: '0.4em',
            textTransform: 'uppercase', color: '#C9A227',
            marginBottom: '0.5rem',
          }}>Account</div>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '2.5rem', fontWeight: 300,
            color: '#EDE8DC',
          }}>Reset Password</h1>
        </div>

        <div style={{
          background: '#101010',
          border: '1px solid rgba(201,162,39,0.1)',
          padding: '2.5rem',
        }}>
          {error && (
            <div style={{
              background: 'rgba(192,57,43,0.1)',
              border: '1px solid rgba(192,57,43,0.2)',
              color: '#E74C3C', fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.75rem', padding: '0.9rem 1rem',
              marginBottom: '1.5rem',
            }}>{error}</div>
          )}

          <form onSubmit={handleReset}>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{
                display: 'block', fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.62rem', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: '#C9A227',
                marginBottom: '0.5rem',
              }}>New Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required placeholder="Enter new password"
                  style={{
                    width: '100%', background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(201,162,39,0.15)',
                    color: '#EDE8DC', padding: '0.85rem 3rem 0.85rem 1rem',
                    fontFamily: 'Josefin Sans, sans-serif',
                    fontSize: '0.85rem', fontWeight: 300,
                    outline: 'none', transition: 'border-color 0.3s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(201,162,39,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(201,162,39,0.15)'}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                  position: 'absolute', right: '1rem', top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none', border: 'none',
                  color: '#7A7060', cursor: 'pointer',
                }}>{showPassword ? '🙈' : '👁'}</button>
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block', fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.62rem', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: '#C9A227',
                marginBottom: '0.5rem',
              }}>Confirm Password</label>
              <input
                type="password" value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required placeholder="Confirm new password"
                style={{
                  width: '100%', background: 'rgba(255,255,255,0.03)',
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

            <button type="submit" disabled={loading} style={{
              width: '100%', background: loading ? 'rgba(201,162,39,0.5)' : '#C9A227',
              color: '#080808', border: 'none', padding: '1rem',
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.75rem', letterSpacing: '0.3em',
              textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
            }}>
              {loading ? 'Updating...' : 'Update Password ✦'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import { supabase } from '../lib/supabase'

export default function Navbar() {
  const { user, profile } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        background: scrolled ? 'rgba(8,8,8,0.97)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(201,162,39,0.1)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'all 0.4s ease',
        padding: '0 2rem',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>

          {/* ── LOGO ── */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.5rem',
                fontWeight: 300,
                letterSpacing: '0.15em',
                color: '#C9A227',
              }}>LAILA'S</span>
              <span style={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.55rem',
                fontWeight: 400,
                letterSpacing: '0.5em',
                color: '#7A7060',
                textTransform: 'uppercase',
                marginTop: '2px',
              }}>TREASURES</span>
            </div>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.5rem',
          }} className="desktop-nav">
            {[
              { path: '/', label: 'Home' },
              { path: '/collection', label: 'Grillz' },
              { path: '/about', label: 'Who Are We' },
              { path: '/how-it-works', label: 'How It Works' },
              { path: '/contact', label: 'Contact' },
            ].map(({ path, label }) => (
              <Link key={path} to={path} style={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.65rem',
                fontWeight: 400,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: isActive(path) ? '#C9A227' : '#7A7060',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                borderBottom: isActive(path) ? '1px solid #C9A227' : '1px solid transparent',
                paddingBottom: '2px',
              }}
                onMouseEnter={e => e.target.style.color = '#C9A227'}
                onMouseLeave={e => e.target.style.color = isActive(path) ? '#C9A227' : '#7A7060'}
              >{label}</Link>
            ))}
          </div>

          {/* ── RIGHT SIDE ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

            {user ? (
              <>
                {/* Messages */}
                <Link to="/messages" title="Messages" style={{
                  color: isActive('/messages') ? '#C9A227' : '#7A7060',
                  fontSize: '1.1rem',
                  transition: 'color 0.3s',
                  textDecoration: 'none',
                }}
                  onMouseEnter={e => e.target.style.color = '#C9A227'}
                  onMouseLeave={e => e.target.style.color = isActive('/messages') ? '#C9A227' : '#7A7060'}
                >✉</Link>

                {/* Saved Designs */}
                <Link to="/saved-designs" title="Saved Designs" style={{
                  color: isActive('/saved-designs') ? '#C9A227' : '#7A7060',
                  fontSize: '1.1rem',
                  transition: 'color 0.3s',
                  textDecoration: 'none',
                }}
                  onMouseEnter={e => e.target.style.color = '#C9A227'}
                  onMouseLeave={e => e.target.style.color = isActive('/saved-designs') ? '#C9A227' : '#7A7060'}
                >♡</Link>

                {/* Admin Badge */}
                {profile?.is_admin && (
                  <Link to="/admin" style={{
                    fontFamily: 'Josefin Sans, sans-serif',
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    background: 'rgba(201,162,39,0.15)',
                    color: '#C9A227',
                    border: '1px solid rgba(201,162,39,0.3)',
                    padding: '0.3rem 0.8rem',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                  }}>ADMIN</Link>
                )}

                {/* Logout */}
                <button onClick={handleLogout} style={{
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  background: 'transparent',
                  color: '#7A7060',
                  border: '1px solid rgba(122,112,96,0.3)',
                  padding: '0.5rem 1.2rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  textTransform: 'uppercase',
                }}
                  onMouseEnter={e => { e.target.style.color = '#C9A227'; e.target.style.borderColor = 'rgba(201,162,39,0.4)' }}
                  onMouseLeave={e => { e.target.style.color = '#7A7060'; e.target.style.borderColor = 'rgba(122,112,96,0.3)' }}
                >Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login" style={{
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  color: '#7A7060',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  transition: 'color 0.3s',
                }}
                  onMouseEnter={e => e.target.style.color = '#C9A227'}
                  onMouseLeave={e => e.target.style.color = '#7A7060'}
                >Login</Link>

                <Link to="/register" style={{
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  background: '#C9A227',
                  color: '#080808',
                  padding: '0.55rem 1.4rem',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  fontWeight: 400,
                  transition: 'all 0.3s',
                }}
                  onMouseEnter={e => e.target.style.background = '#F0D060'}
                  onMouseLeave={e => e.target.style.background = '#C9A227'}
                >Register</Link>
              </>
            )}

            {/* ── MOBILE MENU BUTTON ── */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: '#C9A227',
                fontSize: '1.3rem',
                cursor: 'pointer',
                padding: '0.3rem',
              }}
              className="mobile-menu-btn"
            >{menuOpen ? '✕' : '☰'}</button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: 0, right: 0,
          background: 'rgba(8,8,8,0.98)',
          borderBottom: '1px solid rgba(201,162,39,0.15)',
          zIndex: 99,
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          backdropFilter: 'blur(12px)',
        }}>
          {[
            { path: '/', label: 'Home' },
            { path: '/collection', label: 'Grillz' },
            { path: '/about', label: 'Who Are We' },
            { path: '/how-it-works', label: 'How It Works' },
            { path: '/contact', label: 'Contact' },
          ].map(({ path, label }) => (
            <Link key={path} to={path} style={{
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.8rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: isActive(path) ? '#C9A227' : '#EDE8DC',
              textDecoration: 'none',
            }}>{label}</Link>
          ))}

          <div style={{ height: '1px', background: 'rgba(201,162,39,0.1)' }} />

          {user ? (
            <>
              <Link to="/messages" style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#EDE8DC', textDecoration: 'none' }}>Messages</Link>
              <Link to="/saved-designs" style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#EDE8DC', textDecoration: 'none' }}>Saved Designs</Link>
              <button onClick={handleLogout} style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', background: 'none', border: 'none', color: '#7A7060', cursor: 'pointer', textAlign: 'left', padding: 0 }}>Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#EDE8DC', textDecoration: 'none' }}>Login</Link>
              <Link to="/register" style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A227', textDecoration: 'none' }}>Register</Link>
            </>
          )}
        </div>
      )}

      {/* ── MOBILE STYLES ── */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  )
}

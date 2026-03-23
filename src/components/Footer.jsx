import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      background: '#080808',
      borderTop: '1px solid rgba(201,162,39,0.1)',
      padding: '5rem 2rem 2rem',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* ── TOP SECTION ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '3rem',
          marginBottom: '4rem',
        }} className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '2rem',
                fontWeight: 300,
                letterSpacing: '0.15em',
                color: '#C9A227',
                lineHeight: 1,
              }}>LAILA'S</div>
              <div style={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.55rem',
                letterSpacing: '0.5em',
                color: '#7A7060',
                textTransform: 'uppercase',
                marginTop: '4px',
              }}>TREASURES</div>
            </div>
            <p style={{
              color: '#7A7060',
              fontSize: '0.82rem',
              lineHeight: 1.8,
              maxWidth: '260px',
              fontFamily: 'Josefin Sans, sans-serif',
              fontWeight: 300,
            }}>
              Custom handcrafted grillz and fine jewelry. Made to order, built to last, designed to shine.
            </p>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
              {[
                { label: 'IG', href: '#' },
                { label: 'TT', href: '#' },
                { label: 'FB', href: '#' },
              ].map(({ label, href }) => (
                <a key={label} href={href} style={{
                  width: '2rem',
                  height: '2rem',
                  border: '1px solid rgba(201,162,39,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  color: '#7A7060',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#C9A227'
                    e.currentTarget.style.color = '#C9A227'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(201,162,39,0.2)'
                    e.currentTarget.style.color = '#7A7060'
                  }}
                >{label}</a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <div style={{
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#C9A227',
              marginBottom: '1.5rem',
            }}>Shop</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {[
                { path: '/collection', label: 'All Grillz' },
                { path: '/collection', label: 'Gold Grillz' },
                { path: '/collection', label: 'Diamond Grillz' },
                { path: '/collection', label: 'Silver Grillz' },
                { path: '/contact', label: 'Custom Order' },
              ].map(({ path, label }) => (
                <Link key={label} to={path} style={{
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.78rem',
                  fontWeight: 300,
                  color: '#7A7060',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                  letterSpacing: '0.05em',
                }}
                  onMouseEnter={e => e.target.style.color = '#EDE8DC'}
                  onMouseLeave={e => e.target.style.color = '#7A7060'}
                >{label}</Link>
              ))}
            </div>
          </div>

          {/* Info Links */}
          <div>
            <div style={{
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#C9A227',
              marginBottom: '1.5rem',
            }}>Info</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {[
                { path: '/about', label: 'Who Are We' },
                { path: '/how-it-works', label: 'How It Works' },
                { path: '/contact', label: 'Contact Us' },
              ].map(({ path, label }) => (
                <Link key={label} to={path} style={{
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.78rem',
                  fontWeight: 300,
                  color: '#7A7060',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                  letterSpacing: '0.05em',
                }}
                  onMouseEnter={e => e.target.style.color = '#EDE8DC'}
                  onMouseLeave={e => e.target.style.color = '#7A7060'}
                >{label}</Link>
              ))}
            </div>
          </div>

          {/* Account Links */}
          <div>
            <div style={{
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#C9A227',
              marginBottom: '1.5rem',
            }}>Account</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {[
                { path: '/login', label: 'Login' },
                { path: '/register', label: 'Register' },
                { path: '/saved-designs', label: 'Saved Designs' },
                { path: '/messages', label: 'My Messages' },
              ].map(({ path, label }) => (
                <Link key={label} to={path} style={{
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.78rem',
                  fontWeight: 300,
                  color: '#7A7060',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                  letterSpacing: '0.05em',
                }}
                  onMouseEnter={e => e.target.style.color = '#EDE8DC'}
                  onMouseLeave={e => e.target.style.color = '#7A7060'}
                >{label}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── GOLD DIVIDER ── */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.3), transparent)',
          marginBottom: '2rem',
        }} />

        {/* ── BOTTOM SECTION ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            color: '#7A7060',
            fontWeight: 300,
          }}>
            © {year} Laila's Treasures. All rights reserved.
          </p>

          <div style={{ display: 'flex', gap: '2rem' }}>
            {[
              { path: '/contact', label: 'Privacy Policy' },
              { path: '/contact', label: 'Terms of Service' },
            ].map(({ path, label }) => (
              <Link key={label} to={path} style={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                color: '#7A7060',
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
                onMouseEnter={e => e.target.style.color = '#C9A227'}
                onMouseLeave={e => e.target.style.color = '#7A7060'}
              >{label}</Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── RESPONSIVE STYLES ── */}
      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 500px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}

import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <div style={{
        padding: '8rem 2rem 6rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(201,162,39,0.08)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(201,162,39,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        {[300, 500, 700].map((size, i) => (
          <div key={size} style={{
            position: 'absolute',
            width: size, height: size,
            borderRadius: '50%',
            border: '1px solid rgba(201,162,39,0.05)',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
          }} />
        ))}
        <div style={{ position: 'relative' }}>
          <div style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.65rem', letterSpacing: '0.5em',
            textTransform: 'uppercase', color: '#C9A227',
            marginBottom: '1.5rem',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '1rem',
          }}>
            <span style={{ width: '2rem', height: '1px', background: '#C9A227', display: 'block' }} />
            Our Story
            <span style={{ width: '2rem', height: '1px', background: '#C9A227', display: 'block' }} />
          </div>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2.5rem, 7vw, 6rem)',
            fontWeight: 300, letterSpacing: '0.08em',
            color: '#EDE8DC', lineHeight: 1,
            marginBottom: '1.5rem',
          }}>Who Are We</h1>
          <p style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
            color: '#7A7060', maxWidth: '500px',
            margin: '0 auto', lineHeight: 1.7,
            fontWeight: 300,
          }}>
            Born from a passion for fine jewelry and the culture that surrounds it
          </p>
        </div>
      </div>

      {/* ── BRAND STORY ── */}
      <section style={{ padding: '7rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '6rem',
            alignItems: 'center',
          }} className="about-grid">

            {/* Visual */}
            <div style={{ position: 'relative' }}>
              <div style={{
                aspectRatio: '4/5',
                background: 'linear-gradient(135deg, #161616 0%, #1E1800 50%, #161616 100%)',
                border: '1px solid rgba(201,162,39,0.1)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Decorative */}
                <div style={{
                  position: 'absolute', inset: '2rem',
                  border: '1px solid rgba(201,162,39,0.08)',
                }} />
                <div style={{
                  textAlign: 'center', position: 'relative',
                }}>
                  <div style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '6rem', fontWeight: 300,
                    background: 'linear-gradient(135deg, #F9EFC0, #C9A227, #8B6914)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1,
                  }}>L</div>
                  <div style={{
                    fontFamily: 'Josefin Sans, sans-serif',
                    fontSize: '0.6rem', letterSpacing: '0.5em',
                    textTransform: 'uppercase', color: '#7A7060',
                    marginTop: '0.5rem',
                  }}>Laila's Treasures</div>
                </div>

                {/* Corner Accents */}
                {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(pos => (
                  <div key={pos} style={{
                    position: 'absolute',
                    [pos.includes('top') ? 'top' : 'bottom']: '1.5rem',
                    [pos.includes('left') ? 'left' : 'right']: '1.5rem',
                    width: '20px', height: '20px',
                    borderTop: pos.includes('top') ? '1px solid rgba(201,162,39,0.3)' : 'none',
                    borderBottom: pos.includes('bottom') ? '1px solid rgba(201,162,39,0.3)' : 'none',
                    borderLeft: pos.includes('left') ? '1px solid rgba(201,162,39,0.3)' : 'none',
                    borderRight: pos.includes('right') ? '1px solid rgba(201,162,39,0.3)' : 'none',
                  }} />
                ))}
              </div>

              {/* Floating Badge */}
              <div style={{
                position: 'absolute',
                bottom: '-1.5rem', right: '-1.5rem',
                background: '#C9A227',
                padding: '1.5rem',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '2rem', fontWeight: 300,
                  color: '#080808', lineHeight: 1,
                }}>100%</div>
                <div style={{
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.55rem', letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: '#080808',
                  marginTop: '0.3rem',
                }}>Custom Made</div>
              </div>
            </div>

            {/* Story Text */}
            <div>
              <div style={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.65rem', letterSpacing: '0.4em',
                textTransform: 'uppercase', color: '#C9A227',
                marginBottom: '1rem',
                display: 'flex', alignItems: 'center', gap: '0.8rem',
              }}>
                <span style={{ width: '2rem', height: '1px', background: '#C9A227', display: 'block' }} />
                The Beginning
              </div>

              <h2 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                fontWeight: 300, color: '#EDE8DC',
                marginBottom: '1.5rem', lineHeight: 1.2,
              }}>A Love for Jewelry, A Passion for Craft</h2>

              <p style={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.85rem', fontWeight: 300,
                color: '#7A7060', lineHeight: 1.9,
                marginBottom: '1.2rem',
              }}>
                Laila's Treasures was born from a deep appreciation for fine jewelry and the artistry behind custom grillz. What started as a personal passion became a mission — to bring high-quality, handcrafted jewelry to everyone who wants to express themselves through gold.
              </p>

              <p style={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.85rem', fontWeight: 300,
                color: '#7A7060', lineHeight: 1.9,
                marginBottom: '1.2rem',
              }}>
                We believe that every piece of jewelry tells a story. Whether it's your first grill or your tenth custom order, we treat every piece with the same level of care, precision, and attention to detail that our clients deserve.
              </p>

              <p style={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.85rem', fontWeight: 300,
                color: '#7A7060', lineHeight: 1.9,
                marginBottom: '2rem',
              }}>
                Our focus is simple: solid materials, custom fit, personal service. No shortcuts. No plating. Just real gold, crafted to your specifications, made to last a lifetime.
              </p>

              <div style={{ height: '1px', background: 'rgba(201,162,39,0.1)', marginBottom: '2rem' }} />

              <Link to="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: '#C9A227', color: '#080808',
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.7rem', letterSpacing: '0.3em',
                textTransform: 'uppercase', padding: '1rem 2rem',
                textDecoration: 'none', transition: 'all 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#F0D060'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#C9A227'; e.currentTarget.style.transform = 'translateY(0)' }}
              >Start Your Order ✦</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{
        padding: '6rem 2rem',
        background: '#101010',
        borderTop: '1px solid rgba(201,162,39,0.08)',
        borderBottom: '1px solid rgba(201,162,39,0.08)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.65rem', letterSpacing: '0.4em',
              textTransform: 'uppercase', color: '#C9A227',
              marginBottom: '1rem',
            }}>What We Stand For</div>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 300, color: '#EDE8DC',
            }}>Our Values</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2px',
            background: 'rgba(201,162,39,0.06)',
          }}>
            {[
              {
                icon: '✦',
                title: 'Authenticity',
                desc: 'Every piece is made from solid precious metals. We never use plating or shortcuts. What you order is exactly what you receive.',
              },
              {
                icon: '👑',
                title: 'Craftsmanship',
                desc: 'Our jewelers bring years of experience to every order. Each grill is handcrafted with precision and care.',
              },
              {
                icon: '💎',
                title: 'Quality First',
                desc: 'We source only the finest materials — certified gold, conflict-free diamonds, and premium silver.',
              },
              {
                icon: '✉',
                title: 'Personal Service',
                desc: 'You deal directly with us — no middlemen. We guide you through every step from design to delivery.',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{
                background: '#101010',
                padding: '3rem 2rem',
                transition: 'background 0.3s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#131313'}
                onMouseLeave={e => e.currentTarget.style.background = '#101010'}
              >
                <div style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '2rem', marginBottom: '1.2rem',
                  color: '#C9A227',
                }}>{icon}</div>
                <h4 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.3rem', fontWeight: 400,
                  color: '#EDE8DC', marginBottom: '0.8rem',
                  letterSpacing: '0.03em',
                }}>{title}</h4>
                <p style={{
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.8rem', fontWeight: 300,
                  color: '#7A7060', lineHeight: 1.8,
                }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2rem',
            textAlign: 'center',
          }}>
            {[
              { num: '100%', label: 'Custom Made' },
              { num: 'Solid', label: 'Gold & Silver Only' },
              { num: '24hr', label: 'Response Time' },
              { num: '∞', label: 'Design Possibilities' },
            ].map(({ num, label }) => (
              <div key={label} style={{
                padding: '2rem 1rem',
                borderBottom: '1px solid rgba(201,162,39,0.1)',
              }}>
                <div style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '3rem', fontWeight: 300,
                  color: '#C9A227', lineHeight: 1,
                  marginBottom: '0.5rem',
                }}>{num}</div>
                <div style={{
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.65rem', letterSpacing: '0.25em',
                  textTransform: 'uppercase', color: '#7A7060',
                }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: '6rem 2rem',
        background: '#101010',
        borderTop: '1px solid rgba(201,162,39,0.08)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 300, color: '#EDE8DC',
            marginBottom: '1rem',
          }}>Ready to Work With Us?</h2>
          <p style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.82rem', fontWeight: 300,
            color: '#7A7060', marginBottom: '2.5rem',
            lineHeight: 1.8,
          }}>
            Browse our collection, save your favorites, and reach out. We'll take it from there.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/collection" style={{
              background: '#C9A227', color: '#080808',
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.7rem', letterSpacing: '0.3em',
              textTransform: 'uppercase', padding: '1rem 2.5rem',
              textDecoration: 'none', transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F0D060'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#C9A227'; e.currentTarget.style.transform = 'translateY(0)' }}
            >Shop Collection</Link>
            <Link to="/how-it-works" style={{
              background: 'transparent', color: '#C9A227',
              border: '1px solid rgba(201,162,39,0.4)',
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.7rem', letterSpacing: '0.3em',
              textTransform: 'uppercase', padding: '1rem 2.5rem',
              textDecoration: 'none', transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,162,39,0.05)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)' }}
            >How It Works</Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </div>
  )
}

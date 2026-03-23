import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeatured()
  }, [])

  async function fetchFeatured() {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('in_stock', true)
      .limit(4)
    setProducts(data || [])
    setLoading(false)
  }

  return (
    <div style={{ background: '#080808' }}>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '8rem 2rem 6rem',
      }}>
        {/* Background Effects */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,162,39,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(201,162,39,0.015) 80px, rgba(201,162,39,0.015) 81px), repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(201,162,39,0.015) 80px, rgba(201,162,39,0.015) 81px)',
          pointerEvents: 'none',
        }} />

        {/* Animated Rings */}
        {[300, 500, 700, 900].map((size, i) => (
          <div key={size} style={{
            position: 'absolute',
            width: size, height: size,
            borderRadius: '50%',
            border: '1px solid rgba(201,162,39,0.06)',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: `pulseRing ${3 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }} />
        ))}

        <div style={{ position: 'relative', textAlign: 'center', maxWidth: '800px' }}>
          {/* Eyebrow */}
          <div style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            color: '#C9A227',
            marginBottom: '2rem',
            opacity: 0,
            animation: 'fadeUp 0.8s 0.2s forwards',
          }}>✦ Custom Handcrafted Jewelry ✦</div>

          {/* Main Title */}
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(3.5rem, 10vw, 8rem)',
            fontWeight: 300,
            lineHeight: 0.95,
            letterSpacing: '0.08em',
            marginBottom: '0.5rem',
            opacity: 0,
            animation: 'fadeUp 0.8s 0.4s forwards',
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #F9EFC0 0%, #C9A227 40%, #8B6914 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>LAILA'S</span>
          </h1>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(3.5rem, 10vw, 8rem)',
            fontWeight: 300,
            lineHeight: 0.95,
            letterSpacing: '0.08em',
            marginBottom: '2rem',
            opacity: 0,
            animation: 'fadeUp 0.8s 0.5s forwards',
          }}>
            <span style={{ color: '#EDE8DC' }}>TREASURES</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
            color: '#7A7060',
            marginBottom: '3rem',
            fontWeight: 300,
            opacity: 0,
            animation: 'fadeUp 0.8s 0.7s forwards',
          }}>
            Where every smile tells a story of gold
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            opacity: 0,
            animation: 'fadeUp 0.8s 0.9s forwards',
          }}>
            <Link to="/collection" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: '#C9A227', color: '#080808',
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.7rem', letterSpacing: '0.3em',
              textTransform: 'uppercase', fontWeight: 400,
              padding: '1rem 2.5rem', textDecoration: 'none',
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F0D060'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#C9A227'; e.currentTarget.style.transform = 'translateY(0)' }}
            >Shop Grillz ✦</Link>

            <Link to="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'transparent', color: '#C9A227',
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.7rem', letterSpacing: '0.3em',
              textTransform: 'uppercase', fontWeight: 400,
              padding: '1rem 2.5rem', textDecoration: 'none',
              border: '1px solid rgba(201,162,39,0.4)',
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,162,39,0.05)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)' }}
            >Custom Order</Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '0.5rem',
          opacity: 0, animation: 'fadeUp 0.8s 1.2s forwards',
        }}>
          <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.55rem', letterSpacing: '0.4em', color: '#7A7060', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #C9A227, transparent)', animation: 'scrollPulse 2s ease-in-out infinite' }} />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{
        borderTop: '1px solid rgba(201,162,39,0.1)',
        borderBottom: '1px solid rgba(201,162,39,0.1)',
        padding: '1rem 0',
        overflow: 'hidden',
        background: 'rgba(201,162,39,0.02)',
      }}>
        <div style={{
          display: 'flex', gap: '3rem',
          animation: 'marquee 25s linear infinite',
          width: 'max-content',
          whiteSpace: 'nowrap',
        }}>
          {Array(3).fill([
            '14K GOLD', '✦', '18K GOLD', '✦', 'CUSTOM FIT', '✦',
            'DIAMOND CUT', '✦', 'SOLID GRILLZ', '✦', 'OPEN FACE', '✦',
            'HANDCRAFTED', '✦', 'STERLING SILVER', '✦',
          ]).flat().map((item, i) => (
            <span key={i} style={{
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: item === '✦' ? 'rgba(201,162,39,0.3)' : 'rgba(201,162,39,0.5)',
            }}>{item}</span>
          ))}
        </div>
      </div>

      {/* ── FEATURED PRODUCTS ── */}
      <section style={{ padding: '7rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.65rem', letterSpacing: '0.4em',
              textTransform: 'uppercase', color: '#C9A227',
              marginBottom: '1rem',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '1rem',
            }}>
              <span style={{ display: 'block', width: '2rem', height: '1px', background: '#C9A227' }} />
              Featured Collection
              <span style={{ display: 'block', width: '2rem', height: '1px', background: '#C9A227' }} />
            </div>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 300, letterSpacing: '0.05em',
              color: '#EDE8DC',
            }}>Most Loved Grillz</h2>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <div className="spinner" />
            </div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }}>💎</div>
              <p style={{ color: '#7A7060', fontFamily: 'Josefin Sans, sans-serif', letterSpacing: '0.1em' }}>
                Products coming soon — check back shortly
              </p>
              <Link to="/contact" style={{
                display: 'inline-block', marginTop: '1.5rem',
                fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.7rem',
                letterSpacing: '0.3em', textTransform: 'uppercase',
                color: '#C9A227', textDecoration: 'none',
                border: '1px solid rgba(201,162,39,0.3)', padding: '0.8rem 2rem',
              }}>Request Custom Order</Link>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
            }}>
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/collection" style={{
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.7rem', letterSpacing: '0.3em',
              textTransform: 'uppercase', color: '#C9A227',
              textDecoration: 'none',
              border: '1px solid rgba(201,162,39,0.3)',
              padding: '0.9rem 2.5rem',
              display: 'inline-block',
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,162,39,0.05)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)' }}
            >View All Collection →</Link>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section style={{
        padding: '7rem 2rem',
        background: '#101010',
        borderTop: '1px solid rgba(201,162,39,0.08)',
        borderBottom: '1px solid rgba(201,162,39,0.08)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.65rem', letterSpacing: '0.4em',
              textTransform: 'uppercase', color: '#C9A227',
              marginBottom: '1rem',
            }}>Why Choose Us</div>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 300, color: '#EDE8DC',
            }}>The Laila's Promise</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2px',
            background: 'rgba(201,162,39,0.06)',
          }}>
            {[
              { icon: '✦', title: 'Custom Fit', desc: 'Every grill is molded to your exact teeth. No one size fits all — only yours.' },
              { icon: '💎', title: 'Premium Materials', desc: 'Solid 10K, 14K, 18K gold and sterling silver. No plating, no shortcuts.' },
              { icon: '👑', title: 'Handcrafted', desc: 'Each piece is handmade by skilled jewelers with years of experience.' },
              { icon: '✉', title: 'Personal Service', desc: 'Direct communication with our team. We guide you through every step.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{
                background: '#101010',
                padding: '3rem 2rem',
                textAlign: 'center',
                transition: 'background 0.3s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#141414'}
                onMouseLeave={e => e.currentTarget.style.background = '#101010'}
              >
                <div style={{ fontSize: '2rem', marginBottom: '1.2rem' }}>{icon}</div>
                <h4 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.3rem', fontWeight: 400,
                  letterSpacing: '0.05em', color: '#EDE8DC',
                  marginBottom: '0.8rem',
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

      {/* ── HOW IT WORKS PREVIEW ── */}
      <section style={{ padding: '7rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.65rem', letterSpacing: '0.4em',
              textTransform: 'uppercase', color: '#C9A227',
              marginBottom: '1rem',
            }}>Simple Process</div>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 300, color: '#EDE8DC',
            }}>Your Grill in 4 Steps</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2rem',
          }}>
            {[
              { num: '01', title: 'Browse', desc: 'Explore our collection and find your perfect style.' },
              { num: '02', title: 'Save Design', desc: 'Save your favorite designs to your account.' },
              { num: '03', title: 'Contact Us', desc: 'Send us a message with your saved design.' },
              { num: '04', title: 'Receive', desc: 'Your custom grill arrives crafted to perfection.' },
            ].map(({ num, title, desc }) => (
              <div key={num} style={{ position: 'relative', padding: '2rem 0' }}>
                <div style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '5rem', fontWeight: 300,
                  color: 'rgba(201,162,39,0.06)',
                  lineHeight: 1, marginBottom: '0.5rem',
                }}>{num}</div>
                <h4 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.4rem', fontWeight: 400,
                  color: '#C9A227', marginBottom: '0.5rem',
                }}>{title}</h4>
                <p style={{
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.8rem', fontWeight: 300,
                  color: '#7A7060', lineHeight: 1.8,
                }}>{desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/how-it-works" style={{
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.7rem', letterSpacing: '0.3em',
              textTransform: 'uppercase', color: '#C9A227',
              textDecoration: 'none',
            }}>Learn More About The Process →</Link>
          </div>
        </div>
      </section>
{/* ── CUSTOMER PHOTOS CAROUSEL ── */}
      <CustomerCarousel />
      {/* ── CTA BANNER ── */}
      <section style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, #0D0D0D 0%, #1A1200 50%, #0D0D0D 100%)',
        borderTop: '1px solid rgba(201,162,39,0.1)',
        borderBottom: '1px solid rgba(201,162,39,0.1)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,162,39,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.65rem', letterSpacing: '0.4em',
            textTransform: 'uppercase', color: '#C9A227',
            marginBottom: '1.5rem',
          }}>Ready to Shine?</div>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 300, color: '#EDE8DC',
            marginBottom: '1.5rem',
          }}>Start Your Custom Order Today</h2>
          <p style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.82rem', fontWeight: 300,
            color: '#7A7060', marginBottom: '2.5rem', lineHeight: 1.8,
          }}>
            Tell us your vision. We'll craft something unforgettable.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{
              background: '#C9A227', color: '#080808',
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.7rem', letterSpacing: '0.3em',
              textTransform: 'uppercase', padding: '1rem 2.5rem',
              textDecoration: 'none', transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F0D060'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#C9A227'; e.currentTarget.style.transform = 'translateY(0)' }}
            >Contact Us Now</Link>
            <Link to="/register" style={{
              background: 'transparent', color: '#C9A227',
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.7rem', letterSpacing: '0.3em',
              textTransform: 'uppercase', padding: '1rem 2.5rem',
              textDecoration: 'none',
              border: '1px solid rgba(201,162,39,0.4)',
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,162,39,0.05)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)' }}
            >Create Account</Link>
          </div>
        </div>
      </section>

      {/* ── ANIMATIONS ── */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseRing {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 0.6; transform: translate(-50%, -50%) scale(1.02); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.33%); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>
    </div>
  )
}

// ── PRODUCT CARD COMPONENT ──
function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: '#101010',
        border: '1px solid rgba(201,162,39,0.08)',
        overflow: 'hidden',
        transition: 'all 0.3s',
        cursor: 'pointer',
      }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(201,162,39,0.25)'
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(201,162,39,0.1)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(201,162,39,0.08)'
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {/* Image */}
        <div style={{
          height: '220px',
          background: product.image_url
            ? `url(${product.image_url}) center/cover no-repeat`
            : 'linear-gradient(135deg, #161616, #1E1800)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          {!product.image_url && (
            <span style={{ fontSize: '3rem', opacity: 0.3 }}>💎</span>
          )}
          {product.style && (
            <div style={{
              position: 'absolute', top: '1rem', left: '1rem',
              background: 'rgba(201,162,39,0.15)',
              border: '1px solid rgba(201,162,39,0.2)',
              color: '#C9A227',
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.6rem', letterSpacing: '0.2em',
              textTransform: 'uppercase', padding: '0.3rem 0.7rem',
            }}>{product.style}</div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '1.5rem' }}>
          <h4 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1.3rem', fontWeight: 400,
            color: '#EDE8DC', marginBottom: '0.4rem',
          }}>{product.name}</h4>
          <p style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.75rem', fontWeight: 300,
            color: '#7A7060', letterSpacing: '0.1em',
            marginBottom: '1rem',
          }}>{product.material}</p>
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <span style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.4rem', color: '#C9A227',
              }}>${product.base_price}</span>
              <span style={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.65rem', color: '#7A7060',
                marginLeft: '0.3rem',
              }}>starting</span>
            </div>
            <span style={{
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.65rem', letterSpacing: '0.2em',
              color: '#C9A227', textTransform: 'uppercase',
            }}>View →</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
function CustomerCarousel() {
  const [photos, setPhotos] = useState([])
  const trackRef = useRef(null)

  useEffect(() => {
    supabase.from('customer_photos')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data }) => setPhotos(data || []))
  }, [])

  if (photos.length === 0) return null

  const doubled = [...photos, ...photos]

  return (
    <section style={{
      padding: '6rem 0',
      borderTop: '1px solid rgba(201,162,39,0.08)',
      overflow: 'hidden',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '0 2rem' }}>
        <div style={{
          fontFamily: 'Josefin Sans, sans-serif',
          fontSize: '0.65rem', letterSpacing: '0.5em',
          textTransform: 'uppercase', color: '#C9A227',
          marginBottom: '1rem',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: '1rem',
        }}>
          <span style={{ width: '2rem', height: '1px', background: '#C9A227', display: 'block' }} />
          Happy Customers
          <span style={{ width: '2rem', height: '1px', background: '#C9A227', display: 'block' }} />
        </div>
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 300, color: '#EDE8DC',
        }}>Wearing Laila's Treasures</h2>
      </div>

      <div style={{ position: 'relative' }}>
        {/* Fade edges */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: '120px', zIndex: 2,
          background: 'linear-gradient(to right, #080808, transparent)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0,
          width: '120px', zIndex: 2,
          background: 'linear-gradient(to left, #080808, transparent)',
          pointerEvents: 'none',
        }} />

        <div ref={trackRef} style={{
          display: 'flex', gap: '1rem',
          animation: 'scrollTrack 40s linear infinite',
          width: 'max-content',
        }}>
          {doubled.map((photo, i) => (
            <div key={i} style={{
              width: '280px', height: '340px',
              flexShrink: 0, overflow: 'hidden',
              border: '1px solid rgba(201,162,39,0.1)',
              position: 'relative',
            }}>
              <img
                src={photo.image_url}
                alt="Customer"
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(8,8,8,0.4) 0%, transparent 50%)',
                pointerEvents: 'none',
              }} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scrollTrack {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
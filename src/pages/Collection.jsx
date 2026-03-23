import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const STYLES = ['All', 'Open Face', 'Solid', 'Diamond Cut', 'Fang', 'Dust', 'Iced Out']
const MATERIALS = ['All', '10K Gold', '14K Gold', '18K Gold', 'Sterling Silver', 'Rose Gold', 'White Gold']

export default function Collection() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeStyle, setActiveStyle] = useState('All')
  const [activeMaterial, setActiveMaterial] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [products, activeStyle, activeMaterial, search])

  async function fetchProducts() {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('in_stock', true)
      .order('created_at', { ascending: false })
    setProducts(data || [])
    setLoading(false)
  }

  function filterProducts() {
    let result = [...products]
    if (activeStyle !== 'All') result = result.filter(p => p.style === activeStyle)
    if (activeMaterial !== 'All') result = result.filter(p => p.material === activeMaterial)
    if (search.trim()) result = result.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase())
    )
    setFiltered(result)
  }

  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>

      {/* ── PAGE HERO ── */}
      <div style={{
        padding: '8rem 2rem 4rem',
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
            The Collection
            <span style={{ width: '2rem', height: '1px', background: '#C9A227', display: 'block' }} />
          </div>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: 300, letterSpacing: '0.08em',
            color: '#EDE8DC', marginBottom: '1rem',
          }}>Grillz Collection</h1>
          <p style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.82rem', fontWeight: 300,
            color: '#7A7060', maxWidth: '400px',
            margin: '0 auto', lineHeight: 1.8,
          }}>
            Every piece handcrafted to perfection. Browse our styles and save your favorites.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>

        {/* ── SEARCH ── */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ position: 'relative', maxWidth: '400px' }}>
            <input
              type="text"
              placeholder="Search grillz..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(201,162,39,0.15)',
                color: '#EDE8DC',
                padding: '0.85rem 1rem 0.85rem 2.5rem',
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.85rem', fontWeight: 300,
                outline: 'none', transition: 'border-color 0.3s',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(201,162,39,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(201,162,39,0.15)'}
            />
            <span style={{
              position: 'absolute', left: '0.8rem', top: '50%',
              transform: 'translateY(-50%)', color: '#7A7060', fontSize: '0.9rem',
            }}>🔍</span>
          </div>
        </div>

        {/* ── STYLE FILTERS ── */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.6rem', letterSpacing: '0.3em',
            textTransform: 'uppercase', color: '#7A7060',
            marginBottom: '0.8rem',
          }}>Style</div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {STYLES.map(style => (
              <button key={style} onClick={() => setActiveStyle(style)} style={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.65rem', letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '0.5rem 1.2rem',
                background: activeStyle === style ? '#C9A227' : 'transparent',
                color: activeStyle === style ? '#080808' : '#7A7060',
                border: activeStyle === style ? '1px solid #C9A227' : '1px solid rgba(201,162,39,0.15)',
                cursor: 'pointer', transition: 'all 0.3s',
              }}
                onMouseEnter={e => { if (activeStyle !== style) { e.currentTarget.style.borderColor = 'rgba(201,162,39,0.4)'; e.currentTarget.style.color = '#C9A227' } }}
                onMouseLeave={e => { if (activeStyle !== style) { e.currentTarget.style.borderColor = 'rgba(201,162,39,0.15)'; e.currentTarget.style.color = '#7A7060' } }}
              >{style}</button>
            ))}
          </div>
        </div>

        {/* ── MATERIAL FILTERS ── */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.6rem', letterSpacing: '0.3em',
            textTransform: 'uppercase', color: '#7A7060',
            marginBottom: '0.8rem',
          }}>Material</div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {MATERIALS.map(mat => (
              <button key={mat} onClick={() => setActiveMaterial(mat)} style={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.65rem', letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '0.5rem 1.2rem',
                background: activeMaterial === mat ? 'rgba(201,162,39,0.15)' : 'transparent',
                color: activeMaterial === mat ? '#C9A227' : '#7A7060',
                border: activeMaterial === mat ? '1px solid rgba(201,162,39,0.4)' : '1px solid rgba(201,162,39,0.1)',
                cursor: 'pointer', transition: 'all 0.3s',
              }}
                onMouseEnter={e => { if (activeMaterial !== mat) { e.currentTarget.style.borderColor = 'rgba(201,162,39,0.3)'; e.currentTarget.style.color = '#C9A227' } }}
                onMouseLeave={e => { if (activeMaterial !== mat) { e.currentTarget.style.borderColor = 'rgba(201,162,39,0.1)'; e.currentTarget.style.color = '#7A7060' } }}
              >{mat}</button>
            ))}
          </div>
        </div>

        {/* ── RESULTS COUNT ── */}
        {!loading && (
          <div style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.7rem', letterSpacing: '0.2em',
            color: '#7A7060', marginBottom: '2rem',
          }}>
            {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'} found
          </div>
        )}

        {/* ── PRODUCTS GRID ── */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '6rem' }}>
            <div className="spinner" />
          </div>
        ) : filtered.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '6rem 2rem',
            border: '1px solid rgba(201,162,39,0.08)',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }}>💎</div>
            <h3 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.5rem', fontWeight: 300,
              color: '#EDE8DC', marginBottom: '0.5rem',
            }}>
              {products.length === 0 ? 'Collection Coming Soon' : 'No Results Found'}
            </h3>
            <p style={{
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.8rem', color: '#7A7060',
              marginBottom: '2rem',
            }}>
              {products.length === 0
                ? 'Our collection is being curated. Contact us for custom orders.'
                : 'Try adjusting your filters or search term.'}
            </p>
            {products.length === 0 && (
              <Link to="/contact" style={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.7rem', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: '#C9A227',
                textDecoration: 'none',
                border: '1px solid rgba(201,162,39,0.3)',
                padding: '0.8rem 2rem', display: 'inline-block',
              }}>Request Custom Order</Link>
            )}
            {products.length > 0 && (
              <button onClick={() => { setActiveStyle('All'); setActiveMaterial('All'); setSearch('') }}
                style={{
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.7rem', letterSpacing: '0.3em',
                  textTransform: 'uppercase', color: '#C9A227',
                  background: 'none', border: '1px solid rgba(201,162,39,0.3)',
                  padding: '0.8rem 2rem', cursor: 'pointer',
                }}>Clear Filters</button>
            )}
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* ── CUSTOM ORDER CTA ── */}
        {!loading && (
          <div style={{
            marginTop: '5rem',
            padding: '3rem',
            background: '#101010',
            border: '1px solid rgba(201,162,39,0.08)',
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.65rem', letterSpacing: '0.4em',
              textTransform: 'uppercase', color: '#C9A227',
              marginBottom: '1rem',
            }}>Don't See What You Want?</div>
            <h3 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '2rem', fontWeight: 300,
              color: '#EDE8DC', marginBottom: '1rem',
            }}>We Do Fully Custom Orders</h3>
            <p style={{
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.8rem', fontWeight: 300,
              color: '#7A7060', marginBottom: '2rem',
              maxWidth: '400px', margin: '0 auto 2rem',
              lineHeight: 1.8,
            }}>
              Tell us your vision — material, style, tooth count — and we'll craft it just for you.
            </p>
            <Link to="/contact" style={{
              background: '#C9A227', color: '#080808',
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.7rem', letterSpacing: '0.3em',
              textTransform: 'uppercase', padding: '1rem 2.5rem',
              textDecoration: 'none', display: 'inline-block',
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#F0D060'}
              onMouseLeave={e => e.currentTarget.style.background = '#C9A227'}
            >Start Custom Order ✦</Link>
          </div>
        )}
      </div>
    </div>
  )
}

// ── PRODUCT CARD ──
function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: '#101010',
        border: '1px solid rgba(201,162,39,0.08)',
        overflow: 'hidden',
        transition: 'all 0.3s',
        height: '100%',
      }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(201,162,39,0.3)'
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
          height: '240px',
          background: product.image_url
            ? `url(${product.image_url}) center/cover no-repeat`
            : 'linear-gradient(135deg, #161616 0%, #1E1800 100%)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', position: 'relative',
        }}>
          {!product.image_url && (
            <span style={{ fontSize: '3.5rem', opacity: 0.2 }}>💎</span>
          )}

          {/* Badges */}
          <div style={{
            position: 'absolute', top: '1rem', left: '1rem',
            display: 'flex', gap: '0.5rem', flexWrap: 'wrap',
          }}>
            {product.style && (
              <span style={{
                background: 'rgba(8,8,8,0.8)',
                border: '1px solid rgba(201,162,39,0.2)',
                color: '#C9A227',
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.58rem', letterSpacing: '0.2em',
                textTransform: 'uppercase', padding: '0.3rem 0.7rem',
              }}>{product.style}</span>
            )}
          </div>

          {/* Quick View Overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(8,8,8,0.5)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center',
            opacity: 0, transition: 'opacity 0.3s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = 1}
            onMouseLeave={e => e.currentTarget.style.opacity = 0}
          >
            <span style={{
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.7rem', letterSpacing: '0.3em',
              textTransform: 'uppercase', color: '#C9A227',
              border: '1px solid rgba(201,162,39,0.5)',
              padding: '0.6rem 1.5rem',
            }}>View Details</span>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: '1.5rem' }}>
          <div style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.65rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#7A7060',
            marginBottom: '0.4rem',
          }}>{product.category || 'Grillz'}</div>

          <h3 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1.3rem', fontWeight: 400,
            color: '#EDE8DC', marginBottom: '0.3rem',
            letterSpacing: '0.03em',
          }}>{product.name}</h3>

          <p style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.75rem', fontWeight: 300,
            color: '#7A7060', letterSpacing: '0.08em',
            marginBottom: '1.2rem',
          }}>{product.material}</p>

          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(201,162,39,0.08)',
            paddingTop: '1rem',
          }}>
            <div>
              <span style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.5rem', fontWeight: 300,
                color: '#C9A227',
              }}>${product.base_price}</span>
              <span style={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.6rem', color: '#7A7060',
                marginLeft: '0.4rem', letterSpacing: '0.1em',
              }}>starting</span>
            </div>
            {product.price_per_tooth && (
              <span style={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.65rem', color: '#7A7060',
                letterSpacing: '0.1em',
              }}>${product.price_per_tooth}/tooth</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

import { Link } from 'react-router-dom'

export default function HowItWorks() {
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
          background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(201,162,39,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
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
            The Process
            <span style={{ width: '2rem', height: '1px', background: '#C9A227', display: 'block' }} />
          </div>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2.5rem, 7vw, 6rem)',
            fontWeight: 300, letterSpacing: '0.08em',
            color: '#EDE8DC', lineHeight: 1,
            marginBottom: '1.5rem',
          }}>How It Works</h1>
          <p style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.82rem', fontWeight: 300,
            color: '#7A7060', maxWidth: '450px',
            margin: '0 auto', lineHeight: 1.8,
          }}>
            Getting your custom grillz is easier than you think. Here's everything you need to know.
          </p>
        </div>
      </div>

      {/* ── MAIN STEPS ── */}
      <section style={{ padding: '7rem 2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div style={{
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.65rem', letterSpacing: '0.4em',
              textTransform: 'uppercase', color: '#C9A227',
              marginBottom: '1rem',
            }}>Step by Step</div>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 300, color: '#EDE8DC',
            }}>Your Order Journey</h2>
          </div>

          {[
            {
              num: '01',
              title: 'Browse the Collection',
              desc: 'Start by exploring our Grillz Collection page. We offer a variety of styles including Open Face, Solid, Diamond Cut, Fang, Dust, and Iced Out. Filter by style or material to find what speaks to you.',
              details: [
                'View all available grillz styles',
                'Filter by material and style',
                'See starting prices per design',
                'Click any product to view details',
              ],
              cta: { label: 'Browse Collection', path: '/collection' },
            },
            {
              num: '02',
              title: 'Customize Your Design',
              desc: 'On the product page, choose how many teeth you want covered. Use the slider to select from 1 to 14 teeth and watch the price update live. Add any special notes or requests.',
              details: [
                'Select teeth count with live slider',
                'Price updates automatically',
                'Add custom notes or requests',
                'See material details clearly',
              ],
              cta: null,
            },
            {
              num: '03',
              title: 'Save Your Favorite Designs',
              desc: 'When you find a design you love, click "Save This Design." You\'ll need to create a free account or log in. Your saved designs are stored in your account and can be accessed anytime.',
              details: [
                'Create a free account to save designs',
                'Save as many designs as you want',
                'Access them anytime from any device',
                'Edit or remove saved designs',
              ],
              cta: { label: 'Create Account', path: '/register' },
            },
            {
              num: '04',
              title: 'Send Us Your Order',
              desc: 'When you\'re ready, send your saved designs directly to us through our messenger or contact form. We\'ll review your selections and get back to you with a confirmation and next steps.',
              details: [
                'Send designs via our messenger',
                'Or use the contact form',
                'We reply within 24 hours',
                'No deposit until design is confirmed',
              ],
              cta: { label: 'Contact Us', path: '/contact' },
            },
            {
              num: '05',
              title: 'We Craft Your Grillz',
              desc: 'Once your order is confirmed, our jewelers get to work. Every piece is handcrafted from solid precious metals to your exact specifications. This typically takes 7–14 business days.',
              details: [
                'Handcrafted by expert jewelers',
                'Made from solid gold or silver',
                'Quality checked before shipping',
                '7–14 business days production',
              ],
              cta: null,
            },
            {
              num: '06',
              title: 'Receive & Enjoy',
              desc: 'Your custom grillz arrive in a luxury box with a certificate of authenticity. They come ready to wear — no additional fitting needed since they\'re made to your specifications.',
              details: [
                'Delivered in a luxury box',
                'Certificate of authenticity included',
                'Care instructions provided',
                'Lifetime support from our team',
              ],
              cta: null,
            },
          ].map((step, index) => (
            <div key={step.num} style={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr',
              gap: '3rem',
              marginBottom: '4rem',
              paddingBottom: '4rem',
              borderBottom: index < 5 ? '1px solid rgba(201,162,39,0.08)' : 'none',
              position: 'relative',
            }} className="step-row">

              {/* Number */}
              <div style={{ textAlign: 'center', paddingTop: '0.5rem' }}>
                <div style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '5rem', fontWeight: 300,
                  color: 'rgba(201,162,39,0.12)',
                  lineHeight: 1,
                }}>{step.num}</div>
                {index < 5 && (
                  <div style={{
                    width: '1px', height: '60px',
                    background: 'linear-gradient(to bottom, rgba(201,162,39,0.3), transparent)',
                    margin: '1rem auto 0',
                  }} />
                )}
              </div>

              {/* Content */}
              <div>
                <div style={{
                  display: 'inline-block',
                  background: 'rgba(201,162,39,0.08)',
                  border: '1px solid rgba(201,162,39,0.15)',
                  color: '#C9A227',
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.58rem', letterSpacing: '0.25em',
                  textTransform: 'uppercase', padding: '0.3rem 0.8rem',
                  marginBottom: '1rem',
                }}>Step {step.num}</div>

                <h3 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  fontWeight: 400, color: '#EDE8DC',
                  marginBottom: '1rem', letterSpacing: '0.03em',
                }}>{step.title}</h3>

                <p style={{
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.85rem', fontWeight: 300,
                  color: '#7A7060', lineHeight: 1.9,
                  marginBottom: '1.5rem',
                  maxWidth: '600px',
                }}>{step.desc}</p>

                {/* Details List */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '0.5rem', marginBottom: step.cta ? '1.5rem' : '0',
                }}>
                  {step.details.map(detail => (
                    <div key={detail} style={{
                      display: 'flex', alignItems: 'center', gap: '0.6rem',
                      fontFamily: 'Josefin Sans, sans-serif',
                      fontSize: '0.75rem', fontWeight: 300,
                      color: '#7A7060', letterSpacing: '0.03em',
                    }}>
                      <span style={{ color: '#C9A227', fontSize: '0.6rem' }}>✦</span>
                      {detail}
                    </div>
                  ))}
                </div>

                {step.cta && (
                  <Link to={step.cta.path} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    fontFamily: 'Josefin Sans, sans-serif',
                    fontSize: '0.65rem', letterSpacing: '0.25em',
                    textTransform: 'uppercase', color: '#C9A227',
                    textDecoration: 'none',
                    border: '1px solid rgba(201,162,39,0.3)',
                    padding: '0.6rem 1.4rem',
                    transition: 'all 0.3s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,162,39,0.05)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >{step.cta.label} →</Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{
        padding: '6rem 2rem',
        background: '#101010',
        borderTop: '1px solid rgba(201,162,39,0.08)',
        borderBottom: '1px solid rgba(201,162,39,0.08)',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.65rem', letterSpacing: '0.4em',
              textTransform: 'uppercase', color: '#C9A227',
              marginBottom: '1rem',
            }}>Common Questions</div>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 300, color: '#EDE8DC',
            }}>FAQ</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              {
                q: 'Are the grillz solid gold or plated?',
                a: 'All our grillz are made from solid gold (10K, 14K, or 18K) or sterling silver. We never use plating — what you order is exactly what you receive.',
              },
              {
                q: 'Do I need to come in person?',
                a: 'No! Everything is done remotely. You browse online, save your design, and contact us. We handle the rest and ship directly to you.',
              },
              {
                q: 'How does the fitting work?',
                a: 'Your grillz are made custom based on your selected teeth count and style. For a perfect fit, we may ask for additional details via our messenger after you place an order.',
              },
              {
                q: 'How long does it take?',
                a: 'Typically 7–14 business days after your order is confirmed. We will keep you updated throughout the process via our messenger.',
              },
              {
                q: 'Do I pay upfront?',
                a: 'No deposit is required until your design is confirmed and agreed upon. We discuss everything first before any payment is made.',
              },
              {
                q: 'Can I get a fully custom design?',
                a: 'Absolutely. If you don\'t see what you want in our collection, reach out through our contact page or messenger. We do fully custom designs.',
              },
              {
                q: 'Do you ship internationally?',
                a: 'Yes! We ship worldwide. Shipping costs and times vary by location. Contact us for details specific to your country.',
              },
            ].map((faq, index) => (
              <FAQItem key={index} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{
        padding: '7rem 2rem',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,162,39,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.65rem', letterSpacing: '0.4em',
            textTransform: 'uppercase', color: '#C9A227',
            marginBottom: '1.5rem',
          }}>Ready to Start?</div>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 300, color: '#EDE8DC',
            marginBottom: '1.5rem',
          }}>Your Custom Grill Awaits</h2>
          <p style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.82rem', fontWeight: 300,
            color: '#7A7060', marginBottom: '2.5rem',
            lineHeight: 1.8,
          }}>
            Browse the collection, save your design, and let's make something unforgettable.
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
            >Shop Now ✦</Link>
            <Link to="/contact" style={{
              background: 'transparent', color: '#C9A227',
              border: '1px solid rgba(201,162,39,0.4)',
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.7rem', letterSpacing: '0.3em',
              textTransform: 'uppercase', padding: '1rem 2.5rem',
              textDecoration: 'none', transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,162,39,0.05)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)' }}
            >Contact Us</Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 600px) {
          .step-row {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </div>
  )
}

// ── FAQ ITEM ──
function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{
      borderBottom: '1px solid rgba(201,162,39,0.08)',
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', background: 'none', border: 'none',
          padding: '1.5rem 0',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '1rem',
          cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '1.1rem', fontWeight: 400,
          color: open ? '#C9A227' : '#EDE8DC',
          letterSpacing: '0.03em',
          transition: 'color 0.3s',
        }}>{question}</span>
        <span style={{
          color: '#C9A227', fontSize: '1rem',
          transition: 'transform 0.3s',
          transform: open ? 'rotate(45deg)' : 'rotate(0)',
          flexShrink: 0,
        }}>✦</span>
      </button>
      {open && (
        <div style={{
          paddingBottom: '1.5rem',
          fontFamily: 'Josefin Sans, sans-serif',
          fontSize: '0.82rem', fontWeight: 300,
          color: '#7A7060', lineHeight: 1.9,
          borderLeft: '2px solid rgba(201,162,39,0.2)',
          paddingLeft: '1rem',
          animation: 'fadeIn 0.3s ease',
        }}>{answer}</div>
      )}
    </div>
  )
}

// Need useState for FAQ
import { useState } from 'react'

import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../App'

export default function Messages() {
  const { user, profile } = useAuth()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    fetchMessages()

    // Real-time subscription
    const channel = supabase
      .channel('messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `sender_id=eq.${user.id}`,
      }, payload => {
        setMessages(prev => [...prev, payload.new])
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function fetchMessages() {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .eq('sender_id', user.id)
      .order('created_at', { ascending: true })
    setMessages(data || [])
    setLoading(false)

    // Mark messages as read
    await supabase
      .from('messages')
      .update({ read: true })
      .eq('sender_id', user.id)
      .eq('is_admin', true)
      .eq('read', false)
  }

  async function handleSend(e) {
    e.preventDefault()
    if (!newMessage.trim()) return
    setSending(true)

    const { data, error } = await supabase
      .from('messages')
      .insert({
        sender_id: user.id,
        is_admin: false,
        message: newMessage.trim(),
        read: false,
      })
      .select()
      .single()

    if (!error && data) {
      setMessages(prev => [...prev, data])
    }

    setNewMessage('')
    setSending(false)
  }

  function formatTime(timestamp) {
    const date = new Date(timestamp)
    const now = new Date()
    const isToday = date.toDateString() === now.toDateString()
    if (isToday) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
      ' · ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  if (loading) return (
    <div className="loading-page">
      <div className="spinner" />
    </div>
  )

  return (
    <div style={{
      background: '#080808',
      minHeight: '100vh',
      paddingTop: '80px',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* ── HEADER ── */}
      <div style={{
        borderBottom: '1px solid rgba(201,162,39,0.1)',
        padding: '1.5rem 2rem',
        background: '#080808',
        position: 'sticky',
        top: '80px',
        zIndex: 10,
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {/* Store Avatar */}
              <div style={{
                width: '44px', height: '44px',
                background: 'linear-gradient(135deg, #C9A227, #8B6914)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.1rem', color: '#080808',
                fontWeight: 600,
              }}>L</div>
              <div>
                <div style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.2rem', fontWeight: 400,
                  color: '#EDE8DC', letterSpacing: '0.05em',
                }}>Laila's Treasures</div>
                <div style={{
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.6rem', letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: '#27AE60',
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                }}>
                  <span style={{
                    width: '6px', height: '6px',
                    borderRadius: '50%', background: '#27AE60',
                    display: 'inline-block',
                  }} />
                  Store Support
                </div>
              </div>
            </div>

            <Link to="/saved-designs" style={{
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.65rem', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#7A7060',
              textDecoration: 'none', transition: 'color 0.3s',
              border: '1px solid rgba(201,162,39,0.15)',
              padding: '0.5rem 1rem',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = '#C9A227'; e.currentTarget.style.borderColor = 'rgba(201,162,39,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#7A7060'; e.currentTarget.style.borderColor = 'rgba(201,162,39,0.15)' }}
            >♡ Saved Designs</Link>
          </div>
        </div>
      </div>

      {/* ── MESSAGES AREA ── */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '2rem',
        maxWidth: '800px',
        width: '100%',
        margin: '0 auto',
      }}>

        {messages.length === 0 ? (
          /* Empty State */
          <div style={{
            textAlign: 'center',
            padding: '5rem 2rem',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1.5rem', opacity: 0.2 }}>✉</div>
            <h3 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.8rem', fontWeight: 300,
              color: '#EDE8DC', marginBottom: '0.8rem',
            }}>Start the Conversation</h3>
            <p style={{
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.8rem', fontWeight: 300,
              color: '#7A7060', lineHeight: 1.8,
              maxWidth: '350px', margin: '0 auto 2rem',
            }}>
              Send us a message about your custom order, saved designs, or any questions you have.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/saved-designs" style={{
                background: '#C9A227', color: '#080808',
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.7rem', letterSpacing: '0.3em',
                textTransform: 'uppercase', padding: '0.9rem 2rem',
                textDecoration: 'none',
              }}>View Saved Designs</Link>
              <Link to="/collection" style={{
                background: 'transparent', color: '#C9A227',
                border: '1px solid rgba(201,162,39,0.3)',
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.7rem', letterSpacing: '0.3em',
                textTransform: 'uppercase', padding: '0.9rem 2rem',
                textDecoration: 'none',
              }}>Browse Collection</Link>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Welcome Message */}
            <div style={{ textAlign: 'center', padding: '1rem 0 2rem' }}>
              <div style={{
                display: 'inline-block',
                background: 'rgba(201,162,39,0.08)',
                border: '1px solid rgba(201,162,39,0.12)',
                padding: '0.5rem 1.5rem',
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.65rem', letterSpacing: '0.2em',
                color: '#7A7060', textTransform: 'uppercase',
              }}>Conversation with Laila's Treasures</div>
            </div>

            {messages.map((msg, index) => {
              const isCustomer = !msg.is_admin
              const showDate = index === 0 ||
                new Date(messages[index - 1].created_at).toDateString() !==
                new Date(msg.created_at).toDateString()

              return (
                <div key={msg.id}>
                  {/* Date Separator */}
                  {showDate && (
                    <div style={{
                      textAlign: 'center', margin: '1rem 0',
                    }}>
                      <span style={{
                        fontFamily: 'Josefin Sans, sans-serif',
                        fontSize: '0.6rem', letterSpacing: '0.2em',
                        textTransform: 'uppercase', color: '#7A7060',
                        background: '#080808', padding: '0 1rem',
                      }}>
                        {new Date(msg.created_at).toLocaleDateString('en-US', {
                          weekday: 'long', month: 'long', day: 'numeric'
                        })}
                      </span>
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div style={{
                    display: 'flex',
                    justifyContent: isCustomer ? 'flex-end' : 'flex-start',
                    gap: '0.8rem',
                    alignItems: 'flex-end',
                  }}>
                    {/* Admin Avatar */}
                    {!isCustomer && (
                      <div style={{
                        width: '32px', height: '32px',
                        background: 'linear-gradient(135deg, #C9A227, #8B6914)',
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: '0.9rem', color: '#080808',
                        fontWeight: 600, flexShrink: 0,
                      }}>L</div>
                    )}

                    <div style={{ maxWidth: '70%' }}>
                      {/* Bubble */}
                      <div style={{
                        background: isCustomer
                          ? '#C9A227'
                          : '#161616',
                        color: isCustomer ? '#080808' : '#EDE8DC',
                        padding: '0.9rem 1.2rem',
                        borderRadius: '2px',
                        border: isCustomer
                          ? 'none'
                          : '1px solid rgba(201,162,39,0.12)',
                        fontFamily: 'Josefin Sans, sans-serif',
                        fontSize: '0.85rem', fontWeight: 300,
                        lineHeight: 1.7,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                      }}>{msg.message}</div>

                      {/* Time */}
                      <div style={{
                        fontFamily: 'Josefin Sans, sans-serif',
                        fontSize: '0.6rem', letterSpacing: '0.1em',
                        color: '#7A7060', marginTop: '0.3rem',
                        textAlign: isCustomer ? 'right' : 'left',
                      }}>
                        {formatTime(msg.created_at)}
                        {isCustomer && (
                          <span style={{ marginLeft: '0.4rem', color: msg.read ? '#C9A227' : '#7A7060' }}>
                            {msg.read ? '✓✓' : '✓'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Customer Avatar */}
                    {isCustomer && (
                      <div style={{
                        width: '32px', height: '32px',
                        background: '#1E1E1E',
                        border: '1px solid rgba(201,162,39,0.2)',
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: '0.9rem', color: '#C9A227',
                        flexShrink: 0,
                      }}>
                        {profile?.full_name?.[0]?.toUpperCase() || 'U'}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* ── MESSAGE INPUT ── */}
      <div style={{
        borderTop: '1px solid rgba(201,162,39,0.1)',
        padding: '1.5rem 2rem',
        background: '#080808',
        position: 'sticky',
        bottom: 0,
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <form onSubmit={handleSend} style={{
            display: 'flex', gap: '0.8rem', alignItems: 'flex-end',
          }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <textarea
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend(e)
                  }
                }}
                placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
                rows={1}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(201,162,39,0.15)',
                  color: '#EDE8DC',
                  padding: '0.9rem 1rem',
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.85rem', fontWeight: 300,
                  outline: 'none', resize: 'none',
                  transition: 'border-color 0.3s',
                  lineHeight: 1.5,
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(201,162,39,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(201,162,39,0.15)'}
              />
            </div>

            <button
              type="submit"
              disabled={sending || !newMessage.trim()}
              style={{
                background: newMessage.trim() ? '#C9A227' : 'rgba(201,162,39,0.2)',
                color: newMessage.trim() ? '#080808' : '#7A7060',
                border: 'none',
                width: '48px', height: '48px',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center',
                cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s',
                fontSize: '1rem', flexShrink: 0,
              }}
              onMouseEnter={e => { if (newMessage.trim()) e.currentTarget.style.background = '#F0D060' }}
              onMouseLeave={e => { if (newMessage.trim()) e.currentTarget.style.background = '#C9A227' }}
            >
              {sending ? (
                <div style={{
                  width: '16px', height: '16px',
                  border: '2px solid rgba(8,8,8,0.3)',
                  borderTopColor: '#080808',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
              ) : '➤'}
            </button>
          </form>

          <div style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.6rem', letterSpacing: '0.1em',
            color: '#7A7060', marginTop: '0.5rem',
            textAlign: 'center',
          }}>
            We typically reply within a few hours during business hours
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

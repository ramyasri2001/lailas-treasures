import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect, createContext, useContext } from 'react'
import { supabase } from './lib/supabase'

// Layout
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import Collection from './pages/Collection'
import ProductDetail from './pages/ProductDetail'
import SavedDesigns from './pages/SavedDesigns'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import Register from './pages/Register'
import Messages from './pages/Messages'
import Contact from './pages/Contact'
import About from './pages/About'
import HowItWorks from './pages/HowItWorks'

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'

// ── AUTH CONTEXT ──
export const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

// ── PROTECTED ROUTE (customers) ──
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return (
    <div className="loading-page">
      <div className="spinner"></div>
    </div>
  )

  if (!user) return <Navigate to="/login" replace />
  return children
}

// ── ADMIN ROUTE ──
function AdminRoute({ children }) {
  const { user, profile, loading } = useAuth()

  if (loading) return (
    <div className="loading-page">
      <div className="spinner"></div>
    </div>
  )

  if (!user || !profile?.is_admin) return <Navigate to="/admin/login" replace />
  return children
}

// ── MAIN APP ──
export default function App() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      else setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      else {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function fetchProfile(userId) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    setProfile(data)
    setLoading(false)
  }

  const authValue = { user, profile, loading, fetchProfile }

  return (
    <AuthContext.Provider value={authValue}>
      <BrowserRouter>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />

              {/* Protected Routes (must be logged in) */}
              <Route path="/saved-designs" element={
                <ProtectedRoute><SavedDesigns /></ProtectedRoute>
              } />
              <Route path="/messages" element={
                <ProtectedRoute><Messages /></ProtectedRoute>
              } />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <AdminRoute><AdminDashboard /></AdminRoute>
              } />

              {/* 404 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

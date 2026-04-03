'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Droplet, Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useAuth } from '@/components/auth-context'

export default function Navigation() {
  const [isLogin, setIsLogin] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  // Auth Form State
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { user, login, loginWithGoogle, register, logout, isLoading } = useAuth()

  // Scroll listener for transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Reset form when closing
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setTimeout(() => {
        setIsLogin(false)
        setError('')
        setName('')
        setEmail('')
        setPassword('')
      }, 300)
    }
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      await login(email, password)
      setIsOpen(false)
    } catch (err: any) {
      const code = err?.code || ''
      if (code === 'auth/user-not-found' || code === 'auth/invalid-credential') {
        setError('Invalid email or password.')
      } else if (code === 'auth/wrong-password') {
        setError('Incorrect password.')
      } else if (code === 'auth/too-many-requests') {
        setError('Too many attempts. Please try again later.')
      } else {
        setError(err.message || 'Login failed.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!name.trim()) { setError('Please enter your name.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setIsSubmitting(true)
    try {
      await register(name, email, password)
      setIsOpen(false)
    } catch (err: any) {
      const code = err?.code || ''
      if (code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.')
      } else if (code === 'auth/weak-password') {
        setError('Password is too weak. Use at least 6 characters.')
      } else if (code === 'auth/invalid-email') {
        setError('Please enter a valid email address.')
      } else {
        setError(err.message || 'Registration failed.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleLogin = async (e: React.MouseEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      await loginWithGoogle()
      setIsOpen(false)
    } catch (err: any) {
      setError(err.message || 'Google login failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 border-b ${
      isScrolled 
        ? 'bg-white/40 backdrop-blur-lg border-gray-100/50' 
        : 'bg-white/90 backdrop-blur-md border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-red-50 p-2 rounded-full group-hover:bg-red-100 transition-colors">
              <Droplet className="w-5 h-5 text-[#E11D48] fill-[#E11D48]" />
            </div>
            <span className="font-bold text-xl text-gray-900">
              Life<span className="text-[#E11D48]">Drop</span>
            </span>
          </Link>

          {/* Menu */}
          <div className="hidden md:flex gap-8">
            {user && (
              <Link href="/dashboard" className="text-gray-600 hover:text-[#E11D48] hover:drop-shadow-[0_0_8px_rgba(225,29,72,0.4)] font-medium transition-all duration-300">
                Dashboard
              </Link>
            )}
            <Link href="/donors" className="text-gray-600 hover:text-[#E11D48] hover:drop-shadow-[0_0_8px_rgba(225,29,72,0.4)] font-medium transition-all duration-300">
              Find Donors
            </Link>
            <Link href="/requests" className="text-gray-600 hover:text-[#E11D48] hover:drop-shadow-[0_0_8px_rgba(225,29,72,0.4)] font-medium transition-all duration-300">
              Blood Requests
            </Link>
          </div>

          {/* CTA Button & Auth Modal */}
          {isLoading ? (
            <div className="h-10 w-24 bg-gray-100 animate-pulse rounded-full" />
          ) : user ? (
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium text-gray-700">Hello, {user.name}</span>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="text-sm font-medium text-gray-500 hover:text-[#E11D48] transition-colors">
                    Log Out
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm logout?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to end your current session? You'll need to sign in again to access your dashboard.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>No, keep me signed in</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={logout}
                      className="bg-[#E11D48] hover:bg-[#BE123C] text-white"
                    >
                      Yes, log out
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Link href="/dashboard" className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-[#E11D48] font-bold text-lg hover:ring-2 hover:ring-red-200 transition-all cursor-pointer select-none">
                {user.initials}
              </Link>
            </div>
          ) : (
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { setIsLogin(true); setIsOpen(true); }}
              className="text-sm font-medium text-gray-600 hover:text-[#E11D48] transition-colors"
            >
              Sign In
            </button>
            <Dialog open={isOpen} onOpenChange={handleOpenChange}>
              <DialogTrigger asChild>
                <Button onClick={() => setIsLogin(false)} className="bg-[#E11D48] hover:bg-[#E11D48] hover:shadow-[0_0_20px_rgba(225,29,72,0.5)] text-white rounded-full px-6 font-semibold transition-all duration-300 border border-transparent hover:border-red-400">
                  Join as Donor
                </Button>
              </DialogTrigger>
              
              <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden border-0 shadow-2xl rounded-2xl">
                {/* Header block */}
                <div className="bg-gray-50/50 p-6 pb-4 border-b border-gray-100 text-center">
                  <div className="mx-auto bg-red-50 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                    <Droplet className="w-6 h-6 text-[#E11D48] fill-[#E11D48]" />
                  </div>
                  <DialogTitle className="text-2xl font-bold text-gray-900 mb-1">
                    {isLogin ? 'Welcome Back' : 'Create an Account'}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-gray-500">
                    {isLogin 
                      ? 'Sign in to manage your donor profile' 
                      : 'Join our community of life-savers today'}
                  </DialogDescription>
                </div>

              {/* Form container */}
              <div className="p-6 pt-5">
                {/* Google Login */}
                <Button 
                  variant="outline" 
                  disabled={isSubmitting}
                  onClick={handleGoogleLogin}
                  className="w-full h-11 text-sm font-medium text-gray-700 bg-white border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-all hover:shadow-md border-2"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  {isSubmitting ? 'Connecting...' : 'Continue with Google'}
                </Button>

                {/* Divider */}
                <div className="relative my-5">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-white px-3 text-gray-400 uppercase tracking-wider">or</span>
                  </div>
                </div>

                {/* Email/Password Form */}
                <form onSubmit={isLogin ? handleEmailLogin : handleRegister} className="space-y-3">
                  {/* Name field (register only) */}
                  {!isLogin && (
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 h-11 border-gray-200 focus-visible:ring-red-100 focus-visible:border-red-300"
                        required
                      />
                    </div>
                  )}

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-11 border-gray-200 focus-visible:ring-red-100 focus-visible:border-red-300"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-11 border-gray-200 focus-visible:ring-red-100 focus-visible:border-red-300"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold transition-all hover:shadow-lg hover:shadow-red-100"
                  >
                    {isSubmitting ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
                  </Button>
                </form>

                {error && (
                  <p className="text-sm font-medium text-red-500 text-center mt-3">
                    {error}
                  </p>
                )}

                {/* Toggle login/register */}
                <p className="text-center text-sm text-gray-500 mt-4">
                  {isLogin ? "Don't have an account? " : 'Already have an account? '}
                  <button
                    type="button"
                    onClick={() => { setIsLogin(!isLogin); setError(''); setName(''); setEmail(''); setPassword('') }}
                    className="text-[#E11D48] font-semibold hover:underline"
                  >
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>

                <div className="mt-4 text-center text-xs text-gray-400">
                  By continuing, you agree to our Terms of Service and Privacy Policy.
                </div>
              </div>
            </DialogContent>
          </Dialog>
          </div>
          )}
        </div>
      </div>
    </nav>
  )
}

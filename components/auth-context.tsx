'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { User as SupabaseUser } from '@supabase/supabase-js'

type User = {
  name: string
  email: string
  initials: string
}

type AuthContextType = {
  user: User | null
  login: (email?: string, pass?: string) => Promise<void>
  register: (name: string, email: string, pass: string) => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  const mapUser = (supabaseUser: SupabaseUser | null): User | null => {
    if (!supabaseUser) return null
    
    const name = supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User'
    return {
      name,
      email: supabaseUser.email || '',
      initials: name.charAt(0).toLowerCase() || 'u'
    }
  }

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(mapUser(session.user))
        if (event === 'SIGNED_IN') {
           // router.push('/dashboard') // Potentially redundant if callback handles it, but keeps UI snappy
        }
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

  const register = async (name: string, email: string, pass: string) => {
    if (!name || !email || !pass) {
      throw new Error('All fields are required')
    }

    const { error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: {
          full_name: name,
        }
      }
    })

    if (error) throw error
    
    router.push('/dashboard')
  }

  const login = async (email?: string, pass?: string) => {
    if (!email && !pass) {
      // Google Login
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
      return
    }

    if (!email || !pass) {
      throw new Error('Email and password are required')
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    })

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        throw new Error('Incorrect email or password. Please try again.')
      }
      throw error
    }

    router.push('/dashboard')
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}


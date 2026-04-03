'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut,
  User as FirebaseUser,
} from 'firebase/auth'
import { auth, googleProvider } from '@/lib/firebase'

type User = {
  name: string
  email: string
  initials: string
}

type AuthContextType = {
  user: User | null
  login: (email?: string, pass?: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  register: (name: string, email: string, pass: string) => Promise<{ success: boolean; message?: string }>
  logout: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function mapFirebaseUser(fbUser: FirebaseUser): User {
  const name = fbUser.displayName || fbUser.email?.split('@')[0] || 'User'
  return {
    name,
    email: fbUser.email || '',
    initials: name.charAt(0).toLowerCase() || 'u',
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        setUser(mapFirebaseUser(fbUser))
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const login = async (email?: string, pass?: string) => {
    if (email && pass) {
      await signInWithEmailAndPassword(auth, email, pass)
    } else {
      await signInWithPopup(auth, googleProvider)
    }
    router.push('/dashboard')
  }

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider)
    router.push('/dashboard')
  }

  const register = async (name: string, email: string, pass: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, pass)
    await updateProfile(cred.user, { displayName: name })
    // Force a re-read so the context picks up the displayName
    setUser(mapFirebaseUser({ ...cred.user, displayName: name } as FirebaseUser))
    router.push('/dashboard')
    return { success: true }
  }

  const logout = async () => {
    await firebaseSignOut(auth)
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, register, logout, isLoading }}>
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

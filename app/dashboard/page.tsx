'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/navigation'
import { useAuth } from '@/components/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Heart, Activity, Clock, MapPin } from 'lucide-react'

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  // Local state for the mock form
  const [bloodGroup, setBloodGroup] = useState('')
  const [city, setCity] = useState('')
  const [contact, setContact] = useState('')
  const [isAvailable, setIsAvailable] = useState(true)

  // Protect route
  useEffect(() => {
    // If we're fully loaded and have no user, redirect to home
    if (!isLoading && user === null) {
      router.push('/')
    }
  }, [user, isLoading, router])

  // Return nothing while checking auth / redirecting
  if (isLoading || !user) return null

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user.name}
            </h1>
            <p className="text-gray-500 text-base">
              Manage your donor profile and view your active emergency requests.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column: Donor Profile */}
            <div className="lg:col-span-1">
              <div className="bg-red-50/30 border border-red-50 rounded-2xl p-6 shadow-sm flex flex-col h-full bg-gradient-to-b from-red-50/50 to-white/50">
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-[#E11D48] fill-[#E11D48]/20" />
                </div>

                <h2 className="text-lg font-bold text-gray-900 mb-1">Donor Profile</h2>
                <p className="text-sm text-gray-500 mb-6">Register to appear in search results.</p>

                <div className="space-y-5 flex-1">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Blood Group</label>
                    <Select value={bloodGroup} onValueChange={setBloodGroup}>
                      <SelectTrigger className="bg-white border-gray-200">
                        <SelectValue placeholder="Select group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">City / Area</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="e.g. Andhra Pradesh, India"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="pl-9 bg-white border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Contact Number</label>
                    <Input
                      placeholder="+91 1234567890"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      type="tel"
                      className="bg-white border-gray-200"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <div className="bg-white rounded-xl p-4 border border-gray-100 flex items-center justify-between mb-4 shadow-sm">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Available to Donate</p>
                      <p className="text-xs text-gray-500">Turn off if you recently donated</p>
                    </div>
                    <Switch
                      checked={isAvailable}
                      onCheckedChange={setIsAvailable}
                      className="data-[state=checked]:bg-[#E11D48]"
                    />
                  </div>

                  <Button className="w-full h-12 bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold rounded-xl transition-all shadow-md shadow-red-100">
                    Register as Donor
                  </Button>
                </div>

              </div>
            </div>

            {/* Right Column: Status & Requests */}
            <div className="lg:col-span-2 space-y-6">

              {/* Top Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                    <Activity className="w-6 h-6 text-[#E11D48]" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-0.5">Your Status</p>
                    <p className="text-xl font-bold text-gray-900">Ready to Donate</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-0.5">Your Requests</p>
                    <p className="text-xl font-bold text-gray-900">0 Active</p>
                  </div>
                </div>
              </div>

              {/* My Blood Requests Block */}
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[400px]">
                <div className="p-6 border-b border-gray-50">
                  <h2 className="text-xl font-bold text-gray-900">My Blood Requests</h2>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <Heart className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    No active requests
                  </h3>
                  <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
                    You haven't posted any emergency requests. If you need blood, you can create a request from the Requests page.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>
    </>
  )
}

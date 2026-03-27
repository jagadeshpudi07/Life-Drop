'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Heart, MapPin, Users, Activity } from 'lucide-react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <main className="min-h-[calc(100vh-64px)] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-block mb-6">
                <div className="bg-red-50 border border-red-100 px-4 py-1.5 rounded-full text-sm font-semibold text-[#E11D48] flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#E11D48] rounded-full animate-pulse"></div>
                  Emergency Requests Active
                </div>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
                Give Blood.{' '}
                <br />
                <span className="text-[#E11D48]">Save Lives.</span>
              </h1>
              
              <p className="text-gray-500 text-lg mb-10 leading-relaxed max-w-md">
                Every 2 seconds, someone in the world needs blood. Connect with nearby donors in real-time or request emergency blood when you need it most.
              </p>
              
              <div className="flex gap-4">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-[#E11D48] hover:bg-[#E11D48] text-white rounded-full px-8 py-6 text-base font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(225,29,72,0.5)] border border-transparent hover:border-red-400"
                >
                  <Link href="/requests">Request Blood</Link>
                </Button>
                <Button 
                  asChild
                  size="lg" 
                  variant="outline" 
                  className="border-gray-300 text-gray-900 bg-white hover:bg-[#E11D48] hover:text-white hover:border-[#E11D48] hover:shadow-[0_0_20px_rgba(225,29,72,0.5)] rounded-full px-8 py-6 text-base font-semibold transition-all duration-300"
                >
                  <Link href="/donors">Find a Donor</Link>
                </Button>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="relative">
              <div className="relative h-[420px] md:h-[480px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/hero-donation.png"
                  alt="Blood donation in progress"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Badge Overlay - floating at bottom center */}
              <div 
                className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-6 py-4 shadow-xl border border-gray-100 flex items-center gap-4 z-10"
                style={{ animation: 'floatWave 3s ease-in-out infinite' }}
              >
                <div className="bg-amber-50 p-2.5 rounded-xl">
                  <Activity className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Real-time matching</p>
                  <p className="text-gray-900 font-bold text-xl">100% Free</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* How It Works Section */}
      <section className="bg-gray-50/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              How It Works
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              We bridge the gap between blood donors and recipients using real-time location matching.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-8 hover:shadow-[0_8px_30px_rgba(225,29,72,0.15)] transition-all duration-300 border border-gray-100 group">
              <div className="bg-red-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-100 transition-colors">
                <Users className="w-7 h-7 text-[#E11D48]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Register as Donor
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Join our network of heroes. Set your blood type and availability status in your dashboard.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-8 hover:shadow-[0_8px_30px_rgba(225,29,72,0.15)] transition-all duration-300 border border-gray-100 group">
              <div className="bg-red-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-100 transition-colors">
                <MapPin className="w-7 h-7 text-[#E11D48]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Find Nearby
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Search the directory for compatible blood donors in your city or hospital&apos;s vicinity.
              </p>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-8 hover:shadow-[0_8px_30px_rgba(225,29,72,0.15)] transition-all duration-300 border border-gray-100 group">
              <div className="bg-red-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-100 transition-colors">
                <Heart className="w-7 h-7 text-[#E11D48]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Save a Life
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Post emergency requests that local donors immediately see to fulfill critical needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

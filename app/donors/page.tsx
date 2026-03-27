'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

const CITIES = [
  "Mumbai, Maharashtra", "Delhi, NCR", "Bengaluru, Karnataka", "Hyderabad, Telangana",
  "Ahmedabad, Gujarat", "Chennai, Tamil Nadu", "Kolkata, West Bengal", "Surat, Gujarat",
  "Pune, Maharashtra", "Jaipur, Rajasthan", "Lucknow, Uttar Pradesh", "Kanpur, Uttar Pradesh",
  "Nagpur, Maharashtra", "Indore, Madhya Pradesh", "Thane, Maharashtra", "Bhopal, Madhya Pradesh",
  "Visakhapatnam, Andhra Pradesh", "Pimpri-Chinchwad, Maharashtra", "Patna, Bihar", "Vadodara, Gujarat",
  "Ghaziabad, Uttar Pradesh", "Ludhiana, Punjab", "Agra, Uttar Pradesh", "Nashik, Maharashtra",
  "Faridabad, Haryana", "Meerut, Uttar Pradesh", "Rajkot, Gujarat", "Varanasi, Uttar Pradesh",
  "Srinagar, Jammu and Kashmir", "Aurangabad, Maharashtra", "Dhanbad, Jharkhand", "Amritsar, Punjab",
  "Navi Mumbai, Maharashtra", "Allahabad, Uttar Pradesh", "Howrah, West Bengal", "Ranchi, Jharkhand",
  "Gwalior, Madhya Pradesh", "Jabalpur, Madhya Pradesh", "Coimbatore, Tamil Nadu", "Vijayawada, Andhra Pradesh",
  "Jodhpur, Rajasthan", "Madurai, Tamil Nadu", "Raipur, Chhattisgarh", "Kota, Rajasthan",
  "Chandigarh", "Guwahati, Assam", "Solapur, Maharashtra", "Hubballi-Dharwad, Karnataka",
  "Andheri West, Mumbai", "Bandra, Mumbai", "Koramangala, Bengaluru", "Indiranagar, Bengaluru",
  "Gachibowli, Hyderabad", "Hitec City, Hyderabad", "Connaught Place, Delhi", "South Extension, Delhi",
  "Salt Lake City, Kolkata", "Anna Nagar, Chennai"
]

export default function DonorsPage() {
  const [bloodType, setBloodType] = useState('all')
  const [location, setLocation] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const filteredCities = CITIES.filter(city => 
    city.toLowerCase().includes(location.toLowerCase())
  )

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Find a Blood Donor
            </h1>
            <p className="text-gray-500 text-lg">
              Search our registry of life-savers by blood group and location.
            </p>
          </div>

          {/* Search Filters - compact width */}
          <div className="flex items-center max-w-2xl gap-3">
            {/* Blood Type Select */}
            <div className="w-[140px] shrink-0">
              <Select value={bloodType} onValueChange={setBloodType}>
                <SelectTrigger className="w-full border-gray-200 rounded-lg h-11 focus:ring-gray-200 focus:border-gray-300 bg-white">
                  <SelectValue placeholder="Blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="o-pos">O+</SelectItem>
                  <SelectItem value="o-neg">O-</SelectItem>
                  <SelectItem value="a-pos">A+</SelectItem>
                  <SelectItem value="a-neg">A-</SelectItem>
                  <SelectItem value="b-pos">B+</SelectItem>
                  <SelectItem value="b-neg">B-</SelectItem>
                  <SelectItem value="ab-pos">AB+</SelectItem>
                  <SelectItem value="ab-neg">AB-</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location Input */}
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <Input 
                placeholder="Enter city or area..."
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value)
                  setShowSuggestions(true)
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="pl-9 border-gray-200 rounded-lg h-11 focus-visible:ring-gray-200 focus-visible:border-gray-300"
              />
              
              {/* Suggestions Dropdown */}
              {showSuggestions && location.length > 0 && filteredCities.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 shadow-xl rounded-lg max-h-60 overflow-y-auto z-50">
                  {filteredCities.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setLocation(city)
                        setShowSuggestions(false)
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-[#E11D48] transition-colors"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Button */}
            <Button className="bg-[#E11D48] hover:bg-[#BE123C] text-white rounded-full px-6 h-11 gap-2 shrink-0 shadow-md shadow-red-100">
              <Search className="w-4 h-4" />
              Search
            </Button>
          </div>
        </div>

        {/* Empty State - full width background */}
        <div className="bg-gray-50/60 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center py-28">
              <div className="bg-white p-5 rounded-full mb-6 shadow-sm border border-gray-100">
                <Search className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                No donors found
              </h3>
              <p className="text-gray-400 text-center text-sm max-w-md">
                Try adjusting your search criteria or extending the location area.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

import Link from 'next/link'
import { Droplet } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-[#E11D48] p-2 rounded-full">
            <Droplet className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="font-bold text-xl">
            Life<span className="text-[#E11D48]">Drop</span>
          </span>
        </div>
        
        <div className="text-gray-400">
          <p>&copy; 2026 LifeDrop. All rights reserved.</p>
          <p className="text-sm mt-2">Saving lives through blood donation coordination.</p>
        </div>
      </div>
    </footer>
  )
}

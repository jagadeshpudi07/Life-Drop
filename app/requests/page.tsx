'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Activity, MapPin, Phone, Clock, Droplets, Building2, ChevronDown } from 'lucide-react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

interface BloodRequest {
  id: string;
  bloodGroup: string;
  units: number;
  urgency: string;
  hospital: string;
  location: string;
  contact: string;
  createdAt: Date;
}

export default function RequestsPage() {
  const [bloodGroupFilter, setBloodGroupFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('pending')
  const [requests, setRequests] = useState<BloodRequest[]>([])
  
  // Dialog & Form State
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newBloodGroup, setNewBloodGroup] = useState('')
  const [newUnits, setNewUnits] = useState('1')
  const [newUrgency, setNewUrgency] = useState('high')
  const [newHospital, setNewHospital] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [newContact, setNewContact] = useState('')

  // Accordion State
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handlePostRequest = () => {
    if (!newBloodGroup || !newHospital || !newLocation || !newContact) {
      alert("Please fill in all required fields.")
      return
    }

    const newRequest: BloodRequest = {
      id: Math.random().toString(36).substring(7),
      bloodGroup: newBloodGroup,
      units: parseInt(newUnits) || 1,
      urgency: newUrgency,
      hospital: newHospital,
      location: newLocation,
      contact: newContact,
      createdAt: new Date(),
    }

    setRequests([newRequest, ...requests])
    setIsDialogOpen(false)
    
    // Reset form
    setNewBloodGroup('')
    setNewUnits('1')
    setNewUrgency('high')
    setNewHospital('')
    setNewLocation('')
    setNewContact('')
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  // Filter requests locally
  const filteredRequests = requests.filter(req => {
    if (bloodGroupFilter !== 'all' && req.bloodGroup !== bloodGroupFilter) return false
    return true
  })

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  Emergency Requests
                </h1>
                <div className="w-2.5 h-2.5 bg-[#E11D48] rounded-full animate-pulse mt-1"></div>
              </div>
              <p className="text-gray-500 text-base">
                Respond to urgent blood needs in your community.
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#E11D48] hover:bg-[#BE123C] text-white rounded-full px-6 gap-2 shadow-md shadow-red-100">
                  <span>+</span>
                  Post Request
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create Blood Request</DialogTitle>
                  <DialogDescription>
                    Fill in the details for the emergency blood requirement.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Blood Group *</label>
                      <Select value={newBloodGroup} onValueChange={setNewBloodGroup}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
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
                      <label className="text-sm font-medium">Units Required</label>
                      <Input 
                        type="number" 
                        value={newUnits} 
                        onChange={(e) => setNewUnits(e.target.value)} 
                        min="1" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Urgency</label>
                    <Select value={newUrgency} onValueChange={setNewUrgency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Critical">Critical (Immediate)</SelectItem>
                        <SelectItem value="High">High (Within 24h)</SelectItem>
                        <SelectItem value="Normal">Normal (Within 48h)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Hospital Name *</label>
                    <Input 
                      placeholder="City General Hospital" 
                      value={newHospital} 
                      onChange={(e) => setNewHospital(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">City / Location *</label>
                    <Input 
                      placeholder="e.g. Andhra Pradesh, India" 
                      value={newLocation} 
                      onChange={(e) => setNewLocation(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Contact Number *</label>
                    <Input 
                      placeholder="+91 1234567890" 
                      type="tel" 
                      value={newContact} 
                      onChange={(e) => setNewContact(e.target.value)} 
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button className="bg-[#E11D48] hover:bg-[#BE123C] text-white" onClick={handlePostRequest}>
                    Post Request
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-xl p-4 mb-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4">
              <span className="text-gray-500 font-medium text-sm ml-2">Filter:</span>

              <Select value={bloodGroupFilter} onValueChange={setBloodGroupFilter}>
                <SelectTrigger className="w-36 border-gray-200 hover:border-[#E11D48] hover:shadow-[0_0_15px_rgba(225,29,72,0.15)] focus:border-[#E11D48] focus:shadow-[0_0_15px_rgba(225,29,72,0.25)] focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Groups</SelectItem>
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

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 border-gray-200 hover:border-[#E11D48] hover:shadow-[0_0_15px_rgba(225,29,72,0.15)] focus:border-[#E11D48] focus:shadow-[0_0_15px_rgba(225,29,72,0.25)] focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="fulfilled">Fulfilled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Requests List */}
          {filteredRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm mt-4">
              <div className="bg-gray-50/80 p-6 rounded-full mb-5">
                <Activity className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No requests found
              </h3>
              <p className="text-gray-400 text-center text-sm max-w-sm">
                There are currently no blood requests matching your criteria.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRequests.map((req) => {
                const isExpanded = expandedId === req.id;
                
                return (
                  <div 
                    key={req.id} 
                    className="bg-white border text-left border-gray-100 shadow-sm rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-red-100"
                  >
                    <button 
                      onClick={() => toggleExpand(req.id)}
                      className="w-full px-6 py-5 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-5">
                        {/* Blood Icon Badge */}
                        <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-red-50 text-[#E11D48] border border-red-100 shrink-0">
                          <Droplets className="w-6 h-6" />
                          <span className="absolute -bottom-1 -right-1 bg-[#E11D48] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md border-2 border-white">
                            {req.bloodGroup}
                          </span>
                        </div>
                        
                        <div className="text-left">
                          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            {req.hospital}
                            {req.urgency.includes('Critical') && (
                              <span className="bg-red-100 text-[#E11D48] text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm">
                                Critical
                              </span>
                            )}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {req.location}
                            </span>
                            <span className="text-gray-300">•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {req.createdAt.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                          <p className="text-sm font-semibold text-gray-900">{req.units} Units</p>
                          <p className="text-xs text-gray-400">Required</p>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </button>
                    
                    {/* Expandable Details Container */}
                    <div 
                      className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-6 pb-6 pt-2 border-t border-gray-50 flex flex-col sm:flex-row gap-6 bg-gray-50/30">
                          
                          <div className="flex-1 space-y-4">
                            <div>
                              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Hospital Details</p>
                              <p className="text-sm text-gray-900 flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-gray-400" />
                                {req.hospital}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Urgency Level</p>
                              <p className="text-sm text-gray-900 flex items-center gap-2">
                                <Activity className="w-4 h-4 text-[#E11D48]" />
                                {req.urgency}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex-1 space-y-4">
                            <div>
                              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Contact Information</p>
                              <p className="text-sm text-gray-900 flex items-center gap-2">
                                <Phone className="w-4 h-4 text-emerald-500" />
                                {req.contact}
                              </p>
                            </div>
                            <div className="pt-2">
                              <Button className="w-full sm:w-auto bg-[#E11D48] hover:bg-[#BE123C] text-white rounded-full">
                                I Can Donate
                              </Button>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}

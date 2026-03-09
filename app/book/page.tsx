"use client"

import Link from "next/link"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

const vehicles = [
  { group: "Sedans", options: ["Toyota Corolla", "Honda Civic", "Hyundai Elantra"] },
  { group: "SUVs", options: ["Toyota Fortuner", "Ford Everest", "Nissan X-Trail"] },
  { group: "Pickups", options: ["Toyota Hilux", "Ford Ranger", "Isuzu D-Max"] },
  { group: "Luxury", options: ["Mercedes E-Class", "BMW 5 Series", "Audi A6"] }
]

export default function BookPage() {
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    vehicle_type: "",
    pickup_date: "",
    return_date: "",
    pickup_location: "",
    special_requests: ""
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const supabase = createClient()
    
    const { error: insertError } = await supabase
      .from("bookings")
      .insert([formData])

    if (insertError) {
      setError("Failed to submit booking. Please try again.")
      console.error(insertError)
    } else {
      setSuccess(true)
      setFormData({
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        vehicle_type: "",
        pickup_date: "",
        return_date: "",
        pickup_location: "",
        special_requests: ""
      })
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-[#1a4a8d] text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-wider">FENIX CAR HIRE</Link>
          <ul className="hidden md:flex items-center gap-6">
            <li><Link href="/" className="hover:text-[#00A8E8] transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-[#00A8E8] transition-colors">About</Link></li>
            <li><Link href="/services" className="hover:text-[#00A8E8] transition-colors">Services</Link></li>
            <li><Link href="/fleet" className="hover:text-[#00A8E8] transition-colors">Fleet</Link></li>
            <li><Link href="/book" className="text-[#00A8E8]">Book Now</Link></li>
            <li><Link href="/contact" className="hover:text-[#00A8E8] transition-colors">Contact</Link></li>
          </ul>
        </div>
      </nav>

      {/* Page Header */}
      <div className="bg-[#1a4a8d] text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Book Your Vehicle</h1>
        <p className="text-lg">Fill out the form below to reserve your vehicle</p>
      </div>

      {/* Booking Form */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          {success ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Submitted!</h2>
              <p className="text-gray-600 mb-6">We will contact you shortly to confirm your reservation.</p>
              <button
                onClick={() => setSuccess(false)}
                className="bg-[#00A8E8] text-white px-6 py-2 rounded hover:bg-[#0090c8] transition-colors"
              >
                Make Another Booking
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded">{error}</div>
              )}
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.customer_name}
                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#00A8E8]"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.customer_phone}
                    onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#00A8E8]"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.customer_email}
                  onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#00A8E8]"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Select Vehicle *</label>
                <select
                  required
                  value={formData.vehicle_type}
                  onChange={(e) => setFormData({ ...formData, vehicle_type: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#00A8E8]"
                >
                  <option value="">Select a vehicle</option>
                  {vehicles.map((group) => (
                    <optgroup key={group.group} label={group.group}>
                      {group.options.map((vehicle) => (
                        <option key={vehicle} value={vehicle}>{vehicle}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Pickup Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.pickup_date}
                    onChange={(e) => setFormData({ ...formData, pickup_date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#00A8E8]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Return Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.return_date}
                    onChange={(e) => setFormData({ ...formData, return_date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#00A8E8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Pickup Location *</label>
                <input
                  type="text"
                  required
                  value={formData.pickup_location}
                  onChange={(e) => setFormData({ ...formData, pickup_location: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#00A8E8]"
                  placeholder="Enter pickup location"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Special Requests</label>
                <textarea
                  rows={4}
                  value={formData.special_requests}
                  onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#00A8E8]"
                  placeholder="Any special requests or requirements"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#00A8E8] text-white py-4 rounded font-semibold hover:bg-[#0090c8] transition-colors disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Booking"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a4a8d] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2026 Fenix Car Hire | Drive Your Dream Forward</p>
        </div>
      </footer>
    </main>
  )
}

"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

type Vehicle = {
  id: string
  name: string
  category: string
  image_url: string
  daily_rate: number
  is_available: boolean
  features: string[]
}

export default function FleetPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from("vehicles")
      .select("*")
      .order("category")
    
    if (data) setVehicles(data)
    setLoading(false)
  }

  const filteredVehicles = filter === "all" 
    ? vehicles 
    : filter === "available"
      ? vehicles.filter(v => v.is_available)
      : vehicles.filter(v => v.category === filter)

  const categories = ["all", "sedan", "suv", "pickup", "luxury", "available"]

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
            <li><Link href="/fleet" className="text-[#00A8E8]">Fleet</Link></li>
            <li><Link href="/book" className="hover:text-[#00A8E8] transition-colors">Book Now</Link></li>
            <li><Link href="/contact" className="hover:text-[#00A8E8] transition-colors">Contact</Link></li>
          </ul>
        </div>
      </nav>

      {/* Page Header */}
      <div className="bg-[#1a4a8d] text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Fleet</h1>
        <p className="text-lg">Browse our selection of quality vehicles</p>
      </div>

      {/* Filter Buttons */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center mb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-medium capitalize transition-colors ${
                  filter === cat
                    ? "bg-[#1a4a8d] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border"
                }`}
              >
                {cat === "available" ? "Available Only" : cat === "all" ? "All Vehicles" : cat + "s"}
              </button>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full" />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full" />
              <span>Booked</span>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-[#1a4a8d] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading vehicles...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <div key={vehicle.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={vehicle.image_url}
                      alt={vehicle.name}
                      fill
                      className="object-cover"
                    />
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white ${
                      vehicle.is_available ? "bg-green-500" : "bg-red-500"
                    }`}>
                      {vehicle.is_available ? "Available" : "Booked"}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{vehicle.name}</h3>
                      <span className="text-sm text-gray-500 capitalize">{vehicle.category}</span>
                    </div>
                    <p className="text-2xl font-bold text-[#1a4a8d] mb-4">
                      E{vehicle.daily_rate}<span className="text-sm text-gray-500">/day</span>
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {vehicle.features?.slice(0, 3).map((feature, i) => (
                        <span key={i} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                    {vehicle.is_available ? (
                      <Link
                        href={`/book?vehicle=${encodeURIComponent(vehicle.name)}`}
                        className="block w-full bg-[#00A8E8] text-white text-center py-3 rounded font-semibold hover:bg-[#0090c8] transition-colors"
                      >
                        Book Now
                      </Link>
                    ) : (
                      <Link
                        href="/contact"
                        className="block w-full bg-gray-300 text-gray-600 text-center py-3 rounded font-semibold"
                      >
                        Currently Booked
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Floating Social Icons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <a
          href="https://wa.me/26876829797"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
        <a
          href="https://facebook.com/fenix.carhire"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-[#1a4a8d] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2026 Fenix Car Hire | Drive Your Dream Forward</p>
        </div>
      </footer>
    </main>
  )
}

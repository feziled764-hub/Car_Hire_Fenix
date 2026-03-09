"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

type Booking = {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  vehicle_type: string
  pickup_date: string
  return_date: string
  pickup_location: string
  special_requests: string | null
  status: string
  created_at: string
}

type Vehicle = {
  id: string
  name: string
  category: string
  daily_rate: number
  is_available: boolean
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"bookings" | "vehicles">("bookings")
  const [filterStatus, setFilterStatus] = useState("all")
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkAuth()
    fetchData()
  }, [])

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push("/admin/login")
      return
    }

    // Check if user is admin
    const { data: adminData } = await supabase
      .from("admin_users")
      .select("id")
      .eq("id", user.id)
      .single()

    if (!adminData) {
      router.push("/admin/login")
    }
  }

  const fetchData = async () => {
    setLoading(true)
    
    const { data: bookingsData } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false })

    const { data: vehiclesData } = await supabase
      .from("vehicles")
      .select("*")
      .order("name")

    if (bookingsData) setBookings(bookingsData)
    if (vehiclesData) setVehicles(vehiclesData)
    
    setLoading(false)
  }

  const updateBookingStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id)

    if (!error) {
      setBookings(bookings.map(b => b.id === id ? { ...b, status } : b))
    }
  }

  const toggleVehicleAvailability = async (id: string, isAvailable: boolean) => {
    const { error } = await supabase
      .from("vehicles")
      .update({ is_available: !isAvailable })
      .eq("id", id)

    if (!error) {
      setVehicles(vehicles.map(v => v.id === id ? { ...v, is_available: !isAvailable } : v))
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  const filteredBookings = filterStatus === "all" 
    ? bookings 
    : bookings.filter(b => b.status === filterStatus)

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === "pending").length,
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    completed: bookings.filter(b => b.status === "completed").length,
    availableVehicles: vehicles.filter(v => v.is_available).length,
    totalVehicles: vehicles.length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#1a4a8d] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#1a4a8d] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Fenix Car Hire</h1>
            <p className="text-sm text-gray-300">Admin Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm hover:text-[#00A8E8] transition-colors">
              View Website
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-500 text-sm">Total Bookings</p>
            <p className="text-2xl font-bold text-[#1a4a8d]">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-500 text-sm">Pending</p>
            <p className="text-2xl font-bold text-yellow-500">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-500 text-sm">Confirmed</p>
            <p className="text-2xl font-bold text-blue-500">{stats.confirmed}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-500 text-sm">Completed</p>
            <p className="text-2xl font-bold text-green-500">{stats.completed}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-500 text-sm">Available Cars</p>
            <p className="text-2xl font-bold text-green-600">{stats.availableVehicles}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-500 text-sm">Total Fleet</p>
            <p className="text-2xl font-bold text-gray-700">{stats.totalVehicles}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-6 py-2 rounded font-medium transition-colors ${
              activeTab === "bookings"
                ? "bg-[#1a4a8d] text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Bookings
          </button>
          <button
            onClick={() => setActiveTab("vehicles")}
            className={`px-6 py-2 rounded font-medium transition-colors ${
              activeTab === "vehicles"
                ? "bg-[#1a4a8d] text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Vehicles
          </button>
        </div>

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Bookings</h2>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border rounded focus:outline-none focus:border-[#00A8E8]"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            {filteredBookings.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No bookings found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Customer</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Vehicle</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Dates</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Location</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="font-medium">{booking.customer_name}</div>
                          <div className="text-sm text-gray-500">{booking.customer_email}</div>
                          <div className="text-sm text-gray-500">{booking.customer_phone}</div>
                        </td>
                        <td className="px-4 py-3">{booking.vehicle_type}</td>
                        <td className="px-4 py-3">
                          <div className="text-sm">
                            <span className="font-medium">Pickup:</span> {new Date(booking.pickup_date).toLocaleDateString()}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Return:</span> {new Date(booking.return_date).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{booking.pickup_location}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            booking.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                            booking.status === "confirmed" ? "bg-blue-100 text-blue-800" :
                            booking.status === "completed" ? "bg-green-100 text-green-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={booking.status}
                            onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                            className="px-2 py-1 border rounded text-sm focus:outline-none"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Vehicles Tab */}
        {activeTab === "vehicles" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Fleet Management</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{vehicle.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      vehicle.is_available 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {vehicle.is_available ? "Available" : "Booked"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 capitalize mb-2">{vehicle.category}</p>
                  <p className="text-lg font-bold text-[#1a4a8d] mb-3">
                    E{vehicle.daily_rate}/day
                  </p>
                  <button
                    onClick={() => toggleVehicleAvailability(vehicle.id, vehicle.is_available)}
                    className={`w-full py-2 rounded text-sm font-medium transition-colors ${
                      vehicle.is_available
                        ? "bg-red-50 text-red-600 hover:bg-red-100"
                        : "bg-green-50 text-green-600 hover:bg-green-100"
                    }`}
                  >
                    Mark as {vehicle.is_available ? "Booked" : "Available"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

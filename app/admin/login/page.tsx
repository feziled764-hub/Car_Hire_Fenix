"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const supabase = createClient()
    
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (signInError) {
      setError("Invalid email or password")
      setLoading(false)
      return
    }

    // Check if user is admin
    const { data: adminData } = await supabase
      .from("admin_users")
      .select("id")
      .eq("id", data.user?.id)
      .single()

    if (!adminData) {
      await supabase.auth.signOut()
      setError("You do not have admin access")
      setLoading(false)
      return
    }

    router.push("/admin/dashboard")
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#1a4a8d] mb-2">Admin Login</h1>
          <p className="text-gray-600">Fenix Car Hire Dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded text-center">{error}</div>
          )}

          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#00A8E8]"
              placeholder="admin@fenixcarhire.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#00A8E8]"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1a4a8d] text-white py-3 rounded font-semibold hover:bg-[#153d73] transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-[#00A8E8] hover:underline">
            Back to Website
          </Link>
        </div>
      </div>
    </main>
  )
}

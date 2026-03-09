"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

const slides = [
  {
    image: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=1920&q=80",
    title: "Toyota Hilux Double Cab",
    subtitle: "Perfect for Adventure"
  },
  {
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1920&q=80",
    title: "Toyota Fortuner",
    subtitle: "Comfort Meets Power"
  },
  {
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1920&q=80",
    title: "Ford Everest",
    subtitle: "Built for the Journey"
  },
  {
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=1920&q=80",
    title: "Mercedes E-Class",
    subtitle: "Luxury Redefined"
  }
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a4a8d] text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-wider">FENIX CAR HIRE</Link>
          <ul className="hidden md:flex items-center gap-6">
            <li><Link href="/" className="hover:text-[#00A8E8] transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-[#00A8E8] transition-colors">About</Link></li>
            <li><Link href="/services" className="hover:text-[#00A8E8] transition-colors">Services</Link></li>
            <li><Link href="/fleet" className="hover:text-[#00A8E8] transition-colors">Fleet</Link></li>
            <li><Link href="/book" className="hover:text-[#00A8E8] transition-colors">Book Now</Link></li>
            <li><Link href="/contact" className="hover:text-[#00A8E8] transition-colors">Contact</Link></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section with Slider */}
      <section className="relative h-screen pt-16">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="absolute inset-0 bg-white/20" />
          </div>
        ))}
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <div className="bg-[#1a4a8d]/90 px-12 py-8 rounded-lg mb-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-widest">
              FENIX CAR HIRE
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-[#1a4a8d] font-semibold italic mb-4 drop-shadow-lg bg-white/70 px-6 py-2 rounded">
            Drive Your Dream Forward
          </p>
          <p className="text-lg md:text-xl text-[#1a4a8d] font-bold mb-8 drop-shadow-lg bg-white/70 px-6 py-2 rounded">
            Reliable - Professional - Convenient
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/book"
              className="bg-[#00A8E8] text-white px-8 py-3 rounded font-semibold hover:bg-[#0090c8] transition-colors"
            >
              Book Now
            </Link>
            <Link
              href="/about"
              className="bg-[#00A8E8] text-white px-8 py-3 rounded font-semibold hover:bg-[#0090c8] transition-colors"
            >
              Know More About Us
            </Link>
            <Link
              href="/contact"
              className="bg-[#00A8E8] text-white px-8 py-3 rounded font-semibold hover:bg-[#0090c8] transition-colors"
            >
              Contact Us Now
            </Link>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-[#00A8E8] scale-125" : "bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* Slide Info */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center z-20 bg-black/50 px-6 py-3 rounded-lg">
          <p className="text-white font-semibold">{slides[currentSlide].title}</p>
          <p className="text-gray-200 text-sm">{slides[currentSlide].subtitle}</p>
        </div>
      </section>

      {/* Floating Social Icons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <a
          href="https://wa.me/26876829797"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:scale-110 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
        <a
          href="https://facebook.com/fenix.carhire"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:scale-110 transition-transform"
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

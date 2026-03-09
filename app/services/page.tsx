import Link from "next/link"
import Image from "next/image"

const services = [
  {
    title: "Self-Drive Vehicle Rental",
    description: "Flexible rental options for individuals and businesses who prefer driving themselves. Choose from our wide range of vehicles for daily, weekly, or monthly rentals.",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80",
    features: ["Flexible rental periods", "Wide vehicle selection", "Competitive rates", "24/7 roadside assistance"]
  },
  {
    title: "Chauffeur & Executive Transport",
    description: "Professional driver services for VIP and corporate clients. Our trained chauffeurs ensure a comfortable and punctual journey.",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&q=80",
    features: ["Professional drivers", "Luxury vehicles", "Airport transfers", "Corporate events"]
  },
  {
    title: "Corporate Fleet Solutions",
    description: "Long-term leasing packages for companies and organizations. Tailored solutions to meet your business transportation needs.",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80",
    features: ["Bulk discounts", "Fleet management", "Maintenance included", "Flexible contracts"]
  },
  {
    title: "Airport Transfers",
    description: "Reliable pickup and drop-off services to and from King Mswati III International Airport. Start your journey stress-free.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80",
    features: ["Flight monitoring", "Meet & greet", "Fixed rates", "Luggage assistance"]
  }
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-[#1a4a8d] text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-wider">FENIX CAR HIRE</Link>
          <ul className="hidden md:flex items-center gap-6">
            <li><Link href="/" className="hover:text-[#00A8E8] transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-[#00A8E8] transition-colors">About</Link></li>
            <li><Link href="/services" className="text-[#00A8E8]">Services</Link></li>
            <li><Link href="/fleet" className="hover:text-[#00A8E8] transition-colors">Fleet</Link></li>
            <li><Link href="/book" className="hover:text-[#00A8E8] transition-colors">Book Now</Link></li>
            <li><Link href="/contact" className="hover:text-[#00A8E8] transition-colors">Contact</Link></li>
          </ul>
        </div>
      </nav>

      {/* Page Header */}
      <div className="bg-[#1a4a8d] text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-lg">Reliable, comfortable, and professional vehicle rental solutions</p>
      </div>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-56">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1a4a8d] mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-5 h-5 text-[#00A8E8]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/book"
                    className="inline-block bg-[#00A8E8] text-white px-6 py-2 rounded font-semibold hover:bg-[#0090c8] transition-colors"
                  >
                    Book This Service
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1a4a8d] py-16 px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-lg mb-8">
            Contact us to discuss your specific transportation requirements. 
            We are happy to create a tailored package for you.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#00A8E8] text-white px-8 py-3 rounded font-semibold hover:bg-[#0090c8] transition-colors"
          >
            Contact Us Today
          </Link>
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

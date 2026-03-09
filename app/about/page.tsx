import Link from "next/link"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-[#1a4a8d] text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-wider">FENIX CAR HIRE</Link>
          <ul className="hidden md:flex items-center gap-6">
            <li><Link href="/" className="hover:text-[#00A8E8] transition-colors">Home</Link></li>
            <li><Link href="/about" className="text-[#00A8E8]">About</Link></li>
            <li><Link href="/services" className="hover:text-[#00A8E8] transition-colors">Services</Link></li>
            <li><Link href="/fleet" className="hover:text-[#00A8E8] transition-colors">Fleet</Link></li>
            <li><Link href="/book" className="hover:text-[#00A8E8] transition-colors">Book Now</Link></li>
            <li><Link href="/contact" className="hover:text-[#00A8E8] transition-colors">Contact</Link></li>
          </ul>
        </div>
      </nav>

      {/* Page Header */}
      <div className="bg-[#1a4a8d] text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg">Your trusted partner for reliable vehicle rental services in the Kingdom of Eswatini</p>
      </div>

      {/* About Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#1a4a8d] mb-4">Who We Are</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Fenix Car Hire is a leading vehicle rental company based in the Kingdom of Eswatini. 
              We are committed to providing reliable, affordable, and convenient transportation solutions 
              for both individuals and businesses.
            </p>
            <p className="text-gray-600 leading-relaxed">
              With a diverse fleet of well-maintained vehicles and a team of dedicated professionals, 
              we ensure that every journey with us is safe, comfortable, and memorable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-[#1a4a8d] mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To be the most trusted and preferred car rental service provider in Eswatini, 
                known for excellence, reliability, and customer satisfaction.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-[#1a4a8d] mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To deliver exceptional vehicle rental experiences through quality service, 
                competitive pricing, and a commitment to exceeding customer expectations.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#1a4a8d] mb-6">Our Core Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#00A8E8] rounded-full flex items-center justify-center text-white font-bold shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-gray-800">Reliability</h3>
                  <p className="text-gray-600 text-sm">We deliver on our promises, every time.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#00A8E8] rounded-full flex items-center justify-center text-white font-bold shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-gray-800">Integrity</h3>
                  <p className="text-gray-600 text-sm">Honest and transparent business practices.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#00A8E8] rounded-full flex items-center justify-center text-white font-bold shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-gray-800">Customer Focus</h3>
                  <p className="text-gray-600 text-sm">Your satisfaction is our priority.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#00A8E8] rounded-full flex items-center justify-center text-white font-bold shrink-0">4</div>
                <div>
                  <h3 className="font-semibold text-gray-800">Excellence</h3>
                  <p className="text-gray-600 text-sm">We strive for the highest standards.</p>
                </div>
              </div>
            </div>
          </div>
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

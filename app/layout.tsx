import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Fenix Car Hire | Reliable Vehicle Rental in Eswatini',
  description: 'Your trusted partner for reliable vehicle rental services in the Kingdom of Eswatini. Drive Your Dream Forward with Fenix Car Hire.',
}

export const viewport: Viewport = {
  themeColor: '#1a4a8d',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.variable}>{children}</body>
    </html>
  )
}

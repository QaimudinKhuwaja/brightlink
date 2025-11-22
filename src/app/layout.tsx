import type { Metadata } from 'next'
import './globals.css'
import Navbar from './component/Navbar'
import Footer from './component/Footer'

export const metadata: Metadata = {
  title: 'Bright Link School',
  description: 'Official Website of Bright Link School',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}

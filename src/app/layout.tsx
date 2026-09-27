import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './component/Navbar'
import SmallNavbar from './component/SmallNavbar'
import Footer from './component/Footer'
import { ThemeProvider } from '@/contexts/ThemeContext'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Bright Link School | Quality Education in Khuhra',
    template: '%s | Bright Link School'
  },
  description: 'Bright Link Public High School provides quality education from Nursery to Class 10 in Khuhra, Khairpur. Admissions open - apply now!',
  keywords: ['school', 'education', 'Bright Link', 'Khuhra', 'Khairpur', 'admissions'],
  authors: [{ name: 'Bright Link School' }],
  openGraph: {
    title: 'Bright Link School',
    description: 'Providing quality education to empower future leaders',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') ||
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.classList.toggle('dark', theme === 'dark');
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased theme-transition">
        <ThemeProvider>
          <SmallNavbar />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

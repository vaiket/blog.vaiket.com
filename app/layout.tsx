import type { Metadata } from 'next'
import './globals.css'
import './home.css'
import Analytics from './Analytics'

export const metadata: Metadata = {
  metadataBase: new URL('https://blog.vaiket.com'),
  title: 'Vaiket Blog',
  description: 'Ideas, research, and product updates from Vaiket.',
  verification: {
    ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : {}),
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION ? { other: { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION } } : {}),
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}<Analytics /></body></html>
}

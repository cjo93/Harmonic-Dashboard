import './globals.css'

export const metadata = {
  title: 'Defrag Astrology Portal',
  description: 'Personal astrology defragmentation center for cosmic consciousness alignment and spiritual insights',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}
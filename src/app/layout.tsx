import './globals.css'
import NotificationContainer from '@/components/NotificationContainer'

export const metadata = {
  title: 'Harmonic Dashboard',
  description: 'A modern dashboard integrating GitHub Copilot-powered documentation and chat functionality',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        {children}
        <NotificationContainer />
      </body>
    </html>
  )
}
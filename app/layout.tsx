import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Study Abroad Assistant - AI-Powered University Recommendations',
  description: 'Get personalized university recommendations and SOP assistance for studying abroad with AI-powered insights.',
  generator: 'Study Abroad Assistant',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  keywords: 'study abroad, university recommendations, SOP assistance, AI-powered, international education',
  authors: [{ name: 'Study Abroad Assistant' }],
  openGraph: {
    title: 'Study Abroad Assistant',
    description: 'AI-powered university recommendations and SOP assistance',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <div className="flex-1">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}

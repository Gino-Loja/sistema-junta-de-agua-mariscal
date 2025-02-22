import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "@/styles/globals.css";
import { Providers } from './provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JAAP MARISCAL SUCRE',
  description: 'Sistema de Gestión Integral JAAP de Mariscal Sucre',
 
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //"next": "^14.2.0",
  return (
    <html lang="es">
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
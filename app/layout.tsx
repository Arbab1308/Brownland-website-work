import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Bebas_Neue, Lato } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
})

const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Brownland Coffee | Your Daily Dose of Brownland Magic",
  description:
    "Brownland Coffee is more than a café — it is a shared experience. Since 2000, blending premium café culture with everyday accessibility in Raipur.",
  keywords: ["Brownland Coffee", "Raipur", "Café", "Coffee Shop", "Cold Brew", "Thick Shakes"],
  openGraph: {
    title: "Brownland Coffee | Your Daily Dose of Brownland Magic",
    description: "More than a café — it is a shared experience. EST. 2000",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${bebasNeue.variable} ${lato.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

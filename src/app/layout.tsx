import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Montserrat, Playfair_Display, Cormorant_Garamond } from "next/font/google"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { LoadingProvider } from "@/lib/loading-context"
import { PageLoading } from "@/components/page-loading"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Urban Beds Expo",
   icons: {
    icon: "/ico.ico",
  },
  description:
    "Un refugio entre pinos en Mazamitla, donde la naturaleza y la comodidad se unen.",

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
      {/* SEO General */}
      <meta
        name="description"
        content="Urban Beds es tu refugio moderno en Guadalajara, a pasos de Expo Guadalajara. Comodidad, diseño y tecnología para viajeros de negocios y turismo."
      />
      <meta property="og:url" content="https://urbanbedsexpo.com/" />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Urban Beds Expo | Tu espacio de calma en el corazón de Guadalajara"
      />
      <meta
        property="og:description"
        content="Alojamiento moderno con self check-in 24 h, Wi-Fi de alta velocidad y seguridad 24/7. Descubre Urban Beds: confort, estilo y tranquilidad a pasos de Expo Guadalajara."
      />
      <meta property="og:image" content="https://urbanbedsexpo.com/og-image.jpg" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="urbanbedsexpo.com" />
      <meta property="twitter:url" content="https://urbanbedsexpo.com/" />
      <meta
        name="twitter:title"
        content="Urban Beds Expo | Tu espacio de calma en Guadalajara"
      />
      <meta
        name="twitter:description"
        content="Hospédate en un espacio moderno y acogedor cerca de Expo Guadalajara. Urban Beds ofrece confort, tecnología y atención 24/7."
      />
      <meta name="twitter:image" content="https://urbanbedsexpo.com/og-image.jpg" />

      {/* Icono */}
      <link rel="icon" href="/ico.ico" />
    </head>
      <body className={`${montserrat.variable} ${playfair.variable} ${cormorant.variable} font-sans antialiased`}>
        <LoadingProvider>
          <PageLoading />
          <Navbar />
          {children}
          <Footer />
          <WhatsAppButton />
        </LoadingProvider>
      </body>
    </html>
  )
}

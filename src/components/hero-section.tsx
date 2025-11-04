"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { VideoBackground } from "./video-background"
import { ResourceLoader } from "@/lib/resource-loader"

export function HeroSection() {
  const [isContentVisible, setIsContentVisible] = useState(false)

  const videos = [
    "/Victoria.mp4",
  ]

  useEffect(() => {
    // Mostrar contenido después de un breve retraso
    const timer = setTimeout(() => {
      setIsContentVisible(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <ResourceLoader videoSources={videos} imageSources={["/lgo.png"]} minLoadTime={1500} maxLoadTime={6000}>
      <section className="relative min-h-[100dvh] w-full overflow-hidden">
        <VideoBackground
          videoSources={videos}
          fallbackImage="/hero-fallback.jpg"
          overlayOpacity={0.5}
          transitionDuration={1000}
        />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-4xl flex-col items-center justify-center px-4 pt-24 pb-16 text-center text-white sm:pt-32">
          <div
            className={`mb-4 sm:mb-6 transition-all duration-1000 ${
              isContentVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
            }`}
          >
            <Image
              src="/logo1.png"
              alt="Urban Beds"
              width={500}
              height={200}
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 480px"
              className="mt-4 h-auto w-full max-w-[260px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[500px]"
              priority
            />  
          </div>

          <p
            className={`subtitle-text mb-8 max-w-3xl text-base font-light transition-all duration-1000 delay-300 sm:mb-12 sm:text-xl md:text-2xl ${
              isContentVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-6"
            }`}
          >
            Tu espacio de calma en el corazón de la ciudad.
          </p>
          <a
            href="https://hotels.cloudbeds.com/es/reservation/M991JM?currency=mxn"
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-md border border-[#D8D0C1] bg-[#D8D0C1] px-6 py-3 text-sm uppercase tracking-wider text-black transition-all duration-300 sm:px-8 sm:text-base ${
              isContentVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-6"
            }`}
          > 
            Reservar Ahora
          </a>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center transition-all duration-1000 delay-500 ${
            isContentVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-6"
          }`}
        >
          <span className="text-white text-xs sm:text-sm mb-2 uppercase tracking-widest">Descubre más</span>
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full animate-bounce mt-2"></div>
          </div>
        </div>
      </section>
    </ResourceLoader>
  )
}

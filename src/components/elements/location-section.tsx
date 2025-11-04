"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import MapComponent from "./MapComponent"

export function LocationSection() {
  const titleReveal = useScrollReveal()
  const descriptionReveal = useScrollReveal({ delay: 200 })
  const contentReveal = useScrollReveal({ delay: 300 })
  const mapReveal = useScrollReveal({ delay: 400 })

  return (
    <section id="ubicacion" className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div ref={titleReveal.ref} className={`reveal-fade-up ${titleReveal.isInView ? "revealed" : ""}`}>
            <h2 className="hero-title text-2xl sm:text-3xl text-[#5D4037] mb-4 sm:mb-6">UBICACIÓN</h2>
            <div className="w-16 sm:w-20 h-1 bg-[#C8A27D] mx-auto mb-6 sm:mb-8"></div>
          </div>
          <div ref={descriptionReveal.ref} className={`reveal-fade-up ${descriptionReveal.isInView ? "revealed" : ""}`}>
            <p className="font-serif-text text-base sm:text-lg text-[#5D4037]">
              Un refugio entre pinos, donde el aire puro inspira y la calma te envuelve.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div
  ref={contentReveal.ref}
  className={`space-y-4 sm:space-y-6 order-2 md:order-1 reveal-fade-right ${contentReveal.isInView ? "revealed" : ""}`}
>
<h3 className="font-serif-text text-xl sm:text-2xl font-medium text-[#5D4037]">
  En el corazón de Guadalajara
</h3>
<p className="text-[#5D4037] leading-relaxed">
Urban Beds está ubicado a pocos minutos de Expo Guadalajara, en una zona segura, moderna y perfectamente conectada con los principales puntos de la ciudad. Es el lugar ideal para quienes buscan combinar descanso, practicidad y estilo en un entorno contemporáneo.
</p>

<div className="space-y-4">
  <div>
    <h4 className="font-serif-text font-medium text-[#5D4037]">Dirección:</h4>
    <a
      href="https://maps.app.goo.gl/91U72yUycdbW7E4s7"
      target="_blank"
      rel="noopener noreferrer"
    >
      <p className="text-[#5D4037]">
        Av. Mariano Otero 1160, Piso 2, Guadalajara, Jalisco, 44520
      </p>
    </a>
  </div>

  <div>
    <h4 className="font-serif-text font-medium text-[#5D4037]">
      Puntos de interés cercanos:
    </h4>
    <ul className="space-y-2 mt-2">
      <li className="flex items-center text-[#5D4037]">
        <span className="w-2 h-2 bg-[#C8A27D] rounded-full mr-2"></span>
        Expo Guadalajara (3 min a pie)
      </li>
      <li className="flex items-center text-[#5D4037]">
        <span className="w-2 h-2 bg-[#C8A27D] rounded-full mr-2"></span>
        Plaza del Sol (5 min en coche)
      </li>
      <li className="flex items-center text-[#5D4037]">
        <span className="w-2 h-2 bg-[#C8A27D] rounded-full mr-2"></span>
        La Minerva (10 min en coche)
      </li>
      <li className="flex items-center text-[#5D4037]">
        <span className="w-2 h-2 bg-[#C8A27D] rounded-full mr-2"></span>
        Centro Histórico de Guadalajara (15 min en coche)
      </li>
    </ul>
  </div>
</div>
</div>

          <div
            ref={mapReveal.ref}
            className={`h-[300px] sm:h-[350px] md:h-[450px] rounded-lg overflow-hidden shadow-xl order-1 md:order-2 reveal-fade-left ${mapReveal.isInView ? "revealed" : ""}`}
          >
            <MapComponent
              lat={ 20.6584765 }
              lng={-103.3986637 }
              address="Circón 3168, Victoria, 45089 Zapopan, Jal."
              height="100%"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

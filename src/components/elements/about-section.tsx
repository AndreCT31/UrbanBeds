"use client"

import Image from "next/image"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function AboutSection() {
  const titleReveal = useScrollReveal()
  const logoReveal = useScrollReveal({ delay: 200 })
  const textReveal = useScrollReveal({ delay: 300 })
  const imageReveal = useScrollReveal({ delay: 200 })

  return (
    <section id="nosotros" className="py-16 sm:py-20 bg-[#F5F1ED]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div ref={titleReveal.ref} className={`reveal-fade-up ${titleReveal.isInView ? "revealed" : ""}`}>
            <h2 className="hero-title text-2xl sm:text-3xl text-[#000000] mb-4 sm:mb-6">NOSOTROS</h2>
            <div className="w-16 sm:w-20 h-1 bg-[#7F534B] mx-auto mb-6 sm:mb-8"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start ">
          <div
  ref={textReveal.ref}
  className={`space-y-4 sm:space-y-6 order-2 md:order-1 reveal-fade-right md:-translate-y-10 lg:-translate-y-16 ${
    textReveal.isInView ? "revealed" : ""
  }`}
>
          <div
  ref={logoReveal.ref}
  className={`reveal-scale -translate-y-0 md:-translate-y-2 ${
    logoReveal.isInView ? "revealed" : ""
  }`}
>
              <Image
                src="/mlogo.png"
                alt="Logo Urban Beds"
                width={200}
                height={200}
                className="block mx-auto invert"
              /> 
            </div>
            <p className="text-[#5D4037] leading-relaxed">
             <strong>En Urban Beds creemos que descansar también es parte del viaje.
</strong><br></br>
Nos encontramos a solo unos pasos de Expo Guadalajara, en una zona segura, tranquila y perfectamente conectada con los principales puntos de la ciudad. Nuestro espacio ha sido diseñado para ofrecer una experiencia moderna, cómoda y sin complicaciones, pensada tanto para viajeros de negocios como para quienes buscan disfrutar de Guadalajara con estilo.

            </p>
            <p className="text-[#5D4037] leading-relaxed">
             Cada habitación combina líneas limpias, detalles contemporáneos y un ambiente cálido que invita a desconectarse del ritmo urbano. Desde el confort de tu cama hasta un café por la mañana en nuestra cafetería del primer piso, cada rincón de Urban Beds está pensado para que te sientas como en casa.
            </p>
            <p className="text-[#5D4037] leading-relaxed">
Ofrecemos <strong>self check-in 24 horas, Wi-Fi de alta velocidad y seguridad en áreas comunes</strong>, porque entendemos que el descanso tambien está en la tranquilidad de saber que todo funciona.
            </p>
          </div>
          <div
            ref={imageReveal.ref}
            className={`relative h-[200px] sm:h-[300px] md:h-[510px] rounded-lg overflow-hidden shadow-xl order-1 md:order-2 reveal-fade-left ${imageReveal.isInView ? "revealed" : ""}`}
          >
            <Image src="/abo.jpg" alt="Interior de Urban Beds" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )

  // 
}

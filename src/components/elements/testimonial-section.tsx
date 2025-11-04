"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Testimonial } from "./testimonial"
const testimonials = [
  {
    quote:
      "Urban Beds superó mis expectativas. La habitación impecable, moderna y silenciosa, ideal para descansar después de un día de trabajo. El check-in fue rapidísimo y el personal siempre atento. Sin duda, mi lugar favorito para hospedarme cuando vengo a Guadalajara.",
    author: "Fernanda Ruiz",
    location: "Ciudad de México",
    rating: 5,
  },
  {
    quote:
      "La ubicación es perfecta, a solo unos minutos de Expo Guadalajara. Me encantó el diseño del lugar: limpio, cómodo y con detalles que hacen la diferencia. El Wi-Fi fue excelente y la seguridad me dio mucha confianza. ¡Lo recomiendo completamente!",
    author: "Roberto Hernández",
    location: "Monterrey, Nuevo León",
    rating: 5,
  },
  {
    quote:
      "Un espacio moderno con vibra tranquila. La cama comodísima y la cocineta compartida muy práctica. Se nota que cuidan cada detalle, desde la limpieza hasta la atención. Ideal para viajeros que buscan algo diferente a los hoteles tradicionales.",
    author: "Valeria Torres",
    location: "Zapopan, Jalisco",
    rating: 4,
  },
];

export function TestimonialsSection() {
  const titleReveal = useScrollReveal()
  const descriptionReveal = useScrollReveal({ delay: 200 })

  const testimonialReveals = [
    useScrollReveal({ delay: 300 }),
    useScrollReveal({ delay: 400 }),
    useScrollReveal({ delay: 500 }),
  ]

  return (
    <section id="testimonios" className="py-16 sm:py-20 bg-[#F5F1ED]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div ref={titleReveal.ref} className={`reveal-fade-up ${titleReveal.isInView ? "revealed" : ""}`}>
            <h2 className="hero-title text-2xl sm:text-3xl text-[#5D4037] mb-4 sm:mb-6">TESTIMONIOS</h2>
            <div className="w-16 sm:w-20 h-1 bg-[#C8A27D] mx-auto mb-6 sm:mb-8"></div>
          </div>
          <div ref={descriptionReveal.ref} className={`reveal-fade-up ${descriptionReveal.isInView ? "revealed" : ""}`}>
            <p className="font-serif-text text-base sm:text-lg text-[#5D4037]">
              Lo que nuestros huéspedes dicen sobre su experiencia en Urban Beds:
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={testimonialReveals[index].ref}
              className={`reveal-fade-up ${testimonialReveals[index].isInView ? "revealed" : ""}`}
            >
              <Testimonial
                quote={testimonial.quote}
                author={testimonial.author}
                location={testimonial.location}
                rating={testimonial.rating}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

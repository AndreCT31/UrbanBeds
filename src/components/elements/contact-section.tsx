"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Phone, MapPin } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const titleReveal = useScrollReveal()
  const descriptionReveal = useScrollReveal({ delay: 200 })
  const contactInfoReveal = useScrollReveal({ delay: 300 })
  const formReveal = useScrollReveal<HTMLFormElement>({ delay: 400 })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitSuccess(false)
    setSubmitError(false)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Here you would typically send the form data to your backend
      console.log("Form submitted:", formData)

      // Show success message
      setSubmitSuccess(true)
      setFormData({ name: "", email: "", phone: "", message: "" })
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contacto" className="py-16 sm:py-20 bg-[#F5F1ED]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div ref={titleReveal.ref} className={`reveal-fade-up ${titleReveal.isInView ? "revealed" : ""}`}>
            <h2 className="hero-title text-2xl sm:text-3xl text-[#5D4037] mb-4 sm:mb-6">CONTACTO</h2>
            <div className="w-16 sm:w-20 h-1 bg-[#C8A27D] mx-auto mb-6 sm:mb-8"></div>
          </div>
          <div ref={descriptionReveal.ref} className={`reveal-fade-up ${descriptionReveal.isInView ? "revealed" : ""}`}>
            <p className="font-serif-text text-base sm:text-lg text-[#5D4037]">
              Estamos a su disposición para resolver cualquier duda o consulta.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
          <div
            ref={contactInfoReveal.ref}
            className={`space-y-6 sm:space-y-8 reveal-fade-right ${contactInfoReveal.isInView ? "revealed" : ""}`}
          >
            <div className="flex items-start space-x-4">
              <div className="bg-[#C8A27D] p-3 rounded-full text-white">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif-text text-lg font-medium text-[#5D4037] mb-1">Teléfono</h3>
                <a href="tel:+523310234445"><p className="text-[#5D4037]">+52 33 1023 4445</p></a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-[#C8A27D] p-3 rounded-full text-white">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif-text text-lg font-medium text-[#5D4037] mb-1">Email</h3>
                <a href="mailto:reservaciones@urbanbedsexpo.com"><p className="text-[#5D4037]">reservaciones@urbanbedsexpo.com</p></a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-[#C8A27D] p-3 rounded-full text-white">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif-text text-lg font-medium text-[#5D4037] mb-1">Dirección</h3>
                <a href="https://maps.app.goo.gl/nWxgaqpddKj1pfyt8"><p className="text-[#5D4037]">Av. Mariano Otero #1160, piso 2. 44520, Guadalajara, Jal. </p></a>
              </div>
            </div>

         
          </div>

          {/* Contact Form */}
          <form
            ref={formReveal.ref}
            onSubmit={handleSubmit}
            className={`space-y-4 sm:space-y-6 bg-[#F5F1ED] p-6 rounded-lg shadow-sm reveal-fade-left ${formReveal.isInView ? "revealed" : ""}`}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#5D4037] mb-1">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-[#E6CCB2] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C8A27D]"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#5D4037] mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-[#E6CCB2] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C8A27D]"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[#5D4037] mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#E6CCB2] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C8A27D]"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#5D4037] mb-1">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-[#E6CCB2] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C8A27D]"
              ></textarea>
            </div>

            {submitSuccess && (
              <div className="p-3 bg-green-100 text-green-800 rounded-sm">
                Gracias por contactarnos. Nos comunicaremos contigo pronto.
              </div>
            )}

            {submitError && (
              <div className="p-3 bg-red-100 text-red-800 rounded-sm">
                Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#C8A27D] text-white rounded-sm hover:bg-[#5D4037] transition-colors uppercase tracking-wider text-sm font-medium disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

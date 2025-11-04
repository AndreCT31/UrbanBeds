"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const rooms = [
  /*
  {
       id: 1,
    name: "Urban Estudio – 1 Cama King Size",
    description:
      "Cómodo estudio de 20 m² con una cama King Size, baño completo privado y acceso a una cocineta compartida. Ideal para quienes buscan un espacio moderno y funcional. Disfruta de Wi-Fi de alta velocidad, televisión de pantalla plana y un ambiente tranquilo y libre de humo, con seguridad CCTV 24/7 y atención personalizada durante toda tu estancia.",
    features: [
      "Cama King Size",
      "Baño privado",
      "Cocineta compartida",
      "Wi-Fi de alta velocidad",
      "TV de pantalla plana",
      "Ambiente libre de humo",
      "CCTV 24/7",
      "Atención 24/7"
    ],
    images: [
      "/rooms/estudio/room.jpg",
      "/rooms/estudio/bath.jpg",
      "/rooms/estudio/tv.jpg",
      "/rooms/estudio/kit.jpg",
      "/rooms/estudio/view.jpg"
    ]
  },*/
  {
    id: 1,
    name: "Urban Estudio – 1 Cama King Size",
    description:
      "Cómodo estudio de 20 m² con una cama King Size, baño completo privado y acceso a una cocineta compartida. Ideal para quienes buscan un espacio moderno y funcional. Disfruta de Wi-Fi de alta velocidad, televisión de pantalla plana y un ambiente tranquilo y libre de humo, con seguridad CCTV 24/7 y atención personalizada durante toda tu estancia.",
   features: [
      "Cama King Size",
      "Baño privado",
      "Cocineta compartida",
      "Wi-Fi de alta velocidad",
      "TV de pantalla plana",
      "Ambiente libre de humo",
      "CCTV 24/7",
      "Atención 24/7"
    ],
    images: [
      "/rooms/estudio/room.webp",
      "/rooms/estudio/bath.webp",
      "/rooms/estudio/room1.webp",
      "/rooms/estudio/kit.webp",
      "/rooms/estudio/tv.webp",
      "/rooms/estudio/view.webp",
      "/rooms/estudio/bath1.webp",
      "/rooms/estudio/control.webp"
    ]
  },
  {
    id: 2,
    name: "Urban Estudio Doble Queen",
    description:
      "Para quienes buscan mayor independencia y confort, este estudio de 28 m² ofrece dos camas Queen Size, baño completo privado y una cocineta totalmente equipada para preparar tus propios alimentos. El ambiente moderno y luminoso, junto con el Wi-Fi de alta velocidad y la seguridad CCTV 24/7, garantizan una estancia tranquila y placentera en el corazón de Guadalajara.",
    features: [
      "2 Camas Queen Size",
      "Baño privado",
      "Cocineta privada equipada",
      "Wi-Fi de alta velocidad",
      "TV de pantalla plana",
      "Ambiente libre de humo",
      "CCTV 24/7",
      "Atención 24/7"
    ],
    images: [
      "/rooms/doble/room1.webp",
      "/rooms/doble/bath1.webp",
      "/rooms/doble/room2.webp",
      "/rooms/doble/control.webp",
      "/rooms/doble/room3.webp",
      "/rooms/doble/bath.webp",
      "/rooms/doble/beds.webp",
    ]
  }
]


//

export function RoomsSection() {
  const [activeRoom, setActiveRoom] = useState(0)
  const [currentImage, setCurrentImage] = useState(0)
  const [direction, setDirection] = useState(0) 
  const [isAnimating, setIsAnimating] = useState(false)

  const titleReveal = useScrollReveal()
  const descriptionReveal = useScrollReveal({ delay: 200 })
  const imageReveal = useScrollReveal({ delay: 300 })
  const contentReveal = useScrollReveal({ delay: 400 })
  const indicatorsReveal = useScrollReveal({ delay: 500 })

  const nextRoom = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(1)
    setTimeout(() => {
      setActiveRoom((prev) => (prev + 1) % rooms.length)
      setCurrentImage(0)
      setTimeout(() => {
        setIsAnimating(false)
      }, 50)
    }, 300)
  }

  const prevRoom = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(-1)
    setTimeout(() => {
      setActiveRoom((prev) => (prev - 1 + rooms.length) % rooms.length)
      setCurrentImage(0)
      setTimeout(() => {
        setIsAnimating(false)
      }, 50)
    }, 300)
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % rooms[activeRoom].images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + rooms[activeRoom].images.length) % rooms[activeRoom].images.length)
  }

  // Animation classes based on direction
  const getAnimationClasses = () => {
    if (!isAnimating) return "opacity-100 transform translate-x-0"
    return direction > 0 ? "opacity-0 transform translate-x-10" : "opacity-0 transform -translate-x-10"
  }

  return (
    <section id="habitaciones" className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div ref={titleReveal.ref} className={`reveal-fade-up ${titleReveal.isInView ? "revealed" : ""}`}>
            <h2 className="hero-title text-2xl sm:text-3xl text-[#5D4037] mb-4 sm:mb-6">ALOJAMIENTOS</h2>
            <div className="w-16 sm:w-20 h-1 bg-[#5D4037] mx-auto mb-6 sm:mb-8"></div>
          </div>
          <div ref={descriptionReveal.ref} className={`reveal-fade-up ${descriptionReveal.isInView ? "revealed" : ""}`}>
            <p className="font-serif-text text-base sm:text-lg text-[#5D4037]">
              Nuestros espacios ofrecen un espacio tranquilo y confortable para su descanso.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div
            ref={imageReveal.ref}
            className={`relative h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl reveal-fade-right ${imageReveal.isInView ? "revealed" : ""}`}
          >
            {/* Room Images with Transition */}
            <div className="absolute inset-0">
              {rooms.map((room, roomIndex) => (
                <div
                  key={`room-${roomIndex}`}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    activeRoom === roomIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {room.images.map((image, imageIndex) => (
                    <div
                      key={`image-${roomIndex}-${imageIndex}`}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        currentImage === imageIndex ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${room.name} - Imagen ${imageIndex + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Image Navigation */}
            <div className="absolute inset-x-0 bottom-0 flex justify-between p-4">
              <button
                onClick={prevImage}
                className="p-2 bg-[#D8D0C1]/70 text-white rounded-full hover:bg-[#5D4037] transition-colors"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="p-2 bg-[#D8D0C1]/70 text-white rounded-full hover:bg-[#5D4037] transition-colors"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div
            ref={contentReveal.ref}
            className={`relative overflow-hidden reveal-fade-left ${contentReveal.isInView ? "revealed" : ""}`}
          >
            <div className={`transition-all duration-300 ease-in-out ${getAnimationClasses()}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif-text text-xl sm:text-2xl font-medium text-[#5D4037]">
                  {rooms[activeRoom].name}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={prevRoom}
                    className="p-2 bg-[#E6CCB2] text-[#5D4037] rounded-full hover:bg-[#C8A27D] hover:text-white transition-colors"
                    aria-label="Habitación anterior"
                    disabled={isAnimating}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextRoom}
                    className="p-2 bg-[#E6CCB2] text-[#5D4037] rounded-full hover:bg-[#C8A27D] hover:text-white transition-colors"
                    aria-label="Siguiente habitación"
                    disabled={isAnimating}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <p className="text-[#5D4037] mb-6">{rooms[activeRoom].description}</p>

              <div className="mb-6">
                <h4 className="font-serif-text text-lg font-medium text-[#5D4037] mb-3">Características:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {rooms[activeRoom].features.map((feature, index) => (
                    <li key={index} className="flex items-center text-[#5D4037]">
                      <span className="w-2 h-2 bg-[#C8A27D] rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="https://hotels.cloudbeds.com/es/reservation/PsV0Ym?"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-[#5D4037] text-white rounded-sm hover:bg-[#D8D0C1] transition-colors"
              >
                Reservar
              </a>
            </div>
          </div>
        </div>

        {/* Room Navigation Indicators */}
        <div
          ref={indicatorsReveal.ref}
          className={`flex justify-center mt-8 space-x-2 reveal-fade-up ${indicatorsReveal.isInView ? "revealed" : ""}`}
        >
          {rooms.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (isAnimating) return
                setDirection(index > activeRoom ? 1 : -1)
                setIsAnimating(true)
                setTimeout(() => {
                  setActiveRoom(index)
                  setCurrentImage(0)
                  setTimeout(() => {
                    setIsAnimating(false)
                  }, 50)
                }, 300)
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeRoom === index ? "bg-[#5D4037] w-6" : "bg-[#E6CCB2]"
              }`}
              aria-label={`Ver habitación ${index + 1}`}
              disabled={isAnimating}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

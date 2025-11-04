"use client"

import { useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import { X } from "lucide-react"

export function Gallery() {
  const isMobile = useMobile()
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
 
  const images = [
    {
      src: "/placeholder.svg?height=600&width=600",
      alt: "Habitación",
    },
    {
      src: "/placeholder.svg?height=600&width=600",
      alt: "Lobby",
    },
    {
      src: "/placeholder.svg?height=600&width=600",
      alt: "Terraza",
    },
    {
      src: "/placeholder.svg?height=600&width=600",
      alt: "Desayuno",
    },
    {
      src: "/placeholder.svg?height=600&width=600",
      alt: "Baño",
    },
    {
      src: "/placeholder.svg?height=600&width=600",
      alt: "Área común",
    },
  ]

  // For mobile, show fewer images initially
  const visibleImages = isMobile ? images.slice(0, 4) : images

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {visibleImages.map((image, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300"
            />
          </motion.div>
        ))}
      </div>

      {isMobile && images.length > 4 && (
        <div className="mt-4 text-center">
          <button
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            onClick={() => setSelectedImage(4)}
          >
            Ver más fotos ({images.length - 4})
          </button>
        </div>
      )}

      {/* Lightbox */}
      
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white p-2 bg-primary/80 rounded-full"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(null)
              }}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Cerrar</span>
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-3xl aspect-square md:aspect-video"
            >
              <Image
                src={images[selectedImage].src || "/placeholder.svg"}
                alt={images[selectedImage].alt}
                fill
                className="object-contain"
              />
            </motion.div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === selectedImage ? "bg-white" : "bg-white/50"}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage(index)
                  }}
                  aria-label={`Ver imagen ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

interface MobileNavProps {
  logoSrc?: string
}

export function MobileNav({ logoSrc }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    // Prevent scrolling when menu is open
    if (!isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }

  const closeMenu = () => {
    setIsOpen(false)
    document.body.style.overflow = ""
  }

  const menuItems = [
    { href: "#about", label: "Hotel Gran Casa Xalisco" },
    { href: "#rooms", label: "Reserva" },
    { href: "#amenities", label: "Un espacio personal" },
    { href: "#location", label: "Nuestros Servicios" },
    { href: "#contact", label: "A 15 minutos de todo" },
    { href: "#history", label: "Un lugar con historia" },
    { href: "#food", label: "Sabor inolvidable" },
    { href: "#events", label: "Eventos" },
  ]

  return (
    <>
      <button
        className="flex items-center justify-center p-2 rounded-md focus:outline-none text-white ml-auto"
        onClick={toggleMenu}
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      >
        <Menu className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 z-50"
            onClick={closeMenu}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-black shadow-xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                {logoSrc && (
                  <div className="relative h-12 w-40">
                    <Image
                      src={logoSrc || "/placeholder.svg"}
                      alt="Logo"
                      width={160}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                )}
                <button
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  onClick={closeMenu}
                  aria-label="Cerrar menú"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="p-0">
                <ul className="divide-y divide-gray-800">
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * index }}
                    >
                      <Link
                        href={item.href}
                        className="block py-4 px-6 text-lg font-medium text-white hover:bg-white/10 transition-colors"
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="p-6 border-t border-gray-800">
                <Link
                  href="tel:+523312345678"
                  className="flex items-center justify-center w-full py-3 px-4 rounded-md bg-white text-black font-medium hover:bg-white/90 transition-colors"
                  onClick={closeMenu}
                >
                  Llamar Ahora
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

 "use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isMenuOpen && !target.closest(".mobile-menu") && !target.closest(".menu-button")) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isMenuOpen ? "bg-black/95 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-0 bg-black/60 backdrop-blur-sm transition-opacity md:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      <div
        className="container mx-auto px-4 relative z-10"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10 mt-2">
            <Image
              src="/mlogo.png"
              alt="Urban Beds"
              width={isScrolled ? 130 : 160}
              height={isScrolled ? 48 : 60}
              className="transition-all duration-300"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div
              className={`flex items-center space-x-8 whitespace-nowrap transition-all duration-500 ${
                isHovering ? "opacity-100 max-w-[800px]" : "opacity-70 hover:opacity-100"
              }`}
            >
              <NavLink href="#nosotros" label="Nosotros" />
              <NavLink href="#habitaciones" label="Alojamientos" />
              <NavLink href="#ubicacion" label="Ubicación" />
              <NavLink href="#contacto" label="Contacto" />
            </div>
          </nav>

          {/* Reservar Button - Always visible on desktop */}
          <Link
            href="https://hotels.cloudbeds.com/es/reservation/M991JM?currency=mxn"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-block px-5 py-2 bg-[#D8D0C1] text-black rounded-sm border border-[#D8D0C1] hover:bg-transparent hover:text-white transition-colors uppercase text-sm tracking-wider font-medium"
          >
            Reservar
          </Link> 

          {/* Mobile Menu  */}
          <button
            className="md:hidden relative z-10 menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - Dropdown style instead of fullscreen */}
        <div
          className={`md:hidden absolute inset-x-0 top-full px-4 transition-all duration-200 ease-out mobile-menu ${
            isMenuOpen
              ? "pointer-events-auto opacity-100 translate-y-2"
              : "pointer-events-none opacity-0 -translate-y-2"
          }`}
        >
          <div className="rounded-lg border border-white/10 bg-black/95 backdrop-blur-md shadow-xl overflow-hidden" role="dialog" aria-label="Menú principal">
            <nav className="flex flex-col divide-y divide-white/10">
              <MobileNavLink href="#nosotros" label="Nosotros" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink href="#habitaciones" label="Alojamientos" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink href="#ubicacion" label="Ubicación" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink href="#contacto" label="Contacto" onClick={() => setIsMenuOpen(false)} />
              <div className="p-4">
                <Link
                  href="https://hotels.cloudbeds.com/es/reservation/M991JM?currency=mxn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-md bg-[#D8D0C1] px-4 py-2 text-center text-black transition-colors hover:bg-[#D9B48F] uppercase tracking-wide text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Reservar
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-white hover:text-[#E6CCB2] transition-colors uppercase text-sm tracking-wider font-medium relative group py-2"
    >
      {label}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E6CCB2] transition-all duration-300 group-hover:w-full"></span>
    </Link>
  )
}

function MobileNavLink({
  href,
  label,
  onClick,
}: {
  href: string
  label: string
  onClick: () => void
}) {
  return (
    <Link
      href={href}
      className="block font-serif-text text-white hover:text-[#E6CCB2] transition-colors py-3 px-5 text-left"
      onClick={onClick}
    >
      {label}
    </Link>
  )
}

import Link from "next/link"
import Image from "next/image"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Logo and Description */}
          <div className="space-y-4 flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="inline-block">
              <Image src="/logo.png" alt="Casa Victorias" width={180} height={88} />
            </Link>
           <p className="text-[#E6CCB2] text-sm max-w-xs leading-relaxed">
Entre el ritmo de la ciudad, un respiro para el alma.</p>
 
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-lg font-medium mb-5 uppercase tracking-wider font-serif-text">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#nosotros" className="text-[#E6CCB2] hover:text-white transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="#habitaciones" className="text-[#E6CCB2] hover:text-white transition-colors">
                  Alojamientos
                </Link>
              </li>
              <li>
                <Link href="#ubicacion" className="text-[#E6CCB2] hover:text-white transition-colors">
                  Ubicación
                </Link>
              </li>
              <li>
                <Link href="#contacto" className="text-[#E6CCB2] hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <a
                  href="https://hotels.cloudbeds.com/es/reservation/M991JM?currency=mxn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C8A27D] hover:text-white transition-colors"
                >
                  Reservar Ahora
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-lg font-medium mb-5 uppercase tracking-wider font-serif-text">Contacto</h3>
            <address className="not-italic text-[#E6CCB2] space-y-3">
            <a href="https://maps.app.goo.gl/nWxgaqpddKj1pfyt8"> <p>Av. Mariano Otero #1160, piso 2.</p></a>
            <a href="https://maps.app.goo.gl/nWxgaqpddKj1pfyt8"><p> Guadalajara, Jal, 44520.</p></a>
              <a href="tel:+523310234445"><p  className="pt-2">Tel: +52 33 1023 4445</p></a>
              <a href="mailto:reservaciones@urbanbeds.com"> <p>Email: reservaciones@urbanbeds.com</p></a>
            </address>
          </div>
        </div>

        <div className="border-t border-[#C8A27D]/30 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#E6CCB2] text-sm">&copy; {currentYear} Urban Beds Expo. Todos los derechos reservados.</p>
         
        </div>
      </div>
    </footer>
  )
}

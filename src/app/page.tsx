import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/elements/about-section"
import { RoomsSection } from "@/components/elements/rooms-section"
import { LocationSection } from "@/components/elements/location-section"
import { ContactSection } from "@/components/elements/contact-section"
import { TestimonialsSection } from "@/components/elements/testimonial-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <RoomsSection />
      <TestimonialsSection />
      <LocationSection />
      <ContactSection />
    </main>
  )
}

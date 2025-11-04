"use client"

import { useEffect, useRef, useState } from "react"

type ScrollRevealOptions = {
  threshold?: number
  rootMargin?: string
  delay?: number
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = "0px",
  delay = 0,
}: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          // Add delay if specified
          if (delay) {
            setTimeout(() => {
              setIsInView(true)
            }, delay)
          } else {
            setIsInView(true)
          }
          // Once revealed, stop observing
          observer.unobserve(element)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, rootMargin, delay])

  return { ref, isInView }
}

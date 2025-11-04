"use client"

import type React from "react"
import { useEffect } from "react"
import { useLoading } from "@/lib/loading-context"

// Función para precargar una imagen
const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

// Función para precargar un video (solo metadatos)
const preloadVideo = (src: string): Promise<void> => {
    return new Promise<void>((resolve) => {
    const video = document.createElement("video")
    video.preload = "metadata"

    const handleMetadata = () => {
      resolve()
      cleanup()
    }

    const handleError = () => {
      console.warn(`Error al precargar el video: ${src}`)
      resolve() // Resolvemos de todos modos para no bloquear
      cleanup()
    }

    const cleanup = () => {
      video.removeEventListener("loadedmetadata", handleMetadata)
      video.removeEventListener("error", handleError)
    }

    video.addEventListener("loadedmetadata", handleMetadata, { once: true })
    video.addEventListener("error", handleError, { once: true })

    video.src = src
  })
}

interface ResourceLoaderProps {
  children: React.ReactNode
  videoSources?: string[]
  imageSources?: string[]
  minLoadTime?: number
  maxLoadTime?: number
}

export function ResourceLoader({
  children,
  videoSources = [],
  imageSources = [],
  minLoadTime = 1000,
  maxLoadTime = 5000,
}: ResourceLoaderProps) {
  const { setIsLoading } = useLoading()

  useEffect(() => {
    const startTime = Date.now()
    let resourcesLoaded = false

    // Función para finalizar la carga
    const finishLoading = () => {
      const elapsedTime = Date.now() - startTime

      if (elapsedTime < minLoadTime) {
        // Si no ha pasado el tiempo mínimo, esperar
        setTimeout(() => setIsLoading(false), minLoadTime - elapsedTime)
      } else {
        // Si ya pasó el tiempo mínimo, terminar la carga inmediatamente
        setIsLoading(false)
      }
    }

    // Establecer un tiempo máximo de carga
    const timeoutId = setTimeout(() => {
      if (!resourcesLoaded) {
        console.warn("Se alcanzó el tiempo máximo de carga, continuando...")
        setIsLoading(false)
      }
    }, maxLoadTime)

    // Precargar recursos
    const loadResources = async () => {
      try {
        // Precargar imágenes (en paralelo)
        const imagePromises = imageSources.map((src) => preloadImage(src))

        // Precargar videos (solo metadatos, en paralelo)
        const videoPromises = videoSources.map((src) => preloadVideo(src))

        // Esperar a que se carguen todos los recursos o al menos los críticos
        await Promise.all([
          // Esperar a que se cargue al menos la primera imagen
          imageSources.length > 0 ? imagePromises[0] : Promise.resolve(),
          // Esperar a que se cargue al menos el primer video
          videoSources.length > 0 ? videoPromises[0] : Promise.resolve(),
        ])

        // Marcar como cargado y finalizar
        resourcesLoaded = true
        finishLoading()

        // Continuar cargando el resto de recursos en segundo plano
        Promise.all([...imagePromises.slice(1), ...videoPromises.slice(1)]).catch((err) =>
          console.warn("Error al cargar recursos en segundo plano:", err),
        )
      } catch (error) {
        console.error("Error al cargar recursos:", error)
        resourcesLoaded = true
        finishLoading()
      }
    }

    loadResources()

    return () => {
      clearTimeout(timeoutId)
    }
  }, [videoSources, imageSources, minLoadTime, maxLoadTime, setIsLoading])

  return <>{children}</>
}

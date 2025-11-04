"use client"

import { useEffect, useRef, useState } from "react"

interface VideoBackgroundProps {
  videoSources: string[]
  fallbackImage: string
  overlayOpacity?: number
  transitionDuration?: number
}

export function VideoBackground({
  videoSources,
  fallbackImage,
  overlayOpacity = 0,
  transitionDuration = 800,
}: VideoBackgroundProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [nextVideoIndex, setNextVideoIndex] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [videoStates, setVideoStates] = useState<Array<"loading" | "ready" | "playing" | "fading">>(() =>
    videoSources.map(() => "loading"),
  )

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null)
  const videoEndTimerRef = useRef<NodeJS.Timeout | null>(null)
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videoSources.length)

    // Limpiar al desmontar
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current)
      }
      if (videoEndTimerRef.current) {
        clearTimeout(videoEndTimerRef.current)
      }
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current)
      }
    }
  }, [videoSources.length])

  useEffect(() => {
    const loadVideos = async () => {
      console.log("Cargando videos inicialmente")

      loadingTimeoutRef.current = setTimeout(() => {
        console.log("Timeout de carga alcanzado, mostrando fallback")
        setIsLoading(false)

        const firstVideo = videoRefs.current[0]
        if (firstVideo) {
          firstVideo.play().catch((err) => console.error("No se pudo reproducir el video después del timeout:", err))
        }
      }, 5000)

      const newStates = [...videoStates]

      const checkVideoReady = (video: HTMLVideoElement | null): Promise<boolean> => {
        if (!video) return Promise.resolve(false)

        return new Promise((resolve) => {
          if (video.readyState >= 3) {
            resolve(true)
            return
          }

          const handleCanPlay = () => {
            video.removeEventListener("canplay", handleCanPlay)
            resolve(true)
          }

          video.addEventListener("canplay", handleCanPlay)

          const handleError = () => {
            video.removeEventListener("error", handleError)
            resolve(false)
          }

          video.addEventListener("error", handleError)
        })
      }

      for (let i = 0; i < videoSources.length; i++) {
        const video = videoRefs.current[i]
        if (!video) continue

        video.load()

        // Configurar event listeners
        video.addEventListener("error", () => {
          console.error(`Error al cargar el video ${i}:`, video.error)
        })
      }

      // Esperar a que al menos un video esté listo
      let videoReady = false
      for (let i = 0; i < videoSources.length; i++) {
        const isReady = await checkVideoReady(videoRefs.current[i])
        if (isReady) {
          console.log(`Video ${i} está listo para reproducir`)
          newStates[i] = "ready"
          setVideoStates([...newStates])

          // Intentar reproducir este video
          try {
            await playVideo(i)
            videoReady = true
            break
          } catch (error) {
            console.error(`Error reproduciendo video ${i}:`, error)
          }
        }
      }

      // Si ningún video está listo, mostrar el fallback
      if (!videoReady) {
        console.warn("Ningún video está listo para reproducir, mostrando fallback")
      }

      // Limpiar el timeout y quitar la pantalla de carga
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current)
        loadingTimeoutRef.current = null
      }
      setIsLoading(false)
    }

    loadVideos()
  }, [videoSources])

  // Función para reproducir un video específico
  const playVideo = async (index: number) => {
    const video = videoRefs.current[index]
    if (!video) {
      throw new Error(`Video ${index} no existe`)
    }

    if (videoStates[index] !== "ready" && video.readyState < 3) {
      throw new Error(`Video ${index} no está listo para reproducir`)
    }

    try {
      console.log(`Reproduciendo video ${index}`)
      video.currentTime = 0
      await video.play()

      // Actualizar estados
      const newStates = [...videoStates]
      newStates[index] = "playing"
      setVideoStates(newStates)
      setCurrentVideoIndex(index)

      // Programar la transición al siguiente video
      scheduleNextVideo(index)

      return true
    } catch (error) {
      console.error(`Error reproduciendo video ${index}:`, error)
      throw error
    }
  }

  // Programar la transición al siguiente video
  const scheduleNextVideo = (currentIndex: number) => {
    const video = videoRefs.current[currentIndex]
    if (!video) return

    // Calcular cuándo debe comenzar la transición
    const videoDuration = video.duration || 10
    const timeRemaining = (videoDuration - video.currentTime) * 1000 || 5000

    // Asegurarse de que la transición comience antes de que termine el video
    const transitionTime = Math.max(timeRemaining - transitionDuration - 500, 1000)

    // Limpiar cualquier temporizador existente
    if (videoEndTimerRef.current) {
      clearTimeout(videoEndTimerRef.current)
    }

    // Programar la transición
    videoEndTimerRef.current = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % videoSources.length
      console.log(`Preparando transición de video ${currentIndex} a ${nextIndex}`)

      // Verificar si el siguiente video está listo
      if (videoStates[nextIndex] === "ready" || (videoRefs.current[nextIndex]?.readyState ?? 0) >= 3) {
        startTransition(currentIndex, nextIndex)
      } else {
        console.log(`Video ${nextIndex} no está listo, buscando otro...`)
        // Buscar el siguiente video disponible
        for (let i = 0; i < videoSources.length; i++) {
          const alternateIndex = (nextIndex + i) % videoSources.length
          if (
            alternateIndex !== currentIndex &&
            (videoStates[alternateIndex] === "ready" || (videoRefs.current[alternateIndex]?.readyState ?? 0) >= 3)
          ) {
            startTransition(currentIndex, alternateIndex)
            return
          }
        }
        // Si no hay videos disponibles, reiniciar el actual
        video.currentTime = 0
        scheduleNextVideo(currentIndex)
      }
    }, transitionTime)
  }

  // Iniciar la transición entre videos
  const startTransition = (fromIndex: number, toIndex: number) => {
    // Marcar el video actual como en transición
    const newStates = [...videoStates]
    newStates[fromIndex] = "fading"
    setVideoStates(newStates)
    setNextVideoIndex(toIndex)

    // Iniciar la reproducción del siguiente video
    const nextVideo = videoRefs.current[toIndex]
    if (nextVideo) {
      nextVideo.currentTime = 0
      nextVideo
        .play()
        .then(() => {
          setTimeout(() => {
            if (transitionTimerRef.current) {
              clearTimeout(transitionTimerRef.current)
            }

            transitionTimerRef.current = setTimeout(() => {
              const finalStates = [...videoStates]
              finalStates[fromIndex] = "ready"
              finalStates[toIndex] = "playing"
              setVideoStates(finalStates)
              setCurrentVideoIndex(toIndex)
              setNextVideoIndex(null)
              scheduleNextVideo(toIndex)
            }, transitionDuration)
          }, 50) // Le damos 50ms para evitar parpadeos

          // Después de la duración de la transición, completar el cambio
          if (transitionTimerRef.current) {
            clearTimeout(transitionTimerRef.current)
          }

          transitionTimerRef.current = setTimeout(() => {
            const finalStates = [...videoStates]
            finalStates[fromIndex] = "ready"
            finalStates[toIndex] = "playing"
            setVideoStates(finalStates)
            setCurrentVideoIndex(toIndex)
            setNextVideoIndex(null)

            // Programar la siguiente transición
            scheduleNextVideo(toIndex)
          }, transitionDuration)
        })
        .catch((error) => {
          console.error(`Error reproduciendo el siguiente video ${toIndex}:`, error)
          // Reiniciar el video actual
          const currentVideo = videoRefs.current[fromIndex]
          if (currentVideo) {
            currentVideo.currentTime = 0
            setNextVideoIndex(null)
            newStates[fromIndex] = "playing"
            setVideoStates(newStates)
            scheduleNextVideo(fromIndex)
          }
        })
    }
  }

  // Función para determinar la opacidad de cada video
  const getVideoStyle = (index: number) => {
    const isCurrent = index === currentVideoIndex
    const isNext = index === nextVideoIndex

    if (isCurrent) {
      return {
        opacity: isNext ? 0.5 : 1, // 🔁 baja opacidad ligeramente mientras el siguiente inicia
        zIndex: 1,
        transition: `opacity ${transitionDuration}ms ease-in-out`,
      }
    }

    if (isNext) {
      return {
        opacity: 1,
        zIndex: 2,
        transition: `opacity ${transitionDuration}ms ease-in-out`,
      }
    }

    return {
      opacity: 0,
      zIndex: 0,
    }
  }

  // Manejar eventos de video
  const handleVideoEnded = (index: number) => {
    console.log(`Video ${index} terminó`)
    const nextIndex = (index + 1) % videoSources.length

    // Si este es el video actual, iniciar transición al siguiente
    if (index === currentVideoIndex && nextVideoIndex === null) {
      startTransition(index, nextIndex)
    }
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Overlay para oscurecer el video/imagen */}
      <div
        className="absolute inset-0 z-[3]"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
        }}
      ></div>

      {/* Videos de fondo */}
      {videoSources.map((src, index) => (
        <video
          key={`video-${index}`}
          ref={(el) => {
            videoRefs.current[index] = el
          }}
          className="absolute inset-0 w-full h-full object-cover"
          style={getVideoStyle(index)}
          playsInline
          muted
          loop={false}
          preload="auto"
          crossOrigin="anonymous"
          onEnded={() => handleVideoEnded(index)}
        >
          <source src={src} type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
      ))}

      {/* Imagen de respaldo mientras los videos cargan */}
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
          isLoading ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(${fallbackImage})`,
          zIndex: 0,
        }}
      ></div>
    </div>
  )
}

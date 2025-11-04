"use client"

import { useEffect, useState } from "react"
import { useLoading } from "@/lib/loading-context"
import Image from "next/image"

export function PageLoading() {
  const { isLoading } = useLoading()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!isLoading) {
      // Cuando termina de cargar, esperamos un poco antes de ocultar
      const timer = setTimeout(() => {
        setVisible(false)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [isLoading])

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0000]/40 backdrop-blur-[5px] transition-opacity duration-500 ${
        isLoading ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center">
        <div className="mb-6 relative w-[180px] h-[90px]">
          <Image src="/lgo.png" alt="Urban Beds" fill className="object-contain" priority />
        </div>

        <div className="w-64 h-1.5 bg-black/70 rounded-full overflow-hidden">
          <div className="h-full bg-[#ffffff] rounded-full w-full animate-pulse"></div>
        </div>

        <p className="mt-3 text-[#ffffff] text-sm font-light">Cargando...</p>
      </div>
    </div>
  )
}

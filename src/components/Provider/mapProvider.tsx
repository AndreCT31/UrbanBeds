"use client"

import { type Libraries, useJsApiLoader } from "@react-google-maps/api"
import type { ReactNode } from "react"

// Define libraries to load
const libraries = ["places"] as Libraries

export function MapProvider({ children }: { children: ReactNode }) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
  })

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-full bg-stone-800 text-white p-4 rounded-lg">
        <p>Error loading maps</p>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full bg-stone-800 text-white p-4 rounded-lg">
        <p>Loading map...</p>
      </div>
    )
  }

  return <>{children}</>
}


"use client"

import type React from "react"

import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api"
import { useRef } from "react"

interface GoogleMapProps {
  address?: string
  lat?: number
  lng?: number
  zoom?: number
  height?: string
}
//20.6448694,-103.4011247
const MapComponent: React.FC<GoogleMapProps> = ({
  address = "Independencia 62, Centro Histórico, 49300 Sayula, Jal.",
  lat = 20.6448694,
  lng = -103.4011247,
  zoom = 16,
  height = "100%",
}) => {
  const mapRef = useRef<google.maps.Map | null>(null)
  const mapContainerStyle = {
    width: "100%",
    height,
  }

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places", "drawing", "geometry"],
  })

  if (loadError) {
    return <p>Error al cargar el mapa</p>
  }

  if (!isLoaded) {
    return <p>Cargando mapa...</p>
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={{ lat, lng }}
      zoom={zoom}
      onLoad={(map) => {
        mapRef.current = map
      }}
      options={{
        mapTypeControl: false,
        streetViewControl: false,
        styles: [
          {
            featureType: "all",
            elementType: "geometry",
            stylers: [{ color: "#242f3e" }],
          },
          {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#242f3e" }, { lightness: 10 }],
          },
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#746855" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }],
          },
        ],
      }}
    >
      <MarkerF position={{ lat, lng }} title={address} />
    </GoogleMap>
  )
}

export default MapComponent

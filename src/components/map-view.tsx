"use client"

import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Plus, Minus } from "lucide-react"

export default function MapView() {
  const [mapType, setMapType] = useState("Map")
  const [isLoading, setIsLoading] = useState(true)

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative h-full w-full bg-gray-100">
      {/* Map controls */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex">
          <Button
            variant={mapType === "Map" ? "default" : "ghost"}
            className={`rounded-none ${mapType === "Map" ? "bg-gray-900 text-white" : "bg-white text-gray-700"}`}
            onClick={() => setMapType("Map")}
          >
            Map
          </Button>
          <Button
            variant={mapType === "Satellite" ? "default" : "ghost"}
            className={`rounded-none ${mapType === "Satellite" ? "bg-gray-900 text-white" : "bg-white text-gray-700"}`}
            onClick={() => setMapType("Satellite")}
          >
            Satellite
          </Button>
        </div>
      </div>

      {/* Zoom controls */}
      <div className="absolute top-20 right-4 z-10 flex flex-col gap-2">
        <Button variant="outline" size="icon" className="h-8 w-8 bg-white shadow-sm hover:bg-gray-50">
          <Plus className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8 bg-white shadow-sm hover:bg-gray-50">
          <Minus className="h-4 w-4" />
        </Button>
      </div>

      {/* Map content - This would be replaced with an actual map library in a real app */}
      <div className="h-full w-full flex items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500">Loading map...</p>
          </div>
        ) : (
          <div className="relative w-full h-full">
            {/* Placeholder for the map */}
            <div className="absolute inset-0 bg-gray-200">
              {/* Map grid lines for visual effect */}
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="border border-gray-300/20"></div>
                ))}
              </div>
            </div>

            {/* Interactive price markers */}
            <div className="absolute top-1/4 left-1/3 group">
              <div className="bg-white px-2.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 cursor-pointer transform transition-transform group-hover:scale-110">
                <span className="font-medium">$490</span>
                <span className="text-xs text-gray-500">AUD</span>
              </div>
            </div>

            <div className="absolute top-1/3 left-1/2 group">
              <div className="bg-white px-2.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 cursor-pointer transform transition-transform group-hover:scale-110">
                <span className="font-medium">$540</span>
                <span className="text-xs text-gray-500">AUD</span>
              </div>
            </div>

            <div className="absolute top-1/2 left-1/4 group">
              <div className="bg-rose-500 text-white px-2.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 cursor-pointer transform transition-transform group-hover:scale-110">
                <span className="font-medium">$620</span>
                <span className="text-xs text-white/80">AUD</span>
              </div>
            </div>

            <div className="absolute bottom-1/3 right-1/3 group">
              <div className="bg-white px-2.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 cursor-pointer transform transition-transform group-hover:scale-110">
                <span className="font-medium">$600</span>
                <span className="text-xs text-gray-500">AUD</span>
              </div>
            </div>

            {/* Additional price markers */}
            <div className="absolute top-1/5 right-1/4 group">
              <div className="bg-white px-2.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 cursor-pointer transform transition-transform group-hover:scale-110">
                <span className="font-medium">$510</span>
                <span className="text-xs text-gray-500">AUD</span>
              </div>
            </div>

            <div className="absolute bottom-1/4 left-1/3 group">
              <div className="bg-white px-2.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 cursor-pointer transform transition-transform group-hover:scale-110">
                <span className="font-medium">$490</span>
                <span className="text-xs text-gray-500">AUD</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Attribution */}
      <div className="absolute bottom-4 left-4 z-10">
        <span className="text-sm text-gray-600 bg-white/80 px-2 py-1 rounded-md">Google</span>
      </div>
    </div>
  )
}


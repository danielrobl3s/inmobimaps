"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Star, Wifi } from "lucide-react"
import { Bed } from "lucide-react"
import { MapPin } from "lucide-react"
import { Heart, ChevronLeft, ChevronRight } from "lucide-react"

// Mock data for properties
const properties = [
  {
    id: 1,
    title: "Just a 5-Minute Walk from the University of Melbourne",
    type: "Entire rental unit in Carlton",
    rating: 4.7,
    reviews: 82,
    host: {
      name: "Caitlyn",
      image: "/placeholder-user.jpg",
    },
    location: {
      area: "Carlton",
      city: "VIC",
    },
    beds: 1,
    amenities: ["Wi-Fi"],
    price: 490,
    currency: "AUD",
    image: "/placeholder.svg?height=300&width=400",
    favorite: true,
  },
  {
    id: 2,
    title: "Apartment with a 5-minute Stroll to Queen Vic Market",
    type: "Entire apartment rental in Collingwood",
    rating: 4.9,
    reviews: 202,
    host: {
      name: "Fleur",
      image: "/placeholder-user.jpg",
    },
    location: {
      area: "Collingwood",
      city: "VIC",
    },
    beds: 1,
    amenities: ["Wi-Fi"],
    price: 540,
    currency: "AUD",
    image: "/placeholder.svg?height=300&width=400",
    favorite: true,
  },
  {
    id: 3,
    title: "Modern Loft Inspired by New York City Design",
    type: "Entire loft in central business district",
    rating: 4.8,
    reviews: 44,
    host: {
      name: "Marco",
      image: "/placeholder-user.jpg",
    },
    location: {
      area: "Melbourne",
      city: "VIC",
    },
    beds: 1,
    amenities: ["Wi-Fi"],
    price: 620,
    currency: "AUD",
    image: "/placeholder.svg?height=300&width=400",
    favorite: false,
  },
  {
    id: 4,
    title: "Stunning Apartment Conveniently Located Next to Transport",
    type: "Entire apartment rental in Collingwood",
    rating: 4.8,
    reviews: 12,
    host: {
      name: "Mikey",
      image: "/placeholder-user.jpg",
    },
    location: {
      area: "Melbourne",
      city: "VIC",
    },
    beds: 1,
    amenities: ["Wi-Fi"],
    price: 600,
    currency: "AUD",
    image: "/placeholder.svg?height=300&width=400",
    favorite: false,
  },
]

export default function PropertyListings() {
  const [favorites, setFavorites] = useState<Record<number, boolean>>(
    properties.reduce(
      (acc, property) => {
        acc[property.id] = property.favorite
        return acc
      },
      {} as Record<number, boolean>,
    ),
  )

  const [activeImageIndex, setActiveImageIndex] = useState<Record<number, number>>(
    properties.reduce(
      (acc, property) => {
        acc[property.id] = 0
        return acc
      },
      {} as Record<number, number>,
    ),
  )

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Mock multiple images for each property
  const getPropertyImages = (id: number) => [
    `/placeholder.svg?height=300&width=400&text=Image+${id}-1`,
    `/placeholder.svg?height=300&width=400&text=Image+${id}-2`,
    `/placeholder.svg?height=300&width=400&text=Image+${id}-3`,
  ]

  const nextImage = (id: number) => {
    const images = getPropertyImages(id)
    setActiveImageIndex((prev) => ({
      ...prev,
      [id]: (prev[id] + 1) % images.length,
    }))
  }

  const prevImage = (id: number) => {
    const images = getPropertyImages(id)
    setActiveImageIndex((prev) => ({
      ...prev,
      [id]: (prev[id] - 1 + images.length) % images.length,
    }))
  }

  return (
    <div className="p-4 md:p-6">
      <div className="space-y-6">
        {properties.map((property) => {
          const images = getPropertyImages(property.id)
          const currentImageIndex = activeImageIndex[property.id]

          return (
            <Card
              key={property.id}
              className="overflow-hidden border-gray-200 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 h-[240px] md:h-auto relative group">
                  <img
                    src={images[currentImageIndex] || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Image navigation */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          prevImage(property.id)
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          nextImage(property.id)
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>

                      {/* Image indicators */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {images.map((_, idx) => (
                          <div
                            key={idx}
                            className={`h-1.5 rounded-full ${idx === currentImageIndex ? "w-6 bg-white" : "w-1.5 bg-white/60"} transition-all duration-300`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Favorite button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      toggleFavorite(property.id)
                    }}
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full p-1.5 transition-colors shadow-sm"
                  >
                    <Heart
                      className={`h-4 w-4 ${favorites[property.id] ? "fill-rose-500 text-rose-500" : "text-gray-600"}`}
                    />
                  </button>

                  {/* Guest favorite badge */}
                  {favorites[property.id] && (
                    <Badge className="absolute top-3 left-3 bg-white text-black font-normal">Guest favorite</Badge>
                  )}
                </div>

                <div className="flex-1 p-5">
                  <CardHeader className="p-0 pb-2">
                    <CardDescription className="text-sm text-gray-500 font-medium">{property.type}</CardDescription>
                    <CardTitle className="text-lg font-semibold mt-1 hover:underline cursor-pointer">
                      {property.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-0 space-y-4">
                    <div className="flex items-center mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= Math.floor(property.rating) ? "fill-current text-black" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="ml-2 font-medium">{property.rating}</span>
                      <span className="ml-1 text-gray-500">
                        <span className="hidden sm:inline">({property.reviews} reviews)</span>
                        <span className="sm:hidden">({property.reviews})</span>
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-1">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6 border border-gray-200">
                          <AvatarImage src={property.host.image || "/placeholder.svg"} alt={property.host.name} />
                          <AvatarFallback>{property.host.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">Hosted by {property.host.name}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {property.location.area} {property.location.city}
                        </span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-0 pt-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                        <Bed className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-600">{property.beds} bed</span>
                      </div>

                      <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                        <Wifi className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-600">Wi-Fi</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xl font-bold">${property.price}</span>
                      <span className="text-gray-500 ml-1">{property.currency}</span>
                    </div>
                  </CardFooter>
                </div>
              </div>
            </Card>
          )
        })}

        <div className="flex justify-center py-6">
          <button className="px-6 py-2.5 border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-50 transition-colors">
            Show more
          </button>
        </div>
      </div>
    </div>
  )
}

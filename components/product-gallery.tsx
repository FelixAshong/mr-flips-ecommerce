"use client"

import { useState } from "react"
import Image from "next/image"

export function ProductGallery() {
  const [mainImage, setMainImage] = useState(0)

  // Sample images - in a real app, these would come from your product data
  const images = [
    "/placeholder.svg?height=600&width=500",
    "/placeholder.svg?height=600&width=500",
    "/placeholder.svg?height=600&width=500",
  ]

  return (
    <div className="grid gap-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={images[mainImage] || "/placeholder.svg"}
          alt="Product image"
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {images.map((image, i) => (
          <button
            key={i}
            className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md ${
              mainImage === i ? "ring-2 ring-primary" : "ring-1 ring-muted"
            }`}
            onClick={() => setMainImage(i)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Product thumbnail ${i + 1}`}
              fill
              className="object-cover object-center"
            />
          </button>
        ))}
      </div>
    </div>
  )
}


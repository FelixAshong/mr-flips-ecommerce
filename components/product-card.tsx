"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingBag, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/hooks/use-cart"
import { useToast } from "@/components/ui/use-toast"

interface ProductCardProps {
  name: string
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  reviewCount: number
  imageSrc: string
  href?: string
  className?: string
}

export function ProductCard({
  name,
  price,
  originalPrice,
  discount,
  rating,
  reviewCount,
  imageSrc,
  href = "#",
  className,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addItem({
      id: Math.random().toString(36).substring(7),
      name,
      price,
      image: imageSrc,
      quantity: 1,
      size: "M",
      color: "Default",
    })

    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    })
  }

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    toast({
      title: "Added to wishlist",
      description: `${name} has been added to your wishlist.`,
    })
  }

  return (
    <div
      className={cn("group relative hover-lift", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-90 transition-all duration-300">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        {discount && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
            -{discount}%
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 left-2 h-8 w-8 rounded-full bg-white/70 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleAddToWishlist}
        >
          <Heart className="h-4 w-4" />
          <span className="sr-only">Add to wishlist</span>
        </Button>

        <div
          className={`absolute bottom-0 left-0 right-0 bg-primary text-primary-foreground py-2 flex justify-center items-center transition-all duration-300 ${isHovered ? "translate-y-0" : "translate-y-full"}`}
        >
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-foreground hover:text-primary-foreground/80"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm font-medium">
            <Link href={href}>
              <span aria-hidden="true" className="absolute inset-0" />
              {name}
            </Link>
          </h3>
          <div className="mt-1 flex items-center">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3 w-3",
                    i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted-foreground",
                  )}
                />
              ))}
            <span className="ml-1 text-xs text-muted-foreground">
              {rating}/{reviewCount}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">₵{price.toLocaleString()}</p>
          {originalPrice && (
            <p className="text-xs text-muted-foreground line-through">₵{originalPrice.toLocaleString()}</p>
          )}
        </div>
      </div>
    </div>
  )
}


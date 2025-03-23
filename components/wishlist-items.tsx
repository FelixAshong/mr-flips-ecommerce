"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function WishlistItems() {
  const { toast } = useToast()

  // Sample wishlist items - in a real app, these would come from your database
  const wishlistItems = [
    {
      id: 1,
      name: "Vertical Striped Shirt",
      price: 212,
      originalPrice: 232,
      discount: 20,
      imageSrc: "/placeholder.svg?height=120&width=120",
    },
    {
      id: 2,
      name: "Black Striped T-shirt",
      price: 120,
      originalPrice: 150,
      discount: 20,
      imageSrc: "/placeholder.svg?height=120&width=120",
    },
    {
      id: 3,
      name: "Loose Fit Bermuda Shorts",
      price: 80,
      imageSrc: "/placeholder.svg?height=120&width=120",
    },
  ]

  const handleAddToCart = (itemId: number) => {
    toast({
      title: "Added to cart",
      description: "Item has been added to your cart.",
    })
  }

  const handleRemoveFromWishlist = (itemId: number) => {
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist.",
    })
  }

  return (
    <div className="space-y-6">
      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
          <p className="text-muted-foreground mb-6">Save items you like to your wishlist and they'll appear here.</p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {wishlistItems.map((item) => (
            <div key={item.id} className="flex items-center border rounded-lg p-4">
              <div className="flex-shrink-0">
                <Image
                  src={item.imageSrc || "/placeholder.svg"}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-medium">
                  <Link href={`/products/${item.id}`} className="hover:underline">
                    {item.name}
                  </Link>
                </h3>
                <div className="flex items-center mt-1">
                  <span className="font-semibold">${item.price}</span>
                  {item.originalPrice && (
                    <>
                      <span className="ml-2 text-sm text-muted-foreground line-through">${item.originalPrice}</span>
                      <span className="ml-2 text-xs text-red-600">-{item.discount}%</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleAddToCart(item.id)}>
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleRemoveFromWishlist(item.id)}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


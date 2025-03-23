"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CartSummary } from "@/components/cart-summary"
import { useCart } from "@/lib/hooks/use-cart"
import { useToast } from "@/components/ui/use-toast"

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart()
  const { toast } = useToast()
  const [promoCode, setPromoCode] = useState("")
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)

  const handleRemoveItem = (id: string) => {
    removeItem(id)
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    })
  }

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(id, newQuantity)
  }

  const handleApplyPromo = () => {
    if (!promoCode) return

    setIsApplyingPromo(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Promo code applied",
        description: "Your discount has been applied to the order.",
      })
      setIsApplyingPromo(false)
    }, 1000)
  }

  return (
    <div className="container px-4 py-8 mx-auto animate-fade-in">
      <div className="flex items-center gap-2 mb-8">
        <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4 inline mr-1" />
          Continue Shopping
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">YOUR CART</h1>

      {items.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold">Your cart is empty</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet. Browse our collection to find something you'll love.
          </p>
          <Button asChild className="mt-4">
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 hover:border-primary/50 transition-colors">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={120}
                      height={120}
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                        <p className="text-sm text-muted-foreground">Color: {item.color}</p>
                      </div>
                      <div className="flex items-center mt-2 sm:mt-0">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-md"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-md"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="font-semibold">₵{item.price.toLocaleString()}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <CartSummary
              promoCode={promoCode}
              setPromoCode={setPromoCode}
              onApplyPromo={handleApplyPromo}
              isApplyingPromo={isApplyingPromo}
            />
          </div>
        </div>
      )}
    </div>
  )
}


"use client"

import { useState } from "react"
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export function AddToCartForm() {
  const [color, setColor] = useState("olive")
  const [size, setSize] = useState("large")
  const [quantity, setQuantity] = useState(1)
  const { toast } = useToast()

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} item(s) added to your cart`,
    })
  }

  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: "Item added to your wishlist",
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium">Select Color</h3>
        <div className="flex space-x-2">
          <button
            className={`h-8 w-8 rounded-full bg-olive-800 ${color === "olive" ? "ring-2 ring-offset-2 ring-olive-800" : ""}`}
            onClick={() => setColor("olive")}
            aria-label="Olive"
          />
          <button
            className={`h-8 w-8 rounded-full bg-emerald-700 ${color === "emerald" ? "ring-2 ring-offset-2 ring-emerald-700" : ""}`}
            onClick={() => setColor("emerald")}
            aria-label="Emerald"
          />
          <button
            className={`h-8 w-8 rounded-full bg-navy-800 ${color === "navy" ? "ring-2 ring-offset-2 ring-navy-800" : ""}`}
            onClick={() => setColor("navy")}
            aria-label="Navy"
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Choose Size</h3>
        <RadioGroup value={size} onValueChange={setSize} className="flex flex-wrap gap-2">
          <div>
            <RadioGroupItem value="small" id="small" className="sr-only" />
            <Label
              htmlFor="small"
              className={`flex h-10 w-16 cursor-pointer items-center justify-center rounded-md border ${
                size === "small" ? "border-2 border-foreground" : "border-muted hover:border-foreground"
              }`}
            >
              Small
            </Label>
          </div>
          <div>
            <RadioGroupItem value="medium" id="medium" className="sr-only" />
            <Label
              htmlFor="medium"
              className={`flex h-10 w-16 cursor-pointer items-center justify-center rounded-md border ${
                size === "medium" ? "border-2 border-foreground" : "border-muted hover:border-foreground"
              }`}
            >
              Medium
            </Label>
          </div>
          <div>
            <RadioGroupItem value="large" id="large" className="sr-only" />
            <Label
              htmlFor="large"
              className={`flex h-10 w-16 cursor-pointer items-center justify-center rounded-md border ${
                size === "large" ? "border-2 border-foreground" : "border-muted hover:border-foreground"
              }`}
            >
              Large
            </Label>
          </div>
          <div>
            <RadioGroupItem value="xlarge" id="xlarge" className="sr-only" />
            <Label
              htmlFor="xlarge"
              className={`flex h-10 w-16 cursor-pointer items-center justify-center rounded-md border ${
                size === "xlarge" ? "border-2 border-foreground" : "border-muted hover:border-foreground"
              }`}
            >
              X-Large
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-none"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease quantity</span>
          </Button>
          <span className="w-10 text-center">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-none"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="flex-1" onClick={handleAddToCart}>
          <ShoppingBag className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
        <Button variant="outline" className="flex-1" onClick={handleAddToWishlist}>
          <Heart className="mr-2 h-4 w-4" />
          Add to Wishlist
        </Button>
      </div>
    </div>
  )
}


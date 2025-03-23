"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/hooks/use-cart"

interface CartSummaryProps {
  promoCode: string
  setPromoCode: (value: string) => void
  onApplyPromo: () => void
  isApplyingPromo: boolean
}

export function CartSummary({ promoCode, setPromoCode, onApplyPromo, isApplyingPromo }: CartSummaryProps) {
  const { items, subtotal } = useCart()

  // Calculate values
  const discount = promoCode ? subtotal * 0.2 : 0 // 20% discount if promo code is applied
  const deliveryFee = subtotal > 0 ? 15 : 0
  const total = subtotal - discount + deliveryFee

  return (
    <div className="rounded-lg border p-6 space-y-6 sticky top-24">
      <h2 className="text-lg font-semibold">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>₵{subtotal.toLocaleString()}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount (Promo)</span>
            <span>-₵{discount.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Delivery Fee</span>
          <span>₵{deliveryFee.toLocaleString()}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>₵{total.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <Input
          placeholder="Add promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="h-10"
        />
        <Button variant="outline" className="shrink-0" onClick={onApplyPromo} disabled={!promoCode || isApplyingPromo}>
          {isApplyingPromo ? "Applying..." : "Apply"}
        </Button>
      </div>

      <Button className="w-full hover-lift" asChild disabled={items.length === 0}>
        <Link href="/checkout">
          Go to Checkout <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>

      <div className="text-xs text-center text-muted-foreground">
        <p>We accept the following payment methods:</p>
        <div className="flex justify-center space-x-2 mt-2">
          <span className="px-2 py-1 bg-muted rounded text-xs">MTN Mobile Money</span>
          <span className="px-2 py-1 bg-muted rounded text-xs">Vodafone Cash</span>
          <span className="px-2 py-1 bg-muted rounded text-xs">Visa/Mastercard</span>
        </div>
      </div>
    </div>
  )
}


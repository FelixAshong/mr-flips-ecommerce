"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

export function CheckoutForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [paymentMethod, setPaymentMethod] = useState("card")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // This would typically process the payment and create the order
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase.",
    })

    // Redirect to order confirmation page
    setTimeout(() => {
      router.push("/dashboard")
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Contact Information</h2>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" required />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" required />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" required />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Shipping Address</h2>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="address">Street Address</Label>
            <Input id="address" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" required />
            </div>
            <div>
              <Label htmlFor="state">State / Province</Label>
              <Input id="state" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="zip">ZIP / Postal Code</Label>
              <Input id="zip" required />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input id="country" required />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Payment Method</h2>
        <Tabs defaultValue="card" onValueChange={setPaymentMethod}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="card">Credit Card</TabsTrigger>
            <TabsTrigger value="paypal">PayPal</TabsTrigger>
            <TabsTrigger value="apple">Apple Pay</TabsTrigger>
          </TabsList>
          <TabsContent value="card" className="space-y-4 pt-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" required />
              </div>
              <div>
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" required />
              </div>
            </div>
            <div>
              <Label htmlFor="nameOnCard">Name on Card</Label>
              <Input id="nameOnCard" required />
            </div>
          </TabsContent>
          <TabsContent value="paypal" className="pt-4">
            <div className="rounded-lg border p-4 text-center">
              <p className="mb-4">You will be redirected to PayPal to complete your purchase securely.</p>
              <Button type="button" className="w-full">
                Continue with PayPal
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="apple" className="pt-4">
            <div className="rounded-lg border p-4 text-center">
              <p className="mb-4">You will be redirected to Apple Pay to complete your purchase securely.</p>
              <Button type="button" className="w-full">
                Continue with Apple Pay
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Button type="submit" className="w-full">
        <CreditCard className="mr-2 h-4 w-4" />
        Place Order
      </Button>
    </form>
  )
}


"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Loader2, Phone, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/lib/hooks/use-cart"
import { useAuth } from "@/lib/hooks/use-auth"

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { items, subtotal, clearCart } = useCart()
  const { user, isAuthenticated } = useAuth()

  const [paymentMethod, setPaymentMethod] = useState("mtn")
  const [isProcessing, setIsProcessing] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || "")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [paymentStep, setPaymentStep] = useState<"details" | "confirm" | "processing">("details")

  // Credit card state
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: "",
  })

  // Calculate values
  const deliveryFee = 15
  const total = subtotal + deliveryFee

  const [shippingDetails, setShippingDetails] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    region: "",
    notes: "",
  })

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push("/signin?callbackUrl=/checkout")
    }

    // Redirect to cart if cart is empty
    if (items.length === 0) {
      router.push("/cart")
    }

    // Pre-fill user data if available
    if (user) {
      setShippingDetails((prev) => ({
        ...prev,
        firstName: user.firstName || prev.firstName,
        lastName: user.lastName || prev.lastName,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
      }))
      setPhoneNumber(user.phone || "")
    }
  }, [isAuthenticated, items.length, router, user])

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setShippingDetails((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardDetails((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validate shipping details
    if (!shippingDetails.firstName) {
      newErrors.firstName = "First name is required"
    }

    if (!shippingDetails.lastName) {
      newErrors.lastName = "Last name is required"
    }

    if (!shippingDetails.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(shippingDetails.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!shippingDetails.phone) {
      newErrors.phone = "Phone number is required"
    }

    if (!shippingDetails.address) {
      newErrors.address = "Address is required"
    }

    if (!shippingDetails.city) {
      newErrors.city = "City is required"
    }

    if (!shippingDetails.region) {
      newErrors.region = "Region is required"
    }

    // Validate payment details
    if (paymentMethod === "mtn" || paymentMethod === "vodafone") {
      if (!phoneNumber) {
        newErrors.paymentPhone = "Phone number is required for mobile money payment"
      }
    } else if (paymentMethod === "card") {
      if (!cardDetails.cardNumber) {
        newErrors.cardNumber = "Card number is required"
      } else if (!/^\d{16}$/.test(cardDetails.cardNumber.replace(/\s/g, ""))) {
        newErrors.cardNumber = "Card number must be 16 digits"
      }

      if (!cardDetails.cardName) {
        newErrors.cardName = "Name on card is required"
      }

      if (!cardDetails.expiry) {
        newErrors.expiry = "Expiry date is required"
      } else if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
        newErrors.expiry = "Expiry date must be in MM/YY format"
      }

      if (!cardDetails.cvc) {
        newErrors.cvc = "CVC is required"
      } else if (!/^\d{3,4}$/.test(cardDetails.cvc)) {
        newErrors.cvc = "CVC must be 3 or 4 digits"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setPaymentStep("confirm")
  }

  const handleConfirmPayment = async () => {
    setPaymentStep("processing")
    setIsProcessing(true)

    try {
      // Prepare payment data
      const paymentData = {
        items,
        shippingDetails,
        paymentMethod,
        phoneNumber: paymentMethod === "mtn" || paymentMethod === "vodafone" ? phoneNumber : undefined,
        cardDetails: paymentMethod === "card" ? cardDetails : undefined,
        total,
      }

      // Send payment request to API
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to process order")
      }

      const data = await response.json()

      if (data.success) {
        // Clear cart after successful order
        clearCart()

        toast({
          title: "Order placed successfully!",
          description: `Your order #${data.orderId} has been placed. You will receive a confirmation via SMS shortly.`,
        })

        // Redirect to order confirmation page
        router.push(`/order-confirmation?orderId=${data.orderId}`)
      } else {
        throw new Error(data.message || "Failed to process order")
      }
    } catch (error) {
      toast({
        title: "Checkout failed",
        description:
          error instanceof Error ? error.message : "There was an error processing your order. Please try again.",
        variant: "destructive",
      })
      setPaymentStep("details")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCancelConfirmation = () => {
    setPaymentStep("details")
  }

  if (items.length === 0) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <motion.h1
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Checkout
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {paymentStep === "details" && (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Contact Information</h2>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={shippingDetails.firstName}
                        onChange={handleShippingChange}
                        className={errors.firstName ? "border-red-500" : ""}
                        required
                      />
                      {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={shippingDetails.lastName}
                        onChange={handleShippingChange}
                        className={errors.lastName ? "border-red-500" : ""}
                        required
                      />
                      {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={shippingDetails.email}
                      onChange={handleShippingChange}
                      className={errors.email ? "border-red-500" : ""}
                      required
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={shippingDetails.phone}
                      onChange={handleShippingChange}
                      className={errors.phone ? "border-red-500" : ""}
                      required
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Shipping Address</h2>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={shippingDetails.address}
                      onChange={handleShippingChange}
                      className={errors.address ? "border-red-500" : ""}
                      required
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={shippingDetails.city}
                        onChange={handleShippingChange}
                        className={errors.city ? "border-red-500" : ""}
                        required
                      />
                      {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="region">Region</Label>
                      <Input
                        id="region"
                        name="region"
                        value={shippingDetails.region}
                        onChange={handleShippingChange}
                        className={errors.region ? "border-red-500" : ""}
                        required
                      />
                      {errors.region && <p className="text-red-500 text-sm">{errors.region}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Additional information for delivery (e.g., landmarks, gate code)"
                      value={shippingDetails.notes}
                      onChange={handleShippingChange}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Payment Method</h2>
                <Tabs defaultValue="mtn" onValueChange={setPaymentMethod}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="mtn" className="flex items-center gap-2">
                      <Image
                        src="https://v0.blob.com/Tz9Iy.jpeg"
                        alt="MTN Mobile Money"
                        width={20}
                        height={20}
                        className="rounded-sm"
                      />
                      MTN Mobile Money
                    </TabsTrigger>
                    <TabsTrigger value="vodafone" className="flex items-center gap-2">
                      <Image
                        src="https://v0.blob.com/Tz9Iy.jpeg"
                        alt="Vodafone Cash"
                        width={20}
                        height={20}
                        className="rounded-sm"
                      />
                      Vodafone Cash
                    </TabsTrigger>
                    <TabsTrigger value="card" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Credit Card
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="mtn" className="space-y-4 pt-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-yellow-400 flex items-center justify-center">
                          <Phone className="h-5 w-5 text-yellow-800" />
                        </div>
                        <div>
                          <h3 className="font-medium">MTN Mobile Money</h3>
                          <p className="text-sm text-muted-foreground">Pay with your MTN Mobile Money account</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="mtnNumber">MTN Mobile Money Number</Label>
                        <Input
                          id="mtnNumber"
                          placeholder="e.g., 024 123 4567"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className={errors.paymentPhone ? "border-red-500" : ""}
                        />
                        {errors.paymentPhone && <p className="text-red-500 text-sm">{errors.paymentPhone}</p>}
                        <p className="text-xs text-muted-foreground mt-2">
                          You will receive a prompt on your phone to confirm payment.
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="vodafone" className="space-y-4 pt-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-red-500 flex items-center justify-center">
                          <Phone className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium">Vodafone Cash</h3>
                          <p className="text-sm text-muted-foreground">Pay with your Vodafone Cash account</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="vodafoneNumber">Vodafone Cash Number</Label>
                        <Input
                          id="vodafoneNumber"
                          placeholder="e.g., 050 123 4567"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className={errors.paymentPhone ? "border-red-500" : ""}
                        />
                        {errors.paymentPhone && <p className="text-red-500 text-sm">{errors.paymentPhone}</p>}
                        <p className="text-xs text-muted-foreground mt-2">
                          You will receive a prompt on your phone to confirm payment.
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="card" className="space-y-4 pt-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium">Credit/Debit Card</h3>
                          <p className="text-sm text-muted-foreground">Pay with Visa, Mastercard, or other cards</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardDetails.cardNumber}
                            onChange={handleCardDetailsChange}
                            className={errors.cardNumber ? "border-red-500" : ""}
                          />
                          {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input
                            id="cardName"
                            name="cardName"
                            placeholder="John Doe"
                            value={cardDetails.cardName}
                            onChange={handleCardDetailsChange}
                            className={errors.cardName ? "border-red-500" : ""}
                          />
                          {errors.cardName && <p className="text-red-500 text-sm">{errors.cardName}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input
                              id="expiry"
                              name="expiry"
                              placeholder="MM/YY"
                              value={cardDetails.expiry}
                              onChange={handleCardDetailsChange}
                              className={errors.expiry ? "border-red-500" : ""}
                            />
                            {errors.expiry && <p className="text-red-500 text-sm">{errors.expiry}</p>}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input
                              id="cvc"
                              name="cvc"
                              placeholder="123"
                              value={cardDetails.cvc}
                              onChange={handleCardDetailsChange}
                              className={errors.cvc ? "border-red-500" : ""}
                            />
                            {errors.cvc && <p className="text-red-500 text-sm">{errors.cvc}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <Button type="submit" className="w-full">
                Continue to Payment
              </Button>
            </form>
          )}

          {paymentStep === "confirm" && (
            <div className="space-y-6">
              <div className="rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4">Confirm Your Order</h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Shipping To:</h3>
                    <p className="font-medium">
                      {shippingDetails.firstName} {shippingDetails.lastName}
                    </p>
                    <p>{shippingDetails.address}</p>
                    <p>
                      {shippingDetails.city}, {shippingDetails.region}
                    </p>
                    <p>{shippingDetails.phone}</p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Payment Method:</h3>
                    {paymentMethod === "mtn" && (
                      <div className="flex items-center gap-2">
                        <Image
                          src="https://v0.blob.com/Tz9Iy.jpeg"
                          alt="MTN Mobile Money"
                          width={20}
                          height={20}
                          className="rounded-sm"
                        />
                        <span>MTN Mobile Money ({phoneNumber})</span>
                      </div>
                    )}

                    {paymentMethod === "vodafone" && (
                      <div className="flex items-center gap-2">
                        <Image
                          src="https://v0.blob.com/Tz9Iy.jpeg"
                          alt="Vodafone Cash"
                          width={20}
                          height={20}
                          className="rounded-sm"
                        />
                        <span>Vodafone Cash ({phoneNumber})</span>
                      </div>
                    )}

                    {paymentMethod === "card" && (
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span>Card ending in {cardDetails.cardNumber.slice(-4)}</span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Order Summary:</h3>
                    <div className="flex justify-between mt-2">
                      <span>Subtotal</span>
                      <span>₵{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>₵{deliveryFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold mt-2">
                      <span>Total</span>
                      <span>₵{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button onClick={handleConfirmPayment} className="w-full">
                  Confirm and Pay ₵{total.toLocaleString()}
                </Button>
                <Button variant="outline" onClick={handleCancelConfirmation}>
                  Back to Details
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                By confirming your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          )}

          {paymentStep === "processing" && (
            <div className="rounded-lg border p-6 text-center">
              <div className="flex justify-center mb-6">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Processing Your Payment</h2>
              <p className="text-muted-foreground mb-4">
                Please do not close this window while we process your payment.
              </p>

              {paymentMethod === "mtn" || paymentMethod === "vodafone" ? (
                <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800 text-sm">
                  <p className="font-medium mb-2">Important:</p>
                  <p>Check your mobile phone for a payment authorization prompt from your mobile money provider.</p>
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-blue-800 text-sm">
                  <p className="font-medium mb-2">Important:</p>
                  <p>Your card is being processed. Please wait while we complete the transaction.</p>
                </div>
              )}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="rounded-lg border p-6 space-y-6 sticky top-24">
            <h2 className="text-xl font-semibold">Order Summary</h2>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">
                        {item.quantity}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Size: {item.size}, Color: {item.color}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">₵{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₵{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>₵{deliveryFee.toLocaleString()}</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₵{total.toLocaleString()}</span>
            </div>

            <div className="text-xs text-center text-muted-foreground">
              <p>By placing your order, you agree to our</p>
              <div className="flex justify-center gap-1">
                <a href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </a>
                <span>&</span>
                <a href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}


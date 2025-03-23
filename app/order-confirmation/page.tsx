"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { CheckCircle2, ArrowRight, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [orderDetails, setOrderDetails] = useState({
    id: orderId || "GH-123456",
    date: new Date().toLocaleDateString(),
    total: "₵513.70",
    paymentMethod: "MTN Mobile Money",
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    items: [
      {
        id: 1,
        name: "Kente Trim T-shirt",
        price: "₵120",
        quantity: 1,
        image: "https://v0.blob.com/Tz9Iy.jpeg",
      },
      {
        id: 2,
        name: "Ankara Print Shirt",
        price: "₵180",
        quantity: 1,
        image: "https://v0.blob.com/Tz9Iy.jpeg",
      },
      {
        id: 3,
        name: "Slim Fit Jeans",
        price: "₵240",
        quantity: 1,
        image: "https://v0.blob.com/Tz9Iy.jpeg",
      },
    ],
  })

  // In a real app, you would fetch the order details from the API
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      // This would be replaced with actual API call
    }, 500)

    return () => clearTimeout(timer)
  }, [orderId])

  return (
    <div className="container max-w-3xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Thank you for your purchase. Your order has been confirmed and will be shipped soon.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-muted/30 rounded-lg p-6 mb-8"
      >
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <div>
            <h2 className="text-sm font-medium text-muted-foreground">ORDER NUMBER</h2>
            <p className="font-semibold">{orderDetails.id}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-muted-foreground">DATE PLACED</h2>
            <p className="font-semibold">{orderDetails.date}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-muted-foreground">TOTAL AMOUNT</h2>
            <p className="font-semibold">{orderDetails.total}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-muted-foreground">PAYMENT METHOD</h2>
            <p className="font-semibold">{orderDetails.paymentMethod}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm bg-green-100 text-green-800 p-3 rounded-md">
          <Truck className="h-4 w-4" />
          <span>Estimated delivery by {orderDetails.estimatedDelivery}</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="rounded-lg border p-6 mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        <div className="space-y-4 mb-6">
          {orderDetails.items.map((item) => (
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
                  <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                </div>
              </div>
              <p className="font-medium">{item.price}</p>
            </div>
          ))}
        </div>

        <Separator className="mb-4" />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>{orderDetails.total}</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button asChild variant="outline">
          <Link href="/dashboard">View Order History</Link>
        </Button>
        <Button asChild>
          <Link href="/products">
            Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}


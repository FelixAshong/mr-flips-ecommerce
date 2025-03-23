"use client"

import type React from "react"

import { useState } from "react"
import { Phone, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

interface MobileMoneyPaymentProps {
  provider: "mtn" | "vodafone"
  amount: number
  onSuccess: () => void
  onError: (error: string) => void
}

export function MobileMoneyPayment({ provider, amount, onSuccess, onError }: MobileMoneyPaymentProps) {
  const { toast } = useToast()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [step, setStep] = useState<"input" | "confirm" | "processing">("input")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!phoneNumber) {
      toast({
        title: "Phone number required",
        description: "Please enter your mobile money number",
        variant: "destructive",
      })
      return
    }

    setStep("confirm")
  }

  const handleConfirm = async () => {
    setIsProcessing(true)
    setStep("processing")

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // In a real app, this would make an API call to process the payment

      toast({
        title: "Payment successful",
        description: "Your payment has been processed successfully",
      })

      onSuccess()
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })

      onError("Payment processing failed")
      setStep("input")
    } finally {
      setIsProcessing(false)
    }
  }

  const providerName = provider === "mtn" ? "MTN Mobile Money" : "Vodafone Cash"
  const providerColor = provider === "mtn" ? "bg-yellow-400" : "bg-red-500"
  const providerTextColor = provider === "mtn" ? "text-yellow-800" : "text-white"

  return (
    <div className="rounded-lg border p-4">
      {step === "input" && (
        <>
          <div className="flex items-center gap-3 mb-4">
            <div className={`h-10 w-10 rounded-full ${providerColor} flex items-center justify-center`}>
              <Phone className={`h-5 w-5 ${providerTextColor}`} />
            </div>
            <div>
              <h3 className="font-medium">{providerName}</h3>
              <p className="text-sm text-muted-foreground">Pay with your {providerName} account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">{providerName} Number</Label>
              <Input
                id="phoneNumber"
                placeholder={provider === "mtn" ? "e.g., 024 123 4567" : "e.g., 050 123 4567"}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-2">
                You will receive a prompt on your phone to confirm payment.
              </p>
            </div>

            <Button type="submit" className="w-full">
              Continue to Payment
            </Button>
          </form>
        </>
      )}

      {step === "confirm" && (
        <div className="space-y-4">
          <div className="text-center p-4 border rounded-lg bg-muted/30">
            <h3 className="font-medium mb-2">Confirm Payment</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You are about to pay <span className="font-bold">₵{amount.toLocaleString()}</span> using {providerName}.
            </p>
            <p className="text-sm">
              Phone Number: <span className="font-medium">{phoneNumber}</span>
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Button onClick={handleConfirm}>Confirm Payment</Button>
            <Button variant="outline" onClick={() => setStep("input")}>
              Edit Details
            </Button>
          </div>
        </div>
      )}

      {step === "processing" && (
        <div className="text-center p-6">
          <div className="flex justify-center mb-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
          <h3 className="font-medium mb-2">Processing Payment</h3>
          <p className="text-sm text-muted-foreground">
            Please check your phone for a payment confirmation prompt from {providerName}.
          </p>
        </div>
      )}
    </div>
  )
}


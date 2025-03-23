"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Subscribed!",
        description: "You've successfully subscribed to our newsletter.",
      })

      setEmail("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="bg-primary text-primary-foreground py-12">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="max-w-md">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">STAY UP TO DATE ABOUT OUR LATEST OFFERS</h2>
            <p className="text-primary-foreground/80">
              Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, and special
              events in Ghana.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/50" />
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-primary-foreground text-foreground border-primary/20 focus-visible:ring-secondary"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
              disabled={isLoading}
            >
              {isLoading ? "Subscribing..." : "Subscribe to Newsletter"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}


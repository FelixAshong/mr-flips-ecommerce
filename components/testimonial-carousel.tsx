"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Sample testimonials - in a real app, these would come from your database
  const testimonials = [
    {
      id: 1,
      name: "Kwame Mensah",
      location: "Accra",
      avatar: "https://v0.blob.com/Tz9Iy.jpeg",
      rating: 5,
      text: "The quality of clothing at Mr. Flip's is exceptional! I ordered a traditional shirt with modern Kente accents and received compliments everywhere I went. The fit was perfect and delivery to East Legon was faster than expected.",
    },
    {
      id: 2,
      name: "Ama Darko",
      location: "Kumasi",
      avatar: "https://v0.blob.com/Tz9Iy.jpeg",
      rating: 5,
      text: "I discovered Mr. Flip's during my visit to Accra and was impressed by their blend of traditional and contemporary styles. Their online store made it easy to continue shopping after returning to Kumasi. The Ankara print dress I purchased is now my favorite!",
    },
    {
      id: 3,
      name: "Kofi Boateng",
      location: "Takoradi",
      avatar: "https://v0.blob.com/Tz9Iy.jpeg",
      rating: 5,
      text: "As someone who appreciates both comfort and style, Mr. Flip's has become my go-to fashion destination. Their customer service team was extremely helpful when I needed to exchange a size, and the process was seamless even though I'm in Takoradi.",
    },
  ]

  // Auto-advance the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextSlide()
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [activeIndex, isAnimating])

  const nextSlide = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)

    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  const prevSlide = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)

    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <div className="max-w-2xl mx-auto text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-primary mb-2">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex justify-center mb-4">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                </div>
                <p className="text-lg mb-6 italic">"{testimonial.text}"</p>
                <p className="font-medium">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}, Ghana</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
        onClick={prevSlide}
        disabled={isAnimating}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
        onClick={nextSlide}
        disabled={isAnimating}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next</span>
      </Button>

      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${i === activeIndex ? "bg-primary w-6" : "bg-gray-300"}`}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true)
                setActiveIndex(i)
                setTimeout(() => {
                  setIsAnimating(false)
                }, 500)
              }
            }}
            disabled={isAnimating}
          >
            <span className="sr-only">Testimonial {i + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}


"use client"

import type React from "react"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export function ProductReviews() {
  const [reviewText, setReviewText] = useState("")
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const { toast } = useToast()

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting your review",
        variant: "destructive",
      })
      return
    }

    if (!reviewText.trim()) {
      toast({
        title: "Review text required",
        description: "Please write a review before submitting",
        variant: "destructive",
      })
      return
    }

    // This would typically send the review to your backend
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    })

    setReviewText("")
    setRating(0)
  }

  // Sample reviews - in a real app, these would come from your database
  const reviews = [
    {
      id: 1,
      author: "Samantha D.",
      rating: 5,
      date: "August 14, 2023",
      text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. It's a fellow designer, I appreciate the attention to detail, it's become my favorite go-to shirt.",
      verified: true,
    },
    {
      id: 2,
      author: "Alex M.",
      rating: 4,
      date: "August 15, 2023",
      text: "This t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
      verified: true,
    },
    {
      id: 3,
      author: "Ethan R.",
      rating: 3,
      date: "August 16, 2023",
      text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
      verified: true,
    },
    {
      id: 4,
      author: "Olivia P.",
      rating: 5,
      date: "August 17, 2023",
      text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
      verified: true,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">All Reviews ({reviews.length})</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select className="text-sm border rounded p-1">
            <option>Latest</option>
            <option>Highest Rating</option>
            <option>Lowest Rating</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">{review.author}</span>
                {review.verified && (
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                    ✓
                  </span>
                )}
              </div>
              <button className="text-muted-foreground">•••</button>
            </div>
            <div className="flex items-center mb-2">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"
                    }`}
                  />
                ))}
            </div>
            <p className="text-sm mb-2">{review.text}</p>
            <p className="text-xs text-muted-foreground">Posted on {review.date}</p>
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full">
        Load More Reviews
      </Button>

      <div className="border-t pt-8">
        <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Your Rating</label>
            <div className="flex gap-1">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(i + 1)}
                    onMouseEnter={() => setHoveredRating(i + 1)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        i < (hoveredRating || rating) ? "fill-primary text-primary" : "fill-muted text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
            </div>
          </div>
          <div>
            <label htmlFor="review" className="block text-sm font-medium mb-2">
              Your Review
            </label>
            <Textarea
              id="review"
              placeholder="Write your thoughts about this product..."
              rows={4}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </div>
          <Button type="submit">Submit Review</Button>
        </form>
      </div>
    </div>
  )
}


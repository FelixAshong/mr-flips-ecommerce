import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FeaturedCollection() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/10">
      <div className="container px-4 mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
              <Image
                src="https://v0.blob.com/Tz9Iy.jpeg"
                alt="Special Occasion Gift Packaging"
                width={600}
                height={700}
                className="rounded-lg object-cover shadow-xl relative z-10"
              />
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-6">
            <div className="inline-block px-4 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-2">
              Featured Collection
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Special Occasion Gift Packaging</h2>
            <p className="text-muted-foreground">
              Make every moment memorable with our exclusive gift packaging services. Whether it's Valentine's Day,
              birthdays, anniversaries, or any special occasion, our custom packaging adds that perfect touch to your
              thoughtful gifts.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                <span>Elegant gift wrapping options</span>
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                <span>Personalized greeting cards</span>
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                <span>Special occasion themed packaging</span>
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                <span>Corporate and bulk gift solutions</span>
              </li>
            </ul>
            <Button asChild className="mt-4 hover-lift">
              <Link href="/collections/gift-packaging">
                Explore Gift Packaging <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}


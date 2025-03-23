import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { CategoryCard } from "@/components/category-card"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { BrandBar } from "@/components/brand-bar"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { FeaturedCollection } from "@/components/featured-collection"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-secondary/20 overflow-hidden">
        <div className="absolute inset-0 kente-pattern opacity-10"></div>
        <div className="container px-4 py-16 md:py-24 mx-auto grid md:grid-cols-2 gap-8 items-center relative">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block px-4 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-2">
              Ghana's Premier Fashion Destination
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              FIND CLOTHES THAT MATCH YOUR STYLE
            </h1>
            <p className="text-muted-foreground text-lg">
              Browse through our collection of fashionable clothing, designed to bring out your individuality and cater
              to your sense of style.
            </p>
            <Button size="lg" className="mt-4 hover-lift">
              Shop Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <div className="flex flex-wrap gap-8 pt-8 stagger-animation">
              <div className="animate-slide-up opacity-0">
                <p className="text-3xl font-bold">200+</p>
                <p className="text-muted-foreground">International Brands</p>
              </div>
              <div className="animate-slide-up opacity-0">
                <p className="text-3xl font-bold">2,000+</p>
                <p className="text-muted-foreground">High-Quality Products</p>
              </div>
              <div className="animate-slide-up opacity-0">
                <p className="text-3xl font-bold">30,000+</p>
                <p className="text-muted-foreground">Happy Customers</p>
              </div>
            </div>
          </div>
          <div className="relative animate-scale-in opacity-0">
            <Image
              src="https://v0.blob.com/Tz9Iy.jpeg"
              alt="Fashion models wearing Mr. Flip's clothing"
              width={600}
              height={700}
              className="rounded-lg object-cover shadow-xl"
            />
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-secondary rotate-45"></div>
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-primary rotate-45"></div>
          </div>
        </div>
      </section>

      {/* Brand Bar */}
      <BrandBar />

      {/* New Arrivals */}
      <section className="container px-4 py-16 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">NEW ARRIVALS</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Discover our latest collection of stylish apparel and accessories, fresh from Ghana's top designers
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 stagger-animation">
          <ProductCard
            name="Kente Trim T-shirt"
            price={120}
            rating={4.5}
            reviewCount={45}
            imageSrc="https://v0.blob.com/Tz9Iy.jpeg"
            className="animate-slide-up opacity-0"
          />
          <ProductCard
            name="Slim Fit Jeans"
            price={240}
            originalPrice={260}
            discount={20}
            rating={4.3}
            reviewCount={32}
            imageSrc="https://v0.blob.com/Tz9Iy.jpeg"
            className="animate-slide-up opacity-0"
          />
          <ProductCard
            name="Ankara Print Shirt"
            price={180}
            rating={4.6}
            reviewCount={40}
            imageSrc="https://v0.blob.com/Tz9Iy.jpeg"
            className="animate-slide-up opacity-0"
          />
          <ProductCard
            name="Adinkra Symbol T-shirt"
            price={130}
            originalPrice={160}
            discount={30}
            rating={4.2}
            reviewCount={38}
            imageSrc="https://v0.blob.com/Tz9Iy.jpeg"
            className="animate-slide-up opacity-0"
          />
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/products">
            <Button variant="outline" className="hover-lift">
              View All
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Collection */}
      <FeaturedCollection />

      {/* Top Selling */}
      <section className="container px-4 py-16 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">TOP SELLING</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Our most popular items loved by customers across Ghana and beyond
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 stagger-animation">
          <ProductCard
            name="Vertical Striped Shirt"
            price={212}
            originalPrice={232}
            discount={20}
            rating={4.8}
            reviewCount={60}
            imageSrc="https://v0.blob.com/Tz9Iy.jpeg"
            className="animate-slide-up opacity-0"
          />
          <ProductCard
            name="Graphic Print T-shirt"
            price={145}
            rating={4.0}
            reviewCount={42}
            imageSrc="https://v0.blob.com/Tz9Iy.jpeg"
            className="animate-slide-up opacity-0"
          />
          <ProductCard
            name="Bermuda Shorts"
            price={80}
            rating={3.9}
            reviewCount={30}
            imageSrc="https://v0.blob.com/Tz9Iy.jpeg"
            className="animate-slide-up opacity-0"
          />
          <ProductCard
            name="Skinny Jeans"
            price={210}
            rating={4.4}
            reviewCount={50}
            imageSrc="https://v0.blob.com/Tz9Iy.jpeg"
            className="animate-slide-up opacity-0"
          />
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/products">
            <Button variant="outline" className="hover-lift">
              View All
            </Button>
          </Link>
        </div>
      </section>

      {/* Browse by Style */}
      <section className="container px-4 py-16 mx-auto bg-muted/30 rounded-lg kente-pattern">
        <h2 className="text-3xl font-bold text-center mb-4">BROWSE BY DRESS STYLE</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Find the perfect outfit for any occasion, from casual everyday wear to special events
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 stagger-animation">
          <CategoryCard
            title="Casual"
            imageSrc="https://v0.blob.com/Tz9Iy.jpeg"
            href="/category/casual"
            className="animate-slide-up opacity-0"
          />
          <CategoryCard
            title="Formal"
            imageSrc="https://v0.blob.com/Tz9Iy.jpeg"
            href="/category/formal"
            className="animate-slide-up opacity-0"
          />
          <CategoryCard
            title="Traditional"
            imageSrc="https://v0.blob.com/Tz9Iy.jpeg"
            href="/category/traditional"
            className="animate-slide-up opacity-0"
          />
          <CategoryCard
            title="Active Wear"
            imageSrc="https://v0.blob.com/Tz9Iy.jpeg"
            href="/category/active"
            className="animate-slide-up opacity-0"
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="container px-4 py-16 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">OUR HAPPY CUSTOMERS</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          See what our customers from Accra, Kumasi, and across Ghana have to say about their Mr. Flip's experience
        </p>
        <TestimonialCarousel />
      </section>

      {/* Newsletter */}
      <NewsletterSignup />
    </div>
  )
}


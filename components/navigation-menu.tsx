"use client"

import Link from "next/link"

export function NavigationMenu() {
  return (
    <div className="hidden md:flex items-center space-x-6">
      <Link href="/products" className="text-sm font-medium hover:text-primary">
        Shop
      </Link>
      <Link href="/products?category=men" className="text-sm font-medium hover:text-primary">
        Men
      </Link>
      <Link href="/products?category=women" className="text-sm font-medium hover:text-primary">
        Women
      </Link>
      <Link href="/products?category=sports" className="text-sm font-medium hover:text-primary">
        Sports
      </Link>
      <Link href="/products?category=footwear" className="text-sm font-medium hover:text-primary">
        Footwear
      </Link>
      <Link href="/products?category=slides" className="text-sm font-medium hover:text-primary">
        Slides
      </Link>
      <Link href="/products?category=packaging" className="text-sm font-medium hover:text-primary">
        Gift Packaging
      </Link>
    </div>
  )
}


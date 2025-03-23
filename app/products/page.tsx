"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ProductFilters } from "@/components/product-filters"
import { ProductGrid } from "@/components/product-grid"
import { ProductSort } from "@/components/product-sort"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const category = searchParams.get("category")
  const sort = searchParams.get("sort") || "featured"

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Build query string from search params
        const queryParams = new URLSearchParams()

        if (category) {
          queryParams.set("category", category)
        }

        if (sort) {
          queryParams.set("sort", sort)
        }

        // Add other filters from search params
        for (const [key, value] of Array.from(searchParams.entries())) {
          if (!["category", "sort"].includes(key)) {
            queryParams.set(key, value)
          }
        }

        const response = await fetch(`/api/products?${queryParams.toString()}`)

        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }

        const data = await response.json()
        setProducts(data)
      } catch (err) {
        console.error("Error fetching products:", err)
        setError("Failed to load products. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [searchParams, category, sort])

  const categoryTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) : "All Products"

  return (
    <div className="container px-4 py-8 mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 shrink-0">
          <ProductFilters />
        </div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{categoryTitle}</h1>
              <p className="text-muted-foreground">Browse our collection of {category || "apparel and accessories"}</p>
            </div>
            <ProductSort />
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-[300px] w-full rounded-lg" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
              <button className="mt-4 text-primary hover:underline" onClick={() => window.location.reload()}>
                Try Again
              </button>
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>
    </div>
  )
}


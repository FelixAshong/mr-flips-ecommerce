"use client"

import { useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { ArrowUpDown, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ProductSort() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [sort, setSort] = useState(searchParams.get("sort") || "featured")

  const handleSortChange = (value: string) => {
    setSort(value)

    const params = new URLSearchParams(searchParams.toString())
    params.set("sort", value)

    router.push(`${pathname}?${params.toString()}`)
  }

  const getSortLabel = (value: string) => {
    switch (value) {
      case "featured":
        return "Featured"
      case "newest":
        return "Newest"
      case "price-asc":
        return "Price: Low to High"
      case "price-desc":
        return "Price: High to Low"
      case "rating":
        return "Customer Rating"
      default:
        return "Featured"
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Sort by: {getSortLabel(sort)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuRadioGroup value={sort} onValueChange={handleSortChange}>
          <DropdownMenuRadioItem value="featured">
            <Check className={`mr-2 h-4 w-4 ${sort === "featured" ? "opacity-100" : "opacity-0"}`} />
            Featured
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="newest">
            <Check className={`mr-2 h-4 w-4 ${sort === "newest" ? "opacity-100" : "opacity-0"}`} />
            Newest
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="price-asc">
            <Check className={`mr-2 h-4 w-4 ${sort === "price-asc" ? "opacity-100" : "opacity-0"}`} />
            Price: Low to High
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="price-desc">
            <Check className={`mr-2 h-4 w-4 ${sort === "price-desc" ? "opacity-100" : "opacity-0"}`} />
            Price: High to Low
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="rating">
            <Check className={`mr-2 h-4 w-4 ${sort === "rating" ? "opacity-100" : "opacity-0"}`} />
            Customer Rating
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


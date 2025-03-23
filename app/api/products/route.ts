import { NextResponse } from "next/server"
import { products } from "@/lib/data/products"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const color = searchParams.get("color")
  const size = searchParams.get("size")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")
  const sort = searchParams.get("sort")
  const query = searchParams.get("q")

  let filteredProducts = [...products]

  // Apply search query
  if (query) {
    const searchTerms = query.toLowerCase().split(" ")
    filteredProducts = filteredProducts.filter((product) => {
      return searchTerms.some(
        (term) =>
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term),
      )
    })
  }

  // Apply category filter
  if (category) {
    filteredProducts = filteredProducts.filter((p) => p.category === category)
  }

  // Apply color filter
  if (color) {
    filteredProducts = filteredProducts.filter((p) => p.colors.includes(color))
  }

  // Apply size filter
  if (size) {
    filteredProducts = filteredProducts.filter((p) => p.sizes.includes(size))
  }

  // Apply price range filter
  if (minPrice) {
    filteredProducts = filteredProducts.filter((p) => p.price >= Number(minPrice))
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter((p) => p.price <= Number(maxPrice))
  }

  // Apply sorting
  if (sort) {
    switch (sort) {
      case "price-asc":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "featured":
      default:
        filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }
  }

  // Simulate network delay for demo purposes
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json(filteredProducts)
}

export async function POST(request: Request) {
  try {
    const product = await request.json()

    // In a real app, this would validate and save the product to a database
    // For demo purposes, we'll just return the product with an ID

    return NextResponse.json(
      {
        ...product,
        id: Math.floor(Math.random() * 1000),
        createdAt: new Date().toISOString(),
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}


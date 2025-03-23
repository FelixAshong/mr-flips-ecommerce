import { ProductCard } from "@/components/product-card"

export function RelatedProducts() {
  // Sample related products - in a real app, these would come from your database
  const relatedProducts = [
    {
      id: 1,
      name: "Polo with Contrast Trims",
      price: 212,
      originalPrice: 242,
      discount: 20,
      rating: 4.0,
      reviewCount: 40,
      imageSrc: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 2,
      name: "Gradient Graphic T-shirt",
      price: 145,
      rating: 3.5,
      reviewCount: 35,
      imageSrc: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 3,
      name: "Polo with Tipping Details",
      price: 180,
      rating: 4.5,
      reviewCount: 45,
      imageSrc: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 4,
      name: "Black Striped T-shirt",
      price: 120,
      originalPrice: 160,
      discount: 30,
      rating: 5.0,
      reviewCount: 40,
      imageSrc: "/placeholder.svg?height=300&width=300",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {relatedProducts.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          originalPrice={product.originalPrice}
          discount={product.discount}
          rating={product.rating}
          reviewCount={product.reviewCount}
          imageSrc={product.imageSrc}
          href={`/products/${product.id}`}
        />
      ))}
    </div>
  )
}


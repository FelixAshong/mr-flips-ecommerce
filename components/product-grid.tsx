import { ProductCard } from "@/components/product-card"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  reviewCount: number
  images: string[]
}

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 stagger-animation">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          originalPrice={product.originalPrice}
          discount={product.discount}
          rating={product.rating}
          reviewCount={product.reviewCount}
          imageSrc={product.images[0]}
          href={`/products/${product.id}`}
          className={`animate-slide-up opacity-0`}
        />
      ))}

      {products.length === 0 && (
        <div className="col-span-full text-center py-12">
          <h3 className="text-lg font-medium mb-2">No products found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search terms to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  )
}


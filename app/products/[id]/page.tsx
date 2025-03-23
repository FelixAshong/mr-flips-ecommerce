import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductReviews } from "@/components/product-reviews"
import { ProductGallery } from "@/components/product-gallery"
import { AddToCartForm } from "@/components/add-to-cart-form"
import { RelatedProducts } from "@/components/related-products"

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <ProductGallery />
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">GRAPHIC PRINT T-SHIRT</h1>
          <div className="flex items-center gap-1">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <svg
                  key={i}
                  className={`h-5 w-5 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            <span className="text-sm text-muted-foreground ml-1">4.5/5</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold">$260</span>
            <span className="text-xl text-muted-foreground line-through">$300</span>
            <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">-40%</span>
          </div>
          <p className="text-muted-foreground">
            This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers
            superior comfort and style.
          </p>
          <AddToCartForm />
        </div>
      </div>

      <Tabs defaultValue="details" className="mb-16">
        <TabsList>
          <TabsTrigger value="details">Product Details</TabsTrigger>
          <TabsTrigger value="reviews">Rating & Reviews</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="py-4">
          <div className="prose max-w-none">
            <h3>Product Description</h3>
            <p>
              The Mr. Flip's Graphic T-shirt is designed for comfort and style. Made from 100% organic cotton, this
              t-shirt features:
            </p>
            <ul>
              <li>Premium quality fabric (180 gsm)</li>
              <li>Ribbed crew neck</li>
              <li>Regular fit</li>
              <li>Side-seamed construction</li>
              <li>Double-needle stitching on sleeves and bottom hem</li>
            </ul>
            <p>Care instructions: Machine wash cold with similar colors. Tumble dry low. Do not bleach.</p>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="py-4">
          <ProductReviews />
        </TabsContent>
        <TabsContent value="faqs" className="py-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">What sizes are available?</h3>
              <p className="text-muted-foreground">Our t-shirts are available in sizes XS through 3XL.</p>
            </div>
            <div>
              <h3 className="font-medium">How do I care for this product?</h3>
              <p className="text-muted-foreground">
                Machine wash cold with similar colors. Tumble dry low. Do not bleach.
              </p>
            </div>
            <div>
              <h3 className="font-medium">What is the return policy?</h3>
              <p className="text-muted-foreground">
                We accept returns within 30 days of purchase. Items must be unworn with tags attached.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">YOU MIGHT ALSO LIKE</h2>
        <RelatedProducts />
      </section>
    </div>
  )
}


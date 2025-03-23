import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface CategoryCardProps {
  title: string
  imageSrc: string
  href: string
  className?: string
}

export function CategoryCard({ title, imageSrc, href, className }: CategoryCardProps) {
  return (
    <Link href={href} className={cn("group relative overflow-hidden rounded-lg hover-scale", className)}>
      <Image
        src={imageSrc || "/placeholder.svg"}
        alt={title}
        width={400}
        height={300}
        className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-white text-2xl font-bold mb-2">{title}</h3>
          <div className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm px-4 py-1 rounded-full border border-white/30 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            Shop Now
          </div>
        </div>
      </div>
    </Link>
  )
}


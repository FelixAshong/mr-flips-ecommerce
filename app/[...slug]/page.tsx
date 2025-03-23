import { notFound } from "next/navigation"

export default function CatchAllPage() {
  // Redirect to 404 page
  notFound()
  return null
}


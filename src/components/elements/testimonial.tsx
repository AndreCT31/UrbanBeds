import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface TestimonialProps {
  quote: string
  author: string
  location: string
  rating: number
}

export function Testimonial({ quote, author, location, rating }: TestimonialProps) {
  return (
    <Card className="border-gray-200 bg-white hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
          ))}
        </div>
        <blockquote className="text-gray-600 mb-4">&quot;{quote}&quot;</blockquote>
        <div className="font-medium text-gray-900">{author}</div>
        <div className="text-sm text-gray-500">{location}</div>
      </CardContent>
    </Card>
  )
}

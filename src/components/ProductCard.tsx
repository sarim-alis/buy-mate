"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Heart, Star } from 'lucide-react'
import { Product } from '@/lib/api'
import { useFavorites } from '@/contexts/FavoritesContext'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDateShort } from '@/lib/dateUtils'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(product.id)

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/products/${product.id}`}>
        <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link href={`/products/${product.id}`} className="flex-1">
            <h3 className="font-semibold text-lg line-clamp-2 hover:text-primary transition-colors">
              {product.title}
            </h3>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.preventDefault()
              toggleFavorite(product.id)
            }}
            className="shrink-0"
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`h-5 w-5 ${
                favorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
              }`}
            />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.description}
        </p>
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
        </div>
        <p className="text-xs text-muted-foreground mb-2">
          Added: {formatDateShort(product.dateAdded)}
        </p>
        <p className="text-sm text-muted-foreground capitalize">
          {product.category}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex items-center justify-between w-full">
          <span className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          {product.discountPercentage > 0 && (
            <span className="text-sm text-green-600 dark:text-green-400 font-medium">
              -{product.discountPercentage.toFixed(0)}% off
            </span>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Heart, Star, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Product } from '@/types/product'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { toggleFavorite } from '@/store/slices/favoritesSlice'
import { addToCart } from '@/store/slices/cartSlice'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDateShort } from '@/lib/dateUtils'

interface ProductCardProps {
  product: Product
  priority?: boolean
  index?: number
}

export function ProductCard({ product, priority = false, index = 0 }: ProductCardProps) {
  const dispatch = useAppDispatch()
  const favorites = useAppSelector((state) => state.favorites.favorites)
  const favorite = favorites.includes(product.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{
        y: -8,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full transition-all duration-300 border border-transparent hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-[0_8px_30px_rgba(99,102,241,0.2)] dark:hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] group">
        <Link href={`/products/${product.id}`}>
          <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-contain p-2"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
            />
            <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-colors duration-300" />
          </div>
        </Link>
        <CardContent className="p-4 transition-colors duration-300 group-hover:bg-indigo-50/50 dark:group-hover:bg-indigo-950/20">
          <div className="flex items-start justify-between gap-2 mb-2">
            <Link href={`/products/${product.id}`} className="flex-1">
              <h3 className="font-semibold text-lg line-clamp-2 transition-colors duration-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {product.title}
              </h3>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.preventDefault()
                dispatch(toggleFavorite(product.id))
                toast.success(favorite ? 'Removed from favorites' : 'Added to favorites')
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
        <CardFooter className="p-4 pt-0 flex-col gap-3 transition-colors duration-300 group-hover:bg-indigo-50/50 dark:group-hover:bg-indigo-950/20">
          <div className="flex items-center justify-between w-full">
            <span className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                -{product.discountPercentage.toFixed(0)}%
              </span>
            )}
          </div>
          <Button 
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25"
            onClick={(e) => {
              e.preventDefault()
              dispatch(addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail
              }))
              toast.success(`${product.title} added to cart`)
            }}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

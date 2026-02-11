"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, Heart, Star, Package, TrendingUp } from 'lucide-react'
import { fetchProductById, Product } from '@/lib/api'
import { useFavorites } from '@/contexts/FavoritesContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDate } from '@/lib/dateUtils'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { isFavorite, toggleFavorite } = useFavorites()
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true)
        const data = await fetchProductById(params.id as string)
        setProduct(data)
        setError(null)
      } catch (err) {
        setError('Failed to load product details. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [params.id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-10 w-32 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton className="w-full aspect-square rounded-lg" />
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-md" />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <p className="text-lg text-destructive">{error || 'Product not found'}</p>
          <Button onClick={() => router.push('/')}>Back to Products</Button>
        </div>
      </div>
    )
  }

  const favorite = isFavorite(product.id)
  const discountedPrice = product.price * (1 - product.discountPercentage / 100)

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => router.push('/')}
        className="mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <Image
              src={product.images[selectedImage] || product.thumbnail}
              alt={product.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(0, 4).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 transition-all ${
                    selectedImage === index
                      ? 'border-primary ring-2 ring-primary ring-offset-2'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 25vw, 12.5vw"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <h1 className="text-3xl lg:text-4xl font-bold">{product.title}</h1>
              <Button
                variant="outline"
                size="icon"
                onClick={() => toggleFavorite(product.id)}
                className="shrink-0"
                aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart
                  className={`h-5 w-5 ${
                    favorite ? 'fill-red-500 text-red-500' : ''
                  }`}
                />
              </Button>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-semibold">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground capitalize">
                {product.category}
              </span>
              {product.brand && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground font-medium">
                    {product.brand}
                  </span>
                </>
              )}
            </div>

            <div className="flex items-baseline gap-3 mb-4">
              {product.discountPercentage > 0 ? (
                <>
                  <span className="text-4xl font-bold text-primary">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-2xl text-muted-foreground line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-lg text-green-600 dark:text-green-400 font-semibold">
                    {product.discountPercentage.toFixed(0)}% OFF
                  </span>
                </>
              ) : (
                <span className="text-4xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Package className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Stock</p>
                  <p className="text-lg font-semibold">{product.stock} units</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="text-lg font-semibold">{product.rating.toFixed(1)}/5</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Star className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Discount</p>
                  <p className="text-lg font-semibold">{product.discountPercentage.toFixed(0)}%</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Added on {formatDate(product.dateAdded)}
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <Button size="lg" className="flex-1">
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

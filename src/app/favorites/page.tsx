"use client"

import { useState, useEffect } from 'react'
import { useAppSelector } from '@/store/hooks'
import { fetchProductById, Product } from '@/lib/api'
import { ProductCard } from '@/components/ProductCard'
import { LoadingSpinnerWithText } from '@/components/LoadingSpinner'
import { Heart, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function FavoritesPage() {
  const router = useRouter()
  const favoriteIds = useAppSelector((state) => state.favorites.favorites)
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadFavorites() {
      if (favoriteIds.length === 0) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const products = await Promise.all(
          favoriteIds.map(id => fetchProductById(String(id)))
        )
        setFavoriteProducts(products)
        setError(null)
      } catch (err) {
        console.error('Error loading favorites:', err)
        setError('Failed to load favorite products')
      } finally {
        setLoading(false)
      }
    }

    loadFavorites()
  }, [favoriteIds])

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="outline"
        onClick={() => router.push('/')}
        className="mb-6 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Button>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Heart className="h-8 w-8 text-primary fill-primary" />
          <h1 className="text-4xl font-bold">My Favorites</h1>
        </div>
        <p className="text-muted-foreground">
          {favoriteIds.length === 0 
            ? "You haven't added any favorites yet" 
            : `${favoriteIds.length} favorite product${favoriteIds.length !== 1 ? 's' : ''}`
          }
        </p>
      </div>

      {error && (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <p className="text-lg text-destructive">{error}</p>
        </div>
      )}

      {loading ? (
        <LoadingSpinnerWithText text="Loading favorites..." />
      ) : favoriteIds.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <Heart className="h-24 w-24 text-muted-foreground/30" />
          <p className="text-lg text-muted-foreground">No favorite products yet</p>
          <p className="text-sm text-muted-foreground">
            Click the heart icon on any product to add it to your favorites
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}

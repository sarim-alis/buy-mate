"use client"

import { useState, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, Filter } from 'lucide-react'
import { fetchAllProducts, fetchCategories, Product } from '@/lib/api'
import { ProductCard } from '@/components/ProductCard'
import { LoadingSpinnerWithText } from '@/components/LoadingSpinner'
import { ProductsChart } from '@/components/ProductsChart'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DateRangePicker } from '@/components/DateRangePicker'
import { useDebounce } from '@/hooks/useDebounce'

const PRODUCTS_PER_PAGE = 10

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all')
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null } | null>(() => {
    const from = searchParams.get('dateFrom')
    const to = searchParams.get('dateTo')
    if (from && to) {
      return { from: new Date(from), to: new Date(to) }
    }
    return null
  })
  const [currentPage, setCurrentPage] = useState(1)
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        console.log('Fetching products and categories...')
        const [productsData, categoriesData] = await Promise.all([
          fetchAllProducts(),
          fetchCategories()
        ])
        console.log('Data fetched successfully:', { 
          productsCount: productsData.length, 
          categoriesCount: categoriesData.length 
        })
        setProducts(productsData)
        setCategories(categoriesData)
        setError(null)
      } catch (err) {
        console.error('Error loading data:', err)
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        setError(`Failed to load products: ${errorMessage}. Please check your internet connection and try again.`)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    const params = new URLSearchParams()
    if (debouncedSearchQuery) params.set('search', debouncedSearchQuery)
    if (selectedCategory !== 'all') params.set('category', selectedCategory)
    if (dateRange && dateRange.from) {
      params.set('dateFrom', dateRange.from.toISOString())
      if (dateRange.to) params.set('dateTo', dateRange.to.toISOString())
    }
    
    const queryString = params.toString()
    router.replace(queryString ? `?${queryString}` : '/', { scroll: false })
  }, [debouncedSearchQuery, selectedCategory, dateRange, router])

  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase()
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    if (dateRange && dateRange.from) {
      filtered = filtered.filter(product => {
        const productDate = product.dateAdded
        const fromDate = dateRange.from!
        const toDate = dateRange.to || dateRange.from!
        
        const productTime = productDate.getTime()
        const fromTime = new Date(fromDate).setHours(0, 0, 0, 0)
        const toTime = new Date(toDate).setHours(23, 59, 59, 999)
        
        return productTime >= fromTime && productTime <= toTime
      })
    }

    return filtered
  }, [products, debouncedSearchQuery, selectedCategory, dateRange])

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchQuery, selectedCategory, dateRange])

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setDateRange(null)
    setCurrentPage(1)
  }

  const hasActiveFilters = debouncedSearchQuery || selectedCategory !== 'all' || (dateRange && dateRange.from)

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <p className="text-lg text-destructive">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Products</h1>
          <p className="text-muted-foreground">
            Browse our collection of {products.length} amazing products
          </p>
        </div>
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            onClick={handleClearFilters}
            className="shrink-0"
          >
            Clear Filters
          </Button>
        )}
      </div>

      <div className="mb-8 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="bg-background text-foreground z-[200]">
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full lg:w-1/2">
            <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
          </div>
        </div>

      

        {hasActiveFilters && filteredProducts.length > 0 && (
          <div className="mb-6 flex items-center justify-between bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <LoadingSpinnerWithText text="Loading products..." />
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-100 gap-4">
          <p className="text-lg text-muted-foreground">No products found</p>
          {hasActiveFilters && (
            <Button variant="outline" onClick={handleClearFilters}>
              Clear filters
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8 animate-in fade-in duration-500">
            {paginatedProducts.map((product, index) => (
              <div 
                key={product.id}
                className="animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        onClick={() => setCurrentPage(page)}
                        className="w-10"
                      >
                        {page}
                      </Button>
                    )
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="px-2">...</span>
                  }
                  return null
                })}
              </div>
              <Button
                variant="outline"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
        {!loading && products.length > 0 && (
          <div className="mb-8">
            <ProductsChart products={products} />
          </div>
        )}
    </div>
  )
}

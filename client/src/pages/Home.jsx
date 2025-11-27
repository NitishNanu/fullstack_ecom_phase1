import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../services/api'
import ProductCard from '../components/ProductCard'
import Filters from '../components/Filters'
import Pagination from '../components/Pagination'

export default function Home() {
  const [productsData, setProductsData] = useState({ products: [], page: 1, totalPages: 1, total: 0, limit:20 })
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({ page: 1, limit: 20, category: 'all', priceMin: undefined, priceMax: undefined, q: '' })

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchProducts(filters).then(data => {
      if (!mounted || !data) return
      setProductsData(data)
      setLoading(false)
    }).catch(err=>{
      console.error(err);
      setLoading(false);
    })
    return () => mounted = false
  }, [filters])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white">Explore Products</h2>
              <p className="text-blue-100 text-sm mt-1">Latest tech products at amazing prices</p>
            </div>
            <div className="text-right">
              <p className="text-white text-lg font-semibold">{productsData.total} Products</p>
              <p className="text-blue-100 text-sm">Page {productsData.page}</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Filters filters={filters} setFilters={setFilters} />

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            <span className="ml-4 text-white text-lg">Loading amazing products...</span>
          </div>
        ) : productsData.products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {productsData.products.map(p => <ProductCard key={p._id} p={p} />)}
            </div>

            <Pagination page={productsData.page} totalPages={productsData.totalPages} setPage={(p)=>setFilters(f=>({...f, page: p}))} />
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-white text-xl">No products found matching your filters</p>
            <p className="text-gray-400 mt-2">Try adjusting your search criteria</p>
          </div>
        )}
      </main>

      <footer className="bg-slate-900 border-t border-slate-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-gray-400 text-center">© 2024 TechHub Store. All rights reserved. | Phase 1 Release</p>
        </div>
      </footer>
    </div>
  )
}

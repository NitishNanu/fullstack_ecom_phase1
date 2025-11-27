import React, { useEffect, useState } from 'react'
import { fetchCategories } from '../services/api'

export default function Filters({ filters, setFilters }) {
  const [categories, setCategories] = useState(['all'])

  useEffect(() => {
    let mounted = true
    fetchCategories().then(list => {
      if (mounted && list) setCategories(['all', ...list])
    }).catch(()=>{})
    return () => (mounted = false)
  }, [])

  return (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-lg shadow-lg mb-8">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">🔍 Filter Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white" 
            value={filters.category} 
            onChange={e => setFilters(f => ({ ...f, category: e.target.value, page:1 }))}
          >
            {categories.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Min Price (₹)</label>
          <input 
            type="number" 
            placeholder="Min" 
            value={filters.priceMin ?? ''} 
            onChange={e => setFilters(f=>({ ...f, priceMin: e.target.value ? Number(e.target.value) : undefined, page:1 }))} 
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white" 
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Max Price (₹)</label>
          <input 
            type="number" 
            placeholder="Max" 
            value={filters.priceMax ?? ''} 
            onChange={e => setFilters(f=>({ ...f, priceMax: e.target.value ? Number(e.target.value) : undefined, page:1 }))} 
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white" 
          />
        </div>

        <div className="lg:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Search Products</label>
          <input 
            type="text" 
            placeholder="Search by product name..." 
            value={filters.q ?? ''} 
            onChange={e=>setFilters(f=>({...f, q:e.target.value, page:1}))} 
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white" 
          />
        </div>
      </div>
    </div>
  )
}

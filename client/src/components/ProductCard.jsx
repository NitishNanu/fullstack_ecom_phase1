import React, { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function ProductCard({ p }) {
  const [addedToCart, setAddedToCart] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(p, 1)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-400'}>★</span>
        ))}
        <span className="text-xs text-gray-500 ml-1">({p.reviews || 0})</span>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden h-full flex flex-col">
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <img 
          src={p.image} 
          alt={p.title} 
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" 
        />
        <span className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {p.category}
        </span>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-800 dark:text-white line-clamp-2 mb-2">{p.title}</h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">{p.description}</p>
        
        <div className="mb-3">
          {renderStars(p.rating || 0)}
        </div>

        <div className="mt-auto border-t border-gray-200 dark:border-slate-700 pt-3 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-blue-600">₹{p.price.toLocaleString()}</p>
            {p.stock > 0 && <p className="text-xs text-green-600 font-semibold">In Stock ({p.stock})</p>}
            {p.stock === 0 && <p className="text-xs text-red-600 font-semibold">Out of Stock</p>}
          </div>
          <button 
            onClick={handleAddToCart}
            disabled={p.stock === 0}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              addedToCart
                ? 'bg-green-600 text-white'
                : p.stock === 0
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {addedToCart ? '✓ Added' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navigation() {
  const { getCartItemCount } = useCart()
  const location = useLocation()
  const cartCount = getCartItemCount()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity">
            <span className="text-2xl">🚀</span>
            <span className="font-bold text-lg">TechHub Store</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/') 
                  ? 'bg-white bg-opacity-30 text-white' 
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              <span>🏠</span>
              Shop
            </Link>

            <Link
              to="/orders"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/orders') 
                  ? 'bg-white bg-opacity-30 text-white' 
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              <span>📦</span>
              Orders
            </Link>

            <Link
              to="/cart"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors relative ${
                isActive('/cart') 
                  ? 'bg-white bg-opacity-30 text-white' 
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              <span>🛒</span>
              Cart
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

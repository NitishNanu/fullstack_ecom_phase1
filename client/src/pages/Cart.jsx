import React from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, checkout } = useCart()
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (checkout()) {
      alert('✅ Order placed successfully!')
      navigate('/orders')
    }
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8 text-center">
            <p className="text-3xl mb-4">🛒</p>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Start shopping to add items to your cart</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">🛒 Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item._id} className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 flex gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{item.category}</p>
                  <p className="text-2xl font-bold text-blue-600 mt-2">₹{item.price.toLocaleString()}</p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <div className="flex items-center gap-2 border border-gray-300 dark:border-slate-600 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      −
                    </button>
                    <span className="px-4 py-1 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-300">Subtotal</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-white">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-600 hover:text-red-700 font-semibold text-sm transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 dark:border-slate-700">
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Items ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
                  <span>₹{getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Tax (0%)</span>
                  <span>₹0</span>
                </div>
              </div>

              <div className="flex justify-between text-2xl font-bold text-gray-800 dark:text-white mb-6">
                <span>Total</span>
                <span>₹{getCartTotal().toLocaleString()}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold text-lg transition-colors mb-4"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate('/')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

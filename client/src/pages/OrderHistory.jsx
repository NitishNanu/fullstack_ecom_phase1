import React from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function OrderHistory() {
  const { orders } = useCart()
  const navigate = useNavigate()

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8 text-center">
            <p className="text-3xl mb-4">📦</p>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">No Orders Yet</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">You haven't placed any orders. Start shopping now!</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">📦 Order History</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6">
              {/* Order Header */}
              <div className="flex justify-between items-start mb-6 pb-4 border-b border-gray-200 dark:border-slate-700">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">{order.id}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Status</p>
                  <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-3 py-1 rounded-full text-sm font-semibold mt-1">
                    ✓ {order.status}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Items</h3>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item._id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white">{item.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800 dark:text-white">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          ₹{item.price.toLocaleString()} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Total */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-slate-700">
                <div>
                  <p className="text-lg font-bold text-gray-800 dark:text-white">Order Total</p>
                </div>
                <p className="text-2xl font-bold text-blue-600">₹{order.total.toLocaleString()}</p>
              </div>

              {/* Order Actions */}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => navigate('/')}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors"
                >
                  Shop Again
                </button>
                <button
                  className="flex-1 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-800 dark:text-white py-2 rounded-lg font-semibold transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            ← Back to Shopping
          </button>
        </div>
      </div>
    </div>
  )
}

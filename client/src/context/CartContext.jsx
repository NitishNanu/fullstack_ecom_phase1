import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [orders, setOrders] = useState([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('techub_cart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to load cart from localStorage', e)
      }
    }
    
    const savedOrders = localStorage.getItem('techhub_orders')
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders))
      } catch (e) {
        console.error('Failed to load orders from localStorage', e)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('techub_cart', JSON.stringify(cart))
  }, [cart])

  // Save orders to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('techhub_orders', JSON.stringify(orders))
  }, [orders])

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === product._id)
      if (existingItem) {
        return prevCart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        return [...prevCart, { ...product, quantity }]
      }
    })
  }

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item._id === productId
            ? { ...item, quantity }
            : item
        )
      )
    }
  }

  const clearCart = () => {
    setCart([])
  }

  const checkout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!')
      return false
    }

    const newOrder = {
      id: 'ORD-' + Date.now(),
      items: cart,
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      date: new Date().toLocaleString(),
      status: 'Completed'
    }

    setOrders(prevOrders => [newOrder, ...prevOrders])
    clearCart()
    return true
  }

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const getCartItemCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  }

  return (
    <CartContext.Provider value={{
      cart,
      orders,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      checkout,
      getCartTotal,
      getCartItemCount
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

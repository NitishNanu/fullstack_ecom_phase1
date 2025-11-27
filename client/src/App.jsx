import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Cart from './pages/Cart'
import OrderHistory from './pages/OrderHistory'

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<OrderHistory />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

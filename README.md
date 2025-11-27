# TechHub Store - Phase 1

A modern full-stack e-commerce platform specializing in tech products:
- **Backend**: Node.js + Express + Mongoose (API, seed script)
- **Frontend**: Vite + React + Tailwind CSS (20 products per page, filters, pagination)
- **Features**: Product catalog, shopping cart, order history, advanced filtering

## Features Implemented

✅ **Product Catalog**
- Display 20 products per page with pagination
- Advanced filtering by category, price range, and search
- Product ratings and reviews display
- Stock availability indicators

✅ **Shopping Cart**
- Add/remove items from cart
- Adjust product quantities
- Real-time cart total calculation
- Persistent cart using localStorage

✅ **Order History**
- Track all completed orders
- View order details and dates
- Order status display

✅ **User Interface**
- Modern dark theme design with Tailwind CSS
- Responsive grid layout (mobile, tablet, desktop)
- Navigation header with cart counter badge
- Smooth loading states and animations

✅ **Backend**
- RESTful API endpoints for products and filters
- MongoDB integration with Mongoose
- 49 premium tech products seeded in database
- Categories: laptops, smartphones, tablets, headphones, smartwatches, cameras, peripherals, storage

## Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd fullstack_ecom_phase1
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Update MONGO_URI if using Atlas
   npm run seed  # Populate database with 49 tech products
   npm run dev   # Start server on http://localhost:5000
   ```

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   npm run dev   # Start client on http://localhost:5173
   ```

4. **Access the Application**
   - Open browser to http://localhost:5173
   - Browse products, filter by category/price
   - Add items to cart
   - Checkout to create orders
   - View order history

## Project Structure

```
fullstack_ecom_phase1/
├── client/                          # React frontend
│   ├── src/
│   │   ├── App.jsx                 # Main app with routing
│   │   ├── components/
│   │   │   ├── Navigation.jsx      # Header with nav links
│   │   │   ├── ProductCard.jsx     # Individual product card
│   │   │   ├── Filters.jsx         # Category, price, search filters
│   │   │   └── Pagination.jsx      # Page navigation
│   │   ├── context/
│   │   │   └── CartContext.jsx     # Global cart state management
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Product listing page
│   │   │   ├── Cart.jsx            # Shopping cart page
│   │   │   └── OrderHistory.jsx    # Order history page
│   │   ├── services/
│   │   │   └── api.js              # API client (axios)
│   │   ├── index.css               # Global styles
│   │   └── main.jsx                # Entry point
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.cjs
│
├── server/                          # Express backend
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── models/
│   │   └── Product.js              # Product schema with ratings
│   ├── routes/
│   │   └── products.js             # API endpoints
│   ├── seed/
│   │   └── seedProducts.js         # Database seeding script
│   ├── index.js                    # Server entry point
│   ├── package.json
│   └── .env.example
│
└── README.md                        # This file
```

## API Endpoints

### Products
- `GET /api/products` - Get paginated products
  - Query params: `page`, `limit`, `category`, `priceMin`, `priceMax`, `q` (search)
  - Response: `{ page, limit, totalPages, total, products }`

- `GET /api/products/categories/list` - Get all categories
  - Response: `{ categories: [...] }`

## Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS
- **Axios** - HTTP client
- **Context API** - State management

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Mongoose** - MongoDB ODM
- **MongoDB** - NoSQL database
- **Nodemon** - Development tool
- **CORS** - Cross-origin support

## Data Structure

### Product Schema
```javascript
{
  title: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  rating: Number (0-5),
  reviews: Number,
  stock: Number,
  createdAt: Date
}
```

### Categories
- laptops
- smartphones
- tablets
- headphones
- smartwatches
- cameras
- peripherals
- storage

## Features Details

### Product Filtering
- Filter by category
- Filter by price range (min/max)
- Full-text search by product title
- Combination of multiple filters

### Shopping Cart
- Persistent storage using browser localStorage
- Add/remove items
- Update quantities with +/- buttons
- Real-time total calculation
- Cart counter badge in navigation

### Checkout & Orders
- One-click checkout
- Order ID generation with timestamp
- Order summary with items and total
- Order history storage

## Development

### Available Scripts

**Frontend:**
```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

**Backend:**
```bash
npm run dev      # Start with nodemon
npm start        # Start production server
npm run seed     # Seed database with tech products
```

## Performance Optimizations

- Product images use lazy loading with placeholder
- Pagination limits data fetched to 20 items per page
- MongoDB indexing on category and price fields
- Local state management with React Context
- LocalStorage caching for cart and orders

## Future Enhancements

- User authentication and accounts
- Payment gateway integration (Stripe, Razorpay)
- Email notifications for orders
- Admin dashboard for product management
- Product reviews and ratings system
- Wishlist functionality
- Real-time inventory updates
- Order tracking

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for learning

## Support

For issues or questions, please create an issue in the repository.

---

**Created**: November 2024  
**Version**: Phase 1  
**Status**: ✅ Active Development

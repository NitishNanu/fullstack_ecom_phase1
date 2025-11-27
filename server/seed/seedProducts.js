require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const connectDB = require('../config/db');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/techhub_store';

const techProducts = [
  // Laptops
  { title: 'Dell XPS 13 Laptop', description: 'Premium ultrabook with Intel Core i7, 16GB RAM, 512GB SSD', price: 89999, category: 'laptops', rating: 4.8, reviews: 156 },
  { title: 'MacBook Pro 14"', description: 'Apple M2 Pro, 16GB memory, 512GB storage, Space Black', price: 139999, category: 'laptops', rating: 4.9, reviews: 234 },
  { title: 'ASUS ROG Gaming Laptop', description: 'RTX 4060, Intel i7 13th Gen, 16GB RAM, 1TB SSD', price: 79999, category: 'laptops', rating: 4.7, reviews: 128 },
  { title: 'HP Pavilion 15', description: 'AMD Ryzen 5, 8GB RAM, 256GB SSD, Win 11', price: 45999, category: 'laptops', rating: 4.4, reviews: 89 },
  { title: 'Lenovo ThinkPad X1', description: 'Business ultrabook, Intel i7, 32GB RAM, 1TB SSD', price: 119999, category: 'laptops', rating: 4.6, reviews: 167 },
  { title: 'Apple MacBook Air M2', description: '512GB SSD, 8-core GPU, 8GB unified memory', price: 99999, category: 'laptops', rating: 4.8, reviews: 201 },
  { title: 'MSI Raider GE76', description: 'Gaming laptop with RTX 4070, Intel i9, 32GB RAM', price: 149999, category: 'laptops', rating: 4.7, reviews: 142 },
  { title: 'Acer Swift 3', description: 'Lightweight, Intel i5, 8GB RAM, 512GB SSD', price: 52999, category: 'laptops', rating: 4.5, reviews: 95 },

  // Smartphones
  { title: 'iPhone 15 Pro Max', description: 'A17 Pro chip, Titanium design, 256GB storage', price: 129999, category: 'smartphones', rating: 4.9, reviews: 512 },
  { title: 'Samsung Galaxy S24 Ultra', description: 'Snapdragon 8 Gen 3, 12GB RAM, 512GB storage', price: 124999, category: 'smartphones', rating: 4.8, reviews: 467 },
  { title: 'OnePlus 12', description: 'Snapdragon 8 Gen 3, 120Hz AMOLED, 256GB storage', price: 69999, category: 'smartphones', rating: 4.7, reviews: 278 },
  { title: 'Google Pixel 8 Pro', description: 'Tensor G3, Advanced camera AI, 256GB storage', price: 84999, category: 'smartphones', rating: 4.8, reviews: 334 },
  { title: 'Xiaomi 14 Pro', description: 'Snapdragon 8 Gen 3, 12GB RAM, excellent camera', price: 59999, category: 'smartphones', rating: 4.6, reviews: 256 },
  { title: 'iPhone 15', description: 'A17 Pro, 128GB, Dynamic Island, new color options', price: 79999, category: 'smartphones', rating: 4.8, reviews: 445 },
  { title: 'Samsung Galaxy A54', description: '6.4" AMOLED, 50MP camera, 128GB storage', price: 37999, category: 'smartphones', rating: 4.5, reviews: 189 },
  { title: 'Realme 12 Pro Plus', description: 'AMOLED display, 120W charging, 256GB storage', price: 34999, category: 'smartphones', rating: 4.4, reviews: 156 },

  // Tablets
  { title: 'iPad Pro 12.9" M2', description: 'M2 chip, 256GB, WiFi + Cellular model', price: 109999, category: 'tablets', rating: 4.8, reviews: 267 },
  { title: 'Samsung Galaxy Tab S9 Ultra', description: '14.6" AMOLED, Snapdragon 8 Gen 2, 512GB', price: 119999, category: 'tablets', rating: 4.7, reviews: 198 },
  { title: 'iPad Air M1', description: '10.9" display, 64GB, perfect for creators', price: 67999, category: 'tablets', rating: 4.6, reviews: 145 },
  { title: 'OnePlus Pad', description: '11.6" LCD, Snapdragon 8 Gen 1, 256GB', price: 44999, category: 'tablets', rating: 4.5, reviews: 112 },
  { title: 'Lenovo Tab P11 Pro', description: 'OLED display, MediaTek chip, thin and light', price: 39999, category: 'tablets', rating: 4.4, reviews: 98 },

  // Headphones
  { title: 'Sony WH-1000XM5', description: 'Best noise cancellation, 30hr battery, premium sound', price: 29999, category: 'headphones', rating: 4.9, reviews: 567 },
  { title: 'Apple AirPods Pro 2', description: 'H2 chip, Spatial Audio, active noise cancellation', price: 24999, category: 'headphones', rating: 4.8, reviews: 445 },
  { title: 'Bose QuietComfort 45', description: 'Exceptional noise canceling, lightweight design', price: 34999, category: 'headphones', rating: 4.7, reviews: 389 },
  { title: 'JBL Live Pro 2', description: 'Adaptive noise cancellation, True Wireless', price: 19999, category: 'headphones', rating: 4.5, reviews: 267 },
  { title: 'Sennheiser Momentum 4', description: '60-hour battery, noise canceling, exceptional comfort', price: 34999, category: 'headphones', rating: 4.8, reviews: 312 },
  { title: 'Beats Studio Pro', description: 'Apple H2 chip, Spatial Audio, sleek design', price: 34999, category: 'headphones', rating: 4.7, reviews: 289 },
  { title: 'Samsung Galaxy Buds2 Pro', description: 'IPX7 waterproof, 360-degree audio, 8hr battery', price: 12999, category: 'headphones', rating: 4.6, reviews: 234 },
  { title: 'Anker Soundcore Space A40', description: 'Budget-friendly, LDAC codec, 10hr battery', price: 7999, category: 'headphones', rating: 4.4, reviews: 178 },

  // Smartwatches
  { title: 'Apple Watch Series 9', description: 'S9 chip, Always-On display, health monitoring', price: 34999, category: 'smartwatches', rating: 4.8, reviews: 312 },
  { title: 'Samsung Galaxy Watch6', description: 'Rotating bezel, AMOLED, excellent battery life', price: 24999, category: 'smartwatches', rating: 4.7, reviews: 278 },
  { title: 'Garmin Forerunner 265', description: 'AMOLED display, 11-day battery, sports tracking', price: 34999, category: 'smartwatches', rating: 4.8, reviews: 245 },
  { title: 'Xiaomi Watch S1', description: 'AMOLED display, 12-day battery, affordable', price: 12999, category: 'smartwatches', rating: 4.5, reviews: 156 },
  { title: 'Fitbit Sense 2', description: 'Health and wellness focus, Google integration', price: 14999, category: 'smartwatches', rating: 4.6, reviews: 189 },

  // Cameras
  { title: 'Canon EOS R6 Mark II', description: '20MP full-frame mirrorless, excellent autofocus', price: 189999, category: 'cameras', rating: 4.8, reviews: 178 },
  { title: 'Sony A7 IV', description: '61MP full-frame, excellent video capabilities', price: 179999, category: 'cameras', rating: 4.7, reviews: 145 },
  { title: 'Nikon Z9', description: 'Flagship mirrorless, 45.7MP, professional grade', price: 249999, category: 'cameras', rating: 4.9, reviews: 201 },
  { title: 'DJI Mavic 3 Pro', description: 'Flagship drone, 4/3 Hasselblad camera, 20MP zoom', price: 159999, category: 'cameras', rating: 4.7, reviews: 267 },
  { title: 'GoPro Hero 11 Black', description: 'Action camera, 5.3K video, waterproof', price: 49999, category: 'cameras', rating: 4.6, reviews: 134 },

  // Computer Peripherals
  { title: 'Logitech MX Master 3S', description: 'Wireless mouse, precision scrolling, multi-device', price: 9999, category: 'peripherals', rating: 4.8, reviews: 456 },
  { title: 'Corsair K95 Platinum', description: 'Mechanical keyboard, RGB, programmable keys', price: 24999, category: 'peripherals', rating: 4.7, reviews: 289 },
  { title: 'ASUS VP28U Monitor', description: '4K UHD, 60Hz, IPS panel, professional grade', price: 39999, category: 'peripherals', rating: 4.6, reviews: 178 },
  { title: 'Razer DeathAdder V3', description: 'Gaming mouse, 30000 DPI, wireless', price: 7999, category: 'peripherals', rating: 4.7, reviews: 334 },
  { title: 'SteelSeries QcK Mousepad', description: 'Large gaming mousepad, durable cloth', price: 2999, category: 'peripherals', rating: 4.8, reviews: 567 },

  // Storage & Backup
  { title: 'Samsung 990 Pro SSD 2TB', description: 'PCIe 4.0 NVMe, 7100MB/s, heatsink included', price: 19999, category: 'storage', rating: 4.8, reviews: 234 },
  { title: 'Western Digital Blue 1TB', description: 'SSD, SATA interface, reliable storage', price: 6999, category: 'storage', rating: 4.7, reviews: 456 },
  { title: 'Seagate Barracuda Pro 4TB', description: 'External HDD, fast transfer, backup ready', price: 8999, category: 'storage', rating: 4.6, reviews: 189 },
  { title: 'Kingston DataTraveler Exodia 64GB', description: 'USB 3.2 flash drive, compact design', price: 999, category: 'storage', rating: 4.5, reviews: 312 },
  { title: 'Samsung T7 Shield 2TB', description: 'Portable SSD, rugged design, up to 1050MB/s', price: 24999, category: 'storage', rating: 4.8, reviews: 278 }
];

(async () => {
  try {
    await connectDB(MONGO_URI);
    console.log('🔄 Seeding TechHub Store products...');
    await Product.deleteMany({});

    // Add random ratings and stock to products
    const productsWithRatings = techProducts.map(p => ({
      ...p,
      image: `https://picsum.photos/seed/${p.title.replace(/\s+/g, '_')}/400/400`,
      stock: Math.floor(Math.random() * 30) + 5
    }));

    await Product.insertMany(productsWithRatings);
    console.log(`✅ Successfully inserted ${productsWithRatings.length} tech products!`);
    console.log('📊 Products by category:');
    
    const categories = await Product.distinct('category');
    for (const cat of categories) {
      const count = await Product.countDocuments({ category: cat });
      console.log(`   - ${cat}: ${count} products`);
    }
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
  }
})();

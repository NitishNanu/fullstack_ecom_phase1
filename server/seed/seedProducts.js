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

    // Add images, ratings and stock to products
    const productImages = {
      'Dell XPS 13 Laptop': 'https://images.unsplash.com/photo-1588872657840-790ff3bde08c?w=400&h=400&fit=crop',
      'MacBook Pro 14"': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
      'ASUS ROG Gaming Laptop': 'https://images.unsplash.com/photo-1566181879618-f60c73e8f62a?w=400&h=400&fit=crop',
      'HP Pavilion 15': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      'Lenovo ThinkPad X1': 'https://images.unsplash.com/photo-1573921998318-d24e0e3c8e5d?w=400&h=400&fit=crop',
      'Apple MacBook Air M2': 'https://images.unsplash.com/photo-1515634200202-4f1c4cd570d7?w=400&h=400&fit=crop',
      'MSI Raider GE76': 'https://images.unsplash.com/photo-1519762211715-31a731c6f16d?w=400&h=400&fit=crop',
      'Acer Swift 3': 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=400&h=400&fit=crop',
      
      'iPhone 15 Pro Max': 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=400&fit=crop',
      'Samsung Galaxy S24 Ultra': 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&h=400&fit=crop',
      'OnePlus 12': 'https://images.unsplash.com/photo-1511454612892-09229cd63445?w=400&h=400&fit=crop',
      'Google Pixel 8 Pro': 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&h=400&fit=crop',
      'Xiaomi 14 Pro': 'https://images.unsplash.com/photo-1519070680033-05a50db3dd5e?w=400&h=400&fit=crop',
      'iPhone 15': 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=400&fit=crop',
      'Samsung Galaxy A54': 'https://images.unsplash.com/photo-1504147090032-361bb6d9ee6d?w=400&h=400&fit=crop',
      'Realme 12 Pro Plus': 'https://images.unsplash.com/photo-1511290739894-5fba8f36b566?w=400&h=400&fit=crop',
      
      'iPad Pro 12.9" M2': 'https://images.unsplash.com/photo-1517153295259-f595aa45efba?w=400&h=400&fit=crop',
      'Samsung Galaxy Tab S9 Ultra': 'https://images.unsplash.com/photo-1526408529797-d826f96eac22?w=400&h=400&fit=crop',
      'iPad Air M1': 'https://images.unsplash.com/photo-1610945415295-d9bbf115b72e?w=400&h=400&fit=crop',
      'OnePlus Pad': 'https://images.unsplash.com/photo-1526408529797-d826f96eac22?w=400&h=400&fit=crop',
      'Lenovo Tab P11 Pro': 'https://images.unsplash.com/photo-1517153295259-f595aa45efba?w=400&h=400&fit=crop',
      
      'Sony WH-1000XM5': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      'Apple AirPods Pro 2': 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop',
      'Bose QuietComfort 45': 'https://images.unsplash.com/photo-1487215737519-e21cc028cb29?w=400&h=400&fit=crop',
      'JBL Live Pro 2': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      'Sennheiser Momentum 4': 'https://images.unsplash.com/photo-1487215737519-e21cc028cb29?w=400&h=400&fit=crop',
      'Beats Studio Pro': 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop',
      'Samsung Galaxy Buds2 Pro': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      'Anker Soundcore Space A40': 'https://images.unsplash.com/photo-1487215737519-e21cc028cb29?w=400&h=400&fit=crop',
      
      'Apple Watch Series 9': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      'Samsung Galaxy Watch6': 'https://images.unsplash.com/photo-1505856584826-36dd345f3963?w=400&h=400&fit=crop',
      'Garmin Forerunner 265': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      'Xiaomi Watch S1': 'https://images.unsplash.com/photo-1505856584826-36dd345f3963?w=400&h=400&fit=crop',
      'Fitbit Sense 2': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      
      'Canon EOS R6 Mark II': 'https://images.unsplash.com/photo-1527482797697-8795b1a55a45?w=400&h=400&fit=crop',
      'Sony A7 IV': 'https://images.unsplash.com/photo-1616008375890-cb53b6c5f8f5?w=400&h=400&fit=crop',
      'Nikon Z9': 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop',
      'DJI Mavic 3 Pro': 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=400&h=400&fit=crop',
      'GoPro Hero 11 Black': 'https://images.unsplash.com/photo-1493515169062-81342ee5ff30?w=400&h=400&fit=crop',
      
      'Logitech MX Master 3S': 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
      'Corsair K95 Platinum': 'https://images.unsplash.com/photo-1587829191301-72ec7daa33f1?w=400&h=400&fit=crop',
      'ASUS VP28U Monitor': 'https://images.unsplash.com/photo-1573549050029-40cffe8d8a5d?w=400&h=400&fit=crop',
      'Razer DeathAdder V3': 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
      'SteelSeries QcK Mousepad': 'https://images.unsplash.com/photo-1614462239855-7eb62b53c1da?w=400&h=400&fit=crop',
      
      'Samsung 990 Pro SSD 2TB': 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop',
      'Western Digital Blue 1TB': 'https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?w=400&h=400&fit=crop',
      'Seagate Barracuda Pro 4TB': 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop',
      'Kingston DataTraveler Exodia 64GB': 'https://images.unsplash.com/photo-1613141308742-2e67af56d448?w=400&h=400&fit=crop',
      'Samsung T7 Shield 2TB': 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop'
    };

    const productsWithRatings = techProducts.map(p => ({
      ...p,
      image: productImages[p.title] || `https://picsum.photos/seed/${p.title.replace(/\s+/g, '_')}/400/400`,
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

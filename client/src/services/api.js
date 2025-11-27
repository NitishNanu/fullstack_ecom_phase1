import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' });

export async function fetchProducts({ page = 1, limit = 20, category = 'all', priceMin, priceMax, q } = {}) {
  const params = { page, limit };
  if (category) params.category = category;
  if (priceMin !== undefined) params.priceMin = priceMin;
  if (priceMax !== undefined) params.priceMax = priceMax;
  if (q) params.q = q;
  const res = await API.get('/products', { params });
  return res.data;
}

export async function fetchCategories() {
  const res = await API.get('/products/categories/list');
  return res.data.categories;
}

// API 服務層
// 這裡定義與後端 API 溝通的函數

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// 通用 fetch 函數
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    // 統一返回格式：支援直接陣列或 { success, data } 格式
    if (Array.isArray(data)) {
      return { success: true, data };
    }
    // 如果已經是標準格式 { success, data }
    if (data && typeof data === 'object' && 'data' in data) {
      return data;
    }
    // 單一物件 (例如 getById)
    return { success: true, data };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// 品牌 API
export const brandAPI = {
  getAll: () => fetchAPI('/brands'),
  getById: (id) => fetchAPI(`/brands/${id}`),
  create: (data) => fetchAPI('/brands', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => fetchAPI(`/brands/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => fetchAPI(`/brands/${id}`, { method: 'DELETE' }),
};

// 產品 API
export const productAPI = {
  getAll: () => fetchAPI('/products'),
  getById: (id) => fetchAPI(`/products/${id}`),
  create: (data) => fetchAPI('/products', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => fetchAPI(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => fetchAPI(`/products/${id}`, { method: 'DELETE' }),
  getByBrand: (brandCode) => fetchAPI(`/products?brand_code=${brandCode}`),
};

// 原物料 API
export const materialAPI = {
  getAll: () => fetchAPI('/materials'),
  getById: (id) => fetchAPI(`/materials/${id}`),
  create: (data) => fetchAPI('/materials', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => fetchAPI(`/materials/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => fetchAPI(`/materials/${id}`, { method: 'DELETE' }),
};

// 參考資料 API
export const referenceAPI = {
  getAll: () => fetchAPI('/references'),
  update: (category, items) => fetchAPI(`/references/${category}`, {
    method: 'PUT',
    body: JSON.stringify({ items }),
  }),
};

// 統計資料 API
export const statsAPI = {
  getDashboard: () => fetchAPI('/stats/dashboard'),
  getRecentUpdates: () => fetchAPI('/stats/recent-updates'),
};

export default {
  brand: brandAPI,
  product: productAPI,
  material: materialAPI,
  reference: referenceAPI,
  stats: statsAPI,
};

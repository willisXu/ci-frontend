import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ShoppingBag, Loader2 } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Badge from '../components/Badge';
import SearchBar from '../components/SearchBar';
import EmptyState from '../components/EmptyState';
import { productAPI } from '../services/api';

export default function ProductList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productAPI.getAll();
      // API 返回 { success: true, data: [...], count: n }
      setProducts(response.data || []);
    } catch (err) {
      console.error('Failed to load products:', err);
      setError('無法載入產品資料，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.product_name_zh?.toLowerCase().includes(search.toLowerCase()) ||
      product.product_name_en?.toLowerCase().includes(search.toLowerCase()) ||
      product.sku?.toLowerCase().includes(search.toLowerCase())
  );

  const formatPrice = (price, currency) => {
    if (!price) return '-';
    return new Intl.NumberFormat('zh-TW', {
      style: 'currency',
      currency: currency || 'TWD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <Layout title="產品管理">
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-emerald-600" />
          <span className="ml-3 text-slate-600">載入中...</span>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="產品管理">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={loadProducts}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              重試
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="產品管理">
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="搜尋產品名稱或 SKU..."
          />
          <button
            onClick={() => navigate('/products/new')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            <Plus size={20} />
            新增產品
          </button>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.sku}
                onClick={() => navigate(`/products/${product.sku}`)}
                className="hover:border-emerald-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center flex-shrink-0">
                    <ShoppingBag size={24} className="text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-slate-900 truncate">
                          {product.product_name_zh || product.product_name_en || product.sku}
                        </h3>
                        <p className="text-sm text-slate-500">{product.product_name_en}</p>
                      </div>
                      {product.status && <Badge status={product.status}>{product.status}</Badge>}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{product.sku}</p>
                    <div className="flex items-center justify-between mt-3">
                      {product.category_major && <Badge variant="default">{product.category_major}</Badge>}
                      <span className="font-semibold text-slate-900">
                        {formatPrice(product.price, product.currency)}
                      </span>
                    </div>
                    {(product.volume || product.volume_unit) && (
                      <p className="text-sm text-slate-500 mt-1">
                        {product.volume} {product.volume_unit}
                      </p>
                    )}
                    {product.core_benefits?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {product.core_benefits.slice(0, 3).map((benefit, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-xs"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    )}
                    {product.brand_name_zh && (
                      <p className="text-xs text-slate-400 mt-2">{product.brand_name_zh}</p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={ShoppingBag}
            title="沒有找到產品"
            description={search ? '嘗試使用不同的搜尋條件' : '資料庫中尚無產品資料'}
            action="新增產品"
            onAction={() => navigate('/products/new')}
          />
        )}
      </div>
    </Layout>
  );
}

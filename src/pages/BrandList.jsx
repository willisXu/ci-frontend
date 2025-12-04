import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Building2, Loader2 } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Badge from '../components/Badge';
import SearchBar from '../components/SearchBar';
import EmptyState from '../components/EmptyState';
import { brandAPI } from '../services/api';

export default function BrandList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await brandAPI.getAll();
      // API 返回 { success: true, data: [...], count: n }
      setBrands(response.data || []);
    } catch (err) {
      console.error('Failed to load brands:', err);
      setError('無法載入品牌資料，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  const filteredBrands = brands.filter(
    (brand) =>
      brand.brand_name_zh?.toLowerCase().includes(search.toLowerCase()) ||
      brand.brand_name_en?.toLowerCase().includes(search.toLowerCase()) ||
      brand.brand_code?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <Layout title="品牌管理">
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-blue-600" />
          <span className="ml-3 text-slate-600">載入中...</span>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="品牌管理">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={loadBrands}
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
    <Layout title="品牌管理">
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="搜尋品牌名稱或代號..."
          />
          <button
            onClick={() => navigate('/brands/new')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            <Plus size={20} />
            新增品牌
          </button>
        </div>

        {/* Brand Grid */}
        {filteredBrands.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBrands.map((brand) => (
              <Card
                key={brand.brand_code}
                onClick={() => navigate(`/brands/${brand.brand_code}`)}
                className="hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center flex-shrink-0">
                    <Building2 size={24} className="text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-slate-900 truncate">
                          {brand.brand_name_zh || brand.brand_name_en || brand.brand_code}
                        </h3>
                        <p className="text-sm text-slate-500">{brand.brand_name_en}</p>
                      </div>
                      {brand.status && <Badge status={brand.status}>{brand.status}</Badge>}
                    </div>
                    {brand.group_name && (
                      <p className="text-sm text-slate-500 mt-2">{brand.group_name}</p>
                    )}
                    <div className="flex items-center gap-2 mt-3">
                      {brand.priority && <Badge status={brand.priority}>{brand.priority}</Badge>}
                      {brand.positioning_tier && <Badge status={brand.positioning_tier}>{brand.positioning_tier}</Badge>}
                    </div>
                    {brand.key_ingredients_focus?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {brand.key_ingredients_focus.slice(0, 3).map((ing, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Building2}
            title="沒有找到品牌"
            description={search ? '嘗試使用不同的搜尋條件' : '資料庫中尚無品牌資料'}
            action="新增品牌"
            onAction={() => navigate('/brands/new')}
          />
        )}
      </div>
    </Layout>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FlaskConical, Loader2 } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Badge from '../components/Badge';
import SearchBar from '../components/SearchBar';
import EmptyState from '../components/EmptyState';
import { materialAPI } from '../services/api';

export default function MaterialList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await materialAPI.getAll();
      // API 返回 { success: true, data: [...], count: n }
      setMaterials(response.data || []);
    } catch (err) {
      console.error('Failed to load materials:', err);
      setError('無法載入原物料資料，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  const filteredMaterials = materials.filter(
    (material) =>
      material.name_zh?.toLowerCase().includes(search.toLowerCase()) ||
      material.name_en?.toLowerCase().includes(search.toLowerCase()) ||
      material.inci?.toLowerCase().includes(search.toLowerCase()) ||
      material.material_code?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <Layout title="原物料管理">
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-purple-600" />
          <span className="ml-3 text-slate-600">載入中...</span>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="原物料管理">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={loadMaterials}
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
    <Layout title="原物料管理">
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="搜尋原料名稱、INCI 或代碼..."
          />
          <button
            onClick={() => navigate('/materials/new')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            <Plus size={20} />
            新增原料
          </button>
        </div>

        {/* Material Grid */}
        {filteredMaterials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material) => (
              <Card
                key={material.material_code}
                onClick={() => navigate(`/materials/${material.material_code}`)}
                className="hover:border-purple-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center flex-shrink-0">
                    <FlaskConical size={24} className="text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-slate-900 truncate">
                          {material.name_zh || material.name_en || material.material_code}
                        </h3>
                        <p className="text-sm text-slate-500">{material.name_en}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{material.material_code}</p>
                    <div className="flex items-center gap-2 mt-3">
                      {material.material_type_major && (
                        <Badge variant="purple">{material.material_type_major}</Badge>
                      )}
                      {material.dosage_range && (
                        <span className="text-xs text-slate-500">{material.dosage_range}</span>
                      )}
                    </div>
                    {material.core_efficacy && (
                      <p className="text-sm text-slate-600 mt-2">{material.core_efficacy}</p>
                    )}
                    {material.function_categories?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {material.function_categories.slice(0, 3).map((func, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded text-xs"
                          >
                            {func}
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
            icon={FlaskConical}
            title="沒有找到原料"
            description={search ? '嘗試使用不同的搜尋條件' : '資料庫中尚無原物料資料'}
            action="新增原料"
            onAction={() => navigate('/materials/new')}
          />
        )}
      </div>
    </Layout>
  );
}

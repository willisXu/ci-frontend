import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Edit2, Trash2 } from 'lucide-react';
import Layout from '../components/Layout';
import FormSection from '../components/FormSection';
import Toast from '../components/Toast';
import { PRODUCT_SCHEMA } from '../config/schema';

// 模擬資料
const mockProductData = {
  'LM-CR-001': {
    sku: 'LM-CR-001',
    product_name_zh: '經典乳霜',
    product_name_en: 'Crème de la Mer',
    brand_code: 'COMP-L01',
    status: 'OnSale',
    template_version: 'v2.0',
    core_benefits: ['抗老', '修復', '保濕'],
    full_benefits: ['抗老', '修復', '保濕', '緊緻', '淡紋'],
    scenarios: ['日常保養', '特殊修護'],
    usp_1: '海洋傳奇修復能量',
    usp_2: 'Miracle Broth 專利成分',
    usp_3: '60年傳奇配方',
    category_major: '乳霜',
    category_minor: '修護霜',
    volume: 60,
    volume_unit: 'ml',
    price: 12500,
    currency: 'TWD',
    unit_price_per_ml: 208.33,
    price_tier: '奢華',
    texture: '豐潤滋養',
    texture_tags: ['綿密', '滋潤'],
    scent: '淡雅海洋香',
    shelf_life_closed: 36,
    pao: 12,
    origin: '美國',
    key_ingredients: '海藻精華|高濃度|修復|天然;維他命E|適量|抗氧化|天然',
    target_skin_types: ['乾性', '中性'],
    target_problems: ['抗老', '修復'],
    target_ages: ['35-44', '45-54'],
    seasons: ['全年'],
    usage_guide: '取適量於指尖，以按壓方式塗抹於臉部',
    frequency: '早晚各一次',
    last_updated_at: '2024-01-15 10:30:00',
    last_updated_by: 'admin',
    version: 5,
  },
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [data, setData] = useState({});
  const [isEditing, setIsEditing] = useState(isNew);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!isNew && id) {
      const productData = mockProductData[id];
      if (productData) {
        setData(productData);
      }
    }
  }, [id, isNew]);

  const handleSave = () => {
    console.log('Saving:', data);
    setToast({ message: '儲存成功', type: 'success' });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('確定要刪除此產品嗎？')) {
      console.log('Deleting:', id);
      setToast({ message: '刪除成功', type: 'success' });
      setTimeout(() => navigate('/products'), 1000);
    }
  };

  return (
    <Layout title={isNew ? '新增產品' : data.product_name_zh || '產品詳情'}>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/products')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>返回列表</span>
          </button>

          <div className="flex items-center gap-3">
            {!isNew && !isEditing && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <Edit2 size={18} />
                  編輯
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={18} />
                  刪除
                </button>
              </>
            )}
            {isEditing && (
              <>
                {!isNew && (
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    取消
                  </button>
                )}
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save size={18} />
                  儲存
                </button>
              </>
            )}
          </div>
        </div>

        {/* Form Sections */}
        <div className="space-y-4">
          {PRODUCT_SCHEMA.map((section) => (
            <FormSection
              key={section.title}
              section={section}
              data={data}
              onChange={setData}
              isEditing={isEditing}
            />
          ))}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </Layout>
  );
}

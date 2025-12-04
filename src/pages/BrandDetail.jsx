import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Edit2, Trash2 } from 'lucide-react';
import Layout from '../components/Layout';
import FormSection from '../components/FormSection';
import Toast from '../components/Toast';
import { BRAND_SCHEMA } from '../config/schema';

// 模擬資料
const mockBrandData = {
  'COMP-L01': {
    brand_code: 'COMP-L01',
    brand_name_zh: 'La Mer',
    brand_name_en: 'La Mer',
    group_name: '雅詩蘭黛集團',
    priority: 'High',
    positioning_tier: 'Luxury',
    price_range_note: 'TWD 5,000-25,000',
    tagline: 'The Miracle Broth',
    philosophy: '以海洋為靈感，結合科技與自然的頂級護膚品牌',
    visual_style: '簡約奢華，海洋藍綠色系',
    key_ingredients_focus: ['海洋精華', '深海酵素', 'Miracle Broth'],
    target_ages: ['35-44', '45-54'],
    target_skin_types: ['乾性', '中性'],
    skin_problems: ['抗老', '修復', '保濕'],
    main_channels: ['百貨專櫃', '官網電商'],
    kol_strategy: '與高端時尚 KOL 合作，強調奢華體驗',
    hero_product_1: '經典乳霜|乳霜|深層修護|TWD 12,500',
    hero_product_2: '修護精華|精華液|快速修復|TWD 8,800',
    categories_covered: ['精華液', '乳霜', '眼霜', '化妝水'],
    core_benefits: ['抗老', '修復', '保濕'],
    favorite_ingredients: ['海洋精華', '藻類萃取'],
    official_links: 'https://www.cremedelamer.com',
    status: 'Published',
    last_updated_at: '2024-01-15 10:30:00',
    last_updated_by: 'admin',
    version: 3,
  },
};

export default function BrandDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [data, setData] = useState({});
  const [isEditing, setIsEditing] = useState(isNew);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!isNew && id) {
      // 模擬 API 載入
      const brandData = mockBrandData[id];
      if (brandData) {
        setData(brandData);
      }
    }
  }, [id, isNew]);

  const handleSave = () => {
    // 模擬儲存
    console.log('Saving:', data);
    setToast({ message: '儲存成功', type: 'success' });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('確定要刪除此品牌嗎？')) {
      console.log('Deleting:', id);
      setToast({ message: '刪除成功', type: 'success' });
      setTimeout(() => navigate('/brands'), 1000);
    }
  };

  return (
    <Layout title={isNew ? '新增品牌' : data.brand_name_zh || '品牌詳情'}>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/brands')}
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
          {BRAND_SCHEMA.map((section) => (
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

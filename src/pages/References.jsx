import { useState } from 'react';
import { Tags, Plus, X, Edit2, Check } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';

const initialCategories = {
  skin_types: {
    label: '膚質類型',
    items: ['乾性', '中性', '油性', '混合性', '敏感性'],
  },
  age_groups: {
    label: '年齡層',
    items: ['18-24', '25-34', '35-44', '45-54', '55+'],
  },
  skin_problems: {
    label: '肌膚問題',
    items: ['抗老', '保濕', '美白', '控油', '抗痘', '修復', '緊緻', '淡斑', '毛孔', '暗沉'],
  },
  categories: {
    label: '產品品類',
    items: ['精華液', '乳霜', '化妝水', '面膜', '防曬', '潔顏', '眼霜', '唇部', '身體', '卸妝'],
  },
  channels: {
    label: '銷售通路',
    items: ['百貨專櫃', '官網電商', '屈臣氏', '康是美', '電視購物', 'LINE 購物', 'momo', 'PChome'],
  },
  certifications: {
    label: '認證標章',
    items: ['COSMOS', 'ECOCERT', 'Vegan', 'Cruelty-Free', '有機認證', 'ISO 22716', 'GMP'],
  },
  positioning: {
    label: '品牌定位',
    items: ['Luxury', 'High-End', 'Dermo', 'Mass', 'Salon'],
  },
  material_types: {
    label: '原料分類',
    items: ['保濕劑', '活性成分', '油脂', '乳化劑', '防腐劑', '香料', '色素', '界面活性劑', '增稠劑'],
  },
};

export default function References() {
  const [categories, setCategories] = useState(initialCategories);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newItem, setNewItem] = useState('');

  const handleAddItem = (categoryKey) => {
    if (!newItem.trim()) return;

    setCategories((prev) => ({
      ...prev,
      [categoryKey]: {
        ...prev[categoryKey],
        items: [...prev[categoryKey].items, newItem.trim()],
      },
    }));
    setNewItem('');
  };

  const handleRemoveItem = (categoryKey, index) => {
    setCategories((prev) => ({
      ...prev,
      [categoryKey]: {
        ...prev[categoryKey],
        items: prev[categoryKey].items.filter((_, i) => i !== index),
      },
    }));
  };

  return (
    <Layout title="參考資料">
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
        <div className="flex items-center gap-3 text-slate-600">
          <Tags size={20} />
          <p>管理系統中使用的下拉選項與參考資料</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(categories).map(([key, category]) => (
            <Card key={key}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900">{category.label}</h3>
                <button
                  onClick={() => setEditingCategory(editingCategory === key ? null : key)}
                  className={`p-2 rounded-lg transition-colors ${
                    editingCategory === key
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {editingCategory === key ? <Check size={18} /> : <Edit2 size={18} />}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.items.map((item, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-slate-100 text-slate-700"
                  >
                    {item}
                    {editingCategory === key && (
                      <button
                        onClick={() => handleRemoveItem(key, index)}
                        className="ml-1 text-slate-400 hover:text-red-500"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </span>
                ))}
              </div>

              {editingCategory === key && (
                <div className="flex gap-2 mt-4">
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddItem(key)}
                    placeholder="新增項目..."
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => handleAddItem(key)}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}

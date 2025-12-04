import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Edit2, Trash2 } from 'lucide-react';
import Layout from '../components/Layout';
import FormSection from '../components/FormSection';
import Toast from '../components/Toast';
import { MATERIAL_SCHEMA } from '../config/schema';

// 模擬資料
const mockMaterialData = {
  'MAT-001': {
    material_code: 'MAT-001',
    supplier_code: 'SUP-001',
    name_zh: '玻尿酸鈉',
    name_en: 'Sodium Hyaluronate',
    inci: 'Sodium Hyaluronate',
    alias: '透明質酸鈉、HA',
    material_type_major: '保濕劑',
    material_type_minor: ['多醣類', '生物技術'],
    appearance: '白色至淡黃色粉末',
    physical_form: '粉末',
    color_options: '白色',
    odor: '無味',
    origin_place: '日本',
    composition_main: '透明質酸鈉',
    cas: '9067-32-7',
    function_categories: ['保濕', '修復', '抗老'],
    core_efficacy: '高效保濕鎖水',
    mechanism: '透過形成保濕膜，減少經皮水分散失，並深入角質層補充水分',
    pathways: ['表皮保濕', '真皮填充'],
    skin_layer: ['角質層', '表皮層', '真皮層'],
    dosage_range: '0.1-2%',
    sensitive_dosage: '0.1-0.5%',
    onset_time: '即時保濕',
    compatible_with: '大部分成分相容',
    avoid_with: '強酸強鹼環境',
    formula_ph_range: '5.0-7.0',
    add_phase: '水相',
    max_add_temp: 40,
    applicable_products: ['精華液', '化妝水', '乳液', '面膜'],
    skin_types_fit: ['全膚質'],
    regulations_tw: '一般化粧品成分',
    storage_conditions: '陰涼乾燥處',
    storage_temp_range: '15-25°C',
    shelf_life_months: 24,
    certifications: ['COSMOS', 'ECOCERT'],
    biodegradable: true,
    natural_ratio: 100,
    last_updated_at: '2024-01-10 09:15:00',
    last_updated_by: 'admin',
    version: 4,
  },
};

export default function MaterialDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [data, setData] = useState({});
  const [isEditing, setIsEditing] = useState(isNew);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!isNew && id) {
      const materialData = mockMaterialData[id];
      if (materialData) {
        setData(materialData);
      }
    }
  }, [id, isNew]);

  const handleSave = () => {
    console.log('Saving:', data);
    setToast({ message: '儲存成功', type: 'success' });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('確定要刪除此原料嗎？')) {
      console.log('Deleting:', id);
      setToast({ message: '刪除成功', type: 'success' });
      setTimeout(() => navigate('/materials'), 1000);
    }
  };

  return (
    <Layout title={isNew ? '新增原料' : data.name_zh || '原料詳情'}>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/materials')}
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
          {MATERIAL_SCHEMA.map((section) => (
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

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Edit2, Trash2, Loader2 } from 'lucide-react';
import Layout from '../components/Layout';
import FormSection from '../components/FormSection';
import Toast from '../components/Toast';
import { MATERIAL_SCHEMA } from '../config/schema';
import { materialAPI } from '../services/api';

export default function MaterialDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [data, setData] = useState({});
  const [isEditing, setIsEditing] = useState(isNew);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!isNew && id) {
      loadMaterial();
    }
  }, [id, isNew]);

  const loadMaterial = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await materialAPI.getById(id);
      if (response.success && response.data) {
        setData(response.data);
      } else {
        setError('找不到此原料資料');
      }
    } catch (err) {
      console.error('Failed to load material:', err);
      setError('無法載入原料資料，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      if (isNew) {
        await materialAPI.create(data);
        setToast({ message: '新增成功', type: 'success' });
        setTimeout(() => navigate('/materials'), 1000);
      } else {
        await materialAPI.update(id, data);
        setToast({ message: '儲存成功', type: 'success' });
        setIsEditing(false);
      }
    } catch (err) {
      console.error('Failed to save material:', err);
      setToast({ message: '儲存失敗，請稍後再試', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('確定要刪除此原料嗎？')) {
      try {
        setLoading(true);
        await materialAPI.delete(id);
        setToast({ message: '刪除成功', type: 'success' });
        setTimeout(() => navigate('/materials'), 1000);
      } catch (err) {
        console.error('Failed to delete material:', err);
        setToast({ message: '刪除失敗，請稍後再試', type: 'error' });
        setLoading(false);
      }
    }
  };

  if (loading && !isNew) {
    return (
      <Layout title="載入中...">
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-purple-600" />
          <span className="ml-3 text-slate-600">載入中...</span>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="原料詳情">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/materials')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            <span>返回列表</span>
          </button>
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={loadMaterial}
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

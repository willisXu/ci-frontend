import { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, X } from 'lucide-react';

export default function FormSection({ section, data, onChange, isEditing }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleFieldChange = (key, value) => {
    onChange({ ...data, [key]: value });
  };

  const handleTagAdd = (key, currentTags = []) => {
    const newTag = prompt('輸入新標籤:');
    if (newTag && newTag.trim()) {
      handleFieldChange(key, [...currentTags, newTag.trim()]);
    }
  };

  const handleTagRemove = (key, currentTags, index) => {
    const newTags = currentTags.filter((_, i) => i !== index);
    handleFieldChange(key, newTags);
  };

  const renderField = (field) => {
    const value = data?.[field.key] ?? '';
    const isReadOnly = field.readOnly || !isEditing;

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            readOnly={isReadOnly}
            rows={3}
            className={`
              w-full px-3 py-2 rounded-lg border transition-all
              ${isReadOnly
                ? 'bg-slate-50 text-slate-500 border-slate-200 cursor-not-allowed'
                : 'bg-white text-slate-900 border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              }
            `}
            placeholder={field.placeholder}
          />
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            disabled={isReadOnly}
            className={`
              w-full px-3 py-2 rounded-lg border transition-all
              ${isReadOnly
                ? 'bg-slate-50 text-slate-500 border-slate-200 cursor-not-allowed'
                : 'bg-white text-slate-900 border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              }
            `}
          >
            <option value="">請選擇</option>
            {field.options?.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={value === true || value === 'true'}
              onChange={(e) => handleFieldChange(field.key, e.target.checked)}
              disabled={isReadOnly}
              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-slate-600">是</span>
          </label>
        );

      case 'tags':
        const tags = Array.isArray(value) ? value : [];
        return (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700"
                >
                  {tag}
                  {isEditing && (
                    <button
                      onClick={() => handleTagRemove(field.key, tags, index)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <X size={12} />
                    </button>
                  )}
                </span>
              ))}
              {isEditing && (
                <button
                  onClick={() => handleTagAdd(field.key, tags)}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100"
                >
                  <Plus size={12} />
                  新增
                </button>
              )}
            </div>
            {tags.length === 0 && !isEditing && (
              <span className="text-sm text-slate-400">-</span>
            )}
          </div>
        );

      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(field.key, e.target.value ? Number(e.target.value) : '')}
            readOnly={isReadOnly}
            className={`
              w-full px-3 py-2 rounded-lg border transition-all
              ${isReadOnly
                ? 'bg-slate-50 text-slate-500 border-slate-200 cursor-not-allowed'
                : 'bg-white text-slate-900 border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              }
            `}
            placeholder={field.placeholder}
          />
        );

      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            readOnly={isReadOnly}
            className={`
              w-full px-3 py-2 rounded-lg border transition-all
              ${isReadOnly
                ? 'bg-slate-50 text-slate-500 border-slate-200 cursor-not-allowed'
                : 'bg-white text-slate-900 border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              }
            `}
            placeholder={field.placeholder}
          />
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
      >
        <h3 className="font-semibold text-slate-900">{section.title}</h3>
        {isOpen ? (
          <ChevronUp size={20} className="text-slate-400" />
        ) : (
          <ChevronDown size={20} className="text-slate-400" />
        )}
      </button>

      {isOpen && (
        <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {section.fields.map((field) => (
            <div
              key={field.key}
              className={field.type === 'textarea' || field.type === 'tags' ? 'md:col-span-2' : ''}
            >
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {renderField(field)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

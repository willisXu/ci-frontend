import { Search, Filter, X } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  placeholder = '搜尋...',
  onFilter,
  showFilter = true,
}) {
  return (
    <div className="flex gap-3">
      <div className="relative flex-1 max-w-md">
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        )}
      </div>
      {showFilter && onFilter && (
        <button
          onClick={onFilter}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <Filter size={18} />
          <span>篩選</span>
        </button>
      )}
    </div>
  );
}

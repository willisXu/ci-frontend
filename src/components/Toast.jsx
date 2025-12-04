import { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <div
        className={`
          flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg
          ${type === 'success' ? 'bg-emerald-600' : 'bg-red-600'}
          text-white
        `}
      >
        {type === 'success' ? (
          <CheckCircle2 size={20} />
        ) : (
          <AlertCircle size={20} />
        )}
        <span className="font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 p-1 rounded hover:bg-white/20 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

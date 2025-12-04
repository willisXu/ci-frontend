const variants = {
  default: 'bg-slate-100 text-slate-700',
  primary: 'bg-blue-100 text-blue-700',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
  purple: 'bg-purple-100 text-purple-700',
  pink: 'bg-pink-100 text-pink-700',
};

const statusMap = {
  // Brand/Material status
  Draft: 'warning',
  Published: 'success',
  Archived: 'default',
  // Product status
  OnSale: 'success',
  ComingSoon: 'warning',
  Discontinued: 'danger',
  // Priority
  High: 'danger',
  Medium: 'warning',
  Low: 'default',
  // Positioning
  Luxury: 'purple',
  'High-End': 'pink',
  Dermo: 'primary',
  Mass: 'default',
  Salon: 'success',
};

export default function Badge({ children, variant, status }) {
  const resolvedVariant = status ? statusMap[status] || 'default' : variant || 'default';

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${variants[resolvedVariant]}
      `}
    >
      {children}
    </span>
  );
}

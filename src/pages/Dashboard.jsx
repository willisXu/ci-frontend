import { Building2, ShoppingBag, FlaskConical, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';

const stats = [
  {
    label: '品牌總數',
    value: 24,
    change: '+3',
    trend: 'up',
    icon: Building2,
    color: 'blue',
  },
  {
    label: '產品總數',
    value: 156,
    change: '+12',
    trend: 'up',
    icon: ShoppingBag,
    color: 'emerald',
  },
  {
    label: '原物料總數',
    value: 89,
    change: '+5',
    trend: 'up',
    icon: FlaskConical,
    color: 'purple',
  },
  {
    label: '本月更新',
    value: 47,
    change: '-2',
    trend: 'down',
    icon: Clock,
    color: 'amber',
  },
];

const recentUpdates = [
  { type: 'brand', name: 'La Mer', action: '更新品牌資料', time: '10 分鐘前' },
  { type: 'product', name: '極緻修護精華', action: '新增產品', time: '30 分鐘前' },
  { type: 'material', name: '玻尿酸鈉', action: '更新原料資料', time: '1 小時前' },
  { type: 'brand', name: 'SK-II', action: '更新行銷策略', time: '2 小時前' },
  { type: 'product', name: '青春露', action: '更新成分資訊', time: '3 小時前' },
];

const colorMap = {
  blue: 'bg-blue-100 text-blue-600',
  emerald: 'bg-emerald-100 text-emerald-600',
  purple: 'bg-purple-100 text-purple-600',
  amber: 'bg-amber-100 text-amber-600',
};

export default function Dashboard() {
  return (
    <Layout title="儀表板">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === 'up' ? (
                      <TrendingUp size={16} className="text-emerald-500" />
                    ) : (
                      <TrendingDown size={16} className="text-red-500" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-sm text-slate-400">本月</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${colorMap[stat.color]}`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Updates */}
          <Card>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">最近更新</h2>
            <div className="space-y-4">
              {recentUpdates.map((update, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div
                    className={`
                      w-10 h-10 rounded-lg flex items-center justify-center
                      ${update.type === 'brand' ? 'bg-blue-100' : ''}
                      ${update.type === 'product' ? 'bg-emerald-100' : ''}
                      ${update.type === 'material' ? 'bg-purple-100' : ''}
                    `}
                  >
                    {update.type === 'brand' && <Building2 size={20} className="text-blue-600" />}
                    {update.type === 'product' && <ShoppingBag size={20} className="text-emerald-600" />}
                    {update.type === 'material' && <FlaskConical size={20} className="text-purple-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 truncate">{update.name}</p>
                    <p className="text-sm text-slate-500">{update.action}</p>
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap">{update.time}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">品牌分布</h2>
            <div className="space-y-4">
              {[
                { tier: 'Luxury', count: 6, percent: 25, color: 'bg-purple-500' },
                { tier: 'High-End', count: 8, percent: 33, color: 'bg-pink-500' },
                { tier: 'Dermo', count: 5, percent: 21, color: 'bg-blue-500' },
                { tier: 'Mass', count: 3, percent: 13, color: 'bg-slate-400' },
                { tier: 'Salon', count: 2, percent: 8, color: 'bg-emerald-500' },
              ].map((item) => (
                <div key={item.tier}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700">{item.tier}</span>
                    <span className="text-sm text-slate-500">{item.count} 品牌</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-500`}
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Info Banner */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 border-0">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">歡迎使用美妝競品情報系統</h3>
              <p className="text-blue-100 mt-1">
                追蹤競品品牌動態、分析產品資訊、管理原物料數據
              </p>
            </div>
            <button className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              開始使用
            </button>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

import React from 'react';
import { ViewState, User, Order } from '../types';
import { Card, Button, StatusBadge } from '../components/UIComponents';
import { USAGE_DATA, COLORS } from '../constants';
import { ArrowRight, Wifi, Package, CreditCard, Activity, Truck, AlertTriangle, Bell } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface DashboardProps {
  user: User;
  orders: Order[];
  setView: (view: ViewState) => void;
  onOrderSelect: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, orders, setView, onOrderSelect }) => {
  const isDarkMode = document.documentElement.classList.contains('dark');
  const chartTextColor = isDarkMode ? '#9ca3af' : '#6b7280';
  const chartGridColor = isDarkMode ? '#4c1d95' : '#f3f4f6';

  const quickActions = [
    { label: 'Bills & Payments', icon: CreditCard, desc: 'View, pay & download' },
    { label: 'Usage & Service', icon: Activity, desc: 'Check status & speed' },
    { label: 'Manage Broadband', icon: Wifi, desc: 'Wi-Fi & Hub settings' },
    { label: 'Orders & Apps', icon: Truck, desc: 'Track & appointments' },
    { label: 'Faults & Support', icon: AlertTriangle, desc: 'Report issues & chat' },
    { label: 'Notifications', icon: Bell, desc: 'Alerts & updates' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#5514B4] to-[#330072] dark:from-[#4c1d95] dark:to-[#1a003a] rounded-lg shadow-lg p-8 text-white relative overflow-hidden border dark:border-[#5514B4]">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Hello, {user.companyName}</h1>
          <p className="opacity-90 max-w-xl text-lg">
            Your network is secure. You have {orders.filter(o => o.status === 'In Progress').length} order(s) currently in progress.
          </p>
          <div className="mt-6 flex gap-4">
            <button 
                onClick={() => setView(ViewState.PRODUCTS)}
                className="bg-white text-[#5514B4] px-4 py-2 rounded font-bold hover:bg-gray-100 dark:bg-[#f9fafb] dark:hover:bg-white transition-colors"
            >
                Browse Marketplace
            </button>
            <button 
                onClick={() => setView(ViewState.RAISE_TICKET)}
                className="bg-transparent border border-white text-white px-4 py-2 rounded font-bold hover:bg-white/10 transition-colors"
            >
                Get Support
            </button>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-10 transform skew-x-12 bg-white"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2" title="Broadband Usage (Last 7 Days)">
            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={USAGE_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorDownload" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={COLORS.BT_PURPLE} stopOpacity={0.1}/>
                                <stop offset="95%" stopColor={COLORS.BT_PURPLE} stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorUpload" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={COLORS.BT_DARK_PURPLE} stopOpacity={0.1}/>
                                <stop offset="95%" stopColor={COLORS.BT_DARK_PURPLE} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: chartTextColor}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: chartTextColor}} />
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={chartGridColor} />
                        <Tooltip 
                            contentStyle={{ 
                                borderRadius: '8px', 
                                border: isDarkMode ? '1px solid #4c1d95' : 'none', 
                                backgroundColor: isDarkMode ? '#250055' : 'white',
                                color: isDarkMode ? '#f9fafb' : '#111827',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                            }}
                        />
                        <Area type="monotone" dataKey="download" stroke={COLORS.BT_PURPLE} fillOpacity={1} fill="url(#colorDownload)" strokeWidth={2} name="Download (Mbps)" />
                        <Area type="monotone" dataKey="upload" stroke={COLORS.BT_DARK_PURPLE} fillOpacity={1} fill="url(#colorUpload)" strokeWidth={2} name="Upload (Mbps)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#5514B4] mr-2"></div> Download
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#330072] mr-2"></div> Upload
                </div>
            </div>
        </Card>

        <div className="space-y-6">
            <Card title="Service Status">
                <div className="flex items-center text-[#6CBC35] mb-2">
                    <Wifi className="w-6 h-6 mr-3" />
                    <span className="font-bold text-lg">Connected</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">BT Business Smart Hub 2</p>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-[#4c1d95] space-y-2">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 dark:text-gray-400">IP Address</span>
                        <span className="font-mono text-[#330072] dark:text-[#f9fafb]">212.58.244.1</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Speed Test</span>
                        <span className="text-[#5514B4] dark:text-[#f9fafb] font-semibold cursor-pointer hover:underline">Run Test</span>
                    </div>
                </div>
            </Card>

            <Card title="Recent Orders" action={<button onClick={() => setView(ViewState.ORDERS)} className="text-[#5514B4] dark:text-[#f9fafb] text-sm font-semibold hover:underline">View All</button>}>
                <div className="space-y-4">
                    {orders.slice(0, 3).map(order => (
                        <div 
                          key={order.id} 
                          onClick={() => onOrderSelect(order.id)} 
                          className="flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 p-2 -mx-2 rounded transition-all group"
                        >
                            <div className="flex items-center">
                                <div className="bg-purple-50 dark:bg-[#1a003a] p-2 rounded-md mr-3 group-hover:bg-purple-100 dark:group-hover:bg-[#250055] transition-colors">
                                    <Package className="w-4 h-4 text-[#5514B4] dark:text-[#f9fafb]" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-[#f9fafb] line-clamp-1 max-w-[120px]">{order.item}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{order.date}</p>
                                </div>
                            </div>
                            <StatusBadge status={order.status} />
                        </div>
                    ))}
                    {orders.length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-4">No recent orders.</p>
                    )}
                </div>
            </Card>
        </div>
    </div>

      <h2 className="text-xl font-bold text-[#5514B4] dark:text-[#f9fafb]">Manage Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((item, i) => (
            <button key={i} className="bg-white dark:bg-[#250055] p-5 rounded-lg border border-gray-200 dark:border-[#4c1d95] shadow-sm hover:shadow-md transition-all flex items-center justify-between group text-left">
                <div className="flex items-center">
                     <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-[#1a003a] flex items-center justify-center mr-4 group-hover:bg-[#5514B4] group-hover:text-white transition-colors text-[#5514B4] dark:text-[#f9fafb]">
                        <item.icon className="w-5 h-5" />
                     </div>
                     <div>
                        <span className="font-bold text-[#330072] dark:text-[#f9fafb] block">{item.label}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</span>
                     </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-[#5514B4] dark:group-hover:text-[#f9fafb] transition-colors" />
            </button>
        ))}
      </div>
    </div>
  );
};
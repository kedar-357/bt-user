import React from 'react';
import { ViewState, Order } from '../types';
import { StatusBadge, Card, Button } from '../components/UIComponents';
import { Package, Search, Filter, ArrowLeft, Info, Calendar, Box, Truck } from 'lucide-react';
import { ProgressTracker, ORDER_STAGES } from '../components/ProgressTracker';

interface OrdersProps {
  orders: Order[];
  setView: (view: ViewState) => void;
  activeOrderId: string | null;
  onOrderSelect: (id: string | null) => void;
}

export const Orders: React.FC<OrdersProps> = ({ orders, setView, activeOrderId, onOrderSelect }) => {
  const selectedOrder = orders.find(o => o.id === activeOrderId);

  const getStageDescription = (stage: number) => {
    switch(stage) {
      case 0: return "Verification: We are verifying your order details and payment method.";
      case 1: return "Processing: Order has been entered into our system and is being processed.";
      case 2: return "Inventory: Checking stock availability for your requested items.";
      case 3: return "Agent Assign: A dedicated fulfillment agent has been assigned to your order.";
      case 4: return "Procurement: Items are being picked or procured from suppliers.";
      case 5: return "Setup: Hardware is being configured and software pre-loaded.";
      case 6: return "Done: Final quality checks completed. Ready for activation.";
      case 7: return "Activated: Your service is live and fully operational!";
      default: return "Awaiting next steps.";
    }
  };

  if (selectedOrder) {
    const stage = selectedOrder.trackingStage || 0;
    const currentStageInfo = ORDER_STAGES[stage];

    return (
        <div className="space-y-6 animate-fade-in pb-12">
            <button 
                onClick={() => onOrderSelect(null)} 
                className="flex items-center text-gray-500 dark:text-gray-400 hover:text-[#5514B4] dark:hover:text-[#f9fafb] mb-4 transition-colors font-medium"
            >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to My Orders
            </button>

            {/* Tracking Header - Matched to Screenshot */}
            <div className="bg-white dark:bg-[#1a003a] p-5 rounded-t-lg flex justify-between items-center border-b border-gray-100 dark:border-[#4c1d95] shadow-sm">
                <p className="text-sm font-extrabold text-[#5514B4] dark:text-purple-300 uppercase tracking-widest">
                    ESTIMATED COMPLETION: {selectedOrder.estimatedCompletion || 'NOV 24, 2023'}
                </p>
                <p className="text-sm font-medium text-gray-400 dark:text-gray-500">
                    Order ID: {selectedOrder.id}
                </p>
            </div>

            <div className="bg-white dark:bg-[#250055] rounded-b-lg shadow-sm border border-t-0 border-gray-100 dark:border-[#4c1d95] p-8 lg:p-12 mb-8 overflow-hidden">
                <ProgressTracker currentStage={stage} />
                
                <div className="mt-8 border-t border-gray-50 dark:border-[#4c1d95] pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-start">
                        <div className="w-12 h-12 bg-[#5514B4] dark:bg-[#1a003a] rounded-full flex items-center justify-center text-white dark:text-purple-300 shadow-sm mr-5 flex-shrink-0">
                            <Info className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-[#330072] dark:text-[#f9fafb]">Stage {stage + 1}: {currentStageInfo.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 max-w-xl">{getStageDescription(stage)}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 w-full md:w-auto">
                        <Button variant="primary" className="whitespace-nowrap shadow-lg">
                            {stage === 7 ? 'Manage Service' : 'View Status History'}
                        </Button>
                        {stage === 5 && (
                            <Button variant="outline" className="whitespace-nowrap">Configure Settings</Button>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Package Details">
                    <div className="space-y-4">
                        <div className="flex justify-between pb-3 border-b border-gray-50 dark:border-[#1a003a]">
                            <span className="text-gray-500 dark:text-gray-400">Order Item</span>
                            <span className="font-bold text-[#330072] dark:text-[#f9fafb] text-right">{selectedOrder.item}</span>
                        </div>
                        <div className="flex justify-between pb-3 border-b border-gray-50 dark:border-[#1a003a]">
                            <span className="text-gray-500 dark:text-gray-400">Request Date</span>
                            <span className="text-[#330072] dark:text-[#f9fafb]">{selectedOrder.date}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Total Price</span>
                            <span className="font-black text-[#5514B4] dark:text-purple-300">£{selectedOrder.amount.toFixed(2)}</span>
                        </div>
                    </div>
                </Card>

                <Card title="Next Steps">
                    <div className="space-y-4">
                        <div className={`flex items-center text-sm ${stage >= 3 ? 'text-[#6CBC35] font-bold' : 'text-gray-600 dark:text-gray-400'}`}>
                            <Box className={`w-5 h-5 mr-4 ${stage >= 3 ? 'text-[#6CBC35]' : 'text-gray-300'}`} />
                            Agent Assignment: {stage >= 3 ? 'Assigned' : 'Pending'}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Truck className="w-5 h-5 mr-4 text-gray-300" />
                            Procurement typically takes 1-2 business days.
                        </div>
                        <div className={`flex items-center text-sm ${stage === 7 ? 'text-[#5514B4] dark:text-purple-400 font-bold' : 'text-gray-600 dark:text-gray-400'}`}>
                            <Calendar className={`w-5 h-5 mr-4 ${stage === 7 ? 'text-[#5514B4]' : 'text-gray-300'}`} />
                            Activation: {stage === 7 ? 'Complete' : 'Estimated Nov 24'}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#5514B4] dark:text-[#f9fafb]">Active Orders</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Real-time tracking for your business services.</p>
        </div>
      </div>

      <div className="flex items-center space-x-4 bg-white dark:bg-[#250055] p-4 rounded-lg shadow-sm border border-gray-200 dark:border-[#4c1d95]">
        <Search className="w-5 h-5 text-gray-400" />
        <input 
            type="text" 
            placeholder="Search orders by ID..." 
            className="flex-grow outline-none text-gray-900 dark:text-[#f9fafb] placeholder-gray-400 bg-transparent"
        />
        <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-[#5514B4] dark:hover:text-[#f9fafb] px-2">
            <Filter className="w-4 h-4 mr-2" /> Filter
        </button>
      </div>

      <div className="bg-white dark:bg-[#250055] rounded-lg shadow-sm border border-gray-200 dark:border-[#4c1d95] overflow-hidden">
         <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-[#4c1d95]">
                <thead className="bg-gray-50 dark:bg-[#1a003a]">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Item</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Placed</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Progress</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-[#250055] divide-y divide-gray-200 dark:divide-[#4c1d95]">
                    {orders.map((order) => (
                        <tr 
                          key={order.id} 
                          onClick={() => onOrderSelect(order.id)}
                          className="hover:bg-gray-50 dark:hover:bg-[#1a003a] transition-colors cursor-pointer group"
                        >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#5514B4] dark:text-purple-300 group-hover:underline">
                                {order.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-[#f9fafb] font-medium">
                                {order.item}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {order.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center w-24 gap-2">
                                    <div className="flex-1 h-1.5 bg-gray-100 dark:bg-[#1a003a] rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-[#6CBC35] transition-all duration-1000"
                                            style={{ width: `${((order.trackingStage || 0) + 1) * 12.5}%` }}
                                        />
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-400">{(order.trackingStage || 0) + 1}/8</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <StatusBadge status={order.status === 'Delivered' ? 'Active' : 'In Progress'} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); onOrderSelect(order.id); }}
                                    className="text-[#5514B4] dark:text-[#f9fafb] hover:text-[#330072] dark:hover:text-purple-300 font-bold border border-[#5514B4] dark:border-[#5514B4] rounded px-3 py-1 hover:bg-purple-50 dark:hover:bg-[#1a003a] transition-colors"
                                >
                                    Track Order
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};
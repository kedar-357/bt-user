import React, { useState } from 'react';
import { ViewState, Quote } from '../types';
import { Button, StatusBadge, Modal, Input, Card } from '../components/UIComponents';
import { FileText, Search, MessageCircle, AlertCircle, History, ArrowRight } from 'lucide-react';

interface QuotesProps {
  quotes: Quote[];
  setView: (view: ViewState) => void;
  onApprove: (id: string) => void;
  onDecline: (id: string) => void;
  onNegotiate: (id: string, price: number) => void;
}

export const Quotes: React.FC<QuotesProps> = ({ quotes, setView, onApprove, onDecline, onNegotiate }) => {
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [negotiationPrice, setNegotiationPrice] = useState<string>('');

  const handleNegotiateClick = () => {
    if (!selectedQuote || !negotiationPrice) return;
    onNegotiate(selectedQuote.id, parseFloat(negotiationPrice));
    setSelectedQuote(null);
    setNegotiationPrice('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#5514B4] dark:text-[#f9fafb]">My Quotes</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Review offers and manage your procurement lifecycle.</p>
        </div>
        <Button onClick={() => setView(ViewState.PRODUCTS)}>
           Request New Quote
        </Button>
      </div>

      <div className="flex items-center space-x-4 bg-white dark:bg-[#250055] p-4 rounded-lg shadow-sm border border-gray-200 dark:border-[#4c1d95]">
        <Search className="w-5 h-5 text-gray-400" />
        <input 
            type="text" 
            placeholder="Search quotes by ID or product..." 
            className="flex-grow outline-none text-gray-900 dark:text-[#f9fafb] placeholder-gray-400 bg-transparent"
        />
      </div>

      <div className="bg-white dark:bg-[#250055] rounded-lg shadow-sm border border-gray-200 dark:border-[#4c1d95] overflow-hidden">
         <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-[#4c1d95]">
                <thead className="bg-gray-50 dark:bg-[#1a003a]">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quote ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product / Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-[#250055] divide-y divide-gray-200 dark:divide-[#4c1d95]">
                    {quotes.map((quote) => (
                        <tr key={quote.id} className={`hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${quote.status === 'Action Required' ? 'bg-orange-50/30 dark:bg-orange-900/10' : ''}`}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#5514B4] dark:text-purple-300">
                                {quote.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-[#f9fafb] font-medium">
                                {quote.productTitle}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {quote.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 font-mono">
                                £{quote.amount.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <StatusBadge status={quote.status} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                {quote.status === 'Action Required' ? (
                                    <button 
                                        onClick={() => setSelectedQuote(quote)}
                                        className="bg-[#5514B4] text-white px-3 py-1.5 rounded-md text-xs font-bold flex items-center ml-auto hover:bg-[#330072]"
                                    >
                                        <AlertCircle className="w-3 h-3 mr-1" /> Review Offer
                                    </button>
                                ) : (
                                    <button 
                                        onClick={() => setSelectedQuote(quote)}
                                        className="text-[#5514B4] dark:text-[#f9fafb] hover:text-[#330072] dark:hover:text-purple-300 font-semibold"
                                    >
                                        View Details
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
         </div>
         {quotes.length === 0 && (
             <div className="p-12 text-center text-gray-500">
                 <FileText className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                 <p>No quotes found.</p>
             </div>
         )}
      </div>

      {/* Quote Review Modal */}
      <Modal 
        isOpen={!!selectedQuote} 
        onClose={() => setSelectedQuote(null)} 
        title={selectedQuote?.status === 'Action Required' ? 'Action Required: Quote Review' : 'Quote Details'}
      >
        {selectedQuote && (
            <div className="space-y-6">
                <div className="p-4 bg-purple-50 dark:bg-[#1a003a] rounded-lg border border-purple-100 dark:border-[#4c1d95] flex items-center justify-between">
                    <div>
                        <h4 className="text-sm font-bold text-[#330072] dark:text-gray-400 opacity-60 uppercase tracking-widest">Quote Total</h4>
                        <p className="text-3xl font-black text-[#5514B4] dark:text-[#f9fafb]">£{selectedQuote.amount.toFixed(2)}</p>
                    </div>
                    {selectedQuote.status === 'Action Required' && (
                        <div className="bg-[#FD9F3E] text-white px-3 py-1 rounded text-xs font-black uppercase tracking-tighter shadow-sm">
                            New Offer
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#250055] flex items-center justify-center flex-shrink-0">
                            <FileText className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Product</p>
                            <p className="font-bold text-[#330072] dark:text-[#f9fafb]">{selectedQuote.productTitle}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Quantity: {selectedQuote.quantity}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#250055] flex items-center justify-center flex-shrink-0">
                            <History className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Status History</p>
                            <div className="mt-2 space-y-3">
                                {selectedQuote.lastActionBy === 'admin' && (
                                    <div className="flex items-center text-xs bg-orange-50 dark:bg-orange-900/10 p-2 rounded border border-orange-100 dark:border-orange-900/30 text-orange-800 dark:text-orange-200">
                                        <MessageCircle className="w-3 h-3 mr-2" />
                                        BT Admin counter-offered with a 5% discount.
                                    </div>
                                )}
                                <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                                    <span>Quote Generated</span>
                                    <span>{selectedQuote.date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {selectedQuote.status === 'Action Required' ? (
                    <div className="pt-6 border-t border-gray-100 dark:border-[#4c1d95]">
                        <p className="text-sm font-bold text-[#330072] dark:text-[#f9fafb] mb-4 flex items-center">
                            <ArrowRight className="w-4 h-4 mr-2" /> How would you like to proceed?
                        </p>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <Button fullWidth onClick={() => { onApprove(selectedQuote.id); setSelectedQuote(null); }}>
                                Approve
                            </Button>
                            <Button variant="outline" fullWidth onClick={() => { onDecline(selectedQuote.id); setSelectedQuote(null); }}>
                                Decline
                            </Button>
                        </div>
                        
                        <div className="space-y-2">
                            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-2">Or Negotiate Further</p>
                            <div className="flex gap-2">
                                <div className="flex-grow">
                                    <Input 
                                        placeholder="Enter your target price..." 
                                        className="!mb-0" 
                                        type="number"
                                        value={negotiationPrice}
                                        onChange={e => setNegotiationPrice(e.target.value)}
                                    />
                                </div>
                                <Button variant="secondary" onClick={handleNegotiateClick} disabled={!negotiationPrice}>
                                    Negotiate
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="pt-6 border-t border-gray-100 dark:border-[#4c1d95]">
                        <Button variant="outline" fullWidth onClick={() => setSelectedQuote(null)}>
                            Close Details
                        </Button>
                    </div>
                )}
            </div>
        )}
      </Modal>
    </div>
  );
};
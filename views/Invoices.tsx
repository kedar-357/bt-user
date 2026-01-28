import React, { useState } from 'react';
import { ViewState, Invoice } from '../types';
import { Button, StatusBadge, Modal } from '../components/UIComponents';
import { FileText, Search, CreditCard, Download, Printer } from 'lucide-react';

interface InvoicesProps {
  invoices: Invoice[];
  setView: (view: ViewState) => void;
}

export const Invoices: React.FC<InvoicesProps> = ({ invoices, setView }) => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#5514B4] dark:text-[#f9fafb]">Invoices</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">View and manage your billing documents.</p>
        </div>
      </div>

      <div className="flex items-center space-x-4 bg-white dark:bg-[#250055] p-4 rounded-lg shadow-sm border border-gray-200 dark:border-[#4c1d95]">
        <Search className="w-5 h-5 text-gray-400" />
        <input 
            type="text" 
            placeholder="Search invoices by ID or order..." 
            className="flex-grow outline-none text-gray-900 dark:text-[#f9fafb] placeholder-gray-400 bg-transparent"
        />
      </div>

      <div className="bg-white dark:bg-[#250055] rounded-lg shadow-sm border border-gray-200 dark:border-[#4c1d95] overflow-hidden">
         <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-[#4c1d95]">
                <thead className="bg-gray-50 dark:bg-[#1a003a]">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Invoice ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order Ref</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date Issued</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Due Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-[#250055] divide-y divide-gray-200 dark:divide-[#4c1d95]">
                    {invoices.map((invoice) => (
                        <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#5514B4] dark:text-purple-300">
                                {invoice.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {invoice.orderId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-[#f9fafb]">
                                {invoice.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {invoice.dueDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-[#f9fafb]">
                                £{invoice.total.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <StatusBadge status={invoice.status} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button 
                                    onClick={() => setSelectedInvoice(invoice)}
                                    className="text-[#5514B4] dark:text-[#f9fafb] hover:text-[#330072] dark:hover:text-purple-300 font-semibold flex items-center justify-end w-full"
                                >
                                    <FileText className="w-4 h-4 mr-1" /> View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
         </div>
         {invoices.length === 0 && (
             <div className="p-12 text-center text-gray-500">
                 <CreditCard className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                 <p>No invoices found.</p>
             </div>
         )}
      </div>

      <Modal 
        isOpen={!!selectedInvoice} 
        onClose={() => setSelectedInvoice(null)} 
        title="Invoice Details"
      >
        {selectedInvoice && (
            <div className="space-y-6">
                <div className="bg-white dark:bg-[#f9fafb] text-gray-900 p-8 rounded-lg border border-gray-200 shadow-sm">
                    {/* Invoice Header */}
                    <div className="flex justify-between items-start border-b border-gray-200 pb-6 mb-6">
                        <div>
                             <div className="w-12 h-12 rounded-full border-[3px] border-[#5514B4] flex items-center justify-center text-[#5514B4] font-bold text-xl mb-2">BT</div>
                             <p className="font-bold text-[#5514B4]">BT Business</p>
                             <p className="text-xs text-gray-500">1 Braham Street<br/>London, E1 8EE</p>
                        </div>
                        <div className="text-right">
                            <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-widest mb-1">Invoice</h2>
                            <p className="text-sm text-gray-500">#{selectedInvoice.id}</p>
                            <p className="text-sm font-bold mt-2">{selectedInvoice.status}</p>
                        </div>
                    </div>

                    {/* Bill To & Details */}
                    <div className="flex justify-between mb-8">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Bill To</p>
                            <p className="font-bold text-gray-900">Phoenix Enterprises</p>
                            <p className="text-sm text-gray-500">123 Business Park<br/>Manchester, M1 1AB</p>
                        </div>
                        <div className="text-right">
                             <div className="mb-2">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Date Issued</p>
                                <p className="font-medium text-gray-900">{selectedInvoice.date}</p>
                             </div>
                             <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Due Date</p>
                                <p className="font-medium text-gray-900">{selectedInvoice.dueDate}</p>
                             </div>
                        </div>
                    </div>

                    {/* Line Items */}
                    <table className="w-full mb-8">
                        <thead>
                            <tr className="border-b-2 border-gray-100">
                                <th className="text-left py-2 text-xs font-bold text-gray-400 uppercase">Description</th>
                                <th className="text-center py-2 text-xs font-bold text-gray-400 uppercase">Qty</th>
                                <th className="text-right py-2 text-xs font-bold text-gray-400 uppercase">Unit Price</th>
                                <th className="text-right py-2 text-xs font-bold text-gray-400 uppercase">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedInvoice.items.map((item, idx) => (
                                <tr key={idx} className="border-b border-gray-50">
                                    <td className="py-4 text-sm font-medium text-gray-900">{item.description}</td>
                                    <td className="py-4 text-sm text-gray-500 text-center">{item.quantity}</td>
                                    <td className="py-4 text-sm text-gray-500 text-right">£{item.unitPrice.toFixed(2)}</td>
                                    <td className="py-4 text-sm text-gray-900 font-bold text-right">£{(item.unitPrice * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Totals */}
                    <div className="flex justify-end">
                        <div className="w-48 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="font-medium text-gray-900">£{selectedInvoice.amount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">VAT (20%)</span>
                                <span className="font-medium text-gray-900">£{selectedInvoice.vat.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2 mt-2">
                                <span className="text-[#5514B4]">Total</span>
                                <span className="text-[#5514B4]">£{selectedInvoice.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="flex gap-4">
                    <Button fullWidth onClick={() => alert("Downloading PDF...")}>
                        <Download className="w-4 h-4 mr-2" /> Download PDF
                    </Button>
                    <Button variant="outline" fullWidth onClick={() => window.print()}>
                        <Printer className="w-4 h-4 mr-2" /> Print
                    </Button>
                </div>
            </div>
        )}
      </Modal>
    </div>
  );
};
import React, { useState } from 'react';
import { ViewState } from '../types';
import { MOCK_TICKETS } from '../constants';
import { Button, Input, Card, StatusBadge } from '../components/UIComponents';
import { Plus, Search, FileText, AlertCircle, UploadCloud, Check } from 'lucide-react';

interface SupportProps {
  view: ViewState;
  onChangeView: (view: ViewState) => void;
}

export const Support: React.FC<SupportProps> = ({ view, onChangeView }) => {
  const isRaiseTicket = view === ViewState.RAISE_TICKET;

  // -- Raise Ticket Form State --
  const [ticketForm, setTicketForm] = useState({
      category: 'Technical',
      subject: '',
      description: '',
      file: null as string | null
  });
  const [submitted, setSubmitted] = useState(false);

  const handleTicketSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
      // Logic would go here to send to API
      setTimeout(() => {
          onChangeView(ViewState.TICKET_LIST);
          setSubmitted(false);
      }, 2000);
  };

  // -- Render Raise Ticket View --
  if (isRaiseTicket) {
    if (submitted) {
        return (
            <Card className="max-w-xl mx-auto text-center py-12">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-[#6CBC35]" />
                </div>
                <h2 className="text-2xl font-bold text-[#5514B4] dark:text-[#f9fafb] mb-2">Ticket Received</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Reference: #TCK-NEW-8821. We'll be in touch shortly.</p>
                <Button onClick={() => onChangeView(ViewState.TICKET_LIST)}>
                    Return to Support Center
                </Button>
            </Card>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
             <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-[#5514B4] dark:text-[#f9fafb]">Raise a Ticket</h1>
                <Button variant="ghost" onClick={() => onChangeView(ViewState.TICKET_LIST)}>
                    Cancel
                </Button>
            </div>

            <div className="bg-purple-50 dark:bg-[#250055] border-l-4 border-[#5514B4] p-4 mb-6 rounded-r-md flex items-start">
                <AlertCircle className="w-5 h-5 text-[#5514B4] dark:text-[#f9fafb] mr-3 mt-0.5" />
                <div>
                    <h4 className="font-bold text-[#5514B4] dark:text-[#f9fafb] text-sm">Before you submit</h4>
                    <p className="text-sm text-[#330072] dark:text-gray-300 mt-1">
                        Have you checked our <a href="#" className="underline font-semibold text-[#5514B4] dark:text-[#f9fafb]">Knowledge Base</a>? Many common broadband issues can be resolved by restarting your Business Hub.
                    </p>
                </div>
            </div>

            <Card>
                <form onSubmit={handleTicketSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-[#330072] dark:text-[#f9fafb] mb-1">Issue Category</label>
                        <select 
                            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-[#4c1d95] focus:border-[#5514B4] focus:ring-1 focus:ring-[#5514B4] outline-none bg-white dark:bg-[#330072] text-gray-900 dark:text-[#f9fafb]"
                            value={ticketForm.category}
                            onChange={(e) => setTicketForm({...ticketForm, category: e.target.value})}
                        >
                            <option>Technical Support</option>
                            <option>Billing & Accounts</option>
                            <option>Order Inquiry</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <Input 
                        label="Subject" 
                        placeholder="Brief summary of the issue" 
                        value={ticketForm.subject}
                        onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                        required
                    />

                    <div>
                        <label className="block text-sm font-semibold text-[#330072] dark:text-[#f9fafb] mb-1">Description</label>
                        <textarea 
                            rows={5}
                            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-[#4c1d95] focus:border-[#5514B4] focus:ring-1 focus:ring-[#5514B4] outline-none bg-white dark:bg-[#330072] text-gray-900 dark:text-[#f9fafb] placeholder-gray-400"
                            placeholder="Please provide details about what happened and when..."
                            value={ticketForm.description}
                            onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-[#330072] dark:text-[#f9fafb] mb-1">Attachments (Optional)</label>
                        <div className="border-2 border-dashed border-gray-300 dark:border-[#4c1d95] rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer relative bg-white dark:bg-[#1a003a]">
                             <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                             <UploadCloud className="w-8 h-8 mb-2 text-gray-400 dark:text-gray-600" />
                             <span className="text-sm">Click to upload screenshot or drag and drop</span>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 dark:border-[#4c1d95] flex justify-end">
                        <Button type="submit">Submit Ticket</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
  }

  // -- Ticket List View --
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-[#5514B4] dark:text-[#f9fafb]">Support Center</h1>
        <Button onClick={() => onChangeView(ViewState.RAISE_TICKET)}>
            <Plus className="w-4 h-4 mr-2" /> Raise New Ticket
        </Button>
      </div>

      <div className="flex items-center space-x-4 bg-white dark:bg-[#250055] p-4 rounded-lg shadow-sm border border-gray-200 dark:border-[#4c1d95]">
        <Search className="w-5 h-5 text-gray-400" />
        <input 
            type="text" 
            placeholder="Search tickets by ID or subject..." 
            className="flex-grow outline-none text-gray-900 dark:text-[#f9fafb] placeholder-gray-400 bg-transparent"
        />
      </div>

      <div className="bg-white dark:bg-[#250055] rounded-lg shadow-sm border border-gray-200 dark:border-[#4c1d95] overflow-hidden">
         <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-[#4c1d95]">
                <thead className="bg-gray-50 dark:bg-[#1a003a]">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ticket ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Subject</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-[#250055] divide-y divide-gray-200 dark:divide-[#4c1d95]">
                    {MOCK_TICKETS.map((ticket) => (
                        <tr key={ticket.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#5514B4] dark:text-[#f9fafb]">
                                {ticket.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                {ticket.subject}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {ticket.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {ticket.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <StatusBadge status={ticket.status} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button className="text-[#5514B4] dark:text-[#f9fafb] hover:text-[#330072] font-semibold transition-colors">View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
         </div>
         {MOCK_TICKETS.length === 0 && (
             <div className="p-12 text-center text-gray-500">
                 <FileText className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                 <p>No tickets found.</p>
             </div>
         )}
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Product, Quote } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import { Button, Card, Modal, Input } from '../components/UIComponents';
import { ArrowLeft, Check, Sparkles, Send, Calendar, Hash, MessageSquare } from 'lucide-react';
import { ImageAIEditor } from '../components/ImageAIEditor';

interface CatalogProps {
  activeProductId: string | null;
  onProductSelect: (id: string | null) => void;
  onQuoteRequest: (quote: Omit<Quote, 'id' | 'status' | 'date' | 'lastActionBy'>) => void;
}

export const Catalog: React.FC<CatalogProps> = ({ activeProductId, onProductSelect, onQuoteRequest }) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  
  // Quote form state
  const [quoteForm, setQuoteForm] = useState({
    quantity: '1',
    timeline: 'Within 1 month',
    notes: ''
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const categories = ['All', 'Broadband', 'Hardware', 'Software', 'Security', 'Cloud'];
  
  const handleQuoteSubmit = (e: React.FormEvent, product: Product) => {
    e.preventDefault();
    setQuoteSubmitted(true);
    
    // Trigger global action
    onQuoteRequest({
        productId: product.id,
        productTitle: product.title,
        quantity: parseInt(quoteForm.quantity),
        amount: product.price * parseInt(quoteForm.quantity),
        notes: quoteForm.notes
    });

    setTimeout(() => {
      setIsQuoteModalOpen(false);
      setQuoteSubmitted(false);
      setQuoteForm({ quantity: '1', timeline: 'Within 1 month', notes: '' });
      onProductSelect(null); 
    }, 1500);
  };

  if (activeProductId) {
    const product = MOCK_PRODUCTS.find(p => p.id === activeProductId);
    if (!product) return <div>Product not found</div>;
    const currentImage = customImages[product.id] || product.image;

    return (
      <div className="animate-fade-in pb-12">
        <button onClick={() => onProductSelect(null)} className="flex items-center text-gray-500 dark:text-gray-400 hover:text-[#5514B4] dark:hover:text-[#f9fafb] mb-6 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           <div className="space-y-4">
             <div className="rounded-2xl overflow-hidden shadow-lg h-96 lg:h-[500px] relative bg-white dark:bg-white/5 border border-gray-100 dark:border-[#4c1d95] flex items-center justify-center p-8 group">
                <img src={currentImage} alt={product.title} className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-4 left-4 flex gap-2">
                   <div className="bg-[#5514B4] text-white px-3 py-1 text-xs font-bold rounded shadow-sm">{product.category}</div>
                   {product.supplier && <div className="bg-[#330072] dark:bg-[#1a003a] text-white px-3 py-1 text-xs font-bold rounded shadow-sm">{product.supplier}</div>}
                </div>
             </div>
             <Button variant="outline" className="w-full flex items-center justify-center space-x-2 py-4 border-dashed border-2" onClick={() => setIsEditorOpen(true)}>
               <Sparkles className="w-5 h-5" /> <span>Try AI Studio Image Editor</span>
             </Button>
           </div>

           <div className="space-y-6">
              <div>
                  <h1 className="text-4xl font-extrabold text-[#5514B4] dark:text-[#f9fafb] mb-2 leading-tight">{product.title}</h1>
                  {product.supplier && <p className="text-lg font-semibold text-[#330072] dark:text-gray-400 uppercase tracking-wide opacity-75">Provided by {product.supplier}</p>}
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mt-4">{product.summary}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white dark:from-[#250055] dark:to-[#1a003a] p-6 rounded-xl border border-purple-100 dark:border-[#4c1d95] shadow-sm">
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-black text-[#5514B4] dark:text-[#f9fafb]">£{product.price.toFixed(2)}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2 font-medium">{product.category === 'Hardware' ? 'per unit' : 'monthly'}</span>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-6 font-bold uppercase tracking-widest">Excl. VAT • Commercial Rates</p>
                  <Button fullWidth className="py-4 text-lg shadow-lg" onClick={() => setIsQuoteModalOpen(true)}>Request a Custom Quote</Button>
              </div>

              <div className="prose prose-purple dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                  <h3 className="text-xl font-bold text-[#330072] dark:text-[#f9fafb] border-b border-gray-100 dark:border-[#4c1d95] pb-2 mb-4">Detailed Description</h3>
                  <p className="leading-relaxed text-lg">{product.description}</p>
              </div>

              <div className="pt-4">
                  <h3 className="text-xl font-bold text-[#330072] dark:text-[#f9fafb] mb-4">What's Included</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start bg-white dark:bg-[#250055] p-4 rounded-lg border border-gray-100 dark:border-[#4c1d95] shadow-sm">
                              <div className="mt-1 bg-green-100 dark:bg-green-900/30 rounded-full p-1 mr-3 flex-shrink-0"><Check className="w-3 h-3 text-[#6CBC35]" /></div>
                              <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                          </div>
                      ))}
                  </div>
              </div>
           </div>
        </div>

        {isEditorOpen && <ImageAIEditor originalImage={product.image} onClose={() => setIsEditorOpen(false)} onApply={(newImage) => { setCustomImages({ ...customImages, [product.id]: newImage }); setIsEditorOpen(false); }} />}

        <Modal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} title="Request Quote">
            {quoteSubmitted ? (
                <div className="text-center py-12 animate-fade-in">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"><Check className="w-8 h-8 text-[#6CBC35]" /></div>
                    <h3 className="text-2xl font-bold text-[#5514B4] dark:text-[#f9fafb] mb-2">Request Submitted!</h3>
                    <p className="text-gray-600 dark:text-gray-400">Sent to BT Business Admin for review.</p>
                </div>
            ) : (
                <form onSubmit={(e) => handleQuoteSubmit(e, product)} className="space-y-5">
                    <div className="bg-gray-50 dark:bg-[#1a003a] p-4 rounded-lg border border-gray-100 dark:border-[#4c1d95] mb-6">
                        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Product Reference</p>
                        <p className="text-lg font-bold text-[#5514B4] dark:text-[#f9fafb]">{product.title}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Quantity" type="number" min="1" value={quoteForm.quantity} onChange={e => setQuoteForm({...quoteForm, quantity: e.target.value})} required />
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-[#330072] dark:text-[#f9fafb]">Timeline</label>
                            <select className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-[#4c1d95] outline-none bg-white dark:bg-[#330072] text-gray-900 dark:text-[#f9fafb]" value={quoteForm.timeline} onChange={e => setQuoteForm({...quoteForm, timeline: e.target.value})}>
                                <option>ASAP</option>
                                <option>Within 1 month</option>
                                <option>Planning stage</option>
                            </select>
                        </div>
                    </div>
                    <Input label="Notes" multiline rows={4} value={quoteForm.notes} onChange={e => setQuoteForm({...quoteForm, notes: (e.target as HTMLTextAreaElement).value})} />
                    <div className="pt-4 border-t border-gray-100 dark:border-[#4c1d95] flex gap-3">
                        <Button variant="ghost" className="flex-1" type="button" onClick={() => setIsQuoteModalOpen(false)}>Cancel</Button>
                        <Button className="flex-1" type="submit"><Send className="w-4 h-4 mr-2" /> Send Request</Button>
                    </div>
                </form>
            )}
        </Modal>
      </div>
    );
  }

  const filteredProducts = categoryFilter === 'All' ? MOCK_PRODUCTS : MOCK_PRODUCTS.filter(p => p.category === categoryFilter);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div><h1 className="text-4xl font-extrabold text-[#5514B4] dark:text-[#f9fafb] tracking-tight">Marketplace</h1><p className="text-gray-500 dark:text-gray-400 mt-1 text-lg">Leading tech solutions curated for your business.</p></div>
          <div className="flex bg-white dark:bg-[#250055] p-1 rounded-xl shadow-sm border border-gray-200 dark:border-[#4c1d95] overflow-x-auto scrollbar-hide">
            {categories.map(cat => (<button key={cat} onClick={() => setCategoryFilter(cat)} className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${categoryFilter === cat ? 'bg-[#5514B4] text-white shadow-md' : 'text-gray-500 dark:text-gray-400 hover:text-[#5514B4] dark:hover:text-[#f9fafb] hover:bg-purple-50 dark:hover:bg-white/5'}`}>{cat}</button>))}
          </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <Card key={product.id} className="flex flex-col h-full hover:shadow-xl dark:hover:shadow-[#5514B4]/10 transition-all duration-300 overflow-hidden group border-none shadow-sm ring-1 ring-gray-100 dark:ring-[#4c1d95]">
                <div className="h-56 -mx-6 -mt-6 mb-4 overflow-hidden relative bg-white dark:bg-white/5 flex items-center justify-center p-6">
                    <img src={customImages[product.id] || product.image} alt={product.title} className="max-w-full max-h-full object-contain transform group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-0 right-0 bg-[#FD9F3E] text-white text-[10px] font-black px-2.5 py-1 m-3 rounded-full shadow-sm tracking-widest uppercase">Featured</div>
                </div>
                <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-[10px] font-black text-[#5514B4] dark:text-[#f9fafb] uppercase tracking-[0.15em]">{product.category}</div>
                        {product.supplier && <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-[#1a003a] px-2 py-0.5 rounded">{product.supplier}</span>}
                    </div>
                    <h3 className="text-xl font-bold text-[#330072] dark:text-[#f9fafb] mb-2 group-hover:text-[#5514B4] dark:group-hover:text-purple-300 transition-colors line-clamp-1">{product.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">{product.summary}</p>
                </div>
                <div className="pt-4 mt-auto border-t border-gray-50 dark:border-[#4c1d95] flex items-center justify-between">
                    <div><span className="text-2xl font-black text-[#5514B4] dark:text-[#f9fafb]">£{product.price.toFixed(2)}</span><span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 ml-1 uppercase">{product.category === 'Hardware' ? 'once' : '/mo'}</span></div>
                    <Button variant="outline" className="!py-2 !px-4 text-xs font-bold border-purple-100 dark:border-[#4c1d95] hover:border-[#5514B4] hover:bg-purple-50 dark:hover:bg-white/5" onClick={() => onProductSelect(product.id)}>View Details</Button>
                </div>
            </Card>
          ))}
      </div>
    </div>
  );
};
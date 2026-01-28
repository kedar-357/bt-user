import React, { useState, useEffect } from 'react';
import { ViewState, User, Quote, Order, Invoice } from './types';
import { Layout } from './components/Layout';
import { Auth } from './views/Auth';
import { Dashboard } from './views/Dashboard';
import { Catalog } from './views/Catalog';
import { Support } from './views/Support';
import { Quotes } from './views/Quotes';
import { Orders } from './views/Orders';
import { Invoices } from './views/Invoices';
import { MOCK_QUOTES, MOCK_ORDERS, MOCK_INVOICES } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.LOGIN);
  const [user, setUser] = useState<User | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Global Mock State
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  // Initialize with some data
  useEffect(() => {
    // Basic mapping for initial state
    setQuotes(MOCK_QUOTES.map(q => ({
        id: q.id,
        productId: q.productId || '6',
        productTitle: q.productTitle,
        date: q.date,
        status: q.status === 'Pending' ? 'In Review' : (q.status === 'Approved' ? 'Approved' : 'Rejected'),
        amount: q.amount || 49.99,
        quantity: q.quantity || 1,
        lastActionBy: 'admin'
    })));
    
    setOrders(MOCK_ORDERS.map(o => ({
        ...o,
        trackingStage: o.status === 'Delivered' ? 7 : 1, // Max stage is now 7
        status: o.status === 'Delivered' ? 'Delivered' : 'In Progress',
        estimatedCompletion: 'NOV 24, 2023'
    })));

    setInvoices(MOCK_INVOICES);
  }, []);

  // Simulate order progress over time - 5 SECONDS PER USER REQUEST
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prev => {
        const updatedOrders = prev.map(o => {
          // If order is "In Progress", advance it through the 8 stages (0-7)
          if (o.status === 'In Progress' && o.trackingStage !== undefined && o.trackingStage < 7) {
            const nextStage = o.trackingStage + 1;
            return { 
              ...o, 
              trackingStage: nextStage, 
              status: nextStage === 7 ? 'Delivered' : 'In Progress' 
            };
          }
          return o;
        });
        
        // Check for newly activated orders (stage 7) that don't have invoices yet
        updatedOrders.forEach(o => {
          if (o.trackingStage === 7) {
             setInvoices(currentInvoices => {
                 // Check if invoice already exists
                 if (!currentInvoices.some(inv => inv.orderId === o.id)) {
                     const vatAmount = o.amount * 0.20;
                     const newInvoice: Invoice = {
                         id: `INV-${Math.floor(Math.random() * 90000) + 10000}`,
                         orderId: o.id,
                         date: new Date().toISOString().split('T')[0],
                         dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // +30 days
                         amount: o.amount,
                         vat: vatAmount,
                         total: o.amount + vatAmount,
                         status: 'Unpaid',
                         items: [
                             { description: o.item, quantity: 1, unitPrice: o.amount }
                         ]
                     };
                     return [newInvoice, ...currentInvoices];
                 }
                 return currentInvoices;
             });
          }
        });

        return updatedOrders;
      });
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (companyName: string) => {
    setUser({
      id: 'usr-123',
      name: 'Admin User',
      companyName: companyName,
      email: 'admin@company.com'
    });
    setCurrentView(ViewState.DASHBOARD);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView(ViewState.LOGIN);
    setSelectedProductId(null);
    setSelectedOrderId(null);
  };

  const handleViewChange = (view: ViewState) => {
    if (view !== ViewState.PRODUCT_DETAIL) {
      setSelectedProductId(null);
    }
    // If navigating to orders list explicitly, clear selected order
    if (view === ViewState.ORDERS) {
      setSelectedOrderId(null);
    }
    setCurrentView(view);
  };

  const handleProductSelect = (id: string | null) => {
    setSelectedProductId(id);
    setCurrentView(id ? ViewState.PRODUCT_DETAIL : ViewState.PRODUCTS);
  };

  const handleOrderSelect = (id: string | null) => {
    setSelectedOrderId(id);
    setCurrentView(ViewState.ORDERS);
  };

  // Lifecycle Actions
  const addQuote = (quote: Omit<Quote, 'id' | 'status' | 'date' | 'lastActionBy'>) => {
    const newQuote: Quote = {
        ...quote,
        id: `QT-${Math.floor(Math.random() * 10000)}`,
        status: 'In Review',
        date: new Date().toISOString().split('T')[0],
        lastActionBy: 'user'
    };
    setQuotes([newQuote, ...quotes]);
    
    // Simulate "Sent to BT Admin" and "Comes Back" after 5 seconds
    setTimeout(() => {
        setQuotes(prev => prev.map(q => 
            q.id === newQuote.id 
            ? { ...q, status: 'Action Required', lastActionBy: 'admin', amount: q.amount * 0.95 } // Counter offer
            : q
        ));
    }, 5000);
  };

  const updateQuoteStatus = (quoteId: string, status: Quote['status'], negotiationPrice?: number) => {
    setQuotes(prev => prev.map(q => {
        if (q.id === quoteId) {
            const updated = { ...q, status, lastActionBy: 'user' as const };
            if (negotiationPrice) updated.negotiationPrice = negotiationPrice;
            
            // If Negotiate or In Review with price, simulate admin responding
            if (status === 'Pending' || (status === 'In Review' && negotiationPrice)) {
                setTimeout(() => {
                    setQuotes(p => p.map(inner => 
                        inner.id === quoteId 
                        ? { ...inner, status: 'Action Required', lastActionBy: 'admin', amount: negotiationPrice || inner.amount } 
                        : inner
                    ));
                }, 4000);
            }
            return updated;
        }
        return q;
    }));
  };

  const approveQuote = (quoteId: string) => {
    const quote = quotes.find(q => q.id === quoteId);
    if (!quote) return;

    // Transition Quote -> Order
    const newOrder: Order = {
        id: `ORD-${Math.floor(Math.random() * 90000) + 10000}`,
        date: new Date().toISOString().split('T')[0],
        status: 'In Progress',
        item: quote.productTitle,
        amount: quote.amount,
        trackingStage: 0, // Starts at 'Verification'
        estimatedCompletion: 'DEC 24, 2023'
    };

    setOrders([newOrder, ...orders]);
    setQuotes(prev => prev.filter(q => q.id !== quoteId)); // Remove from quotes list
    // Automatically select the new order and view it
    setSelectedOrderId(newOrder.id);
    setCurrentView(ViewState.ORDERS);
  };

  const renderView = () => {
    switch (currentView) {
      case ViewState.LOGIN:
      case ViewState.REGISTER:
        return <Auth view={currentView} onChangeView={handleViewChange} onLogin={handleLogin} />;
      
      case ViewState.DASHBOARD:
        return user ? (
          <Dashboard 
            user={user} 
            orders={orders}
            setView={handleViewChange} 
            onOrderSelect={handleOrderSelect}
          />
        ) : null;
      
      case ViewState.PRODUCTS:
      case ViewState.PRODUCT_DETAIL:
        return (
            <Catalog 
                activeProductId={selectedProductId} 
                onProductSelect={handleProductSelect} 
                onQuoteRequest={addQuote}
            />
        );
      
      case ViewState.TICKET_LIST:
      case ViewState.RAISE_TICKET:
        return <Support view={currentView} onChangeView={handleViewChange} />;

      case ViewState.QUOTES:
        return (
            <Quotes 
                quotes={quotes} 
                setView={handleViewChange} 
                onApprove={approveQuote}
                onDecline={(id) => updateQuoteStatus(id, 'Rejected')}
                onNegotiate={(id, price) => updateQuoteStatus(id, 'In Review', price)}
            />
        );

      case ViewState.ORDERS:
        return (
          <Orders 
            orders={orders} 
            setView={handleViewChange} 
            activeOrderId={selectedOrderId}
            onOrderSelect={handleOrderSelect}
          />
        );

      case ViewState.INVOICES:
        return <Invoices invoices={invoices} setView={handleViewChange} />;
      
      default:
        return <div className="p-10 text-center">Page not found</div>;
    }
  };

  return (
    <Layout 
      currentView={currentView} 
      setView={handleViewChange} 
      isLoggedIn={!!user}
      onLogout={handleLogout}
      userName={user?.name}
    >
      {renderView()}
    </Layout>
  );
};

export default App;
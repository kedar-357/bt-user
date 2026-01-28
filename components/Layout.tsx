import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut, User as UserIcon, LayoutDashboard, ShoppingBag, LifeBuoy, FileText, ChevronRight, ChevronLeft, Package, Sun, Moon, CreditCard } from 'lucide-react';
import { ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  setView: (view: ViewState) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  userName?: string;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentView, 
  setView, 
  isLoggedIn, 
  onLogout,
  userName 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bt-theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('bt-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('bt-theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const BrandLogo = ({ size = "large" }: { size?: "small" | "large" }) => (
    <div className={`
      ${size === "large" ? "w-12 h-12 text-xl border-[3px]" : "w-10 h-10 text-base border-2"} 
      rounded-full border-[#5514B4] bg-white dark:bg-[#1a003a] flex items-center justify-center text-[#5514B4] font-bold shadow-sm flex-shrink-0 transition-all duration-300
    `}>
      BT
    </div>
  );

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#1a003a]">
        <header className="bg-white dark:bg-[#250055] border-b border-gray-200 dark:border-[#4c1d95] py-4 px-6 shadow-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
            <div className="flex items-center space-x-3">
              <BrandLogo />
              <span className="text-2xl font-bold text-[#5514B4] dark:text-[#f9fafb] hidden sm:block tracking-tight">Business</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-[#330072] dark:text-gray-300 transition-colors"
                title="Toggle Theme"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <div className="text-sm text-[#330072] dark:text-gray-400">
                Need help? <a href="#" className="font-semibold text-[#5514B4] dark:text-[#f9fafb] hover:underline">Contact Support</a>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-grow flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <footer className="bg-[#5514B4] text-white py-6">
          <div className="max-w-7xl mx-auto px-6 text-center text-sm opacity-80">
            &copy; {new Date().getFullYear()} BT Business Portal Simulator. All rights reserved.
          </div>
        </footer>
      </div>
    );
  }

  const navItems = [
    { label: 'Dashboard', view: ViewState.DASHBOARD, icon: LayoutDashboard },
    { label: 'Products', view: ViewState.PRODUCTS, icon: ShoppingBag },
    { label: 'Orders', view: ViewState.ORDERS, icon: Package },
    { label: 'Quotes', view: ViewState.QUOTES, icon: FileText },
    { label: 'Invoices', view: ViewState.INVOICES, icon: CreditCard },
    { label: 'Support', view: ViewState.TICKET_LIST, icon: LifeBuoy },
  ];

  const handleNavClick = (view: ViewState) => {
    setView(view);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1a003a] flex transition-colors duration-300">
      <div className="md:hidden fixed top-0 w-full bg-white dark:bg-[#250055] z-30 border-b border-gray-200 dark:border-[#4c1d95] h-16 flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center">
            <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#330072] focus:outline-none mr-2"
            >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center space-x-2">
                <BrandLogo size="small" />
                <span className="font-bold text-[#330072] dark:text-[#f9fafb]">Business</span>
            </div>
        </div>
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#330072] transition-colors"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside 
        className={`
            fixed inset-y-0 left-0 z-40 bg-white dark:bg-[#250055] border-r border-gray-200 dark:border-[#4c1d95] transform transition-all duration-300 ease-in-out flex flex-col
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
            md:translate-x-0 md:static
            ${isCollapsed ? 'w-20' : 'w-64'}
        `}
      >
        <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex absolute -right-3 top-8 bg-white dark:bg-[#1a003a] border border-gray-200 dark:border-[#4c1d95] rounded-full p-1.5 text-gray-500 dark:text-[#f9fafb] hover:text-[#5514B4] hover:border-[#5514B4] shadow-sm z-50 transition-colors"
        >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        <div className={`h-24 flex items-center ${isCollapsed ? 'justify-center px-0' : 'px-6'} border-b border-gray-100 dark:border-[#4c1d95] transition-all duration-300 overflow-hidden`}>
            <div 
                className={`flex items-center cursor-pointer ${isCollapsed ? 'justify-center' : 'space-x-3'}`} 
                onClick={() => handleNavClick(ViewState.DASHBOARD)}
            >
                <BrandLogo />
                {!isCollapsed && (
                    <div className="animate-fade-in whitespace-nowrap">
                        <span className="block text-2xl font-bold text-[#5514B4] dark:text-[#f9fafb] leading-none tracking-tight">Business</span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium tracking-widest uppercase mt-1 block">Portal</span>
                    </div>
                )}
            </div>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto overflow-x-hidden">
            {navItems.map((item) => {
                const isActive = currentView === item.view || 
                    (item.view === ViewState.TICKET_LIST && currentView === ViewState.RAISE_TICKET) || 
                    (item.view === ViewState.PRODUCTS && currentView === ViewState.PRODUCT_DETAIL);
                
                return (
                    <button
                        key={item.label}
                        onClick={() => handleNavClick(item.view)}
                        title={isCollapsed ? item.label : ''}
                        className={`
                            w-full flex items-center rounded-lg transition-colors group
                            ${isCollapsed ? 'justify-center px-0 py-3' : 'justify-between px-3 py-3'}
                            ${isActive 
                                ? 'bg-purple-50 dark:bg-[#1a003a] text-[#5514B4] dark:text-[#f9fafb]' 
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#5514B4] dark:hover:text-[#f9fafb]'
                            }
                        `}
                    >
                        <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
                            <item.icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'} ${isActive ? 'text-[#5514B4] dark:text-[#f9fafb]' : 'text-gray-400 group-hover:text-[#5514B4] dark:group-hover:text-[#f9fafb]'}`} />
                            {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
                        </div>
                        {(!isCollapsed && isActive) && <ChevronRight className="w-4 h-4 opacity-50" />}
                    </button>
                );
            })}
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-[#4c1d95]">
            {!isCollapsed ? (
                <>
                    <button 
                        onClick={toggleDarkMode}
                        className="w-full flex items-center px-3 py-3 mb-4 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors group"
                    >
                        {darkMode ? <Sun className="w-5 h-5 mr-3 text-gray-400 group-hover:text-[#5514B4]" /> : <Moon className="w-5 h-5 mr-3 text-gray-400 group-hover:text-[#5514B4]" />}
                        <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>
                    <div className="flex items-center p-2 rounded-lg bg-gray-50 dark:bg-[#1a003a] border border-gray-100 dark:border-[#4c1d95] mb-3 animate-fade-in">
                        <div className="w-8 h-8 rounded-full bg-white dark:bg-[#250055] border border-gray-200 dark:border-[#4c1d95] flex items-center justify-center text-[#5514B4] dark:text-[#f9fafb] flex-shrink-0">
                            <UserIcon className="w-5 h-5" />
                        </div>
                        <div className="ml-3 overflow-hidden">
                            <p className="text-sm font-medium text-gray-900 dark:text-[#f9fafb] truncate">{userName}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Administrator</p>
                        </div>
                    </div>
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-[#330072] border border-gray-200 dark:border-[#4c1d95] rounded-lg hover:bg-gray-50 dark:hover:bg-[#1a003a] hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                    </button>
                </>
            ) : (
                <div className="flex flex-col items-center space-y-4">
                    <button 
                        onClick={toggleDarkMode}
                        title="Toggle Theme"
                        className="p-2 text-gray-500 dark:text-gray-300 hover:text-[#5514B4] hover:bg-purple-50 dark:hover:bg-white/5 rounded-md transition-colors"
                    >
                        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                    <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-[#1a003a] border border-purple-100 dark:border-[#4c1d95] flex items-center justify-center text-[#5514B4] dark:text-[#f9fafb]" title={userName}>
                        <UserIcon className="w-5 h-5" />
                    </div>
                    <button
                        onClick={onLogout}
                        title="Sign Out"
                        className="p-2 text-gray-500 dark:text-red-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="h-16 md:hidden" /> 
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
            <div className="max-w-6xl mx-auto animate-fade-in">
                {children}
            </div>
        </div>
      </main>
    </div>
  );
};
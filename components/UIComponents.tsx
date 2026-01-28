
import React from 'react';
import { X } from 'lucide-react';

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center";
  
  const variants = {
    primary: "bg-[#5514B4] text-white hover:bg-[#330072] focus:ring-[#5514B4] dark:hover:bg-[#4c1d95]",
    secondary: "bg-[#330072] text-white hover:bg-[#250055] focus:ring-[#330072] dark:bg-[#1a003a] dark:border dark:border-[#5514B4]",
    outline: "border-2 border-[#5514B4] text-[#5514B4] hover:bg-[#5514B4] hover:text-white focus:ring-[#5514B4] dark:text-[#f9fafb] dark:border-[#5514B4]",
    ghost: "text-[#5514B4] hover:bg-purple-50 dark:text-[#f9fafb] dark:hover:bg-white/10"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Input Component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', multiline, rows = 3, ...props }) => {
  const inputStyles = `w-full px-4 py-3 rounded-md border ${error ? 'border-red-500' : 'border-gray-300 dark:border-[#4c1d95]'} focus:border-[#5514B4] focus:ring-1 focus:ring-[#5514B4] outline-none transition-colors bg-white dark:bg-[#330072] text-gray-900 dark:text-[#f9fafb] placeholder-gray-400 ${className}`;
  
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold text-[#330072] dark:text-[#f9fafb] mb-1">
          {label}
        </label>
      )}
      {multiline ? (
        <textarea
          className={inputStyles}
          rows={rows}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          className={inputStyles}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && <span className="text-xs text-red-500 mt-1 block">{error}</span>}
    </div>
  );
};

// Card Component
interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  action?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, action }) => {
  return (
    <div className={`bg-white dark:bg-[#250055] rounded-lg shadow-sm border border-gray-100 dark:border-[#4c1d95] p-6 ${className}`}>
      {(title || action) && (
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100 dark:border-[#4c1d95]">
          {title && <h3 className="text-lg font-bold text-[#5514B4] dark:text-[#f9fafb]">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

// Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#1a003a] rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col border dark:border-[#5514B4]">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-[#4c1d95] flex items-center justify-between bg-purple-50 dark:bg-[#250055]">
          <h3 className="text-xl font-bold text-[#5514B4] dark:text-[#f9fafb]">{title}</h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-[#5514B4] dark:hover:text-white rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {children}
        </div>
      </div>
    </div>
  );
};

// Status Badge
export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStyle = (s: string) => {
    switch(s.toLowerCase()) {
      case 'delivered':
      case 'open': 
      case 'approved':
        return 'bg-[#6CBC35] text-white'; 
      case 'processing':
      case 'pending':
        return 'bg-[#FD9F3E] text-white'; 
      case 'closed':
      case 'cancelled':
        return 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
      case 'rejected':
        return 'bg-red-500 text-white';
      default:
        return 'bg-[#5514B4] text-white'; 
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getStyle(status)}`}>
      {status}
    </span>
  );
};

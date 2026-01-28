
export enum ViewState {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  DASHBOARD = 'DASHBOARD',
  PRODUCTS = 'PRODUCTS',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  RAISE_TICKET = 'RAISE_TICKET',
  TICKET_LIST = 'TICKET_LIST',
  QUOTES = 'QUOTES',
  ORDERS = 'ORDERS',
  INVOICES = 'INVOICES'
}

export interface User {
  id: string;
  name: string;
  companyName: string;
  email: string;
}

export interface Product {
  id: string;
  title: string;
  supplier?: string;
  category: string;
  summary: string;
  description: string;
  price: number;
  image: string;
  features: string[];
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'In Progress';

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  item: string;
  amount: number;
  trackingStage?: number; // 0 to 7 based on the lifecycle
  estimatedCompletion?: string;
}

export type QuoteStatus = 'In Review' | 'Action Required' | 'Approved' | 'Rejected' | 'Pending';

export interface Quote {
  id: string;
  productId: string;
  productTitle: string;
  date: string;
  status: QuoteStatus;
  amount: number;
  quantity: number;
  notes?: string;
  negotiationPrice?: number;
  lastActionBy?: 'user' | 'admin';
}

export interface Ticket {
  id: string;
  subject: string;
  status: string;
  date: string;
  category: string;
}

export type InvoiceStatus = 'Paid' | 'Unpaid' | 'Overdue';

export interface Invoice {
  id: string;
  orderId: string;
  date: string;
  dueDate: string;
  amount: number;
  vat: number;
  total: number;
  status: InvoiceStatus;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
  }[];
}

export interface UsageData {
  day: string;
  download: number;
  upload: number;
}
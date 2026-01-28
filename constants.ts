
import { Product, Order, Ticket, Quote, UsageData, Invoice } from './types';

// Brand Colors
export const COLORS = {
  BT_PURPLE: '#5514B4',      // Main Primary Color
  BT_DARK_PURPLE: '#330072', // Darker text/hover
  GREEN: '#6CBC35',
  SAFFRON: '#FD9F3E',
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    supplier: 'Cisco',
    title: 'Meraki MX68 Security Appliance',
    category: 'Security',
    summary: 'Cloud-managed security and SD-WAN for small branches.',
    description: 'The Cisco Meraki MX68 is a cloud-managed security and SD-WAN appliance designed for small retail branches and clinics. It offers secure connectivity, easy management, and robust performance.',
    price: 430.00,
    image: 'input_file_5.png',
    features: ['SD-WAN & Auto VPN', 'Layer 7 Traffic Shaping', 'Content Filtering', '4G Cellular Failover']
  },
  {
    id: '2',
    supplier: 'Microsoft',
    title: 'Microsoft 365 Business Standard',
    category: 'Software',
    summary: 'Desktop apps and cloud services for business.',
    description: 'Get work done with productivity solutions and stay connected with your employees and clients whether you’re working remotely or onsite. Includes Word, Excel, Teams, and more.',
    price: 9.60,
    image: 'input_file_4.png',
    features: ['Office Apps (Word, Excel, PPT)', '1TB OneDrive Storage', 'Exchange Email Hosting', 'Microsoft Teams']
  },
  {
    id: '3',
    supplier: 'AWS',
    title: 'EC2 Cloud Compute Instance',
    category: 'Cloud',
    summary: 'Scalable cloud computing capacity (t3.medium).',
    description: 'Amazon Elastic Compute Cloud (Amazon EC2) provides scalable computing capacity in the Amazon Web Services (AWS) cloud. Ideal for hosting web servers and applications.',
    price: 45.00,
    image: 'input_file_3.png',
    features: ['2 vCPUs', '4 GiB Memory', 'EBS Storage Support', 'Global Availability Zones']
  },
  {
    id: '4',
    supplier: 'Dell',
    title: 'UltraSharp 24″ Monitor',
    category: 'Hardware',
    summary: 'High performance IPS monitor for business.',
    description: 'Experience superb screen clarity with Full HD resolution. The Dell UltraSharp 24 Monitor is constructed with a premium panel guaranteeing 99% sRGB coverage.',
    price: 175.00,
    image: 'input_file_2.png',
    features: ['24-inch IPS Display', 'Full HD 1920x1080', 'Adjustable Stand', 'USB 3.0 Hub']
  },
  {
    id: '5',
    supplier: 'Check Point',
    title: 'Quantum Spark 1530 Firewall',
    category: 'Security',
    summary: 'Next-Gen Firewall for small to medium business.',
    description: 'Advanced threat prevention and secure connectivity. The Check Point 1530 offers enterprise-grade security in a compact form factor.',
    price: 550.00,
    image: 'input_file_1.png',
    features: ['Threat Prevention', 'VPN Remote Access', 'Integrated Wi-Fi', 'Unified Management']
  },
  {
    id: '6',
    supplier: 'BT',
    title: 'Business Fibre 900',
    category: 'Broadband',
    summary: 'Ultra-fast full fibre with speeds up to 900Mbps.',
    description: 'Our fastest business broadband package. Perfect for data-heavy businesses, cloud computing, and VoIP systems. Includes 24/7 support and static IP.',
    price: 49.99,
    image: 'input_file_0.png',
    features: ['900Mbps Download', '100Mbps Upload', 'Enhanced Security', '4G Back-up']
  }
];

export const MOCK_ORDERS: Order[] = [
  { id: 'ORD-7782-X', date: '2023-10-25', status: 'Delivered', item: 'Dell UltraSharp 24″', amount: 175.00 },
  { id: 'ORD-9921-A', date: '2023-11-02', status: 'Processing', item: 'Microsoft 365 License (x10)', amount: 96.00 },
  { id: 'ORD-1102-B', date: '2023-11-10', status: 'Shipped', item: 'Cisco Meraki MX68', amount: 430.00 },
];

export const MOCK_TICKETS: Ticket[] = [
  { id: 'TCK-2023-001', subject: 'AWS Instance Connectivity', status: 'Open', date: '2023-11-12', category: 'Technical' },
  { id: 'TCK-2023-002', subject: 'Billing inquiry Oct', status: 'Closed', date: '2023-10-15', category: 'Billing' },
];

// Fixed MOCK_QUOTES to satisfy the Quote interface by adding productId, amount, and quantity
export const MOCK_QUOTES: Quote[] = [
  { 
    id: 'QT-2023-881', 
    productId: '1', 
    productTitle: 'Cisco Meraki MX68 (Bulk Order x5)', 
    date: '2023-11-20', 
    status: 'Pending', 
    amount: 2150.00, 
    quantity: 5 
  },
  { 
    id: 'QT-2023-755', 
    productId: '6', 
    productTitle: 'Business Fibre 900 Upgrade', 
    date: '2023-11-10', 
    status: 'Approved', 
    amount: 49.99, 
    quantity: 1 
  },
  { 
    id: 'QT-2023-602', 
    productId: '3', 
    productTitle: 'AWS Dedicated Host Configuration', 
    date: '2023-10-05', 
    status: 'Rejected', 
    amount: 45.00, 
    quantity: 1 
  },
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: 'INV-2023-001',
    orderId: 'ORD-7782-X',
    date: '2023-10-25',
    dueDate: '2023-11-25',
    amount: 175.00,
    vat: 35.00,
    total: 210.00,
    status: 'Paid',
    items: [
      { description: 'Dell UltraSharp 24″ Monitor', quantity: 1, unitPrice: 175.00 }
    ]
  },
  {
    id: 'INV-2023-002',
    orderId: 'ORD-PREV-99',
    date: '2023-09-15',
    dueDate: '2023-10-15',
    amount: 49.99,
    vat: 10.00,
    total: 59.99,
    status: 'Paid',
    items: [
      { description: 'Business Fibre 900 - Sept Service', quantity: 1, unitPrice: 49.99 }
    ]
  }
];

export const USAGE_DATA: UsageData[] = [
  { day: 'Mon', download: 120, upload: 40 },
  { day: 'Tue', download: 150, upload: 55 },
  { day: 'Wed', download: 180, upload: 30 },
  { day: 'Thu', download: 100, upload: 60 },
  { day: 'Fri', download: 210, upload: 80 },
  { day: 'Sat', download: 90, upload: 20 },
  { day: 'Sun', download: 60, upload: 10 },
];
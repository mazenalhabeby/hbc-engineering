// Shop type definitions

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  currency: string;
  images: string[];
  category: string;
  inStock: boolean;
  stockQuantity: number;
  sku: string;
  attributes?: {
    [key: string]: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
}

export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  apartment?: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
  saveInfo?: boolean;
  shippingMethod: string;
  paymentMethod: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: CheckoutFormData;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

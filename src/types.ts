export type ActiveTab = 'home' | 'midas' | 'catalogo' | 'tienda' | 'contacto';

export type ProductStyle = 'arabe' | 'renacimiento' | 'geometrico';

export type MainCategory = 'mujer' | 'hombre' | 'hogar' | 'religioso' | 'regalo';

export interface Product {
  id: string;
  name: string;
  category: MainCategory;
  categoryLabel: string;
  subCategory: string; // e.g. "Pendientes", "Zippos", "Platos Damasquinados"
  style: ProductStyle; // "arabe" | "renacimiento"
  styleLabel: string; // "Estilo Árabe / Mudéjar" | "Estilo Renacimiento"
  price: number;
  originalPrice?: number;
  image: string;
  tag?: string;
  shortDesc: string;
  longDesc: string;
  availableSizes?: string[]; // for rings
  stock?: number; // unidades en existencia ficticias para la demo
  published?: boolean; // visibilidad en tienda pública
  specifications: {
    oro: string; // "Oro fino 24K (999‰) y oro verde 18K"
    espesor: string; // "Mínimo 4 micras garantizadas"
    base: string; // "Acero dulce pavonado al fuego"
    dimensiones?: string;
    tecnica: string; // "Damasquinado toledano a golpe de buril"
    referencia: string;
  };
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

// Demo Management Types
export type OrderStatus = 'pendiente_pago' | 'en_proceso' | 'completado' | 'cancelado';

export interface OrderItem {
  productId: string;
  productName: string;
  reference: string;
  price: number;
  quantity: number;
  selectedSize?: string;
  image?: string;
}

export interface Order {
  id: string; // e.g. "MG-TOL-2026-101"
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  internalNotes?: { id: string; date: string; text: string }[];
  refundNotice?: string;
}

export interface CustomerSummary {
  name: string;
  email: string;
  phone: string;
  city: string;
  ordersCount: number;
  totalSpent: number;
  firstOrderDate: string;
  lastOrderDate: string;
}

export type AdminTab = 'resumen' | 'productos' | 'pedidos' | 'clientes' | 'configuracion';

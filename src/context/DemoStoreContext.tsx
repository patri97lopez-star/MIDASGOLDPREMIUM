import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Product, Order, OrderStatus, CustomerSummary } from '../types';
import { PRODUCTS } from '../data/products';
import { INITIAL_DEMO_ORDERS } from '../data/demoOrders';

const STORAGE_KEY = 'midasgold_demo_store_v2';

interface DemoStoreContextType {
  products: Product[];
  orders: Order[];
  customers: CustomerSummary[];
  isStorageAvailable: boolean;
  storageWarning: string | null;
  metrics: {
    pendingOrdersCount: number;
    totalOrdersCount: number;
    simulatedSales: number;
    activeProductsCount: number;
  };
  // Product actions
  updateProduct: (product: Product) => void;
  addProduct: (product: Omit<Product, 'id'>) => Product;
  deleteProduct: (productId: string) => void;
  toggleProductPublish: (productId: string) => void;
  updateProductStock: (productId: string, stock: number) => void;
  // Order actions
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addOrderInternalNote: (orderId: string, noteText: string) => void;
  // Demo reset
  resetDemoData: () => void;
  exportDemoDataAsJson: () => void;
}

const DemoStoreContext = createContext<DemoStoreContextType | undefined>(undefined);

// Normalize initial products with stock & published flags
function getNormalizedInitialProducts(): Product[] {
  return PRODUCTS.map((p, idx) => ({
    ...p,
    stock: p.stock ?? (p.inStock ? 6 + (idx % 8) : 0),
    published: p.published ?? true,
    availableSizes:
      p.availableSizes ??
      (p.subCategory.toLowerCase().includes('anillo') || p.name.toLowerCase().includes('anillo')
        ? ['12 (16.5 mm)', '14 (17.2 mm)', '16 (17.8 mm)', '18 (18.5 mm)', '20 (19.2 mm)']
        : undefined),
  }));
}

export const DemoStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed.products) && parsed.products.length > 0) {
          return parsed.products;
        }
      }
    } catch (e) {
      console.warn('LocalStorage no disponible o bloqueado:', e);
    }
    return getNormalizedInitialProducts();
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed.orders) && parsed.orders.length > 0) {
          return parsed.orders;
        }
      }
    } catch (e) {
      console.warn('LocalStorage no disponible o bloqueado:', e);
    }
    return INITIAL_DEMO_ORDERS;
  });

  const [isStorageAvailable, setIsStorageAvailable] = useState<boolean>(true);
  const [storageWarning, setStorageWarning] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      const payload = JSON.stringify({ products, orders });
      localStorage.setItem(STORAGE_KEY, payload);
      setIsStorageAvailable(true);
      setStorageWarning(null);
    } catch (err) {
      console.warn('Error al guardar en localStorage:', err);
      setIsStorageAvailable(false);
      setStorageWarning('Los datos se conservan en memoria durante esta sesión (almacenamiento local restringido por el navegador).');
    }
  }, [products, orders]);

  // Derived Customers from Orders
  const customers = useMemo<CustomerSummary[]>(() => {
    const map = new Map<string, {
      name: string;
      email: string;
      phone: string;
      city: string;
      ordersCount: number;
      totalSpent: number;
      dates: string[];
    }>();

    orders.forEach((o) => {
      const email = o.customerEmail.toLowerCase().trim();
      const existing = map.get(email);
      if (existing) {
        existing.ordersCount += 1;
        existing.totalSpent += o.total;
        existing.dates.push(o.date);
      } else {
        map.set(email, {
          name: o.customerName,
          email: o.customerEmail,
          phone: o.customerPhone,
          city: o.shippingAddress.city,
          ordersCount: 1,
          totalSpent: o.total,
          dates: [o.date],
        });
      }
    });

    return Array.from(map.values()).map((c) => {
      const sortedDates = [...c.dates].sort();
      return {
        name: c.name,
        email: c.email,
        phone: c.phone,
        city: c.city,
        ordersCount: c.ordersCount,
        totalSpent: c.totalSpent,
        firstOrderDate: sortedDates[0],
        lastOrderDate: sortedDates[sortedDates.length - 1],
      };
    });
  }, [orders]);

  // Derived Metrics
  const metrics = useMemo(() => {
    const pendingOrdersCount = orders.filter(
      (o) => o.status === 'pendiente_pago' || o.status === 'en_proceso'
    ).length;

    const totalOrdersCount = orders.length;

    // Simulated sales: sum of completed and in-process orders
    const simulatedSales = orders
      .filter((o) => o.status === 'completado' || o.status === 'en_proceso')
      .reduce((sum, o) => sum + o.total, 0);

    const activeProductsCount = products.filter((p) => p.published !== false).length;

    return {
      pendingOrdersCount,
      totalOrdersCount,
      simulatedSales,
      activeProductsCount,
    };
  }, [orders, products]);

  // Product Actions
  const updateProduct = useCallback((updated: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? { ...updated, inStock: (updated.stock ?? 0) > 0 } : p))
    );
  }, []);

  const addProduct = useCallback((newProdData: Omit<Product, 'id'>) => {
    const newId = `mg-custom-${Date.now().toString(36)}`;
    const fullProduct: Product = {
      ...newProdData,
      id: newId,
      inStock: (newProdData.stock ?? 0) > 0,
      published: newProdData.published ?? true,
    };
    setProducts((prev) => [fullProduct, ...prev]);
    return fullProduct;
  }, []);

  const deleteProduct = useCallback((productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const toggleProductPublish = useCallback((productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, published: !p.published } : p))
    );
  }, []);

  const updateProductStock = useCallback((productId: string, stock: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? {
              ...p,
              stock: Math.max(0, stock),
              inStock: Math.max(0, stock) > 0,
            }
          : p
      )
    );
  }, []);

  // Order Actions
  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 16);
          const newNotes = [
            ...(o.internalNotes || []),
            {
              id: `note-${Date.now()}`,
              date: timestamp,
              text: `Estado actualizado a "${status === 'pendiente_pago' ? 'Pendiente de pago' : status === 'en_proceso' ? 'En proceso' : status === 'completado' ? 'Completado' : 'Cancelado'}" por el administrador en la demo.`,
            },
          ];
          return {
            ...o,
            status,
            internalNotes: newNotes,
            refundNotice:
              status === 'cancelado'
                ? 'Reembolso simulado (informativo) registrado · Sin cargo real ni transferencia bancaria.'
                : o.refundNotice,
          };
        }
        return o;
      })
    );
  }, []);

  const addOrderInternalNote = useCallback((orderId: string, noteText: string) => {
    if (!noteText.trim()) return;
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 16);
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            internalNotes: [
              ...(o.internalNotes || []),
              {
                id: `note-${Date.now()}`,
                date: timestamp,
                text: noteText.trim(),
              },
            ],
          };
        }
        return o;
      })
    );
  }, []);

  // Reset Demo Data
  const resetDemoData = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Error al limpiar localStorage:', e);
    }
    setProducts(getNormalizedInitialProducts());
    setOrders(INITIAL_DEMO_ORDERS);
  }, []);

  // Export as JSON
  const exportDemoDataAsJson = useCallback(() => {
    const data = {
      exportDate: new Date().toISOString(),
      environment: 'Midas Gold Store Management Demo',
      notice: 'Datos ficticios de demostración comercial',
      products,
      orders,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `midasgold-demo-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [products, orders]);

  const value = {
    products,
    orders,
    customers,
    isStorageAvailable,
    storageWarning,
    metrics,
    updateProduct,
    addProduct,
    deleteProduct,
    toggleProductPublish,
    updateProductStock,
    updateOrderStatus,
    addOrderInternalNote,
    resetDemoData,
    exportDemoDataAsJson,
  };

  return <DemoStoreContext.Provider value={value}>{children}</DemoStoreContext.Provider>;
};

export const useDemoStore = () => {
  const context = useContext(DemoStoreContext);
  if (!context) {
    throw new Error('useDemoStore debe usarse dentro de un DemoStoreProvider');
  }
  return context;
};

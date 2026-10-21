/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab, CartItem, Product } from './types';
import { DemoStoreProvider } from './context/DemoStoreContext';
import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { MidasSection } from './components/MidasSection';
import { CatalogoSection } from './components/CatalogoSection';
import { TiendaSection } from './components/TiendaSection';
import { ContactoSection } from './components/ContactoSection';
import { EquipoSection } from './components/EquipoSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { AdminLayout } from './components/admin/AdminLayout';
import { Sparkles, ArrowRight } from 'lucide-react';

function MidasStoreApp() {
  const [viewMode, setViewMode] = useState<'store' | 'admin'>('store');
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Scroll to top whenever active tab or viewMode changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, viewMode]);

  const handleAddToCart = (product: Product, quantity: number = 1, size?: string) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedSize: size }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Render Admin Management Demonstration
  if (viewMode === 'admin') {
    return <AdminLayout onReturnToStore={() => setViewMode('store')} />;
  }

  // Render Public Luxury Store
  return (
    <div className="min-h-screen bg-[#08080a] text-[#ede8dc] flex flex-col font-sans selection:bg-[#d4af37]/30 selection:text-[#f7eed9] relative">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setViewMode('admin')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeSection
            onNavigate={setActiveTab}
            onSelectProduct={setSelectedProduct}
            onAddToCart={handleAddToCart}
          />
        )}

        {activeTab === 'midas' && (
          <MidasSection onNavigate={setActiveTab} />
        )}

        {activeTab === 'catalogo' && (
          <CatalogoSection
            onSelectProduct={setSelectedProduct}
            onAddToCart={handleAddToCart}
          />
        )}

        {activeTab === 'tienda' && (
          <TiendaSection
            onSelectProduct={setSelectedProduct}
            onAddToCart={handleAddToCart}
          />
        )}

        {activeTab === 'equipo' && (
          <EquipoSection onNavigate={setActiveTab} />
        )}

        {activeTab === 'contacto' && (
          <ContactoSection />
        )}
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Discreet Floating Demo Switcher (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-30">
        <button
          onClick={() => setViewMode('admin')}
          className="flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-full bg-[#11131b]/95 text-[#ede8dc] border border-[#d4af37]/45 hover:border-[#d4af37] shadow-[0_8px_30px_rgba(0,0,0,0.8)] backdrop-blur-md hover:bg-[#191b26] active:scale-95 transition-all cursor-pointer group"
          title="Abrir panel interactivo de gestión comercial (Demostración)"
        >
          <span className="w-2 h-2 rounded-full bg-[#d4af37] shadow-[0_0_8px_rgba(212,175,55,0.8)] animate-pulse"></span>
          <span className="text-[#c8c2b5] group-hover:text-[#ffffff] transition-colors">
            Ver panel de gestión · Demo
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-[#d4af37] group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Footer with Discreet Demo Access */}
      <Footer
        onNavigate={setActiveTab}
        onOpenAdmin={() => setViewMode('admin')}
      />
    </div>
  );
}

export default function App() {
  return (
    <DemoStoreProvider>
      <MidasStoreApp />
    </DemoStoreProvider>
  );
}

import React from 'react';
import { ActiveTab } from '../types';
import { ShoppingBag, Sparkles } from 'lucide-react';

import { MidasLogo } from './MidasLogo';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
}) => {
  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'midas', label: 'Midas' },
    { id: 'catalogo', label: 'Catálogo' },
    { id: 'tienda', label: 'Tienda' },
    { id: 'contacto', label: 'Contacto' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0b0c10]/95 backdrop-blur-md border-b border-[#d4af37]/25 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-22 flex items-center justify-between gap-8">
        {/* Zone 1: Official Midas Gold Logo with Stylized Crown */}
        <button
          onClick={() => setActiveTab('home')}
          className="group text-left cursor-pointer whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
          aria-label="Midas Gold Toledo - Ir a inicio"
        >
          <MidasLogo size="sm" showSubtitle={true} />
        </button>

        {/* Zone 2: Navigation Links (single line, clean typography) */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium text-[#c5c1b8]">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative py-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'text-[#f5ebd7] font-semibold'
                    : 'text-[#9c978b] hover:text-[#e8e6e3]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action (Bolsa de compra) */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2.5 px-4 py-2 text-xs uppercase tracking-[0.16em] font-medium text-[#0b0c10] bg-gradient-to-r from-[#e7cb76] via-[#d4af37] to-[#b38a22] hover:brightness-110 active:scale-95 transition-all shadow-[0_2px_15px_rgba(212,175,55,0.3)] rounded-sm cursor-pointer whitespace-nowrap shrink-0"
            aria-label="Abrir bolsa de compras"
          >
            <ShoppingBag className="w-4 h-4 text-[#0b0c10]" />
            <span className="font-semibold">Cesta</span>
            {cartCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 text-[10px] font-bold bg-[#0b0c10] text-[#d4af37] rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav row */}
      <div className="md:hidden border-t border-[#d4af37]/15 px-4 py-2.5 flex items-center justify-around bg-[#0e1015] overflow-x-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`text-[11px] uppercase tracking-[0.14em] py-1 px-2 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'text-[#d4af37] font-semibold border-b border-[#d4af37]'
                  : 'text-[#8f8a7e]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};

import React from 'react';
import { ActiveTab } from '../types';
import { ShoppingBag, Sparkles } from 'lucide-react';

import { MidasLogo } from './MidasLogo';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  onOpenAdmin,
}) => {
  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'midas', label: 'Midas' },
    { id: 'catalogo', label: 'Catálogo' },
    { id: 'tienda', label: 'Tienda' },
    { id: 'equipo', label: 'Nuestro Equipo' },
    { id: 'contacto', label: 'Contacto' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#08080a]/95 backdrop-blur-xl border-b border-[#d4af37]/20 transition-all shadow-[0_4px_25px_-5px_rgba(0,0,0,0.7)]">
      {/* Top Luxury Announcement Bar */}
      <div className="bg-gradient-to-r from-[#0d0e14] via-[#151722] to-[#0d0e14] border-b border-[#d4af37]/15 py-1.5 px-4 text-center">
        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#d8c395] font-medium flex items-center justify-center gap-2">
          <span className="text-[#d4af37] text-[9px]">✦</span>
          <span>Alta Joyería & Damasquinado Imperial de Toledo · Oro de 24K y 18K verde sobre acero noble</span>
          <span className="hidden md:inline text-[#d4af37]/40">·</span>
          <span className="hidden md:inline text-[#a99c80]">Envío Asegurado Oficial</span>
          <span className="text-[#d4af37] text-[9px]">✦</span>
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 h-20 sm:h-22 flex items-center justify-between gap-6">
        {/* Zone 1: Official Midas Gold Logo with Stylized Crown */}
        <button
          onClick={() => setActiveTab('home')}
          className="group text-left cursor-pointer whitespace-nowrap shrink-0 hover:opacity-95 transition-all"
          aria-label="Midas Gold Toledo - Ir a inicio"
        >
          <MidasLogo size="sm" showSubtitle={true} />
        </button>

        {/* Zone 2: Navigation Links (single line, clean typography) */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.22em] font-medium text-[#c5c0b4]">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative py-2 transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'text-[#fbf6ec] font-semibold'
                    : 'text-[#9c9586] hover:text-[#f3ebda]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent shadow-[0_0_8px_rgba(212,175,55,0.7)]"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions - Discreet Management Demo Link & Shopping Bag */}
        <div className="flex items-center gap-3 shrink-0">
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="text-[11px] uppercase tracking-wider text-[#bfb8a6] hover:text-[#fff6df] border border-[#d4af37]/30 hover:border-[#d4af37]/70 px-3 py-1.5 rounded-xs transition-all flex items-center gap-1.5 cursor-pointer bg-[#10121a]/80 hover:bg-[#181a25] shadow-xs"
              title="Demostración de gestión comercial de tienda online"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="hidden sm:inline">Ver panel de gestión · Demo</span>
              <span className="sm:hidden">Panel Demo</span>
            </button>
          )}

          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.16em] font-medium text-[#08080a] bg-gradient-to-r from-[#fae7b1] via-[#d4af37] to-[#ba9028] hover:brightness-110 active:scale-95 transition-all shadow-[0_2px_18px_rgba(212,175,55,0.35)] rounded-xs cursor-pointer whitespace-nowrap shrink-0"
            aria-label="Abrir bolsa de compras"
          >
            <ShoppingBag className="w-4 h-4 text-[#08080a]" />
            <span className="font-bold">Cesta</span>
            {cartCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 text-[10px] font-extrabold bg-[#08080a] text-[#f7e096] rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav row */}
      <div className="md:hidden border-t border-[#d4af37]/15 px-4 py-2.5 flex items-center justify-around bg-[#0a0b10] overflow-x-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`text-[11px] uppercase tracking-[0.16em] py-1 px-2 whitespace-nowrap cursor-pointer transition-colors ${
                isActive
                  ? 'text-[#f5e6b8] font-bold border-b-2 border-[#d4af37]'
                  : 'text-[#8c8678] hover:text-[#d4af37]'
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

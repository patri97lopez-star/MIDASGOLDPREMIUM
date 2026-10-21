import React, { useState } from 'react';
import { AdminTab, Order } from '../../types';
import { useDemoStore } from '../../context/DemoStoreContext';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  ArrowLeft,
  Menu,
  X,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { MidasLogo } from '../MidasLogo';
import { AdminResumen } from './AdminResumen';
import { AdminProductos } from './AdminProductos';
import { AdminPedidos } from './AdminPedidos';
import { AdminClientes } from './AdminClientes';
import { AdminConfiguracion } from './AdminConfiguracion';
import { ProductEditModal } from './ProductEditModal';

interface AdminLayoutProps {
  onReturnToStore: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onReturnToStore }) => {
  const { metrics, products, orders, addProduct } = useDemoStore();
  const [currentTab, setCurrentTab] = useState<AdminTab>('resumen');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [selectedOrderForDrawer, setSelectedOrderForDrawer] = useState<Order | null>(null);

  const navItems = [
    {
      id: 'resumen' as AdminTab,
      label: 'Resumen',
      icon: LayoutDashboard,
      badge: metrics.pendingOrdersCount > 0 ? `${metrics.pendingOrdersCount} pend.` : undefined,
      badgeColor: 'bg-amber-100 text-amber-800',
    },
    {
      id: 'productos' as AdminTab,
      label: 'Productos',
      icon: Package,
      badge: `${products.length}`,
      badgeColor: 'bg-[#f0ede6] text-[#5a554c]',
    },
    {
      id: 'pedidos' as AdminTab,
      label: 'Pedidos',
      icon: ShoppingBag,
      badge: `${orders.length}`,
      badgeColor: metrics.pendingOrdersCount > 0 ? 'bg-amber-100 text-amber-800' : 'bg-[#f0ede6] text-[#5a554c]',
    },
    {
      id: 'clientes' as AdminTab,
      label: 'Clientes',
      icon: Users,
    },
    {
      id: 'configuracion' as AdminTab,
      label: 'Configuración',
      icon: Settings,
    },
  ];

  const handleSelectOrderFromAnywhere = (order: Order) => {
    setSelectedOrderForDrawer(order);
    setCurrentTab('pedidos');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#1f2128] flex flex-col font-sans selection:bg-[#d4af37]/30 selection:text-[#1f2128]">
      {/* Permanent Demonstration Notice Bar (Top) */}
      <div className="bg-[#1f2128] text-[#f5ebd7] px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-[#d4af37]/30">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
          <span className="font-semibold tracking-wide">
            Modo demostración · Datos ficticios · Sin operaciones reales
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-[#c5c1b8]">
          <span className="hidden sm:inline">
            Cambios guardados solo en este navegador; no se comparten entre dispositivos.
          </span>
          <button
            onClick={onReturnToStore}
            className="text-[#d4af37] hover:underline font-bold flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Volver a la tienda pública
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden backdrop-blur-xs"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed md:static inset-y-0 left-0 z-40 bg-[#0d0e12] text-[#e8e6e3] flex flex-col border-r border-[#262833] transition-all duration-200 ease-in-out ${
            isMobileSidebarOpen
              ? 'translate-x-0 w-64'
              : '-translate-x-full md:translate-x-0'
          } ${isSidebarCollapsed ? 'md:w-18' : 'md:w-64'}`}
        >
          {/* Sidebar Header with Brand */}
          <div className="h-16 px-4 flex items-center justify-between border-b border-[#22242e] bg-[#090a0d]">
            {!isSidebarCollapsed ? (
              <div className="flex items-center gap-2">
                <MidasLogo size="sm" showSubtitle={false} />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] border border-[#d4af37]/30 px-1 rounded">
                  Demo
                </span>
              </div>
            ) : (
              <span className="font-serif font-bold text-[#d4af37] text-base mx-auto">MG</span>
            )}

            {/* Mobile close button */}
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="p-1 md:hidden text-[#8c867b] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Return to Public Store in Sidebar */}
          <div className="p-3 border-b border-[#1f2128]">
            <button
              onClick={onReturnToStore}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded bg-[#1a1b22] text-[#f5ebd7] hover:bg-[#252833] hover:text-[#d4af37] transition-all cursor-pointer border border-[#d4af37]/20 ${
                isSidebarCollapsed ? 'justify-center px-0' : ''
              }`}
              title="Volver a la tienda pública"
            >
              <ArrowLeft className="w-4 h-4 text-[#d4af37] shrink-0" />
              {!isSidebarCollapsed && <span>Volver a la tienda</span>}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#d4af37] text-[#0d0e12] font-bold shadow-xs'
                      : 'text-[#9e9a90] hover:bg-[#1a1c24] hover:text-[#f5ebd7]'
                  } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
                  title={item.label}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#0d0e12]' : 'text-[#8c867b]'}`} />
                    {!isSidebarCollapsed && <span>{item.label}</span>}
                  </div>
                  {!isSidebarCollapsed && item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold tabular-nums ${
                        isActive ? 'bg-[#0d0e12] text-[#d4af37]' : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer info */}
          {!isSidebarCollapsed && (
            <div className="p-4 border-t border-[#1f2128] text-[11px] text-[#787368] space-y-1">
              <p className="font-semibold text-[#a8a398]">Midas Gold · Backoffice Demo</p>
              <p className="text-[10px] text-[#5e5a52]">v1.0 · Presentación comercial</p>
            </div>
          )}

          {/* Desktop Collapse Toggle */}
          <div className="hidden md:block p-2 border-t border-[#1f2128] text-center">
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="w-full py-1.5 text-xs text-[#8c867b] hover:text-white rounded hover:bg-[#1a1c24] transition-colors cursor-pointer"
              title={isSidebarCollapsed ? 'Expandir barra lateral' : 'Plegar barra lateral'}
            >
              {isSidebarCollapsed ? '→' : '← Plegar menú'}
            </button>
          </div>
        </aside>

        {/* Main Workspace Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Bar inside Workspace */}
          <header className="h-16 bg-white border-b border-[#e5e0d8] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-3">
              {/* Mobile menu trigger */}
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="p-2 md:hidden text-[#5a554c] hover:bg-[#f5f2eb] rounded"
                title="Abrir menú"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs text-[#787368]">
                <span>Gestión</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#b3ad9f]" />
                <span className="font-semibold text-[#1a1918] capitalize">
                  {currentTab}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsNewProductModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider bg-[#1f2128] text-[#f5ebd7] hover:bg-[#33353d] rounded transition-colors shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                Nueva pieza
              </button>

              <button
                onClick={onReturnToStore}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#faf8f5] text-[#2d2a26] border border-[#d8d3c8] hover:border-[#c59e35] rounded transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#c59e35]" />
                <span className="hidden sm:inline">Volver a la</span> tienda pública
              </button>
            </div>
          </header>

          {/* Tab Content Page */}
          <main className="flex-1 p-4 sm:p-8 bg-[#f8f9fa]">
            {currentTab === 'resumen' && (
              <AdminResumen
                onNavigateTab={setCurrentTab}
                onSelectOrder={handleSelectOrderFromAnywhere}
                onOpenNewProductModal={() => setIsNewProductModalOpen(true)}
              />
            )}

            {currentTab === 'productos' && <AdminProductos />}

            {currentTab === 'pedidos' && (
              <AdminPedidos
                selectedOrderForModal={selectedOrderForDrawer}
                onClearSelectedOrder={() => setSelectedOrderForDrawer(null)}
              />
            )}

            {currentTab === 'clientes' && (
              <AdminClientes
                onSelectOrderFromCustomer={handleSelectOrderFromAnywhere}
              />
            )}

            {currentTab === 'configuracion' && <AdminConfiguracion />}
          </main>
        </div>
      </div>

      {/* Global Product Edit Modal triggered from top header */}
      <ProductEditModal
        isOpen={isNewProductModalOpen}
        product={null}
        onClose={() => setIsNewProductModalOpen(false)}
        onSave={(newProd) => {
          addProduct(newProd);
          setIsNewProductModalOpen(false);
          setCurrentTab('productos');
        }}
      />
    </div>
  );
};

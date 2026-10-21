import React from 'react';
import { useDemoStore } from '../../context/DemoStoreContext';
import { AdminTab, Order } from '../../types';
import {
  Clock,
  ShoppingBag,
  Euro,
  Package,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';

interface AdminResumenProps {
  onNavigateTab: (tab: AdminTab) => void;
  onSelectOrder: (order: Order) => void;
  onOpenNewProductModal: () => void;
}

export const AdminResumen: React.FC<AdminResumenProps> = ({
  onNavigateTab,
  onSelectOrder,
  onOpenNewProductModal,
}) => {
  const { metrics, orders, products, customers } = useDemoStore();

  const recentOrders = orders.slice(0, 5);
  const lowStockProducts = products.filter((p) => (p.stock ?? 0) <= 2 && p.published !== false);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Editorial Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e5e0d8] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-[#1f2128] text-[#d4af37] rounded">
              Panel de Demostración
            </span>
            <span className="text-xs text-[#787368]">
              Midas Gold Toledo · Gestión Comercial
            </span>
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#1a1918] mt-1.5">
            Resumen General de la Tienda
          </h1>
          <p className="text-xs text-[#6e685c] mt-1">
            Indicadores en tiempo real calculados estrictamente desde los datos de ejemplo de esta sesión.
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigateTab('pedidos')}
            className="px-3.5 py-2 text-xs font-semibold bg-white text-[#2d2a26] border border-[#d8d3c8] hover:border-[#c59e35] rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#c59e35]" />
            Ver pedidos ({metrics.totalOrdersCount})
          </button>
          <button
            onClick={onOpenNewProductModal}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#1f2128] text-[#f5ebd7] hover:bg-[#33353d] rounded transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            Añadir pieza de prueba
          </button>
        </div>
      </div>

      {/* Useful Metrics Cards (Clean, real calculations, no fake growth %) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Pedidos pendientes */}
        <div className="p-5 bg-white border border-[#e5e0d8] rounded-lg shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#736e65]">
              Pedidos pendientes
            </span>
            <div className="p-2 rounded bg-amber-50 text-amber-700 border border-amber-200">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-mono text-3xl font-bold text-[#1a1918]">
              {metrics.pendingOrdersCount}
            </div>
            <p className="text-[11px] text-[#787368] mt-1">
              Requieren atención o preparación en taller
            </p>
          </div>
        </div>

        {/* Card 2: Pedidos del periodo */}
        <div className="p-5 bg-white border border-[#e5e0d8] rounded-lg shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#736e65]">
              Pedidos del período
            </span>
            <div className="p-2 rounded bg-blue-50 text-blue-700 border border-blue-200">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-mono text-3xl font-bold text-[#1a1918]">
              {metrics.totalOrdersCount}
            </div>
            <p className="text-[11px] text-[#787368] mt-1">
              Total de pedidos simulados registrados
            </p>
          </div>
        </div>

        {/* Card 3: Ventas simuladas */}
        <div className="p-5 bg-white border border-[#e5e0d8] rounded-lg shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#736e65]">
              Ventas simuladas
            </span>
            <div className="p-2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Euro className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-mono text-3xl font-bold text-[#997314]">
              {metrics.simulatedSales.toLocaleString('es-ES')} €
            </div>
            <p className="text-[11px] text-[#787368] mt-1">
              Suma de pedidos completados y en proceso
            </p>
          </div>
        </div>

        {/* Card 4: Catálogo activo */}
        <div className="p-5 bg-white border border-[#e5e0d8] rounded-lg shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#736e65]">
              Productos activos
            </span>
            <div className="p-2 rounded bg-[#f5f2eb] text-[#807a70] border border-[#e5e0d8]">
              <Package className="w-4 h-4 text-[#c59e35]" />
            </div>
          </div>
          <div>
            <div className="font-mono text-3xl font-bold text-[#1a1918]">
              {metrics.activeProductsCount}
            </div>
            <p className="text-[11px] text-[#787368] mt-1">
              Piezas publicadas en la tienda pública
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Orders & Inventory Notice */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table (2 columns) */}
        <div className="lg:col-span-2 bg-white border border-[#e5e0d8] rounded-lg shadow-xs overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-[#e5e0d8] bg-[#faf8f5] flex items-center justify-between">
            <div>
              <h2 className="font-serif text-sm font-bold uppercase tracking-wider text-[#1a1918]">
                Pedidos recientes
              </h2>
              <p className="text-xs text-[#787368]">Últimos encargos registrados en el sistema de demostración</p>
            </div>
            <button
              onClick={() => onNavigateTab('pedidos')}
              className="text-xs font-semibold text-[#997314] hover:text-[#7a5c10] flex items-center gap-1 cursor-pointer"
            >
              Ver todos ({orders.length}) →
            </button>
          </div>

          <div className="divide-y divide-[#ece7de] overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#fcfbf9] text-[#787368] uppercase text-[10px] tracking-wider border-b border-[#ece7de]">
                <tr>
                  <th className="py-2.5 px-4 font-semibold">Nº Pedido</th>
                  <th className="py-2.5 px-4 font-semibold">Fecha</th>
                  <th className="py-2.5 px-4 font-semibold">Cliente ficticio</th>
                  <th className="py-2.5 px-4 font-semibold">Estado</th>
                  <th className="py-2.5 px-4 font-semibold text-right">Importe</th>
                  <th className="py-2.5 px-4 font-semibold text-center">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0ede6]">
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-[#fbf9f5] transition-colors"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-[#1a1918]">
                      {order.id}
                    </td>
                    <td className="py-3 px-4 text-[#6e685c]">
                      {order.date.slice(0, 16)}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-[#2d2a26] block">{order.customerName}</span>
                      <span className="text-[11px] text-[#8c867b] font-mono">{order.customerEmail}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold rounded-full border ${
                        order.status === 'completado'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : order.status === 'en_proceso'
                          ? 'bg-blue-50 text-blue-800 border-blue-300'
                          : order.status === 'cancelado'
                          ? 'bg-rose-50 text-rose-800 border-rose-300'
                          : 'bg-amber-50 text-amber-800 border-amber-300'
                      }`}>
                        {order.status === 'completado' && 'Completado'}
                        {order.status === 'en_proceso' && 'En proceso'}
                        {order.status === 'cancelado' && 'Cancelado'}
                        {order.status === 'pendiente_pago' && 'Pendiente'}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-right text-[#1a1918]">
                      {order.total.toLocaleString('es-ES')} €
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => onSelectOrder(order)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-[#1a1918] bg-[#f5f2eb] hover:bg-[#ede8dc] border border-[#d8d3c8] rounded transition-colors cursor-pointer"
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Column: Stock Alerts & Fast Nav */}
        <div className="space-y-6">
          {/* Stock Alerts */}
          <div className="bg-white border border-[#e5e0d8] rounded-lg shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#1a1918] flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Control de existencias
              </h3>
              <button
                onClick={() => onNavigateTab('productos')}
                className="text-[11px] font-semibold text-[#997314] hover:underline"
              >
                Catálogo →
              </button>
            </div>

            {lowStockProducts.length > 0 ? (
              <div className="space-y-2.5">
                <p className="text-xs text-[#736e65]">
                  Piezas con 2 o menos unidades en stock para la demo:
                </p>
                <div className="divide-y divide-[#ece7de] border border-[#e8e3d8] rounded">
                  {lowStockProducts.slice(0, 4).map((p) => (
                    <div key={p.id} className="p-2.5 bg-[#fcfbf9] flex items-center justify-between text-xs">
                      <div className="truncate pr-2">
                        <p className="font-medium text-[#1a1918] truncate">{p.name}</p>
                        <p className="text-[10px] text-[#787368] font-mono">{p.specifications.referencia}</p>
                      </div>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded shrink-0 ${
                        (p.stock ?? 0) === 0
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {p.stock ?? 0} u.
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Todas las piezas del catálogo disponen de existencias suficientes.</span>
              </div>
            )}
          </div>

          {/* Quick Access Card */}
          <div className="bg-[#faf8f5] border border-[#e5e0d8] rounded-lg shadow-xs p-5 space-y-3">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#1a1918]">
              Accesos a gestión
            </h3>
            <div className="space-y-2 text-xs">
              <button
                onClick={() => onNavigateTab('productos')}
                className="w-full p-2.5 bg-white border border-[#dcd7cd] hover:border-[#c59e35] rounded font-medium text-[#2d2a26] flex items-center justify-between text-left transition-colors cursor-pointer"
              >
                <span>Administrar catálogo y precios ({products.length} piezas)</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#c59e35]" />
              </button>
              <button
                onClick={() => onNavigateTab('pedidos')}
                className="w-full p-2.5 bg-white border border-[#dcd7cd] hover:border-[#c59e35] rounded font-medium text-[#2d2a26] flex items-center justify-between text-left transition-colors cursor-pointer"
              >
                <span>Gestionar estados de pedidos ({orders.length})</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#c59e35]" />
              </button>
              <button
                onClick={() => onNavigateTab('clientes')}
                className="w-full p-2.5 bg-white border border-[#dcd7cd] hover:border-[#c59e35] rounded font-medium text-[#2d2a26] flex items-center justify-between text-left transition-colors cursor-pointer"
              >
                <span>Consultar fichas de clientes ({customers.length})</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#c59e35]" />
              </button>
              <button
                onClick={() => onNavigateTab('configuracion')}
                className="w-full p-2.5 bg-white border border-[#dcd7cd] hover:border-[#c59e35] rounded font-medium text-[#2d2a26] flex items-center justify-between text-left transition-colors cursor-pointer"
              >
                <span>Configuración de tienda y persistencia</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#c59e35]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

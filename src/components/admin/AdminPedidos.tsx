import React, { useState } from 'react';
import { useDemoStore } from '../../context/DemoStoreContext';
import { Order, OrderStatus } from '../../types';
import {
  Search,
  Clock,
  Package,
  CheckCircle2,
  RotateCcw,
  Eye,
  Info,
  Calendar,
  CreditCard,
} from 'lucide-react';
import { OrderDetailDrawer } from './OrderDetailDrawer';

interface AdminPedidosProps {
  selectedOrderForModal?: Order | null;
  onClearSelectedOrder?: () => void;
}

export const AdminPedidos: React.FC<AdminPedidosProps> = ({
  selectedOrderForModal,
  onClearSelectedOrder,
}) => {
  const { orders, updateOrderStatus, addOrderInternalNote } = useDemoStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | OrderStatus>('todos');
  const [activeDrawerOrder, setActiveDrawerOrder] = useState<Order | null>(
    selectedOrderForModal || null
  );

  // Sync if prop changed
  React.useEffect(() => {
    if (selectedOrderForModal) {
      setActiveDrawerOrder(selectedOrderForModal);
    }
  }, [selectedOrderForModal]);

  // Keep drawer order updated when orders update
  const currentOrderInDrawer = activeDrawerOrder
    ? orders.find((o) => o.id === activeDrawerOrder.id) || null
    : null;

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.shippingAddress.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'todos' || o.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pendiente_pago':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-amber-50 text-amber-800 border border-amber-300">
            <Clock className="w-3 h-3 text-amber-600" />
            Pendiente de pago
          </span>
        );
      case 'en_proceso':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-blue-50 text-blue-800 border border-blue-300">
            <Package className="w-3 h-3 text-blue-600" />
            En proceso
          </span>
        );
      case 'completado':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Completado
          </span>
        );
      case 'cancelado':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-rose-50 text-rose-800 border border-rose-300">
            <RotateCcw className="w-3 h-3 text-rose-600" />
            Cancelado
          </span>
        );
    }
  };

  const handleCloseDrawer = () => {
    setActiveDrawerOrder(null);
    if (onClearSelectedOrder) onClearSelectedOrder();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#e5e0d8] pb-5">
        <h1 className="font-serif text-2xl font-bold text-[#1a1918]">
          Gestión de Pedidos
        </h1>
        <p className="text-xs text-[#6e685c] mt-0.5">
          Listado de {orders.length} pedidos de prueba. Haz clic en cualquiera para abrir su desglose, gestionar estados de taller y registrar notas internas.
        </p>
      </div>

      {/* Discretion & Transport Notice */}
      <div className="bg-[#faf8f5] border border-[#e5e0d8] p-3.5 rounded-lg flex items-start gap-2.5 text-xs text-[#6e685c]">
        <Info className="w-4 h-4 text-[#c59e35] shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p>
            <strong>Nota comercial:</strong> El estado <em>«Completado»</em> acredita el montaje, contrastación y salida de taller; no certifica entrega final por empresas de transporte externas.
          </p>
          <p className="text-[11px] text-[#8c867b]">
            Modo demostración · No se envían notificaciones por email ni se realizan movimientos de fondos reales.
          </p>
        </div>
      </div>

      {/* Status Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-lg border border-[#e5e0d8] shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'todos', label: 'Todos', count: orders.length },
              {
                id: 'pendiente_pago',
                label: 'Pendiente de pago',
                count: orders.filter((o) => o.status === 'pendiente_pago').length,
              },
              {
                id: 'en_proceso',
                label: 'En proceso',
                count: orders.filter((o) => o.status === 'en_proceso').length,
              },
              {
                id: 'completado',
                label: 'Completados',
                count: orders.filter((o) => o.status === 'completado').length,
              },
              {
                id: 'cancelado',
                label: 'Cancelados',
                count: orders.filter((o) => o.status === 'cancelado').length,
              },
            ].map((tab) => {
              const isActive = statusFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id as any)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#1f2128] text-[#f5ebd7]'
                      : 'bg-[#fcfbf9] text-[#6b665c] border border-[#d8d3c8] hover:border-[#1f2128]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${
                    isActive ? 'bg-[#3b3d48] text-[#d4af37]' : 'bg-[#ede8dc] text-[#5c574c]'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-[#8c867b] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nº pedido, cliente o ciudad..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#fcfbf9] border border-[#d8d3c8] rounded focus:outline-hidden focus:border-[#c59e35]"
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-[#e5e0d8] shadow-xs overflow-hidden">
        {filteredOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#faf8f5] text-[#6b665c] uppercase text-[10px] tracking-wider border-b border-[#e5e0d8]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Nº Pedido</th>
                  <th className="py-3 px-4 font-semibold">Fecha y Hora</th>
                  <th className="py-3 px-4 font-semibold">Cliente ficticio</th>
                  <th className="py-3 px-4 font-semibold">Artículos</th>
                  <th className="py-3 px-4 font-semibold">Método de pago</th>
                  <th className="py-3 px-4 font-semibold">Estado comercial</th>
                  <th className="py-3 px-4 font-semibold text-right">Importe (€)</th>
                  <th className="py-3 px-4 font-semibold text-center">Detalle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ece7de]">
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => setActiveDrawerOrder(order)}
                    className="hover:bg-[#fbf9f5] transition-colors cursor-pointer"
                  >
                    {/* Order ID */}
                    <td className="py-3 px-4 font-mono font-bold text-[#1a1918]">
                      {order.id}
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 text-[#6e685c] whitespace-nowrap">
                      {order.date}
                    </td>

                    {/* Customer */}
                    <td className="py-3 px-4">
                      <p className="font-semibold text-[#1a1918]">{order.customerName}</p>
                      <p className="text-[11px] text-[#787368] font-mono">{order.customerEmail}</p>
                    </td>

                    {/* Items count & summary */}
                    <td className="py-3 px-4 max-w-xs truncate text-[#5a554c]">
                      {order.items.reduce((s, i) => s + i.quantity, 0)} u. (
                      {order.items.map((i) => i.productName).join(', ')})
                    </td>

                    {/* Payment Method */}
                    <td className="py-3 px-4 text-[#5a554c] whitespace-nowrap">
                      {order.paymentMethod}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      {getStatusBadge(order.status)}
                    </td>

                    {/* Total Amount */}
                    <td className="py-3 px-4 text-right font-mono font-bold text-sm text-[#1a1918] whitespace-nowrap">
                      {order.total.toLocaleString('es-ES')} €
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDrawerOrder(order);
                        }}
                        className="px-2.5 py-1 text-xs font-medium text-[#1a1918] bg-[#f5f2eb] hover:bg-[#ede8dc] border border-[#d8d3c8] rounded transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#c59e35]" />
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center space-y-2">
            <p className="font-serif text-base font-bold text-[#1a1918]">
              No se han encontrado pedidos
            </p>
            <p className="text-xs text-[#787368]">
              No hay pedidos que coincidan con la búsqueda o el filtro de estado actual.
            </p>
          </div>
        )}
      </div>

      {/* Order Detail Drawer */}
      <OrderDetailDrawer
        order={currentOrderInDrawer}
        onClose={handleCloseDrawer}
        onUpdateStatus={updateOrderStatus}
        onAddNote={addOrderInternalNote}
      />
    </div>
  );
};

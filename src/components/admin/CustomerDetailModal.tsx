import React from 'react';
import { CustomerSummary, Order } from '../../types';
import { X, User, Mail, Phone, MapPin, ShoppingBag, Calendar, Euro, Info } from 'lucide-react';

interface CustomerDetailModalProps {
  customer: CustomerSummary | null;
  orders: Order[];
  onClose: () => void;
  onSelectOrder: (order: Order) => void;
}

export const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({
  customer,
  orders,
  onClose,
  onSelectOrder,
}) => {
  if (!customer) return null;

  const customerOrders = orders.filter(
    (o) => o.customerEmail.toLowerCase().trim() === customer.email.toLowerCase().trim()
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white text-[#1f2128] rounded-lg shadow-2xl border border-[#d8d3c8] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#e5e0d8] bg-[#faf8f5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#1f2128] text-[#d4af37] flex items-center justify-center font-serif font-bold text-sm">
              {customer.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1f2128]">
                {customer.name}
              </h3>
              <p className="text-xs text-[#736e65]">Ficha de cliente ficticio para demostración comercial</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8c867b] hover:text-[#1f2128] hover:bg-[#ede8dc] rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative Note */}
        <div className="bg-[#f5f2eb] px-6 py-2.5 border-b border-[#e2ddd3] flex items-start gap-2 text-xs text-[#6e685c]">
          <Info className="w-4 h-4 text-[#c59e35] shrink-0 mt-0.5" />
          <span>Esta ficha se genera dinámicamente a partir del historial de pedidos simulados. No incorpora seguimiento CRM invasivo ni perfiles publicitarios.</span>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#fbf9f5] border border-[#e8e3d8] rounded-md space-y-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#4d483f] block">
                Datos de contacto
              </span>
              <div className="space-y-2 text-xs text-[#2d2a26]">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#c59e35]" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#c59e35]" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#c59e35]" />
                  <span>Ciudad principal: {customer.city}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#fbf9f5] border border-[#e8e3d8] rounded-md space-y-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#4d483f] block">
                Resumen de compras simuladas
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-white rounded border border-[#e5e0d8]">
                  <p className="text-[10px] uppercase text-[#736e65]">Pedidos totales</p>
                  <p className="font-mono text-base font-bold text-[#1f2128] mt-0.5">{customer.ordersCount}</p>
                </div>
                <div className="p-2 bg-white rounded border border-[#e5e0d8]">
                  <p className="text-[10px] uppercase text-[#736e65]">Importe acumulado</p>
                  <p className="font-mono text-base font-bold text-[#997314] mt-0.5">
                    {customer.totalSpent.toLocaleString('es-ES')} €
                  </p>
                </div>
              </div>
              <div className="text-[11px] text-[#787368] pt-1">
                Primer pedido: {customer.firstOrderDate} · Último: {customer.lastOrderDate}
              </div>
            </div>
          </div>

          {/* Orders History Table */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4d483f] flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-[#c59e35]" />
              Historial de pedidos asociados ({customerOrders.length})
            </h4>

            {customerOrders.length > 0 ? (
              <div className="border border-[#e5e0d8] rounded-md overflow-hidden divide-y divide-[#ece7de]">
                {customerOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-3.5 bg-white hover:bg-[#faf8f5] transition-colors flex items-center justify-between gap-4 cursor-pointer"
                    onClick={() => {
                      onClose();
                      onSelectOrder(ord);
                    }}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#1f2128]">{ord.id}</span>
                        <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${
                          ord.status === 'completado'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : ord.status === 'en_proceso'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : ord.status === 'cancelado'
                            ? 'bg-rose-50 text-rose-800 border-rose-300'
                            : 'bg-amber-50 text-amber-800 border-amber-300'
                        }`}>
                          {ord.status === 'completado' && 'Completado'}
                          {ord.status === 'en_proceso' && 'En proceso'}
                          {ord.status === 'cancelado' && 'Cancelado'}
                          {ord.status === 'pendiente_pago' && 'Pendiente'}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#787368] mt-1">
                        {ord.items.map((i) => `${i.quantity}x ${i.productName}`).join(', ')}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="font-mono text-xs font-bold text-[#1f2128]">
                        {ord.total.toLocaleString('es-ES')} €
                      </p>
                      <p className="text-[10px] text-[#8c867b]">{ord.date.slice(0, 10)}</p>
                      <span className="text-[10px] text-[#c59e35] font-semibold hover:underline block mt-0.5">
                        Ver detalle →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#8c867b] italic">Sin pedidos registrados para este cliente.</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#e5e0d8] bg-[#faf8f5] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#ede8dc] text-[#3d3931] hover:bg-[#e0dad0] text-xs font-semibold rounded transition-colors"
          >
            Cerrar ficha
          </button>
        </div>
      </div>
    </div>
  );
};

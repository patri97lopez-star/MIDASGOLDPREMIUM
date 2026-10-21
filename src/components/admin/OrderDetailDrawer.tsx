import React, { useState } from 'react';
import { Order, OrderStatus } from '../../types';
import {
  X,
  Clock,
  Package,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Send,
  User,
  MapPin,
  CreditCard,
  FileText,
  Info,
} from 'lucide-react';

interface OrderDetailDrawerProps {
  order: Order | null;
  onClose: () => void;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
  onAddNote: (orderId: string, noteText: string) => void;
}

export const OrderDetailDrawer: React.FC<OrderDetailDrawerProps> = ({
  order,
  onClose,
  onUpdateStatus,
  onAddNote,
}) => {
  const [newNote, setNewNote] = useState('');
  const [showStatusConfirm, setShowStatusConfirm] = useState(false);
  const [selectedTargetStatus, setSelectedTargetStatus] = useState<OrderStatus | null>(null);

  if (!order) return null;

  const handleStatusChangeClick = (newStatus: OrderStatus) => {
    setSelectedTargetStatus(newStatus);
    setShowStatusConfirm(true);
  };

  const handleConfirmStatusChange = () => {
    if (selectedTargetStatus && order) {
      onUpdateStatus(order.id, selectedTargetStatus);
      setShowStatusConfirm(false);
      setSelectedTargetStatus(null);
    }
  };

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    onAddNote(order.id, newNote);
    setNewNote('');
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pendiente_pago':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3.5 h-3.5" />
            Pendiente de pago
          </span>
        );
      case 'en_proceso':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 border border-blue-300">
            <Package className="w-3.5 h-3.5" />
            En proceso
          </span>
        );
      case 'completado':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Completado
          </span>
        );
      case 'cancelado':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-rose-100 text-rose-800 border border-rose-300">
            <RotateCcw className="w-3.5 h-3.5" />
            Cancelado
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-xl bg-white text-[#1f2128] shadow-2xl flex flex-col h-full border-l border-[#dcd7cd] animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-[#e5e0d8] bg-[#faf8f5] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-[#1f2128]">{order.id}</span>
              {getStatusBadge(order.status)}
            </div>
            <p className="text-xs text-[#787368] mt-0.5">Fecha: {order.date} · Pedido Ficticio</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8c867b] hover:text-[#1f2128] hover:bg-[#ede8dc] rounded transition-colors"
            title="Cerrar panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative Disclaimer Banner */}
        <div className="bg-[#f5f2eb] px-6 py-2.5 border-b border-[#e2ddd3] flex items-start gap-2 text-xs text-[#6e685c]">
          <Info className="w-4 h-4 text-[#c59e35] shrink-0 mt-0.5" />
          <div>
            <span><strong>Aviso de estado:</strong> El estado «Completado» refleja el embalaje y cierre en taller de demostración; no acredita entrega física por un transportista. Ninguna acción envía correos reales ni ejecuta transacciones bancarias.</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status Changer Actions */}
          <div className="p-4 bg-[#fbf9f5] border border-[#e8e3d8] rounded-md space-y-2.5">
            <span className="block text-xs font-semibold uppercase tracking-wider text-[#4d483f]">
              Cambiar estado del pedido (Simulado):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['pendiente_pago', 'en_proceso', 'completado', 'cancelado'] as OrderStatus[]).map((st) => {
                const isCurrent = order.status === st;
                return (
                  <button
                    key={st}
                    type="button"
                    onClick={() => handleStatusChangeClick(st)}
                    disabled={isCurrent}
                    className={`py-1.5 px-2 text-xs font-medium rounded border transition-all text-center cursor-pointer ${
                      isCurrent
                        ? 'bg-[#1f2128] text-[#f5ebd7] border-[#1f2128] cursor-default'
                        : 'bg-white text-[#524d43] border-[#d8d3c8] hover:border-[#c59e35] hover:text-[#1f2128]'
                    }`}
                  >
                    {st === 'pendiente_pago' && 'Pendiente'}
                    {st === 'en_proceso' && 'En proceso'}
                    {st === 'completado' && 'Completado'}
                    {st === 'cancelado' && 'Cancelado'}
                  </button>
                );
              })}
            </div>

            {/* Refund notice example if order is cancelled */}
            {order.status === 'cancelado' && order.refundNotice && (
              <div className="mt-2.5 p-2.5 bg-rose-50 border border-rose-200 rounded text-xs text-rose-800 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Ejemplo de Reembolso Informativo:</strong>
                  <p className="mt-0.5 text-[11px]">{order.refundNotice}</p>
                </div>
              </div>
            )}
          </div>

          {/* Customer & Shipping Data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-[#e5e0d8] rounded-md space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#4d483f]">
                <User className="w-3.5 h-3.5 text-[#c59e35]" />
                Cliente de demostración
              </div>
              <div className="text-xs space-y-1 text-[#2d2a26]">
                <p className="font-semibold">{order.customerName}</p>
                <p className="text-[#6b665c]">{order.customerEmail}</p>
                <p className="text-[#6b665c]">{order.customerPhone}</p>
                <p className="text-[11px] text-[#918b7f] italic">Identidad y correo ficticios para la demo.</p>
              </div>
            </div>

            <div className="p-4 bg-white border border-[#e5e0d8] rounded-md space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#4d483f]">
                <MapPin className="w-3.5 h-3.5 text-[#c59e35]" />
                Dirección de entrega simulada
              </div>
              <div className="text-xs space-y-1 text-[#2d2a26]">
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.postalCode} - {order.shippingAddress.city}</p>
                <p className="text-[#6b665c]">{order.shippingAddress.country}</p>
                <div className="pt-1 flex items-center gap-1 text-[11px] text-[#736e65]">
                  <CreditCard className="w-3 h-3 text-[#c59e35]" />
                  <span>Pago: {order.paymentMethod}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Items Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4d483f]">
              Artículos del pedido ({order.items.length})
            </h4>
            <div className="border border-[#e5e0d8] rounded-md divide-y divide-[#ece7de] overflow-hidden">
              {order.items.map((item, index) => (
                <div key={index} className="p-3 bg-white flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-12 h-12 rounded object-cover border border-[#e0dad0]"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded bg-[#f5f2eb] border border-[#e0dad0] flex items-center justify-center text-xs text-[#8c867b]">
                        Joya
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-[#1f2128]">{item.productName}</p>
                      <p className="text-[#787368] font-mono text-[11px]">Ref: {item.reference}</p>
                      {item.selectedSize && (
                        <span className="inline-block px-1.5 py-0.5 text-[10px] bg-[#f5f2eb] text-[#5c574c] rounded border border-[#e0dad0] mt-0.5">
                          Talla: {item.selectedSize}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#1f2128] tabular-nums">
                      {item.quantity} x {item.price.toLocaleString('es-ES')} €
                    </p>
                    <p className="text-[#787368] font-mono text-xs">
                      = {(item.quantity * item.price).toLocaleString('es-ES')} €
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Totals */}
            <div className="bg-[#faf8f5] p-3.5 border border-[#e5e0d8] rounded-md space-y-1.5 text-xs">
              <div className="flex justify-between text-[#6b665c]">
                <span>Subtotal productos:</span>
                <span className="font-mono">{order.subtotal.toLocaleString('es-ES')} €</span>
              </div>
              <div className="flex justify-between text-[#6b665c]">
                <span>Gastos de envío simulados:</span>
                <span className="font-mono">
                  {order.shippingCost === 0 ? 'Gratis (Promoción Taller)' : `${order.shippingCost.toLocaleString('es-ES')} €`}
                </span>
              </div>
              <div className="pt-2 border-t border-[#e2ddd3] flex justify-between font-bold text-sm text-[#1f2128]">
                <span>Importe Total:</span>
                <span className="font-mono text-[#997314] text-base">{order.total.toLocaleString('es-ES')} €</span>
              </div>
            </div>
          </div>

          {/* Internal Notes Log */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4d483f] flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#c59e35]" />
              Notas internas de gestión (Visibles solo en administración)
            </h4>

            {order.internalNotes && order.internalNotes.length > 0 ? (
              <div className="space-y-2">
                {order.internalNotes.map((note) => (
                  <div key={note.id} className="p-3 bg-[#faf8f5] border border-[#e5e0d8] rounded text-xs space-y-1">
                    <div className="flex justify-between text-[11px] text-[#807a70]">
                      <span className="font-medium text-[#4a463d]">Taller / Gestor Demo</span>
                      <span>{note.date}</span>
                    </div>
                    <p className="text-[#2d2a26]">{note.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#8c867b] italic">Sin notas registradas en este pedido.</p>
            )}

            {/* Add note input */}
            <form onSubmit={handleAddNoteSubmit} className="pt-1 flex gap-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Añadir nota interna (p. ej. Estuche preparado, certificado firmado...)"
                className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#d8d3c8] rounded focus:outline-hidden focus:border-[#c59e35]"
              />
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-semibold bg-[#1f2128] text-[#f5ebd7] hover:bg-[#33353d] rounded transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <Send className="w-3 h-3 text-[#d4af37]" />
                Guardar nota
              </button>
            </form>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="px-6 py-3 border-t border-[#e5e0d8] bg-[#faf8f5] flex justify-between items-center text-xs text-[#787368]">
          <span>Midas Gold · Panel de Demostración</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#ede8dc] text-[#3d3931] hover:bg-[#e0dad0] font-semibold rounded transition-colors cursor-pointer"
          >
            Cerrar detalle
          </button>
        </div>
      </div>

      {/* Confirmation Modal for Status Change */}
      {showStatusConfirm && (
        <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full border border-[#d8d3c8] shadow-2xl space-y-4">
            <h4 className="font-serif font-bold text-base text-[#1f2128]">
              ¿Actualizar estado del pedido?
            </h4>
            <p className="text-xs text-[#6e685c] leading-relaxed">
              El pedido pasará a estado <strong>{selectedTargetStatus}</strong>. Recuerda que es una demostración: ningún transportista será notificado y ningún correo llegará al cliente.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowStatusConfirm(false)}
                className="px-3 py-1.5 text-xs font-medium text-[#5e594f] hover:bg-[#ede8dc] rounded"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmStatusChange}
                className="px-4 py-1.5 text-xs font-semibold bg-[#1f2128] text-[#f5ebd7] rounded hover:bg-[#33353d]"
              >
                Confirmar cambio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

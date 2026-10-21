import React, { useState } from 'react';
import { useDemoStore } from '../../context/DemoStoreContext';
import { CustomerSummary, Order } from '../../types';
import {
  Search,
  User,
  ShoppingBag,
  Mail,
  Phone,
  MapPin,
  Eye,
  Info,
  Calendar,
} from 'lucide-react';
import { CustomerDetailModal } from './CustomerDetailModal';

interface AdminClientesProps {
  onSelectOrderFromCustomer: (order: Order) => void;
}

export const AdminClientes: React.FC<AdminClientesProps> = ({
  onSelectOrderFromCustomer,
}) => {
  const { customers, orders } = useDemoStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerSummary | null>(null);

  const filteredCustomers = customers.filter((c) => {
    return (
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#e5e0d8] pb-5">
        <h1 className="font-serif text-2xl font-bold text-[#1a1918]">
          Fichas de Clientes (Demostración)
        </h1>
        <p className="text-xs text-[#6e685c] mt-0.5">
          Listado de clientes ficticios generado dinámicamente a partir de los pedidos de ejemplo. Datos de contacto y acumulado de compra calculados en tiempo real.
        </p>
      </div>

      {/* Scope Disclaimer */}
      <div className="bg-[#faf8f5] border border-[#e5e0d8] p-3.5 rounded-lg flex items-start gap-2.5 text-xs text-[#6e685c]">
        <Info className="w-4 h-4 text-[#c59e35] shrink-0 mt-0.5" />
        <div>
          <p>
            <strong>Alcance de la demostración:</strong> Este módulo expone una visualización básica de contacto e historial de pedidos. No incluye CRM comercial, automatizaciones de marketing, segmentación publicitaria ni envío masivo de correos.
          </p>
          <p className="text-[11px] text-[#8c867b] mt-0.5">
            Todos los nombres son simulados y los correos pertenecen al dominio reservado <em>@example.com</em>.
          </p>
        </div>
      </div>

      {/* Search and Summary */}
      <div className="bg-white p-4 rounded-lg border border-[#e5e0d8] shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#8c867b] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, email (@example.com) o ciudad..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#fcfbf9] border border-[#d8d3c8] rounded focus:outline-hidden focus:border-[#c59e35]"
          />
        </div>
        <div className="text-xs text-[#736e65]">
          Registrados: <strong>{filteredCustomers.length}</strong> clientes de ejemplo
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg border border-[#e5e0d8] shadow-xs overflow-hidden">
        {filteredCustomers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#faf8f5] text-[#6b665c] uppercase text-[10px] tracking-wider border-b border-[#e5e0d8]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Cliente ficticio</th>
                  <th className="py-3 px-4 font-semibold">Correo electrónico</th>
                  <th className="py-3 px-4 font-semibold">Teléfono demo</th>
                  <th className="py-3 px-4 font-semibold">Ciudad</th>
                  <th className="py-3 px-4 font-semibold text-center">Pedidos</th>
                  <th className="py-3 px-4 font-semibold text-right">Gasto acumulado</th>
                  <th className="py-3 px-4 font-semibold text-center">Ficha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ece7de]">
                {filteredCustomers.map((c) => (
                  <tr
                    key={c.email}
                    onClick={() => setSelectedCustomer(c)}
                    className="hover:bg-[#fbf9f5] transition-colors cursor-pointer"
                  >
                    {/* Name */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#1f2128] text-[#d4af37] flex items-center justify-center font-bold text-[11px] shrink-0">
                          {c.name.slice(0, 1)}
                        </div>
                        <span className="font-semibold text-[#1a1918]">{c.name}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-3 px-4 font-mono text-[#5a554c]">
                      {c.email}
                    </td>

                    {/* Phone */}
                    <td className="py-3 px-4 text-[#6e685c]">
                      {c.phone}
                    </td>

                    {/* City */}
                    <td className="py-3 px-4 text-[#5a554c]">
                      {c.city}
                    </td>

                    {/* Orders count */}
                    <td className="py-3 px-4 text-center">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-[#f5f2eb] text-[#3d3931] font-mono font-bold text-xs">
                        {c.ordersCount}
                      </span>
                    </td>

                    {/* Total spent */}
                    <td className="py-3 px-4 text-right font-mono font-bold text-[#997314] text-sm">
                      {c.totalSpent.toLocaleString('es-ES')} €
                    </td>

                    {/* Open Modal Action */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCustomer(c);
                        }}
                        className="px-2.5 py-1 text-xs font-medium text-[#1a1918] bg-[#f5f2eb] hover:bg-[#ede8dc] border border-[#d8d3c8] rounded transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#c59e35]" />
                        Ver ficha
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
              No se han encontrado clientes
            </p>
            <p className="text-xs text-[#787368]">
              No hay clientes que coincidan con la búsqueda introducida.
            </p>
          </div>
        )}
      </div>

      {/* Customer Detail Modal */}
      <CustomerDetailModal
        customer={selectedCustomer}
        orders={orders}
        onClose={() => setSelectedCustomer(null)}
        onSelectOrder={onSelectOrderFromCustomer}
      />
    </div>
  );
};

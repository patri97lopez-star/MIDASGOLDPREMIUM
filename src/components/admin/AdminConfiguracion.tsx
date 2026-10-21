import React, { useState } from 'react';
import { useDemoStore } from '../../context/DemoStoreContext';
import {
  RotateCcw,
  Globe,
  Truck,
  Languages,
  DollarSign,
  AlertTriangle,
  Database,
  CheckCircle2,
  Download,
  Info,
} from 'lucide-react';

export const AdminConfiguracion: React.FC = () => {
  const {
    resetDemoData,
    exportDemoDataAsJson,
    isStorageAvailable,
    storageWarning,
    products,
    orders,
  } = useDemoStore();

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetSuccessToast, setResetSuccessToast] = useState(false);

  const handleConfirmReset = () => {
    resetDemoData();
    setShowResetConfirm(false);
    setResetSuccessToast(true);
    setTimeout(() => setResetSuccessToast(false), 3500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Toast */}
      {resetSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1f2128] text-[#f5ebd7] px-4 py-3 rounded-lg shadow-xl border border-[#d4af37]/40 flex items-center gap-2 text-xs animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
          <span>Datos de demostración restablecidos a los valores iniciales.</span>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-[#e5e0d8] pb-5">
        <h1 className="font-serif text-2xl font-bold text-[#1a1918]">
          Configuración de la Tienda (Ejemplo)
        </h1>
        <p className="text-xs text-[#6e685c] mt-0.5">
          Estructura demostrativa de parámetros de moneda, logística, idiomas y almacenamiento de la sesión comercial.
        </p>
      </div>

      {/* Storage and Persistence Status Card */}
      <div className="bg-white border border-[#e5e0d8] rounded-lg p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-[#c59e35]" />
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#1a1918]">
              Persistencia de Datos en Navegador
            </h3>
          </div>
          <span className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-full border ${
            isStorageAvailable
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : 'bg-amber-50 text-amber-800 border-amber-300'
          }`}>
            {isStorageAvailable ? 'LocalStorage Activo' : 'Modo Memoria'}
          </span>
        </div>

        <div className="text-xs text-[#524d43] space-y-2 bg-[#fcfbf9] p-3.5 rounded border border-[#ece7de]">
          <p>
            <strong>Clave de almacenamiento:</strong> <code className="bg-[#f0ede6] px-1.5 py-0.5 rounded font-mono text-[11px] text-[#1f2128]">midasgold_demo_store_v1</code>
          </p>
          <p className="text-[#787368]">
            «Cambios guardados solo en este navegador; no se comparten entre dispositivos».
          </p>
          <p className="text-[11px] text-[#8c867b]">
            Actualmente contiene: {products.length} productos y {orders.length} pedidos de demostración.
          </p>
        </div>

        {storageWarning && (
          <div className="p-3 bg-amber-50 border border-amber-300 rounded text-xs text-amber-800 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>{storageWarning}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={exportDemoDataAsJson}
            className="px-3.5 py-2 text-xs font-semibold bg-[#faf8f5] text-[#2d2a26] border border-[#d8d3c8] hover:border-[#c59e35] rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-[#c59e35]" />
            Exportar copia de seguridad (JSON)
          </button>
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="px-3.5 py-2 text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-300 hover:bg-rose-100 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
            Restablecer datos de demostración
          </button>
        </div>
      </div>

      {/* Demonstrative Store Settings (Currencies, Countries, Languages) */}
      <div className="space-y-4">
        <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#1a1918]">
          Parámetros Comerciales Demostrativos
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Currency */}
          <div className="bg-white border border-[#e5e0d8] rounded-lg p-4 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4d483f]">
              <DollarSign className="w-4 h-4 text-[#c59e35]" />
              Moneda base
            </div>
            <p className="font-mono text-lg font-bold text-[#1a1918]">EUR (€)</p>
            <p className="text-[11px] text-[#787368]">
              Euro oficial para Península, Baleares y exportaciones comunitarias.
            </p>
          </div>

          {/* Shipping Countries */}
          <div className="bg-white border border-[#e5e0d8] rounded-lg p-4 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4d483f]">
              <Truck className="w-4 h-4 text-[#c59e35]" />
              Países de envío
            </div>
            <p className="text-xs font-semibold text-[#1a1918]">España, Portugal y U.E.</p>
            <p className="text-[11px] text-[#787368]">
              Península (servicio 24-72h asegurado), Baleares e internacional con paquetería postal oficial.
            </p>
          </div>

          {/* Languages */}
          <div className="bg-white border border-[#e5e0d8] rounded-lg p-4 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4d483f]">
              <Languages className="w-4 h-4 text-[#c59e35]" />
              Idiomas de tienda
            </div>
            <p className="text-xs font-semibold text-[#1a1918]">Español (Principal)</p>
            <p className="text-[11px] text-[#787368]">
              Opción para catálogo bilingüe (Español / Inglés para coleccionistas).
            </p>
          </div>
        </div>
      </div>

      {/* Fiscal and Customs Notice (Non-speculative requirement) */}
      <div className="bg-[#faf8f5] border border-[#e5e0d8] rounded-lg p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1a1918]">
          <Info className="w-4 h-4 text-[#c59e35]" />
          Fiscalidad, Aduanas y Pasarelas de Pago
        </div>
        <div className="p-3.5 bg-white border border-[#e5e0d8] rounded text-xs space-y-2">
          <p className="text-[#3d3a33]">
            <strong>Cálculo fiscal y aduanero:</strong> <span className="text-[#8c6b12] font-semibold">«Por definir según mercados, transportista y proveedor de pagos»</span>.
          </p>
          <p className="text-[#6e685c] leading-relaxed text-[11px]">
            Esta demostración prescinde intencionadamente de conversiones de divisas ficticias, tablas tributarias inventadas o supuestas integraciones bancarias en vivo. Las tarifas exactas de IVA, aranceles para pedidos fuera de la UE y comisiones de pasarela (Redsys, Bizum, Stripe) se acordarán e implementarán durante la fase de despliegue productivo de la empresa.
          </p>
        </div>
      </div>

      {/* Confirmation Modal for Reset */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full border border-[#d8d3c8] shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-base">
              <AlertTriangle className="w-5 h-5" />
              ¿Restablecer datos de demostración?
            </div>
            <p className="text-xs text-[#6e685c] leading-relaxed">
              Esta acción restaurará el catálogo original de piezas toledanas y los 7 pedidos de ejemplo iniciales. Se borrarán los productos nuevos o modificaciones guardadas en este navegador.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 text-xs font-medium text-[#5e594f] hover:bg-[#ede8dc] rounded cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-4 py-1.5 text-xs font-semibold bg-rose-700 text-white rounded hover:bg-rose-800 cursor-pointer"
              >
                Restablecer datos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

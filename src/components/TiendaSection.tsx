import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS, COMPANY_INFO, OFFICIAL_CATEGORIES } from '../data/products';
import {
  Search,
  SlidersHorizontal,
  ShieldCheck,
  Truck,
  Lock,
  Plus,
  Eye,
  Info,
  RotateCcw,
  CheckCircle2,
  PackageCheck,
  CreditCard,
} from 'lucide-react';

interface TiendaSectionProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number, size?: string) => void;
}

export const TiendaSection: React.FC<TiendaSectionProps> = ({
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedStyle, setSelectedStyle] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [activePolicyTab, setActivePolicyTab] = useState<'como-comprar' | 'envios' | 'devoluciones' | 'pagos'>('como-comprar');

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'todos' || product.category === selectedCategory;
    const matchesStyle =
      selectedStyle === 'todos' || product.style === selectedStyle;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.specifications.referencia.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStyle && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="relative py-16 border-b border-[#d4af37]/20 bg-[#0e1015]">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold">
            Boutique Oficial Online {COMPANY_INFO.name}
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#f5ebd7]">
            Tienda Oficial Midas Gold Toledo
          </h1>
          <p className="text-sm sm:text-base text-[#9c978b] max-w-3xl mx-auto leading-relaxed">
            Adquiera piezas originales de damasquinado toledano con garantía oficial de origen, oro fino de 24 quilates y 18 quilates verde embutido a mano (mínimo 4 micras garantizadas) y estuche de lujo con certificado nominativo.
          </p>

          {/* Real Guarantees Bar from midasgold.es */}
          <div className="mt-8 pt-6 border-t border-[#d4af37]/15 flex flex-wrap items-center justify-center gap-6 text-xs text-[#9c978b] uppercase tracking-wider">
            <span className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#d4af37]" /> Entrega en 3 Días con DHL
            </span>
            <span className="text-[#d4af37]/30">·</span>
            <span className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#d4af37]" /> Pasarela Redsys & CES (Visa / Bizum)
            </span>
            <span className="text-[#d4af37]/30">·</span>
            <span className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#d4af37]" /> 14 Días Naturales de Desistimiento
            </span>
            <span className="text-[#d4af37]/30">·</span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" /> Certificado Oficial Toledano
            </span>
          </div>
        </div>
      </section>

      {/* Main Store Area */}
      <section className="max-w-7xl mx-auto px-6 space-y-8">
        {/* Controls Toolbar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-6 border-b border-[#d4af37]/15">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0">
            <button
              onClick={() => setSelectedCategory('todos')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-sm whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'todos'
                  ? 'bg-[#d4af37] text-[#0b0c10] font-semibold shadow-sm'
                  : 'bg-[#12141c] text-[#8e897e] hover:text-[#e8e6e3] border border-[#d4af37]/10'
              }`}
            >
              Todas las Piezas
            </button>
            {OFFICIAL_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-sm whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#d4af37] text-[#0b0c10] font-semibold shadow-sm'
                      : 'bg-[#12141c] text-[#8e897e] hover:text-[#e8e6e3] border border-[#d4af37]/10'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Search, Style & Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative min-w-[200px]">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8e897e]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar joya o pieza..."
                className="w-full bg-[#12141c] border border-[#d4af37]/20 rounded-sm pl-10 pr-4 py-2 text-xs text-[#ede8dc] placeholder-[#6e695e] focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              aria-label="Filtrar por estilo"
              className="bg-[#12141c] border border-[#d4af37]/20 px-3 py-2 rounded-sm text-xs text-[#ede8dc] focus:outline-none cursor-pointer"
            >
              <option value="todos">Todos los Estilos</option>
              <option value="arabe">Estilo Árabe (Geométrico)</option>
              <option value="renacimiento">Estilo Renacimiento (Floral)</option>
            </select>

            <div className="flex items-center gap-2 bg-[#12141c] border border-[#d4af37]/20 px-3 py-2 rounded-sm text-xs text-[#bbb5a7]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#d4af37]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Ordenar productos"
                className="bg-transparent text-xs text-[#ede8dc] focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-[#12141c] text-[#ede8dc]">
                  Destacados
                </option>
                <option value="price-asc" className="bg-[#12141c] text-[#ede8dc]">
                  Precio: Menor a Mayor
                </option>
                <option value="price-desc" className="bg-[#12141c] text-[#ede8dc]">
                  Precio: Mayor a Menor
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Results metadata */}
        <div className="py-2 flex items-center justify-between text-xs text-[#8e897e]">
          <span>
            <strong className="text-[#f3e5ab] font-mono tabular-nums">{filteredProducts.length}</strong> joyas y creaciones disponibles para envío inmediato
          </span>
          <span>Entrega en estuche oficial de lujo con sello {COMPANY_INFO.name}</span>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-[#0e1015] border border-[#d4af37]/15 rounded-sm overflow-hidden flex flex-col hover:border-[#d4af37]/45 transition-all duration-300"
            >
              {/* Product Visual Container */}
              <div className="relative aspect-square bg-[#13151d] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  onClick={() => onSelectProduct(product)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1015] via-transparent to-transparent opacity-60 pointer-events-none"></div>

                {product.tag && (
                  <div className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 bg-[#0b0c10]/85 border border-[#d4af37]/30 text-[#f3e5ab]">
                    {product.tag}
                  </div>
                )}

                <div className="absolute top-3 right-3 text-[10px] font-mono text-[#d4af37] bg-[#0b0c10]/80 px-2 py-0.5 border border-[#d4af37]/20">
                  {product.specifications.referencia}
                </div>

                {/* Quick overlay buttons */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="flex-1 py-2 px-3 text-[11px] uppercase tracking-wider font-medium text-[#f5ebd7] bg-[#0b0c10]/90 hover:bg-[#0b0c10] border border-[#d4af37]/40 rounded-sm cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Ver Ficha</span>
                  </button>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="py-2 px-3 text-[11px] uppercase tracking-wider font-semibold text-[#0b0c10] bg-[#d4af37] hover:bg-[#e4c45b] rounded-sm cursor-pointer flex items-center justify-center gap-1 transition-colors"
                    title="Añadir a la cesta"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Comprar</span>
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-[#8e897e] mb-1">
                    <span>{product.subCategory}</span>
                    <span className="text-[#a89f8d]">{product.styleLabel}</span>
                  </div>
                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="font-display text-sm font-semibold text-[#ede8dc] group-hover:text-[#d4af37] transition-colors cursor-pointer line-clamp-1"
                  >
                    {product.name}
                  </h3>
                  <p className="mt-2 text-xs text-[#9c978b] line-clamp-2 leading-relaxed">
                    {product.shortDesc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#d4af37]/10 flex items-center justify-between">
                  <div>
                    <span className="font-display text-base font-bold text-[#f5ebd7] tabular-nums">
                      {product.price} €
                    </span>
                    {product.originalPrice && (
                      <span className="ml-2 text-xs text-[#6e695e] line-through tabular-nums">
                        {product.originalPrice} €
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="px-3 py-1.5 text-xs uppercase tracking-[0.12em] font-medium text-[#0b0c10] bg-[#d4af37] hover:bg-[#e4c45b] rounded-sm cursor-pointer transition-colors"
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="p-12 text-center bg-[#0e1015] border border-[#d4af37]/15 rounded-sm">
            <p className="text-sm text-[#9c978b]">
              No se han encontrado joyas con ese criterio.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('todos');
                setSelectedStyle('todos');
                setSearchQuery('');
              }}
              className="mt-4 text-xs text-[#d4af37] hover:underline uppercase tracking-wider"
            >
              Restablecer búsqueda
            </button>
          </div>
        )}
      </section>

      {/* Real Official Store Policies & Purchasing Guide from midasgold.es */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-[#0e1015] border border-[#d4af37]/25 rounded-sm p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#d4af37]/15 pb-4">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold">
                Guía Oficial de Compra y Condiciones de Tienda
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#f5ebd7] mt-1">
                Información Comercial Transparente de {COMPANY_INFO.legalName}
              </h3>
            </div>

            {/* Policy Tabs */}
            <div className="flex items-center gap-1 bg-[#12141c] p-1 border border-[#d4af37]/20 rounded-sm overflow-x-auto">
              <button
                onClick={() => setActivePolicyTab('como-comprar')}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm whitespace-nowrap cursor-pointer ${
                  activePolicyTab === 'como-comprar'
                    ? 'bg-[#d4af37] text-[#0b0c10] font-semibold'
                    : 'text-[#8e897e] hover:text-[#ede8dc]'
                }`}
              >
                Cómo Comprar
              </button>
              <button
                onClick={() => setActivePolicyTab('envios')}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm whitespace-nowrap cursor-pointer ${
                  activePolicyTab === 'envios'
                    ? 'bg-[#d4af37] text-[#0b0c10] font-semibold'
                    : 'text-[#8e897e] hover:text-[#ede8dc]'
                }`}
              >
                Envíos (DHL)
              </button>
              <button
                onClick={() => setActivePolicyTab('pagos')}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm whitespace-nowrap cursor-pointer ${
                  activePolicyTab === 'pagos'
                    ? 'bg-[#d4af37] text-[#0b0c10] font-semibold'
                    : 'text-[#8e897e] hover:text-[#ede8dc]'
                }`}
              >
                Formas de Pago
              </button>
              <button
                onClick={() => setActivePolicyTab('devoluciones')}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm whitespace-nowrap cursor-pointer ${
                  activePolicyTab === 'devoluciones'
                    ? 'bg-[#d4af37] text-[#0b0c10] font-semibold'
                    : 'text-[#8e897e] hover:text-[#ede8dc]'
                }`}
              >
                Devoluciones
              </button>
            </div>
          </div>

          {/* Policy Tab Content (Real texts from midasgold.es) */}
          {activePolicyTab === 'como-comprar' && (
            <div className="space-y-4 text-xs text-[#bbb5a7] leading-relaxed">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                <div className="p-4 bg-[#12141c] border border-[#d4af37]/15 rounded-sm space-y-2">
                  <div className="font-display text-sm font-bold text-[#d4af37]">01. Selección</div>
                  <p>Elija la sección (pendientes, anillos, zippos, etc.) y visualice la pieza. Si es un anillo o dilatación, elija su talla correspondiente.</p>
                </div>
                <div className="p-4 bg-[#12141c] border border-[#d4af37]/15 rounded-sm space-y-2">
                  <div className="font-display text-sm font-bold text-[#d4af37]">02. Cesta</div>
                  <p>Haga clic en "Comprar" para añadir a la cesta. Podrá revisar unidades, eliminar artículos o aplicar códigos de descuento promocionales.</p>
                </div>
                <div className="p-4 bg-[#12141c] border border-[#d4af37]/15 rounded-sm space-y-2">
                  <div className="font-display text-sm font-bold text-[#d4af37]">03. Tramitación</div>
                  <p>Pulse "Finalizar compra". Podrá tramitar el pedido como usuario registrado o comprar como invitado introduciendo sus datos de entrega.</p>
                </div>
                <div className="p-4 bg-[#12141c] border border-[#d4af37]/15 rounded-sm space-y-2">
                  <div className="font-display text-sm font-bold text-[#d4af37]">04. Confirmación</div>
                  <p>Seleccione el método de pago seguro y confirme el pedido. Recibirá inmediatamente un email con el justificante y el seguimiento de envío.</p>
                </div>
              </div>
            </div>
          )}

          {activePolicyTab === 'envios' && (
            <div className="space-y-3 text-xs text-[#bbb5a7] leading-relaxed">
              <p>
                Todos los pedidos de la tienda online son entregados por la compañía de transportes <strong className="text-[#f3e5ab]">DHL Express</strong> u otras empresas de mensajería urgente asegurada dentro de su red logística.
              </p>
              <ul className="space-y-1.5 list-disc list-inside text-[#9c978b]">
                <li><strong className="text-[#ede8dc]">Plazo de entrega estimado en España:</strong> 3 días laborables desde la finalización del pedido.</li>
                <li><strong className="text-[#ede8dc]">Preparación y expedición:</strong> Todos los pedidos se preparan y empaquetan en nuestro taller de Toledo en un plazo de 1 a 5 días laborables.</li>
                <li><strong className="text-[#ede8dc]">Seguimiento:</strong> Una vez despachado el paquete, el cliente recibe el enlace y número de seguimiento para monitorizar la entrega en tiempo real.</li>
                <li><strong className="text-[#ede8dc]">Embalaje de lujo:</strong> Cada pieza se envía debidamente protegida dentro de su estuche oficial de terciopelo con el certificado de autenticidad nominativo de {COMPANY_INFO.name}.</li>
              </ul>
            </div>
          )}

          {activePolicyTab === 'pagos' && (
            <div className="space-y-3 text-xs text-[#bbb5a7] leading-relaxed">
              <p>
                En Midas Gold garantizamos la máxima confidencialidad en todas las transacciones electrónicas mediante pasarela de pago seguro en servidor cifrado bajo protocolo SSL (Secure Socket Layer):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-3 bg-[#12141c] border border-[#d4af37]/15 rounded-sm space-y-1">
                  <div className="text-[#f3e5ab] font-semibold">Tarjetas Bancarias (CES)</div>
                  <p className="text-[11px] text-[#8e897e]">Visa, Visa Electron y Mastercard mediante Comercio Electrónico Seguro (CES) con autenticación en dos factores de su banco emisor.</p>
                </div>
                <div className="p-3 bg-[#12141c] border border-[#d4af37]/15 rounded-sm space-y-1">
                  <div className="text-[#f3e5ab] font-semibold">Bizum Instantáneo</div>
                  <p className="text-[11px] text-[#8e897e]">Pago rápido, cómodo y 100% seguro con cargo directo e inmediato desde su teléfono móvil.</p>
                </div>
                <div className="p-3 bg-[#12141c] border border-[#d4af37]/15 rounded-sm space-y-1">
                  <div className="text-[#f3e5ab] font-semibold">PayPal & Pasarela Redsys</div>
                  <p className="text-[11px] text-[#8e897e]">Protección integral del comprador a través de la pasarela bancaria oficial del BBVA (Redsys).</p>
                </div>
              </div>
            </div>
          )}

          {activePolicyTab === 'devoluciones' && (
            <div className="space-y-3 text-xs text-[#bbb5a7] leading-relaxed">
              <p>
                De acuerdo con la legislación vigente de comercio electrónico en España, el cliente dispone del derecho de desistimiento de su compra durante un plazo de <strong className="text-[#f3e5ab]">catorce (14) días naturales</strong> desde la fecha de recepción del pedido.
              </p>
              <ul className="space-y-1.5 list-disc list-inside text-[#9c978b]">
                <li>Para iniciar una devolución, basta con notificarlo a DYD TOLEDO S.L. mediante correo electrónico a <strong className="text-[#ede8dc]">{COMPANY_INFO.email}</strong> indicando el número de pedido.</li>
                <li>Los productos deben remitirse en su estado original, con su estuche, precintos y certificado de autenticidad intactos, acompañados de la factura comercial.</li>
                <li><strong className="text-[#ede8dc]">Excepciones por ley:</strong> No se admiten devoluciones de piezas expresamente personalizadas (escudos heráldicos a medida, grabados de nombres) ni de artículos de joyería para perforación o dilataciones por motivos estrictos de higiene y protección de la salud.</li>
                <li>El reembolso se realiza utilizando el mismo método de pago empleado en la transacción inicial sin ningún coste adicional para el cliente.</li>
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

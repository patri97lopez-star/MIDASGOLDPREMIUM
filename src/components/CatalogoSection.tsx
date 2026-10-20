import React, { useState } from 'react';
import { Product, ProductStyle } from '../types';
import { PRODUCTS, OFFICIAL_CATEGORIES, COMPANY_INFO } from '../data/products';
import { Download, Search, Check, FileText, Filter, Sparkles } from 'lucide-react';

interface CatalogoSectionProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const CatalogoSection: React.FC<CatalogoSectionProps> = ({
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>('todos');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('todos');
  const [selectedStyle, setSelectedStyle] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showDownloadModal, setShowDownloadModal] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // Available subcategories based on selected main category
  const activeCategoryObj = OFFICIAL_CATEGORIES.find((c) => c.id === selectedMainCategory);
  const availableSubcategories = activeCategoryObj ? activeCategoryObj.items : [];

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesMain =
      selectedMainCategory === 'todos' || product.category === selectedMainCategory;
    const matchesSub =
      selectedSubCategory === 'todos' || product.subCategory === selectedSubCategory;
    const matchesStyle =
      selectedStyle === 'todos' || product.style === selectedStyle;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.specifications.referencia.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMain && matchesSub && matchesStyle && matchesSearch;
  });

  const handleDownloadPdf = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
      setShowDownloadModal(false);
    }, 2200);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="relative py-16 border-b border-[#d4af37]/20 bg-[#0e1015]">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold">
            Fondo Documental & Lookbook Oficial
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#f5ebd7]">
            Catálogo General Midas Gold Toledo
          </h1>
          <p className="text-sm sm:text-base text-[#9c978b] max-w-3xl mx-auto leading-relaxed">
            Consulte todas las categorías reales de nuestro taller: desde pendientes, gargantillas, pulseras y anillos de mujer, hasta encendedores Zippos, gemelos y marroquinería de caballero, pasando por platos ceremoniales y arquetas de nogal.
          </p>

          <div className="pt-4 flex justify-center">
            <button
              onClick={() => setShowDownloadModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium text-[#f3e5ab] border border-[#d4af37]/50 hover:bg-[#d4af37]/10 transition-all rounded-sm cursor-pointer shadow-sm"
            >
              <Download className="w-4 h-4 text-[#d4af37]" />
              <span>Descargar Catálogo Completo (PDF Oficial Midas)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-6 space-y-6">
        {/* Main Categories Row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-6 border-b border-[#d4af37]/15">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0">
            <button
              onClick={() => {
                setSelectedMainCategory('todos');
                setSelectedSubCategory('todos');
              }}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-sm whitespace-nowrap transition-colors cursor-pointer ${
                selectedMainCategory === 'todos'
                  ? 'bg-[#d4af37] text-[#0b0c10] font-semibold shadow-sm'
                  : 'bg-[#12141c] text-[#8e897e] hover:text-[#e8e6e3] border border-[#d4af37]/10'
              }`}
            >
              Todo el Catálogo
            </button>
            {OFFICIAL_CATEGORIES.map((cat) => {
              const isActive = selectedMainCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedMainCategory(cat.id);
                    setSelectedSubCategory('todos');
                  }}
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

          {/* Search bar */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8e897e]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar pieza, referencia (MG-TO...)..."
              className="w-full bg-[#12141c] border border-[#d4af37]/20 rounded-sm pl-10 pr-4 py-2 text-xs text-[#ede8dc] placeholder-[#6e695e] focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>

        {/* Subcategories & Styles Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#101217] p-4 rounded-sm border border-[#d4af37]/15">
          {/* Subcategories */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-[#8e897e] uppercase tracking-wider text-[11px] shrink-0 font-medium">
              Subfamilia:
            </span>
            <button
              onClick={() => setSelectedSubCategory('todos')}
              className={`px-3 py-1 rounded-sm text-xs cursor-pointer whitespace-nowrap ${
                selectedSubCategory === 'todos'
                  ? 'bg-[#d4af37]/20 text-[#f3e5ab] font-semibold border border-[#d4af37]/50'
                  : 'text-[#8e897e] hover:text-[#ede8dc]'
              }`}
            >
              Todas
            </button>
            {availableSubcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubCategory(sub)}
                className={`px-3 py-1 rounded-sm text-xs cursor-pointer whitespace-nowrap ${
                  selectedSubCategory === sub
                    ? 'bg-[#d4af37]/20 text-[#f3e5ab] font-semibold border border-[#d4af37]/50'
                    : 'text-[#8e897e] hover:text-[#ede8dc]'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* Damascene Style Filter */}
          <div className="flex items-center gap-2 shrink-0 text-xs">
            <span className="text-[#8e897e] uppercase tracking-wider text-[11px] font-medium">
              Estilo:
            </span>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              aria-label="Filtrar por estilo de damasquinado"
              className="bg-[#141620] border border-[#d4af37]/25 text-[#ede8dc] px-2.5 py-1 rounded-sm focus:outline-none focus:border-[#d4af37] cursor-pointer text-xs"
            >
              <option value="todos">Todos los Estilos</option>
              <option value="arabe">Estilo Árabe / Mudéjar (Geométrico)</option>
              <option value="renacimiento">Estilo Renacimiento (Flores y Aves)</option>
            </select>
          </div>
        </div>

        {/* Counter */}
        <div className="flex items-center justify-between text-xs text-[#8e897e] pt-2">
          <span>
            Mostrando <strong className="text-[#f3e5ab] font-mono tabular-nums">{filteredProducts.length}</strong> piezas registradas en el catálogo oficial
          </span>
          <span>Oro 24K & 18K verde embutido a buril · 4 micras mínimas</span>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#0e1015] border border-[#d4af37]/15 rounded-sm overflow-hidden flex flex-col group hover:border-[#d4af37]/45 transition-all"
            >
              {/* Product Visual */}
              <div
                onClick={() => onSelectProduct(product)}
                className="relative aspect-[4/3] bg-[#12141c] overflow-hidden cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1015] via-transparent to-transparent opacity-70"></div>
                {product.tag && (
                  <div className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 bg-[#0b0c10]/85 border border-[#d4af37]/30 text-[#f3e5ab]">
                    {product.tag}
                  </div>
                )}
                <div className="absolute bottom-3 right-3 text-[11px] font-mono text-[#d4af37] bg-[#0b0c10]/80 px-2 py-0.5 border border-[#d4af37]/20">
                  {product.specifications.referencia}
                </div>
                <div className="absolute top-3 right-3 text-[10px] uppercase tracking-wider text-[#d8ceba] bg-[#0b0c10]/80 px-2 py-0.5 border border-[#d4af37]/20">
                  {product.styleLabel}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#8e897e] mb-1">
                    <span>{product.categoryLabel}</span>
                    <span className="text-[#d4af37]">{product.subCategory}</span>
                  </div>
                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="font-display text-base font-semibold text-[#f5ebd7] group-hover:text-[#d4af37] transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h3>
                  <p className="mt-2 text-xs text-[#9c978b] leading-relaxed line-clamp-2">
                    {product.shortDesc}
                  </p>
                </div>

                {/* Technical Specifications Snapshot */}
                <div className="pt-3 border-t border-[#d4af37]/10 space-y-1.5 text-[11px] text-[#8e897e]">
                  <div className="flex justify-between">
                    <span>Pureza de Oro:</span>
                    <span className="text-[#d8ceba] font-medium">{product.specifications.oro}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Espesor de Oro:</span>
                    <span className="text-[#d8ceba] font-medium">{product.specifications.espesor}</span>
                  </div>
                  {product.specifications.dimensiones && (
                    <div className="flex justify-between">
                      <span>Dimensiones:</span>
                      <span className="text-[#d8ceba]">{product.specifications.dimensiones}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-[#d4af37]/15 flex items-center justify-between">
                  <div>
                    <span className="font-display text-lg font-bold text-[#f5ebd7] tabular-nums">
                      {product.price} €
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="px-3 py-1.5 text-xs text-[#bbb5a7] hover:text-[#f3e5ab] border border-[#d4af37]/20 hover:border-[#d4af37]/50 rounded-sm cursor-pointer transition-colors"
                    >
                      Ficha Técnica
                    </button>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-3.5 py-1.5 text-xs uppercase tracking-[0.12em] font-medium text-[#0b0c10] bg-[#d4af37] hover:bg-[#e4c45b] rounded-sm cursor-pointer transition-colors"
                    >
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="p-12 text-center bg-[#0e1015] border border-[#d4af37]/15 rounded-sm">
            <p className="text-sm text-[#9c978b]">
              No se han encontrado piezas con los criterios seleccionados.
            </p>
            <button
              onClick={() => {
                setSelectedMainCategory('todos');
                setSelectedSubCategory('todos');
                setSelectedStyle('todos');
                setSearchQuery('');
              }}
              className="mt-4 text-xs text-[#d4af37] hover:underline uppercase tracking-wider"
            >
              Restablecer filtros
            </button>
          </div>
        )}
      </section>

      {/* PDF Lookbook Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 bg-[#000000]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#101217] border border-[#d4af37]/40 max-w-lg w-full p-8 rounded-sm space-y-6 shadow-2xl relative">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-[#f5ebd7]">
                    Dossier Oficial {COMPANY_INFO.name}
                  </h3>
                  <p className="text-xs text-[#8e897e]">
                    Edición Toledo · Publicado por {COMPANY_INFO.legalName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDownloadModal(false)}
                className="text-[#8e897e] hover:text-[#f5ebd7] text-lg leading-none cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#bbb5a7] bg-[#0c0e12] p-4 border border-[#d4af37]/15 rounded-sm">
              <p className="font-medium text-[#f3e5ab]">El catálogo incluye:</p>
              <ul className="space-y-1.5 list-disc list-inside text-[#9c978b]">
                <li>Colecciones completas de Mujer (pendientes, pulseras, gargantillas, anillos, relojes, dilataciones).</li>
                <li>Gama completa de Caballero (Zippos oficiales, gemelos, pisacorbatas, llaveros, carteras).</li>
                <li>Artículos del Hogar (abrecartas toledanos, cajas joyero, platos de 18 a 30 cm, cuadros).</li>
                <li>Artículos religiosos y opciones de regalo protocolar e institucional.</li>
                <li>Certificado de Oro 24K y garantía de 4 micras según ley.</li>
              </ul>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleDownloadPdf}
                disabled={downloadSuccess}
                className="flex-1 py-3 px-4 text-xs uppercase tracking-[0.16em] font-semibold text-[#0b0c10] bg-[#d4af37] hover:bg-[#e4c45b] rounded-sm cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                {downloadSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-[#0b0c10]" />
                    <span>¡Catálogo Descargado con Éxito!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Descargar PDF Oficial</span>
                  </>
                )}
              </button>
              <button
                onClick={() => setShowDownloadModal(false)}
                className="py-3 px-4 text-xs uppercase tracking-[0.14em] text-[#8e897e] hover:text-[#e8e6e3] border border-[#d4af37]/20 rounded-sm cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

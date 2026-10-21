import React, { useState, useRef } from 'react';
import { Product } from '../types';
import { OFFICIAL_CATEGORIES, COMPANY_INFO } from '../data/products';
import { useDemoStore } from '../context/DemoStoreContext';
import { Download, Search, Check, FileText, Sparkles, Gem, ArrowRight, ShieldCheck, Eye, Layers } from 'lucide-react';

interface CatalogoSectionProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const CatalogoSection: React.FC<CatalogoSectionProps> = ({
  onSelectProduct,
  onAddToCart,
}) => {
  const { products } = useDemoStore();
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>('todos');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('todos');
  const [selectedStyle, setSelectedStyle] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showDownloadModal, setShowDownloadModal] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const galleryRef = useRef<HTMLDivElement>(null);

  // Available subcategories based on selected main category
  const activeCategoryObj = OFFICIAL_CATEGORIES.find((c) => c.id === selectedMainCategory);
  const availableSubcategories = activeCategoryObj
    ? activeCategoryObj.items
    : Array.from(new Set(OFFICIAL_CATEGORIES.flatMap((c) => c.items)));

  const handleSelectCategoryAndSub = (categoryId: string, subCategory: string) => {
    setSelectedMainCategory(categoryId);
    setSelectedSubCategory(subCategory);
    if (galleryRef.current) {
      galleryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectCategoryOnly = (categoryId: string) => {
    setSelectedMainCategory(categoryId);
    setSelectedSubCategory('todos');
    if (galleryRef.current) {
      galleryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredProducts = products.filter((product) => {
    if (product.published === false) return false;
    const matchesMain =
      selectedMainCategory === 'todos' || product.category === selectedMainCategory;
    const matchesSub =
      selectedSubCategory === 'todos' || product.subCategory.toLowerCase() === selectedSubCategory.toLowerCase();
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
    <div className="space-y-16 pb-24">
      {/* Header Banner */}
      <section className="relative py-20 border-b border-[#d4af37]/20 bg-[#08080a]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[360px] bg-[#d4af37]/8 blur-[130px] pointer-events-none rounded-full"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold py-1 px-4 rounded-full bg-[#12141d]/80 border border-[#d4af37]/25 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse"></span>
            <span>Fondo Documental & Lookbook Oficial</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#faf5eb]">
            Catálogo General Midas Gold Toledo
          </h1>
          <p className="text-sm sm:text-base text-[#a8a192] max-w-3xl mx-auto leading-relaxed font-light">
            Consulte todas las familias oficiales de nuestro taller toledano en oro puro de 24 quilates y oro verde de 18 quilates: colecciones completas para <strong className="text-[#f5ebd7] font-medium">MUJER</strong>, <strong className="text-[#f5ebd7] font-medium">HOMBRE</strong> y <strong className="text-[#f5ebd7] font-medium">HOME COLECCIÓN</strong>.
          </p>

          <div className="pt-4 flex justify-center">
            <button
              onClick={() => setShowDownloadModal(true)}
              className="inline-flex items-center gap-2.5 px-7 py-3 text-xs uppercase tracking-[0.2em] font-semibold text-[#08080a] bg-gradient-to-r from-[#fae7b1] via-[#d4af37] to-[#ba9028] hover:brightness-110 transition-all rounded-xs cursor-pointer shadow-[0_4px_20px_rgba(212,175,55,0.25)]"
            >
              <Download className="w-4 h-4 text-[#08080a]" />
              <span>Descargar Catálogo Completo (PDF Oficial)</span>
            </button>
          </div>
        </div>
      </section>

      {/* ÍNDICE Y FAMILIAS DEL CATÁLOGO (Directorio Visual Estructurado) */}
      <section className="max-w-7xl mx-auto px-6 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[#d4af37] font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>Directorio de Colecciones Oficiales</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#fbf7ee]">
            Familias & Subfamilias del Catálogo
          </h2>
          <p className="text-xs sm:text-sm text-[#9c9586] font-light">
            Haga clic en cualquiera de las subcategorías para acceder directamente a las piezas registradas.
          </p>
        </div>

        {/* 3 Pillars: MUJER, HOMBRE, HOME COLECCIÓN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {OFFICIAL_CATEGORIES.map((cat) => {
            const isCatActive = selectedMainCategory === cat.id;
            return (
              <div
                key={cat.id}
                className={`bg-[#0e0f16] border rounded-xs p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group ${
                  isCatActive
                    ? 'border-[#d4af37] shadow-[0_8px_32px_-8px_rgba(212,175,55,0.3)] bg-gradient-to-b from-[#12141f] to-[#0e0f16]'
                    : 'border-[#d4af37]/20 hover:border-[#d4af37]/50 hover:shadow-[0_8px_24px_-8px_rgba(212,175,55,0.15)]'
                }`}
              >
                {/* Gold corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#d4af37]/12 to-transparent pointer-events-none"></div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase tracking-[0.26em] text-[#d4af37] font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
                      Colección
                    </span>
                    <button
                      onClick={() => handleSelectCategoryOnly(cat.id)}
                      className="text-[11px] text-[#baa882] hover:text-[#fae7b1] underline underline-offset-4 cursor-pointer transition-colors"
                    >
                      Ver todo
                    </button>
                  </div>

                  <h3
                    onClick={() => handleSelectCategoryOnly(cat.id)}
                    className="font-display text-2xl font-bold text-[#faf5eb] group-hover:text-[#d4af37] transition-colors cursor-pointer tracking-wider"
                  >
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#a0998b] mt-1.5 mb-5 font-light leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Subcategories Directory */}
                  <div className="pt-4 border-t border-[#d4af37]/15 space-y-2">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-[#7a7467] font-semibold mb-2">
                      Subcategorías disponibles:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((item) => {
                        const isSubActive =
                          selectedMainCategory === cat.id &&
                          selectedSubCategory.toLowerCase() === item.toLowerCase();
                        return (
                          <button
                            key={item}
                            onClick={() => handleSelectCategoryAndSub(cat.id, item)}
                            className={`px-3 py-1.5 rounded-xs text-xs font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
                              isSubActive
                                ? 'bg-gradient-to-r from-[#fae7b1] via-[#d4af37] to-[#ba9028] text-[#08080a] font-bold shadow-xs'
                                : 'bg-[#141622] text-[#d6cebf] hover:text-[#ffffff] border border-[#d4af37]/20 hover:border-[#d4af37]/60 hover:bg-[#181a28]'
                            }`}
                          >
                            <span className="text-[#d4af37] text-[10px]">•</span>
                            <span>{item}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-6 border-t border-[#d4af37]/15 flex items-center justify-between text-xs">
                  <span className="text-[#847e72]">
                    {cat.items.length} subfamilias oficiales
                  </span>
                  <button
                    onClick={() => handleSelectCategoryOnly(cat.id)}
                    className="inline-flex items-center gap-1 text-[#d4af37] hover:text-[#fae7b1] font-semibold cursor-pointer group-hover:translate-x-1 transition-transform"
                  >
                    <span>Explorar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Filter and Search Bar Anchor */}
      <section ref={galleryRef} className="max-w-7xl mx-auto px-6 space-y-6 pt-6">
        {/* Main Categories Row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-6 border-b border-[#d4af37]/15">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
            <button
              onClick={() => {
                setSelectedMainCategory('todos');
                setSelectedSubCategory('todos');
              }}
              className={`px-4 py-2.5 text-xs uppercase tracking-wider font-semibold rounded-xs whitespace-nowrap transition-all cursor-pointer ${
                selectedMainCategory === 'todos'
                  ? 'bg-gradient-to-r from-[#fae7b1] via-[#d4af37] to-[#ba9028] text-[#08080a] shadow-[0_2px_12px_rgba(212,175,55,0.35)]'
                  : 'bg-[#10121a] text-[#938c7f] hover:text-[#ede8dc] border border-[#d4af37]/15 hover:border-[#d4af37]/40'
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
                  className={`px-4 py-2.5 text-xs uppercase tracking-wider font-semibold rounded-xs whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#fae7b1] via-[#d4af37] to-[#ba9028] text-[#08080a] shadow-[0_2px_12px_rgba(212,175,55,0.35)]'
                      : 'bg-[#10121a] text-[#938c7f] hover:text-[#ede8dc] border border-[#d4af37]/15 hover:border-[#d4af37]/40'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8e887a]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por pieza, subfamilia o referencia..."
              className="w-full bg-[#10121a] border border-[#d4af37]/25 rounded-xs pl-10 pr-4 py-2.5 text-xs text-[#faf5eb] placeholder-[#7a7467] focus:outline-none focus:border-[#d4af37] transition-colors"
            />
          </div>
        </div>

        {/* Subcategories & Styles Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#0e0f16] p-4 rounded-xs border border-[#d4af37]/15">
          {/* Subcategories */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1 sm:pb-0">
            <span className="text-[#8e897e] uppercase tracking-wider text-[11px] shrink-0 font-medium">
              Subfamilia:
            </span>
            <button
              onClick={() => setSelectedSubCategory('todos')}
              className={`px-3 py-1 rounded-xs text-xs cursor-pointer whitespace-nowrap transition-colors ${
                selectedSubCategory === 'todos'
                  ? 'bg-[#d4af37]/25 text-[#f5ebd7] font-semibold border border-[#d4af37]/60'
                  : 'text-[#8e897e] hover:text-[#ede8dc]'
              }`}
            >
              Todas
            </button>
            {availableSubcategories.map((sub) => {
              const isSelected = selectedSubCategory.toLowerCase() === sub.toLowerCase();
              return (
                <button
                  key={sub}
                  onClick={() => setSelectedSubCategory(sub)}
                  className={`px-3 py-1 rounded-xs text-xs cursor-pointer whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#fae7b1] via-[#d4af37] to-[#ba9028] text-[#08080a] font-bold shadow-xs'
                      : 'text-[#9c9586] hover:text-[#ede8dc] border border-[#d4af37]/15 hover:border-[#d4af37]/40 bg-[#12141f]'
                  }`}
                >
                  {sub}
                </button>
              );
            })}
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
              className="bg-[#141620] border border-[#d4af37]/25 text-[#ede8dc] px-2.5 py-1.5 rounded-xs focus:outline-none focus:border-[#d4af37] cursor-pointer text-xs"
            >
              <option value="todos">Todos los Estilos</option>
              <option value="arabe">Estilo Árabe / Mudéjar (Geométrico)</option>
              <option value="renacimiento">Estilo Renacimiento (Flores y Aves)</option>
            </select>
          </div>
        </div>

        {/* Active Filter Breadcrumb & Counter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#8e897e] gap-2 pt-1">
          <div className="flex items-center gap-2">
            <span>
              Mostrando <strong className="text-[#f3e5ab] font-mono tabular-nums">{filteredProducts.length}</strong> piezas
            </span>
            {selectedMainCategory !== 'todos' && (
              <span className="px-2 py-0.5 bg-[#141622] border border-[#d4af37]/25 text-[#d4af37] rounded-xs uppercase tracking-wider text-[10px]">
                {OFFICIAL_CATEGORIES.find((c) => c.id === selectedMainCategory)?.name}
              </span>
            )}
            {selectedSubCategory !== 'todos' && (
              <span className="px-2 py-0.5 bg-[#141622] border border-[#d4af37]/25 text-[#f5ebd7] rounded-xs text-[10px]">
                {selectedSubCategory}
              </span>
            )}
            {(selectedMainCategory !== 'todos' || selectedSubCategory !== 'todos' || selectedStyle !== 'todos' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedMainCategory('todos');
                  setSelectedSubCategory('todos');
                  setSelectedStyle('todos');
                  setSearchQuery('');
                }}
                className="text-[11px] text-[#baa882] hover:text-[#fae7b1] underline cursor-pointer ml-1"
              >
                Limpiar filtros
              </button>
            )}
          </div>
          <span className="text-[11px] text-[#7a7467]">
            Oro 24K fino (999‰) y 18K verde embutido a buril · Mínimo 4 micras garantizadas
          </span>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#0e0f16] border border-[#d4af37]/20 rounded-xs overflow-hidden flex flex-col group hover:border-[#d4af37]/55 hover:shadow-[0_14px_40px_-12px_rgba(212,175,55,0.22)] transition-all duration-400"
            >
              {/* Product Visual */}
              <div
                onClick={() => onSelectProduct(product)}
                className="relative aspect-[4/3] bg-[#141620] overflow-hidden cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f16] via-transparent to-transparent opacity-75"></div>
                {product.tag && (
                  <div className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 bg-[#08080a]/90 border border-[#d4af37]/40 text-[#f6eccd] font-semibold shadow-xs">
                    {product.tag}
                  </div>
                )}
                <div className="absolute bottom-3 right-3 text-[11px] font-mono text-[#d4af37] bg-[#08080a]/85 px-2.5 py-0.5 border border-[#d4af37]/25">
                  {product.specifications.referencia}
                </div>
                <div className="absolute top-3 right-3 text-[10px] uppercase tracking-wider text-[#d8ceba] bg-[#08080a]/85 px-2.5 py-0.5 border border-[#d4af37]/25">
                  {product.styleLabel}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#918a7c] mb-1.5">
                    <span className="font-semibold text-[#d4af37]">{product.categoryLabel}</span>
                    <span className="text-[#e2dac9] font-medium bg-[#141622] px-2 py-0.5 border border-[#d4af37]/20 rounded-xs">
                      {product.subCategory}
                    </span>
                  </div>
                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="font-display text-base font-semibold text-[#f5ebd7] group-hover:text-[#d4af37] transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h3>
                  <p className="mt-2 text-xs text-[#a0998b] leading-relaxed line-clamp-2 font-light">
                    {product.shortDesc}
                  </p>
                </div>

                {/* Technical Specifications Snapshot */}
                <div className="pt-3 border-t border-[#d4af37]/15 space-y-1.5 text-[11px] text-[#918a7c]">
                  <div className="flex justify-between">
                    <span>Pureza de Oro:</span>
                    <span className="text-[#ede8dc] font-medium">{product.specifications.oro}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Espesor de Oro:</span>
                    <span className="text-[#ede8dc] font-medium">{product.specifications.espesor}</span>
                  </div>
                  {product.specifications.dimensiones && (
                    <div className="flex justify-between">
                      <span>Dimensiones:</span>
                      <span className="text-[#ede8dc]">{product.specifications.dimensiones}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-[#d4af37]/15 flex items-center justify-between">
                  <div>
                    <span className="font-display text-lg font-bold text-[#faf5eb] tabular-nums">
                      {product.price} €
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="px-3 py-1.5 text-xs text-[#c8c2b5] hover:text-[#ffffff] border border-[#d4af37]/25 hover:border-[#d4af37] rounded-xs cursor-pointer transition-colors"
                    >
                      Ficha Técnica
                    </button>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-4 py-1.5 text-xs uppercase tracking-[0.14em] font-bold text-[#08080a] bg-gradient-to-r from-[#fae7b1] via-[#d4af37] to-[#ba9028] hover:brightness-110 rounded-xs cursor-pointer transition-all shadow-xs"
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
              className="mt-4 text-xs text-[#d4af37] hover:underline uppercase tracking-wider cursor-pointer"
            >
              Restablecer todos los filtros
            </button>
          </div>
        )}
      </section>

      {/* PDF Lookbook Modal con la estructura oficial requerida */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 bg-[#000000]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e0f16] border border-[#d4af37]/45 max-w-xl w-full p-8 rounded-xs space-y-6 shadow-2xl relative">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] bg-[#141622]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-[#f5ebd7]">
                    Dossier Oficial {COMPANY_INFO.name}
                  </h3>
                  <p className="text-xs text-[#8e887a]">
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

            <div className="space-y-4 text-xs bg-[#08080a] p-5 border border-[#d4af37]/20 rounded-xs">
              <p className="font-medium text-[#f3e5ab] text-sm">
                Estructura Oficial del Catálogo:
              </p>

              {/* Categorías y Subcategorías requeridas */}
              <div className="space-y-3 pt-1">
                <div className="p-3 bg-[#12141f] border border-[#d4af37]/15 rounded-xs space-y-1">
                  <div className="font-bold text-[#fae7b1] tracking-wider uppercase text-[11px] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
                    MUJER
                  </div>
                  <div className="text-[#c8c1b2] text-[11px] leading-relaxed">
                    Pendientes · Brazaletes · Colgantes · Pulseras · Relojes · Anillos
                  </div>
                </div>

                <div className="p-3 bg-[#12141f] border border-[#d4af37]/15 rounded-xs space-y-1">
                  <div className="font-bold text-[#fae7b1] tracking-wider uppercase text-[11px] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
                    HOMBRE
                  </div>
                  <div className="text-[#c8c1b2] text-[11px] leading-relaxed">
                    Zippos · Gemelos · Corbateros · Pulseras · Llaveros · Billeteros
                  </div>
                </div>

                <div className="p-3 bg-[#12141f] border border-[#d4af37]/15 rounded-xs space-y-1">
                  <div className="font-bold text-[#fae7b1] tracking-wider uppercase text-[11px] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
                    HOME COLECCIÓN
                  </div>
                  <div className="text-[#c8c1b2] text-[11px] leading-relaxed">
                    Abrecartas · Joyeros · Platos damasquinados
                  </div>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-[#8e887a] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span>Incluye certificación de oro fino 24K, 4 micras garantizadas y sello artesanal toledano.</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleDownloadPdf}
                disabled={downloadSuccess}
                className="flex-1 py-3 px-4 text-xs uppercase tracking-[0.16em] font-semibold text-[#08080a] bg-gradient-to-r from-[#fae7b1] via-[#d4af37] to-[#ba9028] hover:brightness-110 rounded-xs cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                {downloadSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-[#08080a]" />
                    <span>¡Catálogo Oficial Descargado!</span>
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
                className="py-3 px-4 text-xs uppercase tracking-[0.14em] text-[#8e897e] hover:text-[#e8e6e3] border border-[#d4af37]/20 rounded-xs cursor-pointer"
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

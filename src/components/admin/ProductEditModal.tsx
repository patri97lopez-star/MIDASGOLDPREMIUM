import React, { useState, useEffect } from 'react';
import { Product, MainCategory, ProductStyle } from '../../types';
import { X, Image as ImageIcon, Check, AlertCircle } from 'lucide-react';

interface ProductEditModalProps {
  isOpen: boolean;
  product: Product | null; // null if creating a new product
  onClose: () => void;
  onSave: (productData: Product) => void;
}

const PRESET_IMAGES = [
  { url: '/assets/images/jewelry_necklace_earrings_1791902044385.jpg', label: 'Gargantilla y Pendientes' },
  { url: '/assets/images/damascene_bracelets_rings_1791902081179.jpg', label: 'Brazaletes y Sortijas' },
  { url: '/assets/images/mens_cufflinks_zippo_1791902044581.jpg', label: 'Gemelos y Accesorios Caballero' },
  { url: '/assets/images/decorative_damascene_plate_1791902080741.jpg', label: 'Plato Ceremonial y Joyero' },
  { url: '/assets/images/hero_damascene_gold_1791902042124.jpg', label: 'Primer Plano Damasquinado Árabe' },
  { url: '/assets/images/midas_artisan_workshop_1791902044234.jpg', label: 'Taller Artesanal Toledano' },
];

const STANDARD_RING_SIZES = ['12 (16.5 mm)', '14 (17.2 mm)', '16 (17.8 mm)', '18 (18.5 mm)', '20 (19.2 mm)'];

export const ProductEditModal: React.FC<ProductEditModalProps> = ({
  isOpen,
  product,
  onClose,
  onSave,
}) => {
  const isEditing = Boolean(product);

  const [name, setName] = useState('');
  const [reference, setReference] = useState('');
  const [category, setCategory] = useState<MainCategory>('mujer');
  const [subCategory, setSubCategory] = useState('');
  const [style, setStyle] = useState<ProductStyle>('renacimiento');
  const [price, setPrice] = useState<number>(150);
  const [stock, setStock] = useState<number>(5);
  const [published, setPublished] = useState<boolean>(true);
  const [image, setImage] = useState(PRESET_IMAGES[0].url);
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [hasVariants, setHasVariants] = useState<boolean>(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [finishVariant, setFinishVariant] = useState<'oro24k' | 'oro24k_18k'>('oro24k_18k');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setReference(product.specifications?.referencia || `MG-REF-${Date.now().toString().slice(-4)}`);
      setCategory(product.category || 'mujer');
      setSubCategory(product.subCategory || 'Joyería');
      setStyle(product.style || 'renacimiento');
      setPrice(product.price ?? 150);
      setStock(product.stock ?? (product.inStock ? 6 : 0));
      setPublished(product.published !== false);
      setImage(product.image || PRESET_IMAGES[0].url);
      setShortDesc(product.shortDesc || '');
      setLongDesc(product.longDesc || '');
      const hasRingSizes = Array.isArray(product.availableSizes) && product.availableSizes.length > 0;
      setHasVariants(hasRingSizes);
      setSelectedSizes(hasRingSizes ? (product.availableSizes as string[]) : STANDARD_RING_SIZES);
      setFinishVariant(
        product.specifications?.oro?.includes('verde') ? 'oro24k_18k' : 'oro24k'
      );
    } else {
      // New product defaults
      setName('');
      setReference(`MG-DEMO-${Math.floor(100 + Math.random() * 900)}`);
      setCategory('mujer');
      setSubCategory('Pendientes');
      setStyle('renacimiento');
      setPrice(180);
      setStock(5);
      setPublished(true);
      setImage(PRESET_IMAGES[0].url);
      setShortDesc('Pieza artesanal toledana de damasquinado.');
      setLongDesc('Elaboración de demostración en taller de Toledo. Incrustación de oro fino sobre base de acero.');
      setHasVariants(false);
      setSelectedSizes(STANDARD_RING_SIZES);
      setFinishVariant('oro24k_18k');
    }
    setErrors({});
  }, [product, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'El nombre de la pieza es obligatorio.';
    if (!reference.trim()) newErrors.reference = 'La referencia de catálogo es obligatoria.';
    if (price <= 0 || isNaN(price)) newErrors.price = 'Introduce un precio válido mayor a 0 €.';
    if (stock < 0 || isNaN(stock)) newErrors.stock = 'El stock no puede ser negativo.';
    if (!shortDesc.trim()) newErrors.shortDesc = 'Introduce una descripción breve.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleToggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const categoryLabels: Record<MainCategory, string> = {
      mujer: 'Para Mujer',
      hombre: 'Para Hombre',
      hogar: 'Colección Hogar',
      religioso: 'Artículos Religiosos',
      regalo: 'Regalos Corporativos',
    };

    const styleLabels: Record<ProductStyle, string> = {
      arabe: 'Estilo Árabe / Mudéjar',
      renacimiento: 'Estilo Renacimiento',
      geometrico: 'Geométrico Contemporáneo',
    };

    const goldSpec =
      finishVariant === 'oro24k_18k'
        ? 'Oro fino 24K (999‰) y oro verde 18K'
        : 'Oro fino 24K (999‰) puro';

    const savedProduct: Product = {
      id: product?.id || `mg-prod-${Date.now()}`,
      name: name.trim(),
      category,
      categoryLabel: categoryLabels[category] || 'Colección Toledana',
      subCategory: subCategory.trim() || 'Artesanía Toledana',
      style,
      styleLabel: styleLabels[style] || 'Estilo Clásico',
      price: Number(price),
      originalPrice: product?.originalPrice,
      image,
      tag: product?.tag || (stock <= 2 ? 'Últimas unidades' : 'Novedad Taller'),
      shortDesc: shortDesc.trim(),
      longDesc: longDesc.trim(),
      stock: Number(stock),
      inStock: Number(stock) > 0,
      published,
      availableSizes: hasVariants && selectedSizes.length > 0 ? selectedSizes : undefined,
      specifications: {
        oro: goldSpec,
        espesor: 'Mínimo 4 micras garantizadas por ley',
        base: product?.specifications?.base || 'Acero dulce con pavonado artesanal al fuego',
        tecnica: 'Damasquinado toledano a golpe de punzón y buril',
        referencia: reference.trim().toUpperCase(),
        dimensiones: product?.specifications?.dimensiones || 'Dimensiones estándar de taller',
      },
      featured: product?.featured ?? false,
    };

    onSave(savedProduct);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white text-[#1f2128] rounded-lg shadow-2xl border border-[#d8d3c8] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#e5e0d8] flex items-center justify-between bg-[#faf8f5]">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1f2128]">
              {isEditing ? 'Editar Producto' : 'Crear Nuevo Producto (Demostración)'}
            </h3>
            <p className="text-xs text-[#736e65]">
              Los cambios se guardan localmente y se reflejan al instante en la tienda pública.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8c867b] hover:text-[#1f2128] hover:bg-[#ede8dc] rounded transition-colors"
            title="Cerrar sin guardar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Basic Info: Name & Reference */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4d483f]">
                Nombre de la pieza *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Sortija Damasquinada Greca Mudéjar"
                className={`w-full px-3 py-2 text-sm bg-[#fcfbf9] border ${
                  errors.name ? 'border-red-500' : 'border-[#d8d3c8]'
                } rounded focus:outline-hidden focus:border-[#c59e35] focus:ring-1 focus:ring-[#c59e35]`}
              />
              {errors.name && <p className="text-xs text-red-600 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.name}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4d483f]">
                Referencia *
              </label>
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="MG-MUJ-101"
                className={`w-full px-3 py-2 text-sm uppercase bg-[#fcfbf9] border ${
                  errors.reference ? 'border-red-500' : 'border-[#d8d3c8]'
                } rounded focus:outline-hidden focus:border-[#c59e35] focus:ring-1 focus:ring-[#c59e35]`}
              />
              {errors.reference && <p className="text-xs text-red-600">{errors.reference}</p>}
            </div>
          </div>

          {/* Category, Subcategory & Style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4d483f]">
                Categoría principal
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MainCategory)}
                className="w-full px-3 py-2 text-sm bg-[#fcfbf9] border border-[#d8d3c8] rounded focus:outline-hidden focus:border-[#c59e35]"
              >
                <option value="mujer">Para Mujer</option>
                <option value="hombre">Para Hombre</option>
                <option value="hogar">Colección Hogar</option>
                <option value="religioso">Artículos Religiosos</option>
                <option value="regalo">Regalos Corporativos</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4d483f]">
                Subcategoría
              </label>
              <input
                type="text"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                placeholder="Pendientes, Anillos, Zippos..."
                className="w-full px-3 py-2 text-sm bg-[#fcfbf9] border border-[#d8d3c8] rounded focus:outline-hidden focus:border-[#c59e35]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4d483f]">
                Estilo artesanal
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value as ProductStyle)}
                className="w-full px-3 py-2 text-sm bg-[#fcfbf9] border border-[#d8d3c8] rounded focus:outline-hidden focus:border-[#c59e35]"
              >
                <option value="renacimiento">Renacimiento</option>
                <option value="arabe">Árabe / Mudéjar</option>
                <option value="geometrico">Geométrico</option>
              </select>
            </div>
          </div>

          {/* Pricing, Stock & Publication Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-[#fbf9f5] border border-[#e8e3d8] rounded-md">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4d483f]">
                Precio base (€) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  className={`w-full pl-3 pr-8 py-2 text-sm font-semibold bg-white border ${
                    errors.price ? 'border-red-500' : 'border-[#d8d3c8]'
                  } rounded focus:outline-hidden focus:border-[#c59e35]`}
                />
                <span className="absolute right-3 top-2.5 text-xs text-[#8c867b] font-bold">€</span>
              </div>
              {errors.price && <p className="text-xs text-red-600">{errors.price}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4d483f]">
                Existencias (Stock) *
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={stock}
                onChange={(e) => setStock(parseInt(e.target.value, 10) || 0)}
                className={`w-full px-3 py-2 text-sm font-semibold bg-white border ${
                  errors.stock ? 'border-red-500' : 'border-[#d8d3c8]'
                } rounded focus:outline-hidden focus:border-[#c59e35]`}
              />
              {stock === 0 ? (
                <span className="text-[11px] text-amber-700 font-medium">Marcado como agotado</span>
              ) : (
                <span className="text-[11px] text-emerald-700 font-medium">{stock} u. disponibles</span>
              )}
            </div>

            <div className="space-y-1.5 flex flex-col justify-end">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4d483f]">
                Estado en tienda
              </label>
              <button
                type="button"
                onClick={() => setPublished(!published)}
                className={`w-full py-2 px-3 text-xs font-semibold rounded border transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                  published
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                    : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${published ? 'bg-emerald-600' : 'bg-amber-600'}`} />
                {published ? 'Publicado en tienda' : 'Oculto (Borrador)'}
              </button>
            </div>
          </div>

          {/* Image Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4d483f] flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-[#c59e35]" />
              Imagen del producto (Reutilizando catálogo del taller)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {PRESET_IMAGES.map((preset) => {
                const isSelected = image === preset.url;
                return (
                  <button
                    key={preset.url}
                    type="button"
                    onClick={() => setImage(preset.url)}
                    className={`relative rounded overflow-hidden aspect-square border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#c59e35] ring-2 ring-[#c59e35]/30'
                        : 'border-[#e0dad0] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-full h-full object-cover"
                    />
                    {isSelected && (
                      <span className="absolute bottom-1 right-1 p-0.5 bg-[#c59e35] text-white rounded-full">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="text-[11px] text-[#807a70]">
              O ingresa una URL personalizada:
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="/assets/images/..."
                className="mt-1 w-full px-2.5 py-1 text-xs bg-[#fcfbf9] border border-[#d8d3c8] rounded focus:outline-hidden focus:border-[#c59e35]"
              />
            </div>
          </div>

          {/* Simple Variants Management (where sensible) */}
          <div className="p-3.5 bg-[#faf8f5] border border-[#e5e0d8] rounded-md space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#1f2128]">
                  Gestión de variantes sencillas (Talla o Acabado)
                </span>
                <p className="text-[11px] text-[#787368]">
                  Habilita variantes solo en productos donde corresponda (p. ej. sortijas o matices de oro).
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasVariants}
                  onChange={(e) => setHasVariants(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#c59e35]"></div>
              </label>
            </div>

            {hasVariants && (
              <div className="space-y-3 pt-2 border-t border-[#e8e3d8]">
                <div>
                  <span className="block text-[11px] font-semibold uppercase text-[#5a554c] mb-1.5">
                    Tallas de sortija disponibles para el cliente:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {STANDARD_RING_SIZES.map((sz) => {
                      const isChecked = selectedSizes.includes(sz);
                      return (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => handleToggleSize(sz)}
                          className={`px-2.5 py-1 text-xs rounded border transition-colors cursor-pointer ${
                            isChecked
                              ? 'bg-[#1f2128] text-[#f5ebd7] border-[#1f2128]'
                              : 'bg-white text-[#6b665c] border-[#d8d3c8] hover:border-[#1f2128]'
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <span className="block text-[11px] font-semibold uppercase text-[#5a554c] mb-1">
                    Acabado de damasquinado:
                  </span>
                  <div className="flex gap-4 text-xs">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="finish"
                        checked={finishVariant === 'oro24k_18k'}
                        onChange={() => setFinishVariant('oro24k_18k')}
                        className="text-[#c59e35] focus:ring-[#c59e35]"
                      />
                      <span>Oro 24K y matices en Verde 18K</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="finish"
                        checked={finishVariant === 'oro24k'}
                        onChange={() => setFinishVariant('oro24k')}
                        className="text-[#c59e35] focus:ring-[#c59e35]"
                      />
                      <span>Oro 24K puro únicamente</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Descriptions */}
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4d483f]">
                Descripción breve (Catálogo) *
              </label>
              <textarea
                rows={2}
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                placeholder="Breve reseña toledana para la tarjeta del producto..."
                className={`w-full px-3 py-2 text-xs bg-[#fcfbf9] border ${
                  errors.shortDesc ? 'border-red-500' : 'border-[#d8d3c8]'
                } rounded focus:outline-hidden focus:border-[#c59e35]`}
              />
              {errors.shortDesc && <p className="text-xs text-red-600">{errors.shortDesc}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4d483f]">
                Descripción detallada (Ficha técnica)
              </label>
              <textarea
                rows={3}
                value={longDesc}
                onChange={(e) => setLongDesc(e.target.value)}
                placeholder="Explicación del cincelado toledano, estuche de presentación y detalles para la demo..."
                className="w-full px-3 py-2 text-xs bg-[#fcfbf9] border border-[#d8d3c8] rounded focus:outline-hidden focus:border-[#c59e35]"
              />
            </div>
          </div>

          {/* Non-promissory notice */}
          <div className="text-[11px] text-[#8c867b] bg-[#f5f2eb] p-2.5 rounded border border-[#e2ddd3]">
            <strong>Aviso de demostración:</strong> Los datos modificados aquí se reflejan al instante en la tienda en este navegador para propósitos de presentación comercial. No se tramitan pedidos a proveedores ni se emiten certificados fiscales.
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-[#e5e0d8] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#5a554c] hover:text-[#1f2128] hover:bg-[#ede8dc] rounded transition-colors cursor-pointer"
            >
              Cancelar sin guardar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold uppercase tracking-wider bg-[#1f2128] text-[#f5ebd7] hover:bg-[#33353d] active:scale-98 rounded transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4 text-[#d4af37]" />
              Guardar producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

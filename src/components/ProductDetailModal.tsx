import React, { useState } from 'react';
import { Product } from '../types';
import { COMPANY_INFO } from '../data/products';
import {
  X,
  ShieldCheck,
  Truck,
  Plus,
  Minus,
  Check,
  ShoppingBag,
  Sparkles,
  Ruler,
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.availableSizes ? product.availableSizes[0] : ''
  );
  const [added, setAdded] = useState<boolean>(false);

  // Sync size when product changes
  React.useEffect(() => {
    if (product?.availableSizes && product.availableSizes.length > 0) {
      setSelectedSize(product.availableSizes[0]);
    } else {
      setSelectedSize('');
    }
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedSize);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#000000]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0e1015] border border-[#d4af37]/35 max-w-4xl w-full rounded-sm overflow-hidden shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-sm bg-[#0b0c10]/80 border border-[#d4af37]/30 text-[#8e897e] hover:text-[#f5ebd7] hover:border-[#d4af37] flex items-center justify-center cursor-pointer transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Image */}
          <div className="relative bg-[#13151e] aspect-square md:aspect-auto min-h-[340px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1015] via-transparent to-transparent opacity-50"></div>
            {product.tag && (
              <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] px-3 py-1 bg-[#0b0c10]/90 border border-[#d4af37]/40 text-[#f3e5ab]">
                {product.tag}
              </div>
            )}
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#0b0c10]/85 border border-[#d4af37]/20 text-[11px] text-[#bbb5a7] flex items-center justify-between">
              <span className="text-[#d4af37] font-mono">{product.specifications.referencia}</span>
              <span className="text-[#d8ceba]">{product.styleLabel}</span>
            </div>
          </div>

          {/* Right: Technical Information & Purchase */}
          <div className="p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-1">
                <span>{product.categoryLabel} · {product.subCategory}</span>
                <span className="font-mono text-[10px] text-[#8e897e]">{product.specifications.referencia}</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#f5ebd7]">
                {product.name}
              </h2>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-display text-2xl font-bold text-[#f5ebd7] tabular-nums">
                  {product.price} €
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#7e796e] line-through tabular-nums">
                    {product.originalPrice} €
                  </span>
                )}
                <span className="text-xs text-[#d4af37]">(IVA incluido)</span>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-[#bbb5a7] leading-relaxed">
                {product.longDesc}
              </p>

              {/* Ring or Dilatation Size Selector */}
              {product.availableSizes && product.availableSizes.length > 0 && (
                <div className="mt-5 p-3.5 bg-[#12141c] border border-[#d4af37]/25 rounded-sm space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#f3e5ab] flex items-center gap-1.5">
                      <Ruler className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Seleccionar Talla (Guía Oficial Midas)</span>
                    </span>
                    <span className="text-[11px] text-[#8e897e]">Medida interior</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {product.availableSizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-2.5 py-1 text-xs rounded-sm border cursor-pointer transition-colors ${
                          selectedSize === size
                            ? 'bg-[#d4af37] text-[#0b0c10] border-[#d4af37] font-bold'
                            : 'bg-[#151822] text-[#bbb5a7] border-[#d4af37]/20 hover:border-[#d4af37]/50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Specifications Sheet */}
              <div className="mt-6 pt-5 border-t border-[#d4af37]/15 space-y-2 text-xs">
                <div className="text-[11px] uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                  Ficha Técnica de Fabricación:
                </div>
                <div className="flex justify-between py-1 border-b border-[#d4af37]/10 text-[#8e897e]">
                  <span>Pureza de Oro:</span>
                  <span className="text-[#ede8dc] font-medium">{product.specifications.oro}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#d4af37]/10 text-[#8e897e]">
                  <span>Espesor de Oro:</span>
                  <span className="text-[#ede8dc] font-medium">{product.specifications.espesor}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#d4af37]/10 text-[#8e897e]">
                  <span>Base Metálica:</span>
                  <span className="text-[#ede8dc] font-medium">{product.specifications.base}</span>
                </div>
                {product.specifications.dimensiones && (
                  <div className="flex justify-between py-1 border-b border-[#d4af37]/10 text-[#8e897e]">
                    <span>Medidas:</span>
                    <span className="text-[#ede8dc] font-medium">{product.specifications.dimensiones}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 text-[#8e897e]">
                  <span>Técnica Aplicada:</span>
                  <span className="text-[#ede8dc] font-medium">{product.specifications.tecnica}</span>
                </div>
              </div>
            </div>

            {/* Purchase Controls */}
            <div className="space-y-4 pt-4 border-t border-[#d4af37]/15">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#d4af37]/30 bg-[#12141c] rounded-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2.5 text-[#bbb5a7] hover:text-[#f5ebd7] cursor-pointer"
                    aria-label="Reducir cantidad"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-mono font-bold text-[#f5ebd7] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2.5 text-[#bbb5a7] hover:text-[#f5ebd7] cursor-pointer"
                    aria-label="Aumentar cantidad"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={added}
                  className="flex-1 py-3 px-6 text-xs uppercase tracking-[0.2em] font-semibold text-[#0b0c10] bg-gradient-to-r from-[#edd488] via-[#d4af37] to-[#b38612] hover:brightness-110 active:scale-98 transition-all rounded-sm cursor-pointer flex items-center justify-center gap-2"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-[#0b0c10]" />
                      <span>¡Añadido a la Cesta!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#0b0c10]" />
                      <span>Añadir a la Cesta · {(product.price * quantity).toFixed(2)} €</span>
                    </>
                  )}
                </button>
              </div>

              {/* Guarantees small print */}
              <div className="flex items-center justify-between text-[11px] text-[#8e897e] pt-1">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#d4af37]" /> Entrega en 3 días (DHL)
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" /> Estuche & Certificado {COMPANY_INFO.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

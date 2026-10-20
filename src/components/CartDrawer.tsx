import React, { useState } from 'react';
import { CartItem } from '../types';
import { COMPANY_INFO } from '../data/products';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Truck,
  RotateCcw,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    paymentMethod: 'tarjeta',
  });
  const [orderNumber, setOrderNumber] = useState<string>('');

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const freeShippingThreshold = 150;
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 8.5;
  const total = subtotal + shippingCost;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderNo = `MG-TOL-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderNumber(newOrderNo);
    setCheckoutStep('confirmed');
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#000000]/75 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0e1015] border-l border-[#d4af37]/30 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#d4af37]/20 flex items-center justify-between bg-[#12141c]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
              <h2 className="font-display text-base font-bold text-[#f5ebd7] uppercase tracking-wider">
                {checkoutStep === 'cart' && 'Cesta de la Compra'}
                {checkoutStep === 'checkout' && 'Finalizar Compra'}
                {checkoutStep === 'confirmed' && 'Pedido Confirmado'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#8e897e] hover:text-[#f5ebd7] cursor-pointer"
              aria-label="Cerrar cesta"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {checkoutStep === 'cart' && (
              <>
                {items.length === 0 ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] mx-auto bg-[#d4af37]/5">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <p className="font-display text-base text-[#f5ebd7]">
                      Su cesta de compra está vacía
                    </p>
                    <p className="text-xs text-[#8e897e] max-w-xs mx-auto">
                      Explore nuestro catálogo y elija una joya única de damasquinado de Toledo con oro de 24K.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-4 px-6 py-2.5 text-xs uppercase tracking-widest font-semibold text-[#0b0c10] bg-[#d4af37] rounded-sm cursor-pointer"
                    >
                      Explorar Boutique
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Free shipping progress */}
                    <div className="bg-[#12141c] p-3.5 border border-[#d4af37]/20 rounded-sm text-xs space-y-1.5">
                      <div className="flex justify-between text-[#d8ceba]">
                        <span>
                          {subtotal >= freeShippingThreshold
                            ? '¡Disfruta de Envío Gratuito con DHL Express!'
                            : `Añade ${(freeShippingThreshold - subtotal).toFixed(2)} € más para envío gratis`}
                        </span>
                        <span className="font-mono text-[#d4af37]">
                          {Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-[#0b0c10] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] transition-all duration-300"
                          style={{
                            width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Items list */}
                    <div className="space-y-4 divide-y divide-[#d4af37]/10">
                      {items.map((item) => (
                        <div key={item.product.id} className="pt-4 first:pt-0 flex gap-4">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-sm border border-[#d4af37]/20 shrink-0 bg-[#151720]"
                          />
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start gap-2">
                                <h4 className="font-display text-xs font-semibold text-[#ede8dc] line-clamp-1">
                                  {item.product.name}
                                </h4>
                                <button
                                  onClick={() => onRemoveItem(item.product.id)}
                                  className="text-[#7e796e] hover:text-red-400 cursor-pointer p-0.5"
                                  title="Eliminar de la cesta"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <div className="flex items-center gap-2 text-[10px] text-[#8e897e] mt-0.5">
                                <span className="font-mono text-[#d4af37]">
                                  {item.product.specifications.referencia}
                                </span>
                                {item.selectedSize && (
                                  <span className="text-[#ede8dc] bg-[#d4af37]/15 px-1.5 py-0.5 rounded-sm">
                                    Talla: {item.selectedSize}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                              <div className="flex items-center border border-[#d4af37]/25 bg-[#12141c] rounded-sm">
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, -1)}
                                  className="p-1 text-[#9c978b] hover:text-[#f5ebd7] cursor-pointer"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2 text-xs font-mono font-medium text-[#f5ebd7] tabular-nums">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, 1)}
                                  className="p-1 text-[#9c978b] hover:text-[#f5ebd7] cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <span className="font-display text-sm font-bold text-[#f5ebd7] tabular-nums">
                                {(item.product.price * item.quantity).toFixed(2)} €
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}

            {checkoutStep === 'checkout' && (
              <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs">
                <div className="border-b border-[#d4af37]/15 pb-2 text-xs uppercase tracking-wider text-[#d4af37] font-semibold">
                  Datos de Entrega (España & Internacional)
                </div>

                <div className="space-y-1">
                  <label className="text-[#8e897e]">Nombre y Apellidos *</label>
                  <input
                    type="text"
                    required
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    placeholder="Carmen Rodríguez"
                    className="w-full bg-[#12141c] border border-[#d4af37]/25 rounded-sm p-2 text-[#ede8dc] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[#8e897e]">Email *</label>
                    <input
                      type="email"
                      required
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      placeholder="carmen@correo.es"
                      className="w-full bg-[#12141c] border border-[#d4af37]/25 rounded-sm p-2 text-[#ede8dc] focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[#8e897e]">Teléfono *</label>
                    <input
                      type="tel"
                      required
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      placeholder="+34 600 000 000"
                      className="w-full bg-[#12141c] border border-[#d4af37]/25 rounded-sm p-2 text-[#ede8dc] focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[#8e897e]">Dirección de Entrega *</label>
                  <input
                    type="text"
                    required
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    placeholder="Calle / Avenida, número, piso..."
                    className="w-full bg-[#12141c] border border-[#d4af37]/25 rounded-sm p-2 text-[#ede8dc] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[#8e897e]">Ciudad / Provincia *</label>
                    <input
                      type="text"
                      required
                      value={customer.city}
                      onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                      placeholder="Toledo / Madrid"
                      className="w-full bg-[#12141c] border border-[#d4af37]/25 rounded-sm p-2 text-[#ede8dc] focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[#8e897e]">Código Postal *</label>
                    <input
                      type="text"
                      required
                      value={customer.postalCode}
                      onChange={(e) => setCustomer({ ...customer, postalCode: e.target.value })}
                      placeholder="45001"
                      className="w-full bg-[#12141c] border border-[#d4af37]/25 rounded-sm p-2 text-[#ede8dc] focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-[#d4af37]/15">
                  <label className="text-[#8e897e] block mb-2 uppercase tracking-wider text-[10px] font-semibold text-[#d4af37]">
                    Método de Pago Seguro (Redsys / SSL)
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 p-2.5 bg-[#12141c] border border-[#d4af37]/25 rounded-sm cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        checked={customer.paymentMethod === 'tarjeta'}
                        onChange={() => setCustomer({ ...customer, paymentMethod: 'tarjeta' })}
                      />
                      <span className="text-[#ede8dc] font-medium">Tarjeta Bancaria CES (Visa / Mastercard)</span>
                    </label>
                    <label className="flex items-center gap-2 p-2.5 bg-[#12141c] border border-[#d4af37]/25 rounded-sm cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        checked={customer.paymentMethod === 'bizum'}
                        onChange={() => setCustomer({ ...customer, paymentMethod: 'bizum' })}
                      />
                      <span className="text-[#ede8dc] font-medium">Bizum Instantáneo</span>
                    </label>
                    <label className="flex items-center gap-2 p-2.5 bg-[#12141c] border border-[#d4af37]/25 rounded-sm cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        checked={customer.paymentMethod === 'paypal'}
                        onChange={() => setCustomer({ ...customer, paymentMethod: 'paypal' })}
                      />
                      <span className="text-[#ede8dc] font-medium">PayPal Seguro</span>
                    </label>
                  </div>
                </div>
              </form>
            )}

            {checkoutStep === 'confirmed' && (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 border border-[#d4af37] flex items-center justify-center text-[#d4af37] mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#f5ebd7]">
                  ¡Pedido Confirmado en {COMPANY_INFO.name}!
                </h3>
                <p className="text-xs text-[#9c978b] leading-relaxed">
                  Gracias por confiar en el auténtico damasquinado toledano de <strong className="text-[#f3e5ab]">{COMPANY_INFO.legalName}</strong>. Comenzamos la preparación de su estuche en nuestro taller de Toledo.
                </p>
                <div className="p-3 bg-[#12141c] border border-[#d4af37]/30 text-xs font-mono text-[#d4af37]">
                  Referencia de Pedido: {orderNumber}
                </div>
                <div className="p-3.5 bg-[#0c0e12] border border-[#d4af37]/10 text-[11px] text-[#8e897e] text-left space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[#ede8dc]">
                    <Truck className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Entrega con DHL en 3 días laborables.</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#ede8dc]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Incluye Certificado Oficial de Origen en Toledo (Oro 24K).</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#ede8dc]">
                    <RotateCcw className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>14 días naturales de derecho de desistimiento legal.</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setCheckoutStep('cart');
                    onClose();
                  }}
                  className="w-full py-3 text-xs uppercase tracking-widest font-semibold text-[#0b0c10] bg-[#d4af37] rounded-sm cursor-pointer"
                >
                  Volver a la Boutique
                </button>
              </div>
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {checkoutStep !== 'confirmed' && items.length > 0 && (
            <div className="p-6 border-t border-[#d4af37]/20 bg-[#12141c] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#8e897e]">
                  <span>Subtotal joyas:</span>
                  <span className="text-[#ede8dc] font-mono tabular-nums">{subtotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-[#8e897e]">
                  <span>Envío asegurado DHL:</span>
                  <span className="text-[#ede8dc] font-mono tabular-nums">
                    {shippingCost === 0 ? 'GRATIS' : `${shippingCost.toFixed(2)} €`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-[#d4af37]/15">
                  <span className="text-[#f5ebd7]">Total (IVA incl.):</span>
                  <span className="text-[#d4af37] font-display font-bold text-base tabular-nums">
                    {total.toFixed(2)} €
                  </span>
                </div>
              </div>

              {checkoutStep === 'cart' ? (
                <button
                  onClick={() => setCheckoutStep('checkout')}
                  className="w-full py-3.5 px-4 text-xs uppercase tracking-[0.2em] font-semibold text-[#0b0c10] bg-gradient-to-r from-[#edd488] via-[#d4af37] to-[#b38612] hover:brightness-110 active:scale-98 transition-all rounded-sm cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Finalizar Compra</span>
                  <ArrowRight className="w-4 h-4 text-[#0b0c10]" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setCheckoutStep('cart')}
                    className="py-3 px-4 text-xs uppercase tracking-wider text-[#8e897e] border border-[#d4af37]/20 hover:text-[#ede8dc] rounded-sm cursor-pointer"
                  >
                    Atrás
                  </button>
                  <button
                    form="checkout-form"
                    type="submit"
                    className="flex-1 py-3 px-4 text-xs uppercase tracking-[0.16em] font-semibold text-[#0b0c10] bg-[#d4af37] hover:bg-[#e4c45b] rounded-sm cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Lock className="w-3.5 h-3.5 text-[#0b0c10]" />
                    <span>Pagar con Seguridad {total.toFixed(2)} €</span>
                  </button>
                </div>
              )}

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#7e796e] uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Pago Seguro CES (Redsys / BBVA) · {COMPANY_INFO.legalName}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

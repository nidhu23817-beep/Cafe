import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types/cafe';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onExploreMenu: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onExploreMenu,
}) => {
  const [pickupTime, setPickupTime] = useState<'asap' | 'scheduled'>('asap');
  const [scheduledSlot, setScheduledSlot] = useState('In 30 Minutes');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const tax = subtotal * 0.0825;
  const total = subtotal + tax;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const orderTicket = {
        orderNumber: Math.floor(1000 + Math.random() * 9000),
        name: customerName || 'Atelier Guest',
        phone: customerPhone || '+1 (503) 555-0142',
        itemsCount: items.reduce((acc, i) => acc + i.quantity, 0),
        total: total.toFixed(2),
        estimatedReady: pickupTime === 'asap' ? '12–15 mins' : scheduledSlot,
        orderedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setOrderSubmitted(orderTicket);
      setIsSubmitting(false);
      onClearCart();
    }, 900);
  };

  const handleStartNewOrder = () => {
    setOrderSubmitted(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-[#FAF8F5] h-full flex flex-col shadow-2xl border-l border-[#E0D7C9] animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#ECE3D5] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#201D1A]" />
            <h2 id="cart-title" className="font-serif-title text-xl font-medium text-[#201D1A]">
              Pickup Order Bag
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="p-1.5 rounded-lg text-[#665D54] hover:text-[#201D1A] hover:bg-[#F2ECE3] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        {orderSubmitted ? (
          /* Order Confirmed Screen */
          <div className="flex-1 p-6 overflow-y-auto flex flex-col justify-between space-y-6">
            <div className="text-center pt-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              
              <div className="space-y-1">
                <span className="text-xs uppercase font-mono tracking-widest text-[#786D62]">
                  Order Confirmed
                </span>
                <h3 className="text-2xl font-serif-title font-medium text-[#1E1916]">
                  Order #{orderSubmitted.orderNumber}
                </h3>
                <p className="text-xs text-[#635A51]">
                  Sent directly to the barista espresso & hearth station.
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="bg-white border border-[#E3DACB] rounded-xl p-5 text-left space-y-3 shadow-xs">
                <div className="flex justify-between text-xs pb-2 border-b border-[#F2ECE3]">
                  <span className="text-[#786D62]">Pickup Name:</span>
                  <span className="font-semibold text-[#1F1C19]">{orderSubmitted.name}</span>
                </div>
                <div className="flex justify-between text-xs pb-2 border-b border-[#F2ECE3]">
                  <span className="text-[#786D62]">Ready In:</span>
                  <span className="font-semibold text-[#8A633F]">{orderSubmitted.estimatedReady}</span>
                </div>
                <div className="flex justify-between text-xs pb-2 border-b border-[#F2ECE3]">
                  <span className="text-[#786D62]">Ordered At:</span>
                  <span className="font-mono text-[#1F1C19]">{orderSubmitted.orderedAt}</span>
                </div>
                <div className="flex justify-between text-xs pt-1">
                  <span className="text-[#786D62]">Paid via Pickup:</span>
                  <span className="font-mono font-bold text-sm text-[#1F1C19]">${orderSubmitted.total}</span>
                </div>
              </div>

              {/* Progress Stepper */}
              <div className="bg-[#F2ECE3] rounded-xl p-4 text-left space-y-2">
                <p className="text-xs font-semibold text-[#201D1A]">Live Kitchen Status</p>
                <div className="flex items-center gap-2 text-xs text-[#52483E]">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span>Brewing & Baking in progress · Ready on Bar Counter</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleStartNewOrder}
              className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#1F1C19] rounded-lg hover:bg-[#38322D] transition-colors"
            >
              Done & Return to Menu
            </button>
          </div>
        ) : items.length === 0 ? (
          /* Empty Bag State */
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#EFE9DF] text-[#7C6F62] flex items-center justify-center">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif-title text-xl text-[#201D1A]">Your bag is empty</h3>
              <p className="text-xs text-[#70665C] max-w-xs">
                Explore our seasonal pour-overs, specialty lattes, and fresh morning pastries to begin your order.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onExploreMenu();
              }}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1F1C19] hover:bg-[#38322D] rounded-lg transition-colors"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          /* Cart Item List & Form */
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-[#ECE4D8]">
              {items.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-serif-title font-medium text-base text-[#1E1916]">
                        {item.menuItem.name}
                      </h4>
                      <p className="text-xs font-mono tabular-nums text-[#695F54]">
                        ${item.unitPrice.toFixed(2)} each
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      aria-label="Remove item"
                      className="text-[#96897D] hover:text-red-700 p-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Selected Options summary */}
                  <div className="text-[11px] text-[#756A5F] space-y-0.5">
                    {item.options.temperature && (
                      <div>• Temp: {item.options.temperature}</div>
                    )}
                    {item.options.milk && (
                      <div>• Milk: {item.options.milk}</div>
                    )}
                    {item.options.sweetness && item.options.sweetness !== 'Unsweetened' && (
                      <div>• Syrup: {item.options.sweetness}</div>
                    )}
                    {item.options.espressoShots && (
                      <div>• Shot: {item.options.espressoShots}</div>
                    )}
                    {item.options.extraPastryWarm !== undefined && (
                      <div>• Hearth: {item.options.extraPastryWarm ? 'Warmed in stone hearth' : 'Room temperature'}</div>
                    )}
                    {item.options.specialInstructions && (
                      <div className="italic">• Note: "{item.options.specialInstructions}"</div>
                    )}
                  </div>

                  {/* Quantity Stepper and Total Row */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2.5 bg-white border border-[#DDD3C4] rounded-md px-2 py-0.5">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="text-[#6E6459] hover:text-[#1F1C19] p-0.5"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs font-semibold tabular-nums text-[#1F1C19]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                        className="text-[#6E6459] hover:text-[#1F1C19] p-0.5"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-mono font-semibold text-sm tabular-nums text-[#1F1C19]">
                      ${item.lineTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout & Pickup Controls Form */}
            <form onSubmit={handleCheckout} className="p-5 bg-white border-t border-[#ECE3D5] space-y-4">
              {/* Pickup Time Mode */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#352D26]">
                  <span>Pickup Timing</span>
                  <span className="text-[#846342] font-mono normal-case">Bar counter pickup</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPickupTime('asap')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                      pickupTime === 'asap'
                        ? 'bg-[#1F1C19] text-white border-[#1F1C19]'
                        : 'bg-[#FAF8F5] text-[#5C534B] border-[#DDD3C4]'
                    }`}
                  >
                    ASAP (~12–15 min)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPickupTime('scheduled')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                      pickupTime === 'scheduled'
                        ? 'bg-[#1F1C19] text-white border-[#1F1C19]'
                        : 'bg-[#FAF8F5] text-[#5C534B] border-[#DDD3C4]'
                    }`}
                  >
                    Schedule Later
                  </button>
                </div>

                {pickupTime === 'scheduled' && (
                  <select
                    value={scheduledSlot}
                    onChange={(e) => setScheduledSlot(e.target.value)}
                    className="w-full mt-1.5 px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#DDD3C4] rounded-lg text-[#201D1A]"
                  >
                    <option value="In 30 Minutes">In 30 Minutes</option>
                    <option value="In 45 Minutes">In 45 Minutes</option>
                    <option value="In 1 Hour">In 1 Hour</option>
                    <option value="At 12:30 PM Lunch">At 12:30 PM Lunch</option>
                    <option value="At 3:00 PM Afternoon">At 3:00 PM Afternoon</option>
                  </select>
                )}
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="block text-[11px] font-medium text-[#6B6156] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Clara"
                    className="w-full px-2.5 py-1.5 text-xs bg-[#FAF8F5] border border-[#DDD3C4] rounded-md focus:outline-none focus:ring-1 focus:ring-[#201D1A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#6B6156] mb-1">
                    Phone (SMS Ready)
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="(555) 000-0000"
                    className="w-full px-2.5 py-1.5 text-xs bg-[#FAF8F5] border border-[#DDD3C4] rounded-md focus:outline-none focus:ring-1 focus:ring-[#201D1A]"
                  />
                </div>
              </div>

              {/* Order Calculations */}
              <div className="pt-2 border-t border-[#F2ECE3] space-y-1 text-xs">
                <div className="flex justify-between text-[#6E645A]">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#6E645A]">
                  <span>Taxes (8.25%)</span>
                  <span className="font-mono tabular-nums">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-sm text-[#1F1C19] pt-1 border-t border-[#F2ECE3]">
                  <span>Total Due</span>
                  <span className="font-mono tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#1F1C19] hover:bg-[#38322D] rounded-lg transition-all shadow-sm active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Transmitting to Barista Station...</span>
                ) : (
                  <>
                    <span>Place Pickup Order</span>
                    <span className="font-mono tabular-nums">(${total.toFixed(2)})</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

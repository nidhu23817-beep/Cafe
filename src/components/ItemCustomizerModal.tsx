import React, { useState } from 'react';
import { X, Plus, Minus, Check, Coffee, Sparkles } from 'lucide-react';
import { MenuItem, SelectedOptions } from '../types/cafe';

interface ItemCustomizerModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, options: SelectedOptions, unitPrice: number) => void;
}

export const ItemCustomizerModal: React.FC<ItemCustomizerModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const isBeverage = item.category === 'brews' || item.category === 'espresso';
  const isBakery = item.category === 'bakery';

  const [quantity, setQuantity] = useState(1);
  const [temperature, setTemperature] = useState<'Hot' | 'Iced'>('Hot');
  const [milk, setMilk] = useState<string>('Whole Organic Milk');
  const [sweetness, setSweetness] = useState<string>('Unsweetened');
  const [espressoShots, setEspressoShots] = useState<'Single' | 'Double (+ $0.75)' | 'Decaf (Swiss Water)'>('Double (+ $0.75)');
  const [extraPastryWarm, setExtraPastryWarm] = useState<boolean>(true);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Calculate dynamic unit price
  let calculatedUnitPrice = item.price;
  if (isBeverage) {
    if (milk.includes('Oatly') || milk.includes('Almond')) calculatedUnitPrice += 0.60;
    if (milk.includes('Pistachio')) calculatedUnitPrice += 0.90;
    if (sweetness.includes('Vanilla') || sweetness.includes('Saffron')) calculatedUnitPrice += 0.75;
  }

  const handleAdd = () => {
    const options: SelectedOptions = {
      temperature: isBeverage ? temperature : undefined,
      milk: isBeverage ? milk : undefined,
      sweetness: isBeverage ? sweetness : undefined,
      espressoShots: isBeverage && item.category === 'espresso' ? espressoShots : undefined,
      extraPastryWarm: isBakery ? extraPastryWarm : undefined,
      specialInstructions: specialInstructions.trim() ? specialInstructions.trim() : undefined,
    };

    onAddToCart(item, quantity, options, calculatedUnitPrice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-[#FAF8F5] border border-[#DDD3C4] rounded-2xl shadow-2xl overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        {/* Header Image Strip */}
        <div className="relative h-48 sm:h-56 bg-[#EBE4DA] overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          <button
            type="button"
            onClick={onClose}
            aria-label="Close customizer"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-[#201D1A] transition-colors shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-xs uppercase tracking-widest font-mono text-white/80">
              {item.categoryLabel}
            </span>
            <h2 id="modal-headline" className="text-2xl font-serif-title font-medium leading-snug">
              {item.name}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Description & Notes */}
          <div className="space-y-2">
            <p className="text-sm text-[#5C534B] leading-relaxed">
              {item.description}
            </p>
            {item.origin && (
              <div className="text-xs text-[#7A6E63] font-medium pt-1">
                <span className="text-[#352D26]">Origin: </span>
                {item.origin}
              </div>
            )}
            {item.tastingNotes && item.tastingNotes.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#786D62] pt-1">
                <span className="text-[#352D26] font-medium">Notes:</span>
                {item.tastingNotes.map((note, idx) => (
                  <span key={note}>
                    {note}{idx < item.tastingNotes!.length - 1 ? ' ·' : ''}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Beverage Customizations */}
          {isBeverage && (
            <div className="space-y-5 pt-3 border-t border-[#ECE4D8]">
              {/* Temperature */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#352D26] mb-2">
                  Serving Temperature
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Hot', 'Iced'] as const).map((temp) => (
                    <button
                      key={temp}
                      type="button"
                      onClick={() => setTemperature(temp)}
                      className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                        temperature === temp
                          ? 'bg-[#201D1A] text-white border-[#201D1A] shadow-sm'
                          : 'bg-white text-[#5C534B] border-[#DDD3C4] hover:bg-[#F2ECE3]'
                      }`}
                    >
                      {temp === 'Hot' ? 'Hot (Barista Steamed 65°C)' : 'Over Ice (Hand-Carved Cube)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Milk Option */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#352D26] mb-2">
                  Milk & Dairy Preference
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Whole Organic Milk',
                    'Oatly Barista (+ $0.60)',
                    'Almond Silk (+ $0.60)',
                    'Roasted Pistachio (+ $0.90)',
                  ].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMilk(m)}
                      className={`py-2 px-3 text-xs font-medium rounded-lg border text-left transition-all truncate ${
                        milk === m
                          ? 'bg-[#201D1A] text-white border-[#201D1A] shadow-sm'
                          : 'bg-white text-[#5C534B] border-[#DDD3C4] hover:bg-[#F2ECE3]'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sweetness / Natural Syrups */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#352D26] mb-2">
                  House Syrups & Sweetness
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Unsweetened',
                    'Hint of Raw Demerara',
                    'Madagascar Vanilla (+ $0.75)',
                    'Kashmiri Saffron (+ $0.75)',
                  ].map((sw) => (
                    <button
                      key={sw}
                      type="button"
                      onClick={() => setSweetness(sw)}
                      className={`py-2 px-3 text-xs font-medium rounded-lg border text-left transition-all truncate ${
                        sweetness === sw
                          ? 'bg-[#201D1A] text-white border-[#201D1A] shadow-sm'
                          : 'bg-white text-[#5C534B] border-[#DDD3C4] hover:bg-[#F2ECE3]'
                      }`}
                    >
                      {sw}
                    </button>
                  ))}
                </div>
              </div>

              {/* Espresso Shots (if espresso category) */}
              {item.category === 'espresso' && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#352D26] mb-2">
                    Espresso Formulation
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Single', 'Double (+ $0.75)', 'Decaf (Swiss Water)'] as const).map((shot) => (
                      <button
                        key={shot}
                        type="button"
                        onClick={() => setEspressoShots(shot)}
                        className={`py-2 px-2 text-xs font-medium rounded-lg border text-center transition-all ${
                          espressoShots === shot
                            ? 'bg-[#201D1A] text-white border-[#201D1A] shadow-sm'
                            : 'bg-white text-[#5C534B] border-[#DDD3C4] hover:bg-[#F2ECE3]'
                        }`}
                      >
                        {shot}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Bakery Customization */}
          {isBakery && (
            <div className="space-y-4 pt-3 border-t border-[#ECE4D8]">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#352D26] mb-2">
                  Stone Hearth Preparation
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setExtraPastryWarm(true)}
                    className={`py-2.5 px-3 text-xs font-medium rounded-lg border text-left transition-all ${
                      extraPastryWarm
                        ? 'bg-[#201D1A] text-white border-[#201D1A]'
                        : 'bg-white text-[#5C534B] border-[#DDD3C4] hover:bg-[#F2ECE3]'
                    }`}
                  >
                    Warmed in Hearth Stone (Crisp flaky crust)
                  </button>
                  <button
                    type="button"
                    onClick={() => setExtraPastryWarm(false)}
                    className={`py-2.5 px-3 text-xs font-medium rounded-lg border text-left transition-all ${
                      !extraPastryWarm
                        ? 'bg-[#201D1A] text-white border-[#201D1A]'
                        : 'bg-white text-[#5C534B] border-[#DDD3C4] hover:bg-[#F2ECE3]'
                    }`}
                  >
                    Room Temperature (Day-fresh batch)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="pt-2 border-t border-[#ECE4D8]">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#352D26] mb-1.5">
              Barista Notes & Dietary Notes
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. extra hot, light ice, pour into my travel mug..."
              maxLength={120}
              className="w-full px-3 py-2 text-xs bg-white border border-[#DDD3C4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#201D1A] text-[#201D1A]"
            />
          </div>
        </div>

        {/* Modal Footer with Stepper & Add Button */}
        <div className="p-6 bg-[#F2ECE3] border-t border-[#DDD3C4] flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-3 bg-white border border-[#DDD3C4] rounded-lg px-2 py-1">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="p-1 text-[#5C534B] hover:text-[#1F1C19] disabled:opacity-30"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-sm font-semibold tabular-nums text-[#1F1C19] min-w-[1.2rem] text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              aria-label="Increase quantity"
              className="p-1 text-[#5C534B] hover:text-[#1F1C19]"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add Button */}
          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 py-3 px-5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1F1C19] hover:bg-[#38322D] rounded-lg transition-all shadow-sm active:scale-[0.98] flex items-center justify-between"
          >
            <span>Add to Pickup Bag</span>
            <span className="font-mono tabular-nums text-sm font-medium">
              ${(calculatedUnitPrice * quantity).toFixed(2)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

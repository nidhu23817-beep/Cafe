import React, { useState } from 'react';
import { Compass, Check, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { MenuItem } from '../types/cafe';

interface FlavorGuideQuizProps {
  menuItems: MenuItem[];
  onSelectRecommended: (item: MenuItem) => void;
}

export const FlavorGuideQuiz: React.FC<FlavorGuideQuizProps> = ({
  menuItems,
  onSelectRecommended,
}) => {
  const [step, setStep] = useState(1);
  const [roastPref, setRoastPref] = useState<'light' | 'medium' | 'dark' | null>(null);
  const [flavorNotes, setFlavorNotes] = useState<'citrus' | 'sweet' | 'rich' | null>(null);
  const [brewPref, setBrewPref] = useState<'pourover' | 'milk' | 'cold' | null>(null);

  // Recommendations mapping
  const getRecommendation = (): MenuItem => {
    if (brewPref === 'cold') {
      return (
        menuItems.find((i) => i.id === 'cascara-smoked-cold-brew') ||
        menuItems.find((i) => i.id === 'kyoto-slow-drip') ||
        menuItems[0]
      );
    }
    if (brewPref === 'milk') {
      if (flavorNotes === 'sweet' || roastPref === 'medium') {
        return menuItems.find((i) => i.id === 'iced-pistachio-cloud-latte') || menuItems[4];
      }
      return menuItems.find((i) => i.id === 'atelier-flat-white') || menuItems[4];
    }
    // Pour-over / black
    if (roastPref === 'light' || flavorNotes === 'citrus') {
      return menuItems.find((i) => i.id === 'ethiopia-yirgacheffe') || menuItems[0];
    }
    return menuItems.find((i) => i.id === 'colombia-geisha-natural') || menuItems[1];
  };

  const isComplete = roastPref !== null && flavorNotes !== null && brewPref !== null;
  const recommendedItem = isComplete ? getRecommendation() : null;

  const handleReset = () => {
    setStep(1);
    setRoastPref(null);
    setFlavorNotes(null);
    setBrewPref(null);
  };

  return (
    <section id="flavor-guide" className="py-16 md:py-24 bg-[#F5EFE6] border-b border-[#E8DEC\-C] border-[#E3DACB]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#7C6F63] font-medium">
            <Compass className="w-3.5 h-3.5 text-[#8A684C]" />
            <span>Sensory Taste Profiler</span>
            <span aria-hidden="true">·</span>
            <span>Bean Matching</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-title font-medium text-[#1E1916]">
            Find Your Signature Cup
          </h2>
          <p className="text-sm text-[#5E544A] leading-relaxed">
            Answer three quick questions about how you enjoy coffee, and our head roaster's algorithm will match your ideal seasonal harvest and preparation.
          </p>
        </div>

        {/* Quiz Steps or Result Card */}
        {!isComplete ? (
          <div className="bg-white rounded-2xl border border-[#DDD3C4] p-6 sm:p-10 shadow-xs space-y-8">
            {/* Step Indicators */}
            <div className="flex items-center justify-between text-xs text-[#807468] border-b border-[#F0EBE2] pb-4">
              <span>Question {step} of 3</span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 rounded-full transition-all ${
                      step === s ? 'w-6 bg-[#201D1A]' : s < step ? 'w-4 bg-[#785E48]' : 'w-4 bg-[#E5DDCF]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Step 1: Roast Character */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-xl font-serif-title font-medium text-[#1F1C19]">
                  1. Which roast character speaks to your morning mood?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      id: 'light',
                      title: 'Light & Radiant',
                      desc: 'Vibrant, tea-like clarity, high natural sweetness, crisp fruit acidity.',
                    },
                    {
                      id: 'medium',
                      title: 'Balanced & Velvety',
                      desc: 'Golden honey sweetness, caramelized brown butter, toasted almond notes.',
                    },
                    {
                      id: 'dark',
                      title: 'Rich & Structured',
                      desc: 'Deep bittersweet chocolate, molasses, full body with velvet density.',
                    },
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setRoastPref(option.id as any);
                        setStep(2);
                      }}
                      className="p-5 rounded-xl border border-[#E3DACB] hover:border-[#201D1A] bg-[#FAF8F5] hover:bg-white text-left transition-all group"
                    >
                      <span className="font-serif-title font-semibold text-lg text-[#1F1C19] group-hover:text-[#785E48]">
                        {option.title}
                      </span>
                      <p className="text-xs text-[#6B6156] mt-2 leading-relaxed">
                        {option.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Flavor Notes */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-xl font-serif-title font-medium text-[#1F1C19]">
                  2. What tasting notes excite your palate?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      id: 'citrus',
                      title: 'Jasmine, Peach & Bergamot',
                      desc: 'Crisp, floral brightness reminiscent of high-altitude Ethiopian coffees.',
                    },
                    {
                      id: 'sweet',
                      title: 'Caramel, Pistachio & Honey',
                      desc: 'Warm comforting pastry aromas, toasted nuts, and silky mouthfeel.',
                    },
                    {
                      id: 'rich',
                      title: '70% Dark Cacao & Smoked Oak',
                      desc: 'Intense cocoa nibs, rich body, subtle smoky oak wood barrel notes.',
                    },
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setFlavorNotes(option.id as any);
                        setStep(3);
                      }}
                      className="p-5 rounded-xl border border-[#E3DACB] hover:border-[#201D1A] bg-[#FAF8F5] hover:bg-white text-left transition-all group"
                    >
                      <span className="font-serif-title font-semibold text-lg text-[#1F1C19] group-hover:text-[#785E48]">
                        {option.title}
                      </span>
                      <p className="text-xs text-[#6B6156] mt-2 leading-relaxed">
                        {option.desc}
                      </p>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-[#7A6E63] hover:text-[#1F1C19] flex items-center gap-1 pt-2"
                >
                  ← Back to Previous Step
                </button>
              </div>
            )}

            {/* Step 3: Brew Preference */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-xl font-serif-title font-medium text-[#1F1C19]">
                  3. How do you prefer your beverage prepared?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      id: 'pourover',
                      title: 'Pure Hand Pour-Over (V60 / Chemex)',
                      desc: 'Clean black extraction highlighting origin terroir and delicate florals.',
                    },
                    {
                      id: 'milk',
                      title: 'Velvet Flat White or Specialty Latte',
                      desc: 'Silky micro-foam texture paired with deep ristretto espresso.',
                    },
                    {
                      id: 'cold',
                      title: 'Chilled Nitro or Slow Cold Drip',
                      desc: 'Crisp, refreshing, hand-carved ice sphere with deep fruit notes.',
                    },
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setBrewPref(option.id as any)}
                      className="p-5 rounded-xl border border-[#E3DACB] hover:border-[#201D1A] bg-[#FAF8F5] hover:bg-white text-left transition-all group"
                    >
                      <span className="font-serif-title font-semibold text-lg text-[#1F1C19] group-hover:text-[#785E48]">
                        {option.title}
                      </span>
                      <p className="text-xs text-[#6B6156] mt-2 leading-relaxed">
                        {option.desc}
                      </p>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs text-[#7A6E63] hover:text-[#1F1C19] flex items-center gap-1 pt-2"
                >
                  ← Back to Previous Step
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Recommended Result Card */
          recommendedItem && (
            <div className="bg-white rounded-2xl border border-[#DDD3C4] overflow-hidden shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-12 items-center">
                <div className="md:col-span-5 h-64 md:h-full bg-[#EBE4DA] relative overflow-hidden">
                  <img
                    src={recommendedItem.image}
                    alt={recommendedItem.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded text-xs font-mono font-medium text-[#201D1A]">
                    Curated Match
                  </div>
                </div>

                <div className="md:col-span-7 p-6 sm:p-8 space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#7B7064]">
                    <span className="uppercase font-mono tracking-wider">
                      {recommendedItem.categoryLabel}
                    </span>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1 hover:text-[#1F1C19] transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake Quiz</span>
                    </button>
                  </div>

                  <h3 className="text-2xl font-serif-title font-medium text-[#1E1916]">
                    {recommendedItem.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5C534B] leading-relaxed">
                    {recommendedItem.description}
                  </p>

                  {recommendedItem.tastingNotes && (
                    <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#ECE4D8] text-xs text-[#6F6458]">
                      <span className="font-semibold text-[#1F1C19]">Tasting Profile: </span>
                      {recommendedItem.tastingNotes.join(' · ')}
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between gap-4">
                    <span className="font-mono text-base font-semibold tabular-nums text-[#1F1C19]">
                      ${recommendedItem.price.toFixed(2)}
                    </span>

                    <button
                      type="button"
                      onClick={() => onSelectRecommended(recommendedItem)}
                      className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1F1C19] hover:bg-[#38322D] rounded-lg transition-all shadow-xs"
                    >
                      Order Matched Cup →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        )}

      </div>
    </section>
  );
};

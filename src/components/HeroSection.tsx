import React from 'react';
import { ArrowDown, Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import heroImage from '../assets/images/hero_specialty_coffee_1791181440873.jpg';

interface HeroSectionProps {
  onOpenReservation: () => void;
  onExploreMenu: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenReservation,
  onExploreMenu,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-[#EFEBE4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Clean unboxed editorial kicker with typographic separators */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#786D62] font-medium">
              <span>Roasted in Micro-Batches</span>
              <span aria-hidden="true">·</span>
              <span>Organic Sourdough Hearth</span>
              <span aria-hidden="true">·</span>
              <span>Direct Farm Trade</span>
            </div>

            {/* Display Headline with balanced wrap */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-serif-title font-medium leading-[1.08] text-[#1D1916] text-balance">
              Where quiet morning ritual meets the living hearth.
            </h1>

            {/* Body Prose */}
            <p className="text-base sm:text-lg text-[#5A524A] font-sans-body leading-relaxed max-w-xl">
              Specialty high-altitude coffees roasted on our vintage 1968 Probat drum roaster, paired with slow-fermented organic pastries pulled golden from the stone hearth every hour.
            </p>

            {/* Key Service Callout: Unboxed Clean Metadata */}
            <div className="py-3 border-y border-[#ECE6DC] flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#6B6156]">
              <div className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#8A6A4E]" />
                <span className="text-[#1D1916]">Open Today:</span>
                <span>6:30 AM – 6:30 PM</span>
              </div>
              <span aria-hidden="true" className="text-[#D3C9BD]">·</span>
              <div className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#8A6A4E]" />
                <span>418 Elmwood Blvd, Historic Arts Quarter</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                type="button"
                onClick={onExploreMenu}
                className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1F1C19] hover:bg-[#38322D] rounded-lg transition-all shadow-sm active:scale-[0.98] whitespace-nowrap"
              >
                Explore Curated Menu
              </button>

              <button
                type="button"
                onClick={onOpenReservation}
                className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#26201B] bg-transparent hover:bg-[#EFE9DF] border border-[#CFC5B6] rounded-lg transition-all active:scale-[0.98] whitespace-nowrap"
              >
                Reserve a Table
              </button>
            </div>

            {/* Tasting Note Trust Indicators */}
            <div className="pt-4 text-xs text-[#7B7268] flex items-center gap-4">
              <span className="font-serif-title italic text-sm text-[#4E443B]">Current Cup:</span>
              <span>Panama Geisha Washed</span>
              <span aria-hidden="true">/</span>
              <span>Ethiopia Guji Natural</span>
              <span aria-hidden="true">/</span>
              <span>Cardamom Brioche</span>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-[#EBE4DA] aspect-[16/10] sm:aspect-[16/11]">
              <img
                src={heroImage}
                alt="Artisanal pour-over coffee and ceramic latte art in natural warm morning sunlight at Atelier Moka"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-[1.02] transition-transform duration-700"
              />
              {/* Subtle scrim for editorial contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Quiet caption in bottom corner */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex justify-between items-end text-white pointer-events-none">
                <div>
                  <p className="text-xs uppercase tracking-widest font-mono text-white/80">Barista Reserve Pull</p>
                  <p className="font-serif-title text-lg sm:text-xl font-medium tracking-wide">Ethiopia Yirgacheffe G1 V60</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-white/80">Extraction: 93.5°C · 3:15 min</span>
                </div>
              </div>
            </div>

            {/* Floating Editorial Accent Card */}
            <div className="hidden sm:block absolute -bottom-6 -left-6 bg-[#FAF8F5] border border-[#DDD3C4] rounded-xl p-4 shadow-lg max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#EFE9DF] flex items-center justify-center text-[#785E48] font-serif-title font-semibold text-lg">
                  1968
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#1F1C19]">Cast-Iron Probat Roasting</p>
                  <p className="text-[11px] text-[#6E645A]">Roasted weekly in 15kg small batches</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

import React from 'react';
import cafeAmbianceImg from '../assets/images/cafe_interior_ambiance_1791181458563.jpg';
import bakeryPastriesImg from '../assets/images/artisan_bakery_pastries_1791181476874.jpg';
import toastImg from '../assets/images/brunch_avocado_toast_1791181491850.jpg';

export const StoryAndRoastery: React.FC = () => {
  return (
    <section id="craft" className="py-16 md:py-24 border-b border-[#EFEBE4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Editorial Story Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#7C6E61] font-medium">
              <span>Origin & Terroir</span>
              <span aria-hidden="true">·</span>
              <span>Direct Farm Gate</span>
              <span aria-hidden="true">·</span>
              <span>1968 Probat</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-medium leading-[1.12] text-[#1D1916] text-balance">
              Coffee as living agriculture. Pastry born of time and stone.
            </h2>

            <p className="text-sm sm:text-base text-[#595048] leading-relaxed">
              Atelier Moka began with a straightforward conviction: coffee should taste unmistakably of the high mountain soil and rain where it grew. We bypass bulk importers to purchase micro-lots directly from smallholder producer families across Huila, Boquete, and Yirgacheffe, paying an average of 2.8× fair-trade baseline directly to the growers.
            </p>

            <p className="text-sm sm:text-base text-[#595048] leading-relaxed">
              Every bean is roasted gently in our restored 1968 cast-iron Probat drum roaster. Cast iron absorbs heat evenly, allowing origin-specific jasmine florals, stone fruit acids, and natural honey sugars to blossom without scorching the delicate seed.
            </p>

            {/* Three key pillars (Clean typography, no pill badges) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#ECE3D5]">
              <div>
                <p className="font-serif-title text-2xl font-semibold text-[#1F1C19]">2.8×</p>
                <p className="text-xs text-[#716559] mt-1">Direct Trade Premium to Farming Partners</p>
              </div>
              <div>
                <p className="font-serif-title text-2xl font-semibold text-[#1F1C19]">36-Hr</p>
                <p className="text-xs text-[#716559] mt-1">Slow Wild Fermentation for Sourdough</p>
              </div>
              <div>
                <p className="font-serif-title text-2xl font-semibold text-[#1F1C19]">125 ppm</p>
                <p className="text-xs text-[#716559] mt-1">Custom Remineralized Water Formula</p>
              </div>
            </div>
          </div>

          {/* Right: Ambiance Image Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-[#EBE4DA]">
              <img
                src={cafeAmbianceImg}
                alt="Sunlit architectural interior of Atelier Moka featuring oak benches and peaceful atmosphere"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs uppercase font-mono tracking-widest text-white/80">
                  The Sanctuary
                </span>
                <p className="font-serif-title text-lg font-medium">
                  Designed for quiet focus, conversation, and warm morning light
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dual Craft Grid: Bakery Hearth & Kitchen Focus */}
        <div id="ambiance" className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          {/* Card 1: Hearth Bakery */}
          <div className="bg-[#FAF8F5] border border-[#E3DACB] rounded-2xl overflow-hidden shadow-xs space-y-5 p-6 sm:p-8 flex flex-col justify-between">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#ECE4D8]">
              <img
                src={bakeryPastriesImg}
                alt="Freshly baked golden croissants and cardamom morning buns at Atelier Moka"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#7D7063]">
                01. Stone Hearth Patisserie
              </span>
              <h3 className="text-2xl font-serif-title font-medium text-[#1E1916]">
                Cultured Butter & 27 Laminated Layers
              </h3>
              <p className="text-xs sm:text-sm text-[#5D5349] leading-relaxed">
                Our morning buns and croissants undergo a 36-hour cold proof before baking in stone hearth deck ovens. We source certified organic heirloom grain flour and churned Brittany butter for unmatched flakiness and aroma.
              </p>
            </div>
          </div>

          {/* Card 2: Seasonal Kitchen */}
          <div className="bg-[#FAF8F5] border border-[#E3DACB] rounded-2xl overflow-hidden shadow-xs space-y-5 p-6 sm:p-8 flex flex-col justify-between">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#ECE4D8]">
              <img
                src={toastImg}
                alt="Gourmet sourdough brunch toast with creamy avocado and soft poached egg"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#7D7063]">
                02. All-Day Seasonal Kitchen
              </span>
              <h3 className="text-2xl font-serif-title font-medium text-[#1E1916]">
                Farm-Direct Produce & Heritage Grains
              </h3>
              <p className="text-xs sm:text-sm text-[#5D5349] leading-relaxed">
                From golden runny pasture-raised eggs to cold-pressed Willamette Valley olive oils and black truffles, our savory brunch tartines celebrate local agricultural bounty without pretension.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

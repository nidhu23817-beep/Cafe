import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-[#181513] text-[#A69B8F] pt-16 pb-12 border-t border-[#2B2521]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Tier: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-[#2C2521]">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-2xl font-serif-title font-medium text-white tracking-tight">
              Atelier Moka
            </span>
            <p className="text-xs sm:text-sm text-[#9C9083] leading-relaxed max-w-sm">
              Specialty micro-batch coffee roasters and organic sourdough hearth bakery. Rooted in direct farm gate trade, meticulous extraction, and timeless hospitality.
            </p>
            <div className="text-xs text-[#7B7064]">
              418 Elmwood Boulevard, Historic Arts Quarter, Portland, OR
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-white">
              Navigation
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Seasonal Menu</a>
              </li>
              <li>
                <a href="#craft" className="hover:text-white transition-colors">Roastery Craft & Origin</a>
              </li>
              <li>
                <a href="#flavor-guide" className="hover:text-white transition-colors">Flavor Profile Guide</a>
              </li>
              <li>
                <a href="#visit" className="hover:text-white transition-colors">Location & Hours</a>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-white">
              The Harvest Gazette
            </p>
            <p className="text-xs text-[#8F8376] leading-relaxed">
              Receive notifications when rare micro-lots (Geisha, Pink Bourbon) drop from the roaster and weekend bakery specials go live.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-3 py-2 text-xs bg-[#241F1C] border border-[#3D342E] rounded-lg text-white placeholder-[#786D63] focus:outline-none focus:border-[#C8924B]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="px-3.5 py-2 bg-[#FAF8F5] text-[#181513] hover:bg-white rounded-lg text-xs font-semibold uppercase transition-colors shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Subscribed. Welcome to the harvest circle.</span>
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Tier: Quiet Copyright & Standards */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#70655A]">
          <div>
            © {new Date().getFullYear()} Atelier Moka Roasters LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Direct Trade Verified</span>
            <span aria-hidden="true">·</span>
            <span>100% Organic Sourdough Hearth</span>
            <span aria-hidden="true">·</span>
            <span>Eco-Friendly Compostable Packaging</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

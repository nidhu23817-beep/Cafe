import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Wifi, Bike, Car, Check, Copy, ExternalLink, Calendar } from 'lucide-react';

interface HoursAndLocationProps {
  onOpenReservation: () => void;
}

export const HoursAndLocation: React.FC<HoursAndLocationProps> = ({
  onOpenReservation,
}) => {
  const [copied, setCopied] = useState(false);

  const address = '418 Elmwood Boulevard, Historic Arts Quarter, Portland, OR 97205';

  const handleCopy = () => {
    navigator.clipboard?.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const amenities = [
    { icon: Wifi, title: 'Fiber Wi-Fi & Work Solarium', desc: 'Quiet laptop-friendly seating from 7am-12pm.' },
    { icon: Bike, title: 'Dedicated Bike Racks', desc: 'Secure parking on Elmwood cycling corridor.' },
    { icon: Car, title: 'EV Charging & 2-Hr Parking', desc: 'Directly adjacent on 4th Avenue parking deck.' },
    { icon: Clock, title: 'Hearth Loaf Release', desc: 'Warm organic sourdough batards pulled at 9am & 2pm daily.' },
  ];

  return (
    <section id="visit" className="py-16 md:py-24 border-b border-[#EFEBE4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-3 max-w-xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#7C6E61] font-medium">
            <span>Location & Hospitality</span>
            <span aria-hidden="true">·</span>
            <span>Historic Arts Quarter</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-title font-medium text-[#1E1916]">
            Visit the Roastery & Hearth
          </h2>
          <p className="text-sm text-[#5E544A] leading-relaxed">
            Located in a restored 1920s brick timber warehouse with soaring glass skylights and an open hearth stone bakery.
          </p>
        </div>

        {/* 2-Column Location & Schedule Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Hours & Contact Card */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E3DACB] p-6 sm:p-8 space-y-6 shadow-xs">
            
            {/* Real-time Status Banner (Clean typography) */}
            <div className="flex items-center justify-between pb-4 border-b border-[#ECE4D8]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1F1C19]">
                  Open Now · Roasting & Baking Fresh
                </span>
              </div>
              <span className="text-xs font-mono text-[#786D62]">Closes 6:30 PM</span>
            </div>

            {/* Operating Hours Table */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#352D26]">
                Roastery & Cafe Operating Hours
              </h3>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-2 border-b border-[#F4EFE7]">
                  <span className="font-medium text-[#201D1A]">Monday – Friday</span>
                  <div className="text-right">
                    <span className="font-mono text-[#201D1A]">6:30 AM – 6:30 PM</span>
                    <span className="block text-[11px] text-[#86796D]">Brunch Kitchen closes 3:30 PM</span>
                  </div>
                </div>

                <div className="flex justify-between py-2 border-b border-[#F4EFE7]">
                  <span className="font-medium text-[#201D1A]">Saturday – Sunday</span>
                  <div className="text-right">
                    <span className="font-mono text-[#201D1A]">7:30 AM – 7:00 PM</span>
                    <span className="block text-[11px] text-[#86796D]">All-Day Brunch until 4:30 PM</span>
                  </div>
                </div>

                <div className="flex justify-between py-2">
                  <span className="font-medium text-[#201D1A]">Public Holidays</span>
                  <span className="font-mono text-[#201D1A]">8:00 AM – 4:00 PM</span>
                </div>
              </div>
            </div>

            {/* Address & Quick Actions */}
            <div className="space-y-3 pt-3 border-t border-[#ECE4D8]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#8A6A4E] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-[#1F1C19]">Atelier Moka Flagship</p>
                  <p className="text-xs text-[#5E544A] mt-0.5">{address}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-1.5 text-xs rounded-lg border border-[#DDD3C4] bg-[#FAF8F5] hover:bg-white text-[#201D1A] flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Address Copied' : 'Copy Address'}</span>
                </button>

                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 text-xs rounded-lg border border-[#DDD3C4] bg-[#FAF8F5] hover:bg-white text-[#201D1A] flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </a>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#6B6156]">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#8A6A4E]" />
                  <span>+1 (503) 555-0194</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#8A6A4E]" />
                  <span>concierge@ateliermoka.cafe</span>
                </div>
              </div>
            </div>

            {/* Quick Reserve CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenReservation}
                className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#1F1C19] hover:bg-[#38322D] rounded-lg transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve a Table in Advance</span>
              </button>
            </div>

          </div>

          {/* Right Column: Amenities & Space Guide */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#F2ECE3] rounded-2xl p-6 sm:p-8 space-y-5 border border-[#DDD3C4]">
              <h3 className="text-xl font-serif-title font-medium text-[#1F1C19]">
                Visiting Atelier Moka
              </h3>
              <p className="text-xs sm:text-sm text-[#5C534B] leading-relaxed">
                Whether you are stepping in for a quick single-origin pour-over before work, lingering over weekend brunch in the courtyard, or picking up freshly roasted whole beans, our space is designed for calm hospitality.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {amenities.map((item, idx) => (
                  <div key={idx} className="bg-white/80 rounded-xl p-4 border border-[#E0D7C9] space-y-1">
                    <item.icon className="w-4 h-4 text-[#8A6A4E]" />
                    <p className="text-xs font-semibold text-[#1F1C19]">{item.title}</p>
                    <p className="text-[11px] text-[#71665C] leading-normal">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bean Refill Program Notice */}
            <div className="bg-white rounded-2xl border border-[#E3DACB] p-5 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#1F1C19]">Zero-Waste Bean Refill Station</span>
                <p className="text-xs text-[#6B6156] mt-0.5">Bring your airtight canister for 15% off whole bean roasts.</p>
              </div>
              <span className="font-serif-title font-semibold text-lg text-[#785E48]">15% Off</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

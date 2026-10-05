import React, { useState } from 'react';
import { ShoppingBag, Calendar, Menu as MenuIcon, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservation,
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Menu', href: '#menu' },
    { label: 'Our Craft', href: '#craft' },
    { label: 'Flavor Guide', href: '#flavor-guide' },
    { label: 'Ambiance', href: '#ambiance' },
    { label: 'Hours & Visit', href: '#visit' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EFEBE4] transition-all">
      {/* Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4-6 nav links) — Zone 3 (1-2 primary actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark in display face */}
        <a 
          href="#" 
          className="text-2xl sm:text-3xl font-serif-title font-medium tracking-tight text-[#1F1C19] hover:opacity-85 transition-opacity"
        >
          Atelier Moka
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5C554E]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`transition-colors duration-200 hover:text-[#1F1C19] relative py-1 ${
                activeSection === link.href.substring(1)
                  ? 'text-[#1F1C19] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#201D1A]'
                  : ''
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Table reservation CTA button */}
          <button
            type="button"
            onClick={onOpenReservation}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#2B241E] bg-[#EFE9DF] hover:bg-[#E4DCCE] border border-[#DDD4C5] rounded-lg transition-colors whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5 text-[#5C554E]" />
            <span>Reserve Table</span>
          </button>

          {/* Cart Bag button with live counter */}
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Shopping bag with ${cartCount} items`}
            className="inline-flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#201C19] hover:bg-[#38322D] rounded-lg transition-all shadow-sm active:scale-[0.98] whitespace-nowrap"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Order Pickup</span>
            <span className="bg-[#463D36] text-[#FAF8F5] px-1.5 py-0.5 rounded text-[11px] font-mono tabular-nums">
              {cartCount}
            </span>
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#201C19] hover:bg-[#EFE9DF] rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#EFEBE4] px-6 py-5 space-y-4 shadow-lg">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="text-base font-medium text-[#201C19] py-1 border-b border-[#F0EBE2] hover:text-[#785E48]"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold uppercase tracking-wider text-[#2B241E] bg-[#EFE9DF] rounded-lg"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

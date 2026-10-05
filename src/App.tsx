import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { ItemCustomizerModal } from './components/ItemCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { TableReservationModal } from './components/TableReservationModal';
import { FlavorGuideQuiz } from './components/FlavorGuideQuiz';
import { StoryAndRoastery } from './components/StoryAndRoastery';
import { ReviewsAndCommunity } from './components/ReviewsAndCommunity';
import { HoursAndLocation } from './components/HoursAndLocation';
import { Footer } from './components/Footer';

import { MENU_ITEMS, CAFE_REVIEWS } from './data/menuData';
import { MenuItem, CartItem, SelectedOptions, Reservation } from './types/cafe';

export default function App() {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_moka_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active modal states
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('menu');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save cart changes
  useEffect(() => {
    try {
      localStorage.setItem('atelier_moka_cart', JSON.stringify(cart));
    } catch {
      // localStorage silent catch
    }
  }, [cart]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['menu', 'craft', 'flavor-guide', 'ambiance', 'visit'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Add customized item to cart
  const handleAddToCart = (
    item: MenuItem,
    quantity: number,
    options: SelectedOptions,
    unitPrice: number
  ) => {
    const cartItemId = `${item.id}-${Date.now()}`;
    const newCartItem: CartItem = {
      id: cartItemId,
      menuItem: item,
      quantity,
      options,
      unitPrice,
      lineTotal: unitPrice * quantity,
    };

    setCart((prev) => [...prev, newCartItem]);
    showToast(`Added ${quantity}× ${item.name} to pickup bag`);
  };

  // Quick 1-click add from menu card
  const handleQuickAdd = (item: MenuItem) => {
    const defaultOptions: SelectedOptions = {
      temperature: item.category === 'brews' || item.category === 'espresso' ? 'Hot' : undefined,
      milk: item.category === 'espresso' ? 'Whole Organic Milk' : undefined,
      sweetness: 'Unsweetened',
      extraPastryWarm: item.category === 'bakery' ? true : undefined,
    };

    const cartItemId = `${item.id}-${Date.now()}`;
    const newCartItem: CartItem = {
      id: cartItemId,
      menuItem: item,
      quantity: 1,
      options: defaultOptions,
      unitPrice: item.price,
      lineTotal: item.price,
    };

    setCart((prev) => [...prev, newCartItem]);
    showToast(`Added ${item.name} to pickup bag`);
  };

  // Update item quantity in cart
  const handleUpdateCartQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          return {
            ...item,
            quantity: newQuantity,
            lineTotal: item.unitPrice * newQuantity,
          };
        }
        return item;
      })
    );
  };

  // Remove cart item
  const handleRemoveCartItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  // Clear cart
  const handleClearCart = () => {
    setCart([]);
  };

  const handleReservationSuccess = (reservation: Reservation) => {
    showToast(`Table reserved for ${reservation.name} on ${reservation.date}`);
  };

  const scrollToMenu = () => {
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#201D1A]">
      
      {/* 1. Header Navigation Bar (Top Bar Contract) */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
        activeSection={activeSection}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1F1C19] text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-medium flex items-center gap-2 border border-[#3C352E] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onOpenReservation={() => setIsReservationOpen(true)}
          onExploreMenu={scrollToMenu}
        />

        {/* Interactive Menu Section */}
        <MenuSection
          items={MENU_ITEMS}
          onSelectItem={(item) => setCustomizingItem(item)}
          onQuickAdd={handleQuickAdd}
        />

        {/* Sensory Taste Profiler / Coffee Flavor Quiz */}
        <FlavorGuideQuiz
          menuItems={MENU_ITEMS}
          onSelectRecommended={(item) => setCustomizingItem(item)}
        />

        {/* Heritage Story, 1968 Probat & Sourdough Hearth */}
        <StoryAndRoastery />

        {/* Customer Reviews & Guest Notes */}
        <ReviewsAndCommunity initialReviews={CAFE_REVIEWS} />

        {/* Roastery Hours, Directions & Amenities */}
        <HoursAndLocation
          onOpenReservation={() => setIsReservationOpen(true)}
        />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Modals & Slide-Overs */}
      {/* 1. Item Customizer Modal */}
      <ItemCustomizerModal
        item={customizingItem}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 2. Slide-Over Cart Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onExploreMenu={scrollToMenu}
      />

      {/* 3. Table Reservation Modal */}
      <TableReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        onSuccess={handleReservationSuccess}
      />

    </div>
  );
}

import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, Users, MapPin, CheckCircle2 } from 'lucide-react';
import { Reservation } from '../types/cafe';

interface TableReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (reservation: Reservation) => void;
}

export const TableReservationModal: React.FC<TableReservationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  if (!isOpen) return null;

  const today = new Date().toISOString().split('T')[0];

  const [date, setDate] = useState(today);
  const [time, setTime] = useState('10:00 AM');
  const [guests, setGuests] = useState(2);
  const [seatingArea, setSeatingArea] = useState<Reservation['seatingArea']>('Solarium');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  const timeSlots = [
    '8:00 AM',
    '9:30 AM',
    '11:00 AM',
    '12:30 PM',
    '2:00 PM',
    '3:30 PM',
    '5:00 PM',
  ];

  const seatingOptions: { id: Reservation['seatingArea']; label: string; desc: string }[] = [
    {
      id: 'Solarium',
      label: 'Sunlit Glass Solarium',
      desc: 'Sky-lit glass atrium with natural morning daylight and potted citrus trees.',
    },
    {
      id: 'Espresso Bar',
      label: 'Oak Espresso Bar Counter',
      desc: 'Front-row stools watching barista pour-overs and latte extractions.',
    },
    {
      id: 'Garden Courtyard',
      label: 'Garden Courtyard Patio',
      desc: 'Open-air brick courtyard sheltered with heated awnings and olive greenery.',
    },
    {
      id: 'Library Corner',
      label: 'Quiet Hearth Library',
      desc: 'Deep leather armchairs, quiet ambient jazz, and warm wooden bookshelves.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReservation: Reservation = {
      id: 'res-' + Date.now(),
      code: 'MOKA-' + Math.floor(1000 + Math.random() * 9000),
      name,
      email,
      phone,
      date,
      time,
      guests,
      seatingArea,
      specialNotes: specialNotes.trim() ? specialNotes.trim() : undefined,
      createdAt: new Date().toISOString(),
    };

    setConfirmedReservation(newReservation);
    onSuccess(newReservation);
  };

  const handleResetAndClose = () => {
    setConfirmedReservation(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#DDD3C4] rounded-2xl shadow-2xl overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reservation-title"
      >
        {/* Header */}
        <div className="p-6 bg-[#201D1A] text-white flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest font-mono text-[#D4C3B3]">
              Hospitality & Table Seating
            </span>
            <h2 id="reservation-title" className="text-2xl font-serif-title font-medium">
              Reserve a Table at Atelier Moka
            </h2>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label="Close modal"
            className="p-2 text-[#DDD3C4] hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {confirmedReservation ? (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase font-mono tracking-widest text-[#7B7064]">
                Reservation Confirmed
              </span>
              <h3 className="text-2xl font-serif-title font-medium text-[#1E1916]">
                We look forward to hosting you, {confirmedReservation.name}
              </h3>
              <p className="text-xs text-[#635A51]">
                A confirmation has been logged with table concierge.
              </p>
            </div>

            <div className="bg-white border border-[#E3DACB] rounded-xl p-5 text-left space-y-3 shadow-xs max-w-lg mx-auto">
              <div className="flex justify-between text-xs pb-2 border-b border-[#F2ECE3]">
                <span className="text-[#786D62]">Reservation Code:</span>
                <span className="font-mono font-bold text-sm text-[#1F1C19]">
                  #{confirmedReservation.code}
                </span>
              </div>
              <div className="flex justify-between text-xs pb-2 border-b border-[#F2ECE3]">
                <span className="text-[#786D62]">Date & Time:</span>
                <span className="font-semibold text-[#1F1C19]">
                  {confirmedReservation.date} at {confirmedReservation.time}
                </span>
              </div>
              <div className="flex justify-between text-xs pb-2 border-b border-[#F2ECE3]">
                <span className="text-[#786D62]">Party Size:</span>
                <span className="font-semibold text-[#1F1C19]">
                  {confirmedReservation.guests} {confirmedReservation.guests === 1 ? 'Guest' : 'Guests'}
                </span>
              </div>
              <div className="flex justify-between text-xs pb-2 border-b border-[#F2ECE3]">
                <span className="text-[#786D62]">Atmosphere Space:</span>
                <span className="font-semibold text-[#8A633F]">
                  {confirmedReservation.seatingArea}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#786D62]">Location:</span>
                <span className="text-[#1F1C19]">418 Elmwood Blvd, Historic Arts Quarter</span>
              </div>
            </div>

            <p className="text-xs text-[#7A6F64] italic">
              Tables are held for 15 minutes past reservation time. Free cancellations up to 2 hours prior.
            </p>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="w-full sm:w-auto px-8 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#1F1C19] hover:bg-[#38322D] rounded-lg transition-colors"
            >
              Done & Return to Cafe
            </button>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Date and Guests Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#352D26] mb-2">
                  Select Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    min={today}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DDD3C4] rounded-lg text-[#201D1A] focus:outline-none focus:ring-1 focus:ring-[#201D1A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#352D26] mb-2">
                  Number of Guests
                </label>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {[1, 2, 3, 4, 5, 6, 8].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuests(num)}
                      className={`flex-1 py-2 text-xs font-medium rounded-lg border text-center transition-all ${
                        guests === num
                          ? 'bg-[#201D1A] text-white border-[#201D1A] shadow-xs'
                          : 'bg-white text-[#5C534B] border-[#DDD3C4] hover:bg-[#F2ECE3]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Time Slot Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#352D26] mb-2">
                Available Seating Time
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTime(slot)}
                    className={`py-2 px-1 text-xs font-medium rounded-lg border text-center transition-all ${
                      time === slot
                        ? 'bg-[#201D1A] text-white border-[#201D1A] shadow-xs'
                        : 'bg-white text-[#5C534B] border-[#DDD3C4] hover:bg-[#F2ECE3]'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Seating Area Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#352D26] mb-2">
                Preferred Ambiance & Space
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {seatingOptions.map((area) => (
                  <div
                    key={area.id}
                    onClick={() => setSeatingArea(area.id)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      seatingArea === area.id
                        ? 'bg-white border-[#201D1A] ring-1 ring-[#201D1A] shadow-xs'
                        : 'bg-white/80 border-[#E0D7C9] hover:border-[#B5A898]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#1F1C19]">{area.label}</span>
                      <input
                        type="radio"
                        checked={seatingArea === area.id}
                        onChange={() => setSeatingArea(area.id)}
                        className="accent-[#201D1A]"
                      />
                    </div>
                    <p className="text-[11px] text-[#71665C] mt-1 leading-normal">
                      {area.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="pt-2 border-t border-[#ECE4D8] space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#352D26]">
                Guest Contact Details
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DDD3C4] rounded-lg text-[#201D1A] focus:outline-none focus:ring-1 focus:ring-[#201D1A]"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DDD3C4] rounded-lg text-[#201D1A] focus:outline-none focus:ring-1 focus:ring-[#201D1A]"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Phone *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DDD3C4] rounded-lg text-[#201D1A] focus:outline-none focus:ring-1 focus:ring-[#201D1A]"
                  />
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Special requests (anniversary, quiet corner, high chair, wheelchair accessibility)..."
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DDD3C4] rounded-lg text-[#201D1A] focus:outline-none focus:ring-1 focus:ring-[#201D1A]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-white bg-[#1F1C19] hover:bg-[#38322D] rounded-lg transition-all shadow-sm active:scale-[0.98]"
              >
                Confirm Table Reservation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

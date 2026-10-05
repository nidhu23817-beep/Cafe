import React, { useState } from 'react';
import { Star, CheckCircle2, MessageSquarePlus, Heart } from 'lucide-react';
import { Review } from '../types/cafe';

interface ReviewsAndCommunityProps {
  initialReviews: Review[];
}

export const ReviewsAndCommunity: React.FC<ReviewsAndCommunityProps> = ({
  initialReviews,
}) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [drinkChoice, setDrinkChoice] = useState('');
  const [comment, setComment] = useState('');
  const [submittedThanks, setSubmittedThanks] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    const newRev: Review = {
      id: 'rev-' + Date.now(),
      name,
      rating,
      date: 'Just now',
      comment,
      drinkChoice: drinkChoice || 'Atelier Flat White',
      verified: true,
    };

    setReviews([newRev, ...reviews]);
    setSubmittedThanks(true);
    setName('');
    setComment('');
    setDrinkChoice('');
    setTimeout(() => {
      setSubmittedThanks(false);
      setShowAddForm(false);
    }, 2200);
  };

  return (
    <section className="py-16 md:py-24 border-b border-[#EFEBE4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#7C6E61] font-medium">
              <span>Community & Guest Notes</span>
              <span aria-hidden="true">·</span>
              <span>4.9 / 5.0 Average Rating</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-title font-medium text-[#1E1916]">
              Words from Our Tables
            </h2>
            <p className="text-sm text-[#5E544A] leading-relaxed">
              Read impressions from morning regulars, travelers, and coffee connoisseurs who visit our roastery and hearth.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#1F1C19] bg-white border border-[#DDD3C4] hover:bg-[#F2ECE3] rounded-lg transition-colors whitespace-nowrap self-start md:self-auto"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#785E48]" />
            <span>{showAddForm ? 'Close Form' : 'Leave a Guest Note'}</span>
          </button>
        </div>

        {/* Add Review Form Dropdown */}
        {showAddForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-[#DDD3C4] rounded-2xl p-6 sm:p-8 shadow-sm space-y-4 max-w-2xl animate-in fade-in duration-200"
          >
            <h3 className="text-lg font-serif-title font-medium text-[#1F1C19]">
              Share Your Experience at Atelier Moka
            </h3>
            
            {submittedThanks ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Thank you! Your note has been posted to our guest community board.</span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#6E645A]">Rating:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="text-[#C8924B] hover:scale-110 transition-transform p-0.5"
                      >
                        <Star
                          className={`w-4 h-4 ${star <= rating ? 'fill-[#C8924B]' : 'text-[#D7CABA]'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD3C4] rounded-lg text-[#201D1A]"
                  />
                  <input
                    type="text"
                    placeholder="Favorite Order (e.g. Geisha Pour-Over)"
                    value={drinkChoice}
                    onChange={(e) => setDrinkChoice(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD3C4] rounded-lg text-[#201D1A]"
                  />
                </div>

                <textarea
                  required
                  rows={3}
                  placeholder="Tell us about the extraction, pastry, ambiance, or hospitality..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD3C4] rounded-lg text-[#201D1A]"
                />

                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1F1C19] hover:bg-[#38322D] rounded-lg transition-colors"
                >
                  Submit Guest Note
                </button>
              </>
            )}
          </form>
        )}

        {/* Reviews Cards: 3-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-[#E3DACB] p-6 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Rating stars & verified tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#C8924B]">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C8924B]" />
                    ))}
                  </div>
                  {/* Clean unboxed text metadata */}
                  <span className="text-[11px] font-mono text-[#84796D]">
                    {rev.date}
                  </span>
                </div>

                {/* Comment quote */}
                <p className="text-xs sm:text-sm text-[#574E45] leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Order context */}
              <div className="pt-3 border-t border-[#F2ECE3] space-y-0.5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-[#1F1C19]">{rev.name}</p>
                  {rev.verified && (
                    <span className="text-[11px] text-[#78614E] flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Verified Visit
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#85786B]">
                  Favorite: {rev.drinkChoice}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

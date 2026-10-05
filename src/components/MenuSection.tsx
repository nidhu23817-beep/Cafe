import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Plus, Sparkles, Check } from 'lucide-react';
import { MenuItem } from '../types/cafe';

interface MenuSectionProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  onSelectItem,
  onQuickAdd,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Offerings' },
    { id: 'brews', label: 'Specialty Brews' },
    { id: 'espresso', label: 'Espresso Bar' },
    { id: 'bakery', label: 'Hearth Bakery' },
    { id: 'brunch', label: 'All-Day Brunch' },
  ];

  const dietaryTags = [
    { id: 'all', label: 'All Diets' },
    { id: 'Single-Origin', label: 'Single-Origin' },
    { id: 'Organic', label: 'Organic' },
    { id: 'Vegan', label: 'Vegan' },
  ];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchDietary =
        dietaryFilter === 'all' ||
        (item.dietary && item.dietary.includes(dietaryFilter as any));
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.origin && item.origin.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.tastingNotes && item.tastingNotes.some(n => n.toLowerCase().includes(searchQuery.toLowerCase())));

      return matchCategory && matchDietary && matchSearch;
    });
  }, [items, selectedCategory, dietaryFilter, searchQuery]);

  const handleQuickAddClick = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    onQuickAdd(item);
    setAddedItemNotice(item.id);
    setTimeout(() => {
      setAddedItemNotice((prev) => (prev === item.id ? null : prev));
    }, 1800);
  };

  return (
    <section id="menu" className="py-16 md:py-24 border-b border-[#EFEBE4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#786D62] font-medium">
              <span>Seasonal Autumn 2026 Collection</span>
              <span aria-hidden="true">·</span>
              <span>Daily Harvest Batch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-title font-medium text-[#1E1A17]">
              Curated Menu & Daily Hearth
            </h2>
            <p className="text-sm sm:text-base text-[#61574E] leading-relaxed">
              Every bean is freshly dialed in each morning. Our sourdough pastries and brioche are baked continuously on our natural stone hearth.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#8C8074] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search flavor, origin, beans..."
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-white border border-[#DDD3C4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#201D1A] text-[#201D1A]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C8074] hover:text-[#201D1A]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls: Functional Segmented Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ECE4D8] pb-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#EFE9DF] rounded-lg overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[#1F1C19] text-[#FAF8F5] shadow-xs'
                    : 'text-[#63594F] hover:text-[#1F1C19]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Dietary Filter Buttons */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#84786B] font-medium hidden sm:inline">Preferences:</span>
            <div className="flex items-center gap-1">
              {dietaryTags.map((diet) => (
                <button
                  key={diet.id}
                  type="button"
                  onClick={() => setDietaryFilter(diet.id)}
                  className={`px-2.5 py-1 text-xs rounded border transition-colors whitespace-nowrap ${
                    dietaryFilter === diet.id
                      ? 'bg-[#E3D9CC] text-[#1F1C19] border-[#C3B5A2] font-semibold'
                      : 'bg-white/60 text-[#6B6156] border-[#E2D8CB] hover:bg-white'
                  }`}
                >
                  {diet.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Cards Grid: 3-column desktop layout with generous whitespace */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#F6F2EB] rounded-2xl border border-[#E5DDCF] space-y-3">
            <p className="font-serif-title text-xl text-[#3A322B]">No offerings found</p>
            <p className="text-xs text-[#7A6F62] max-w-sm mx-auto">
              We couldn't find items matching your search or filters. Try adjusting your preferences.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setDietaryFilter('all');
                setSearchQuery('');
              }}
              className="mt-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#1F1C19] rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
              const isAdded = addedItemNotice === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className="group bg-white rounded-2xl border border-[#E3DACB] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-0.5"
                >
                  {/* Lead with Imagery (65%-75% of card visual weight) */}
                  <div className="relative aspect-[4/3] bg-[#EFE9DF] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Subtle gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

                    {/* Quick Add overlay button */}
                    <button
                      type="button"
                      onClick={(e) => handleQuickAddClick(e, item)}
                      aria-label={`Quick add ${item.name}`}
                      className={`absolute bottom-3 right-3 p-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 text-xs font-semibold ${
                        isAdded
                          ? 'bg-emerald-700 text-white'
                          : 'bg-white/95 text-[#201D1A] hover:bg-white hover:scale-105'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Add</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      {/* Clean Unboxed Metadata: Category & Tag with dot separator */}
                      <div className="flex items-center gap-2 text-xs text-[#7D7164] uppercase tracking-wider font-mono">
                        <span>{item.categoryLabel}</span>
                        {item.origin && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="truncate max-w-[170px]">{item.origin}</span>
                          </>
                        )}
                      </div>

                      {/* Product Name */}
                      <h3 className="text-lg font-serif-title font-medium text-[#1E1916] leading-snug group-hover:text-[#785E48] transition-colors">
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-[#5E554C] leading-relaxed line-clamp-2">
                        {item.description}
                      </p>

                      {/* Tasting Notes as unboxed text */}
                      {item.tastingNotes && item.tastingNotes.length > 0 && (
                        <div className="text-[11px] text-[#85796D] pt-1">
                          <span className="text-[#352D25] font-medium">Notes: </span>
                          <span>{item.tastingNotes.join(' · ')}</span>
                        </div>
                      )}
                    </div>

                    {/* Price and Action Row */}
                    <div className="pt-3 border-t border-[#F2ECE3] flex items-center justify-between">
                      <div>
                        <span className="text-sm font-semibold font-mono tabular-nums text-[#1F1C19]">
                          ${item.price.toFixed(2)}
                        </span>
                        {item.calories && (
                          <span className="text-[11px] text-[#93877A] ml-2 font-mono">
                            {item.calories}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectItem(item);
                        }}
                        className="text-xs font-semibold uppercase tracking-wider text-[#785E48] hover:text-[#201D1A] transition-colors"
                      >
                        {item.customizable ? 'Customize & Add →' : 'Quick View →'}
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

"use client";

import { useMemo } from "react";
import { Baker, Category, FilterState } from "@/lib/types";
import { filterBakers } from "@/lib/nlpSearch";
import { BakerCard } from "./BakerCard";

type BakerDiscoveryProps = {
  allBakers: Baker[];
  categories: Category[];
  areas: string[];
  filters: FilterState;
  onFiltersChange: (newFilters: FilterState) => void;
  onSelectBaker: (baker: Baker) => void;
};

const SAMPLE_NLP_QUERIES = [
  "Chocolate cake in Bandra under ₹2000",
  "Eggless brownies in Andheri",
  "Basque cheesecake in Powai",
  "Vegan cupcakes in Khar",
  "Wedding cake in Juhu",
];

export function BakerDiscovery({
  allBakers,
  categories,
  areas,
  filters,
  onFiltersChange,
  onSelectBaker,
}: BakerDiscoveryProps) {
  // Compute filtered bakers and any NLP extracted entities
  const { filtered, nlpParsed } = useMemo(() => {
    return filterBakers(allBakers, filters);
  }, [allBakers, filters]);

  function handleSearchChange(val: string) {
    onFiltersChange({
      ...filters,
      searchQuery: val,
    });
  }

  function handleCategoryChange(categoryName: string) {
    onFiltersChange({
      ...filters,
      selectedCategory: categoryName === filters.selectedCategory ? "all" : categoryName,
    });
  }

  function handleAreaChange(area: string) {
    onFiltersChange({
      ...filters,
      selectedArea: area,
    });
  }

  function handlePriceChange(priceRange: string) {
    onFiltersChange({
      ...filters,
      priceRange,
    });
  }

  function handleRatingChange(minRating: number) {
    onFiltersChange({
      ...filters,
      minRating: minRating === filters.minRating ? 0 : minRating,
    });
  }

  function handleDietaryChange(dietary: string) {
    onFiltersChange({
      ...filters,
      dietary: dietary === filters.dietary ? "all" : dietary,
    });
  }

  function handleSortChange(
    sortBy: "featured" | "rating" | "reviews" | "price-asc" | "price-desc"
  ) {
    onFiltersChange({
      ...filters,
      sortBy,
    });
  }

  function handleResetFilters() {
    onFiltersChange({
      searchQuery: "",
      selectedCategory: "all",
      selectedArea: "all",
      priceRange: "all",
      minRating: 0,
      dietary: "all",
      sortBy: "featured",
    });
  }

  const hasActiveFilters =
    filters.searchQuery !== "" ||
    filters.selectedCategory !== "all" ||
    (filters.selectedArea !== "all" && filters.selectedArea !== "All Areas") ||
    filters.priceRange !== "all" ||
    filters.minRating > 0 ||
    filters.dietary !== "all";

  return (
    <section id="bakers" className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.26em] text-[#2b2118]/45">
            Artisanal Home Bakers
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl mt-2 tracking-tight">
            Meet the bakers behind the magic.
          </h2>
          <p className="mt-3 text-base text-[#2b2118]/65 max-w-2xl leading-relaxed">
            Discover verified independent home bakers across Mumbai, specializing in handcrafted
            celebration cakes, French pastries, and artisanal confections.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-wider text-[#2b2118]/50">
            Showing <strong className="text-[#2b2118] font-semibold">{filtered.length}</strong> of{" "}
            {allBakers.length} bakers
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-[#6b4a32] underline hover:text-[#2b2118] font-medium"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Interactive Search & Filter Controls */}
      <div className="bg-[#faf6ef] rounded-[2rem] p-5 sm:p-7 shadow-[0_12px_40px_rgba(43,33,24,0.06)] ring-1 ring-[#2b2118]/8 mb-12 space-y-6">
        {/* Main Search Bar */}
        <div className="relative flex items-center bg-[#f6f1e8] rounded-full px-5 py-3 ring-1 ring-[#2b2118]/10 focus-within:ring-2 focus-within:ring-[#6b4a32]/50 transition-all">
          <span className="text-lg mr-3 text-[#2b2118]/40">🔍</span>
          <input
            type="search"
            value={filters.searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by baker name, dessert, or try natural language like 'Chocolate cake in Bandra under ₹2000'..."
            className="w-full bg-transparent text-sm sm:text-base outline-none placeholder:text-[#2b2118]/40"
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => handleSearchChange("")}
              className="text-xs uppercase tracking-wider text-[#2b2118]/50 hover:text-[#2b2118] ml-2"
            >
              Clear
            </button>
          )}
        </div>

        {/* NLP Extraction Display Banner (Requirement 8) */}
        {nlpParsed && nlpParsed.confidence > 0.3 && (
          <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-[#c4a574]/15 border border-[#c4a574]/30 text-xs text-[#2b2118]">
            <span className="font-semibold text-[#6b4a32] flex items-center gap-1">
              ✨ NLP Understood Query:
            </span>
            {nlpParsed.location && (
              <span className="rounded-full bg-[#f6f1e8] px-2.5 py-1 text-[#2b2118] font-medium border border-[#2b2118]/10">
                📍 Location: {nlpParsed.location}
              </span>
            )}
            {nlpParsed.category && (
              <span className="rounded-full bg-[#f6f1e8] px-2.5 py-1 text-[#2b2118] font-medium border border-[#2b2118]/10">
                🍰 Category: {nlpParsed.category}
              </span>
            )}
            {nlpParsed.maxBudget && (
              <span className="rounded-full bg-[#f6f1e8] px-2.5 py-1 text-[#2b2118] font-medium border border-[#2b2118]/10">
                🏷️ Max Budget: ₹{nlpParsed.maxBudget}
              </span>
            )}
            {nlpParsed.dietaryPreferences.length > 0 && (
              <span className="rounded-full bg-[#f6f1e8] px-2.5 py-1 text-[#2b2118] font-medium border border-[#2b2118]/10">
                🌿 Dietary: {nlpParsed.dietaryPreferences.join(", ")}
              </span>
            )}
            <button
              type="button"
              onClick={() => handleSearchChange("")}
              className="ml-auto text-[11px] underline text-[#6b4a32] hover:text-[#2b2118]"
            >
              Clear NLP query
            </button>
          </div>
        )}

        {/* NLP Sample Suggestion Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="shrink-0 text-[#2b2118]/45 font-medium">Try:</span>
          {SAMPLE_NLP_QUERIES.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => handleSearchChange(q)}
              className="shrink-0 rounded-full bg-[#f6f1e8] px-3 py-1 text-[#2b2118]/70 border border-[#2b2118]/8 hover:border-[#6b4a32] hover:text-[#2b2118] transition-colors"
            >
              &ldquo;{q}&rdquo;
            </button>
          ))}
        </div>

        {/* Category Horizontal Filter Pills */}
        <div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button
              type="button"
              onClick={() => handleCategoryChange("all")}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                filters.selectedCategory === "all"
                  ? "bg-[#2b2118] text-[#f6f1e8] shadow-sm"
                  : "bg-[#f6f1e8] text-[#2b2118]/70 hover:bg-[#2b2118]/10"
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() => handleCategoryChange(cat.name)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  filters.selectedCategory === cat.name
                    ? "bg-[#2b2118] text-[#f6f1e8] shadow-sm"
                    : "bg-[#f6f1e8] text-[#2b2118]/70 hover:bg-[#2b2118]/10"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Facet Filter Dropdowns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-3 border-t border-[#2b2118]/8 text-xs">
          {/* Mumbai Area Filter */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#2b2118]/50 font-medium mb-1">
              Mumbai Area
            </label>
            <select
              value={filters.selectedArea}
              onChange={(e) => handleAreaChange(e.target.value)}
              className="w-full rounded-xl bg-[#f6f1e8] px-3 py-2.5 border border-[#2b2118]/10 outline-none text-[#2b2118]"
            >
              <option value="all">All Mumbai</option>
              {areas
                .filter((a) => a !== "All Areas")
                .map((area) => (
                  <option key={area} value={area}>
                    📍 {area}
                  </option>
                ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#2b2118]/50 font-medium mb-1">
              Budget / Price Tier
            </label>
            <select
              value={filters.priceRange}
              onChange={(e) => handlePriceChange(e.target.value)}
              className="w-full rounded-xl bg-[#f6f1e8] px-3 py-2.5 border border-[#2b2118]/10 outline-none text-[#2b2118]"
            >
              <option value="all">All Prices</option>
              <option value="under-1000">Under ₹1,000</option>
              <option value="1000-2500">₹1,000 – ₹2,500</option>
              <option value="2500-5000">₹2,500 – ₹5,000</option>
              <option value="above-5000">Luxury (₹5,000+)</option>
            </select>
          </div>

          {/* Dietary Filter */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#2b2118]/50 font-medium mb-1">
              Dietary Preference
            </label>
            <select
              value={filters.dietary}
              onChange={(e) => handleDietaryChange(e.target.value)}
              className="w-full rounded-xl bg-[#f6f1e8] px-3 py-2.5 border border-[#2b2118]/10 outline-none text-[#2b2118]"
            >
              <option value="all">All Kitchens</option>
              <option value="eggless">🌿 100% Eggless</option>
              <option value="vegan">🌱 Vegan Friendly</option>
              <option value="gluten-free">🌾 Gluten-Free</option>
            </select>
          </div>

          {/* Minimum Rating */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#2b2118]/50 font-medium mb-1">
              Minimum Rating
            </label>
            <select
              value={filters.minRating}
              onChange={(e) => handleRatingChange(Number(e.target.value))}
              className="w-full rounded-xl bg-[#f6f1e8] px-3 py-2.5 border border-[#2b2118]/10 outline-none text-[#2b2118]"
            >
              <option value={0}>Any Rating</option>
              <option value={4.7}>★ 4.7 & above</option>
              <option value={4.8}>★ 4.8 & above</option>
              <option value={4.9}>★ 4.9 & above (Elite)</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#2b2118]/50 font-medium mb-1">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                handleSortChange(
                  e.target.value as "featured" | "rating" | "reviews" | "price-asc" | "price-desc"
                )
              }
              className="w-full rounded-xl bg-[#f6f1e8] px-3 py-2.5 border border-[#2b2118]/10 outline-none text-[#2b2118]"
            >
              <option value="featured">Featured Curations</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bakers Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filtered.map((baker) => (
            <BakerCard
              key={baker.id}
              baker={baker}
              onViewDetails={onSelectBaker}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-[#faf6ef] rounded-[2rem] border border-[#2b2118]/8">
          <span className="text-4xl">🍰</span>
          <h3 className="font-serif text-2xl mt-4">No bakers found matching your edit</h3>
          <p className="text-sm text-[#2b2118]/65 mt-2 max-w-md mx-auto">
            Try adjusting your search terms, clearing specific filters, or searching for other
            neighbourhoods in Mumbai.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-6 rounded-full bg-[#2b2118] px-6 py-2.5 text-xs uppercase tracking-wider font-medium text-[#f6f1e8] hover:bg-[#3a2c22] transition-colors"
          >
            Reset all filters
          </button>
        </div>
      )}
    </section>
  );
}

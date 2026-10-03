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
  const { filtered, nlpParsed } = useMemo(() => {
    return filterBakers(allBakers || [], filters);
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
      selectedCategory:
        categoryName === filters.selectedCategory ? "all" : categoryName,
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
    Boolean(filters?.searchQuery) ||
    (Boolean(filters?.selectedCategory) && filters.selectedCategory !== "all") ||
    (Boolean(filters?.selectedArea) &&
      filters.selectedArea !== "all" &&
      filters.selectedArea !== "All Areas") ||
    (Boolean(filters?.priceRange) && filters.priceRange !== "all") ||
    Number(filters?.minRating ?? 0) > 0 ||
    (Boolean(filters?.dietary) && filters.dietary !== "all");

  return (
    <section
      id="bakers"
      className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24"
    >
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-[#b3874b]" />
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#6b4a32] font-medium">
              Curated Directory
            </p>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight text-[#2b2118]">
            Meet the bakers
            <br className="hidden sm:block" /> behind the magic.
          </h2>

          <p className="mt-3.5 text-sm sm:text-base text-[#2b2118]/70 max-w-2xl leading-relaxed">
            Discover Mumbai&apos;s independent home bakers, selected for their
            craft, creativity, and exceptional desserts.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="rounded-full bg-white px-4 py-2 ring-1 ring-[#2b2118]/8 shadow-xs">
            <span className="text-xs text-[#2b2118]/60">
              Showing{" "}
              <strong className="text-[#2b2118] font-semibold">
                {filtered?.length ?? 0}
              </strong>{" "}
              of {allBakers?.length ?? 0} bakers
            </span>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-medium text-[#6b4a32] hover:text-[#2b2118] underline underline-offset-4 transition cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Concierge Search & Filter Console */}
      <div className="bg-[#f4eee3]/70 rounded-[2rem] p-5 sm:p-7 shadow-[0_12px_36px_rgba(43,33,24,0.05)] ring-1 ring-[#2b2118]/8 mb-12">
        {/* Search Input */}
        <div className="flex items-center bg-white rounded-2xl sm:rounded-full px-4 sm:px-5 py-3.5 ring-1 ring-[#2b2118]/10 shadow-xs focus-within:ring-2 focus-within:ring-[#6b4a32]/30 transition-all">
          <span className="text-base mr-3 text-[#6b4a32]/60 select-none">
            🔍
          </span>

          <input
            type="search"
            value={filters?.searchQuery ?? ""}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search bakers, signature cakes, flavours, or try natural search..."
            className="w-full bg-transparent text-sm sm:text-base outline-none text-[#2b2118] placeholder:text-[#2b2118]/40"
          />

          {Boolean(filters?.searchQuery) && (
            <button
              type="button"
              onClick={() => handleSearchChange("")}
              className="shrink-0 ml-2 rounded-full px-3 py-1 text-[11px] uppercase tracking-wider text-[#2b2118]/60 hover:bg-[#2b2118]/8 hover:text-[#2b2118] transition cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* NLP Smart Search Detection Banner */}
        {nlpParsed && nlpParsed.confidence > 0.3 && (
          <div className="mt-4 rounded-2xl bg-[#b3874b]/12 border border-[#b3874b]/30 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#6b4a32]">
                ✨ Smart search
              </span>

              {nlpParsed.location && (
                <span className="rounded-full bg-white px-3 py-1 text-[11px] text-[#2b2118] ring-1 ring-[#2b2118]/8 shadow-xs">
                  📍 {nlpParsed.location}
                </span>
              )}

              {nlpParsed.category && (
                <span className="rounded-full bg-white px-3 py-1 text-[11px] text-[#2b2118] ring-1 ring-[#2b2118]/8 shadow-xs">
                  🍰 {nlpParsed.category}
                </span>
              )}

              {nlpParsed.maxBudget && (
                <span className="rounded-full bg-white px-3 py-1 text-[11px] text-[#2b2118] ring-1 ring-[#2b2118]/8 shadow-xs">
                  ₹{nlpParsed.maxBudget} max
                </span>
              )}

              {nlpParsed.dietaryPreferences.length > 0 && (
                <span className="rounded-full bg-white px-3 py-1 text-[11px] text-[#2b2118] ring-1 ring-[#2b2118]/8 shadow-xs">
                  🌿 {nlpParsed.dietaryPreferences.join(", ")}
                </span>
              )}

              <button
                type="button"
                onClick={() => handleSearchChange("")}
                className="ml-auto text-[11px] font-medium text-[#6b4a32] hover:text-[#2b2118] underline underline-offset-4 cursor-pointer"
              >
                Reset query
              </button>
            </div>
          </div>
        )}

        {/* Sample NLP Prompts */}
        <div className="mt-4.5 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="shrink-0 text-xs text-[#2b2118]/45 font-medium mr-1">
            Try:
          </span>

          {SAMPLE_NLP_QUERIES.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => handleSearchChange(q)}
              className="shrink-0 rounded-full bg-white/80 px-3.5 py-1.5 text-xs text-[#2b2118]/70 ring-1 ring-[#2b2118]/8 hover:ring-[#6b4a32]/40 hover:text-[#2b2118] hover:bg-white transition cursor-pointer shadow-xs"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Category Horizontal Pills */}
        <div className="mt-6 pt-5 border-t border-[#2b2118]/8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar">
            <button
              type="button"
              onClick={() => handleCategoryChange("all")}
              className={`shrink-0 rounded-full px-4 py-2 text-xs uppercase tracking-wider font-medium transition cursor-pointer shadow-xs ${
                filters.selectedCategory === "all"
                  ? "bg-[#2b2118] text-[#faf7f2]"
                  : "bg-white text-[#2b2118]/70 ring-1 ring-[#2b2118]/10 hover:bg-[#2b2118]/5 hover:text-[#2b2118]"
              }`}
            >
              All Categories
            </button>

            {categories.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() => handleCategoryChange(cat.name)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs uppercase tracking-wider font-medium transition cursor-pointer shadow-xs ${
                  filters.selectedCategory === cat.name
                    ? "bg-[#2b2118] text-[#faf7f2]"
                    : "bg-white text-[#2b2118]/70 ring-1 ring-[#2b2118]/10 hover:bg-[#2b2118]/5 hover:text-[#2b2118]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Dropdown Filters Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#2b2118]/50 font-semibold mb-2">
              Mumbai Area
            </label>

            <select
              value={filters.selectedArea}
              onChange={(e) => handleAreaChange(e.target.value)}
              className="w-full rounded-xl bg-white px-3.5 py-3 border border-[#2b2118]/10 outline-none text-xs text-[#2b2118] font-medium shadow-xs focus:ring-2 focus:ring-[#6b4a32]/25 cursor-pointer"
            >
              <option value="all">📍 All Mumbai</option>
              {(areas || [])
                .filter((a) => a !== "All Areas")
                .map((area) => (
                  <option key={area} value={area}>
                    📍 {area}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#2b2118]/50 font-semibold mb-2">
              Price Range
            </label>

            <select
              value={filters.priceRange}
              onChange={(e) => handlePriceChange(e.target.value)}
              className="w-full rounded-xl bg-white px-3.5 py-3 border border-[#2b2118]/10 outline-none text-xs text-[#2b2118] font-medium shadow-xs focus:ring-2 focus:ring-[#6b4a32]/25 cursor-pointer"
            >
              <option value="all">All Prices</option>
              <option value="under-1000">Under ₹1,000</option>
              <option value="1000-2500">₹1,000 – ₹2,500</option>
              <option value="2500-5000">₹2,500 – ₹5,000</option>
              <option value="above-5000">Luxury ₹5,000+</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#2b2118]/50 font-semibold mb-2">
              Dietary Preference
            </label>

            <select
              value={filters.dietary}
              onChange={(e) => handleDietaryChange(e.target.value)}
              className="w-full rounded-xl bg-white px-3.5 py-3 border border-[#2b2118]/10 outline-none text-xs text-[#2b2118] font-medium shadow-xs focus:ring-2 focus:ring-[#6b4a32]/25 cursor-pointer"
            >
              <option value="all">All Kitchens</option>
              <option value="eggless">🌿 100% Eggless</option>
              <option value="vegan">🌱 Vegan Friendly</option>
              <option value="gluten-free">🌾 Gluten-Free</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#2b2118]/50 font-semibold mb-2">
              Minimum Rating
            </label>

            <select
              value={filters.minRating}
              onChange={(e) => handleRatingChange(Number(e.target.value))}
              className="w-full rounded-xl bg-white px-3.5 py-3 border border-[#2b2118]/10 outline-none text-xs text-[#2b2118] font-medium shadow-xs focus:ring-2 focus:ring-[#6b4a32]/25 cursor-pointer"
            >
              <option value={0}>Any Rating</option>
              <option value={4.7}>★ 4.7 & above</option>
              <option value={4.8}>★ 4.8 & above</option>
              <option value={4.9}>★ 4.9+ Elite</option>
            </select>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#2b2118]/50 font-semibold mb-2">
              Sort By
            </label>

            <select
              value={filters.sortBy}
              onChange={(e) =>
                handleSortChange(
                  e.target.value as
                  | "featured"
                  | "rating"
                  | "reviews"
                  | "price-asc"
                  | "price-desc"
                )
              }
              className="w-full rounded-xl bg-white px-3.5 py-3 border border-[#2b2118]/10 outline-none text-xs text-[#2b2118] font-medium shadow-xs focus:ring-2 focus:ring-[#6b4a32]/25 cursor-pointer"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
          {filtered.map((baker) => (
            <BakerCard
              key={baker.id}
              baker={baker}
              onViewDetails={onSelectBaker}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 px-6 bg-white rounded-[2rem] ring-1 ring-[#2b2118]/8 shadow-xs">
          <div className="mx-auto w-16 h-16 rounded-full bg-[#f4eee3] flex items-center justify-center text-3xl">
            🍰
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl mt-5 text-[#2b2118]">
            No bakers match your criteria.
          </h3>

          <p className="text-sm text-[#2b2118]/60 mt-2.5 max-w-md mx-auto leading-relaxed">
            Try adjusting your search terms, neighbourhood selection, or price range
            to explore more independent kitchens across Mumbai.
          </p>

          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-7 rounded-full bg-[#2b2118] px-7 py-3.5 text-xs uppercase tracking-wider font-medium text-[#faf7f2] hover:bg-[#3e2f23] transition cursor-pointer shadow-md"
          >
            Reset all filters
          </button>
        </div>
      )}
    </section>
  );
}
"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CategoryCard } from "@/components/CategoryCard";
import { OccasionCard } from "@/components/OccasionCard";
import { SectionHeading } from "@/components/SectionHeading";
import { ForBakers } from "@/components/ForBakers";
import { Footer } from "@/components/Footer";
import { BakerDiscovery } from "@/components/BakerDiscovery";
import { BakerModal } from "@/components/BakerModal";
import { JoinBakerModal } from "@/components/JoinBakerModal";
import { getBakers, getLocalBakers, getLocalCategories, getLocalAreas, getCategories, getAreas, getOccasions } from "@/lib/dataService";
import { Baker, Category, FilterState, Occasion } from "@/lib/types";

export default function Home() {
  const [bakersList, setBakersList] = useState<Baker[]>(() => getLocalBakers());
  const [categoriesList, setCategoriesList] = useState<Category[]>(() => getLocalCategories());
  const [occasionsList] = useState<Occasion[]>(() => getOccasions());
  const [areasList, setAreasList] = useState<string[]>(() => getLocalAreas());

  const [selectedBaker, setSelectedBaker] = useState<Baker | null>(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    selectedCategory: "all",
    selectedArea: "all",
    priceRange: "all",
    minRating: 0,
    dietary: "all",
    sortBy: "featured",
  });

  useEffect(() => {
    let isMounted = true;

    // Load all dynamic data from Supabase in parallel, with local fallbacks
    Promise.all([
      getBakers(),
      getCategories(),
      getAreas(),
    ]).then(([bakersData, categoriesData, areasData]) => {
      if (!isMounted) return;
      if (bakersData) setBakersList(bakersData);
      if (categoriesData) setCategoriesList(categoriesData);
      if (areasData) setAreasList(areasData);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  function handleHeroSearch(query: string, location?: string) {
    setFilters((prev) => ({
      ...prev,
      searchQuery: query,
      selectedArea: location && location !== "all" ? location : prev.selectedArea,
    }));
  }

  function handleCategorySelect(categoryName: string) {
    setFilters((prev) => ({
      ...prev,
      selectedCategory: categoryName,
      searchQuery: "",
    }));
    const element = document.getElementById("bakers");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  function handleOccasionSelect(occasionName: string) {
    const occ = occasionsList.find((o) => o.name === occasionName);
    const targetCategory = occ?.categorySlug
      ? categoriesList.find((c) => c.slug === occ.categorySlug)?.name || occasionName
      : occasionName;

    setFilters((prev) => ({
      ...prev,
      selectedCategory: targetCategory,
      searchQuery: "",
    }));
    const element = document.getElementById("bakers");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div id="top" className="min-h-screen bg-[#faf7f2] text-[#2b2118] selection:bg-[#2b2118] selection:text-[#faf7f2]">
      {/* Navigation */}
      <Navbar onOpenJoinModal={() => setIsJoinModalOpen(true)} />

      <main>
        {/* 1. HERO SECTION */}
        <Hero
          areas={areasList}
          onSearchSubmit={handleHeroSearch}
        />

        {/* 2. DESSERT CATEGORIES SECTION */}
        <section
          id="categories"
          className="border-y border-[#2b2118]/8 bg-[#f4eee3]/50"
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
            <SectionHeading
              kicker="Dessert Categories"
              title="Find something you'll love."
              description="A considered edit of celebration cakes, cookies, pastries, and artisanal dessert boxes from independent kitchens across Mumbai."
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-6">
              {categoriesList.map((category) => (
                <CategoryCard
                  key={category.name}
                  name={category.name}
                  image={category.image}
                  description={category.description}
                  itemCount={category.itemCount}
                  onSelect={handleCategorySelect}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 3. BAKER DISCOVERY, FILTERS & NLP SEARCH */}
        <BakerDiscovery
          allBakers={bakersList}
          categories={categoriesList}
          areas={areasList}
          filters={filters}
          onFiltersChange={setFilters}
          onSelectBaker={setSelectedBaker}
        />

        {/* 4. OCCASIONS SECTION */}
        <section
          id="occasions"
          className="border-y border-[#2b2118]/8 bg-[#f4eee3]/50"
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
            <SectionHeading
              kicker="Explore by occasion"
              title="Made for the moments that matter."
              description="Whether it's an intimate birthday milestone, an opulent wedding tier, or a weekend gift hamper."
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
              {occasionsList.map((occasion) => (
                <OccasionCard
                  key={occasion.name}
                  name={occasion.name}
                  image={occasion.image}
                  categorySlug={occasion.categorySlug}
                  onSelect={handleOccasionSelect}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 5. FOR BAKERS RECRUITMENT SECTION */}
        <ForBakers onOpenJoinModal={() => setIsJoinModalOpen(true)} />

        {/* 6. EDITORIAL ABOUT SECTION */}
        <section id="about" className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
          <div className="rounded-[2rem] sm:rounded-[2.5rem] bg-[#f4eee3]/60 border border-[#2b2118]/8 p-8 sm:p-14 shadow-xs">
            <SectionHeading kicker="Editorial Story" title="Craft Over Commercial Volume." />
            <div className="grid md:grid-cols-2 gap-8 text-[#2b2118]/75 leading-relaxed text-base sm:text-lg">
              <p>
                The Baker&apos;s Edit is an independent discovery platform founded in Mumbai to celebrate
                craft over commercial volume. In a city dominated by fast-delivery aggregators, Mumbai&apos;s
                most skilled pastry chefs and cake sculptors often operate privately through Instagram,
                by-appointment studios, and private kitchen ateliers.
              </p>
              <p>
                We curate verified home bakers who use premium ingredients — from Madagascar vanilla bean
                and French Valrhona chocolate to cultured butter and organic seasonal produce. Whether you
                need a whimsical wildflower birthday cake or a grand wedding centerpiece, this is your quiet,
                considered edit.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Baker Detail & Signature Menu Modal */}
      <BakerModal
        baker={selectedBaker}
        allBakers={bakersList}
        onClose={() => setSelectedBaker(null)}
        onSelectBaker={setSelectedBaker}
      />

      {/* Join as a Baker Inquiry Modal */}
      <JoinBakerModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </div>
  );
}

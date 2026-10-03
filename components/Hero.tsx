"use client";

import { useState } from "react";
import { heroImage } from "@/data/seedData";
import { RemoteImage } from "./RemoteImage";

type HeroProps = {
  areas: string[];
  onSearchSubmit: (query: string, location?: string) => void;
};

export function Hero({ areas, onSearchSubmit }: HeroProps) {
  const [craving, setCraving] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearchSubmit(craving, selectedLocation);

    const element = document.getElementById("bakers");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  function handleQuickTagClick(tag: string) {
    setCraving(tag);
    onSearchSubmit(tag, selectedLocation);

    const element = document.getElementById("bakers");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section
      id="discover"
      className="max-w-7xl mx-auto px-5 sm:px-8 pt-10 sm:pt-16 lg:pt-20 pb-16 sm:pb-24"
    >
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">

        {/* Left Column: Editorial Headline & Search */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2.5 rounded-full bg-[#f4eee3] px-4 py-1.5 ring-1 ring-[#2b2118]/10 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b3874b] animate-pulse" />
            <p className="uppercase tracking-[0.24em] text-[10px] sm:text-[11px] text-[#2b2118]/70 font-medium">
              Mumbai • Independent Baker Ateliers
            </p>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight mt-6 text-[#2b2118]">
            The Baker&apos;s
            <br />
            <span className="italic font-normal text-[#6b4a32]">
              Edit.
            </span>
          </h1>

          <p className="max-w-xl mt-5 sm:mt-6 text-base sm:text-lg leading-relaxed text-[#2b2118]/75">
            Discover Mumbai&apos;s finest home bakers, bespoke celebration
            cakes, and unforgettable artisanal desserts — all in one curated
            edit.
          </p>

          {/* Concierge Search Capsule */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 bg-white/90 backdrop-blur-sm rounded-3xl sm:rounded-full p-2 sm:p-2.5 shadow-[0_12px_40px_rgba(43,33,24,0.08)] ring-1 ring-[#2b2118]/12 focus-within:ring-2 focus-within:ring-[#6b4a32]/30 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">

              <div className="flex items-center flex-1 min-w-0 px-3 py-1">
                <span className="text-[#6b4a32]/60 text-base mr-2.5 select-none">
                  🔍
                </span>
                <label htmlFor="craving-search" className="sr-only">
                  What are you craving?
                </label>
                <input
                  id="craving-search"
                  type="search"
                  name="q"
                  value={craving}
                  onChange={(e) => setCraving(e.target.value)}
                  placeholder="What are you craving? (e.g. Basque cheesecake, chocolate tier)"
                  className="w-full bg-transparent text-sm sm:text-base outline-none text-[#2b2118] placeholder:text-[#2b2118]/40 py-2 sm:py-2.5"
                />
              </div>

              <div className="flex items-center border-t sm:border-t-0 sm:border-l border-[#2b2118]/10 pt-2 sm:pt-0 sm:pl-3 sm:pr-2">
                <label htmlFor="hero-location" className="sr-only">
                  Location
                </label>
                <select
                  id="hero-location"
                  name="location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full sm:w-auto bg-transparent text-xs sm:text-sm outline-none text-[#2b2118] py-2 sm:py-2.5 px-2 font-medium cursor-pointer"
                >
                  <option value="all">📍 All Mumbai</option>
                  {areas
                    .filter((area) => area !== "All Areas")
                    .map((area) => (
                      <option key={area} value={area}>
                        📍 {area}
                      </option>
                    ))}
                </select>
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 shrink-0 bg-[#2b2118] text-[#faf7f2] rounded-full px-7 py-3.5 text-xs sm:text-sm uppercase tracking-wider font-medium transition-all duration-300 hover:bg-[#3e2f23] hover:scale-[1.01] shadow-md cursor-pointer"
              >
                <span>Explore Bakers</span>
                <span className="text-base leading-none">→</span>
              </button>
            </div>
          </form>

          {/* Editorial Quick Tags */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#2b2118]/50 font-medium mr-1">
              Curated queries:
            </span>

            {[
              { label: "🎂 Custom Cakes", value: "Custom Cakes" },
              { label: "🌿 100% Eggless", value: "Eggless" },
              { label: "🧀 Basque Cheesecake", value: "Cheesecakes" },
              { label: "🍫 Brownies in Bandra", value: "Brownies in Bandra" },
            ].map((tag) => (
              <button
                key={tag.value}
                type="button"
                onClick={() => handleQuickTagClick(tag.value)}
                className="rounded-full border border-[#2b2118]/12 bg-[#faf7f2] px-3.5 py-1.5 text-xs text-[#2b2118]/75 hover:bg-[#2b2118] hover:text-[#faf7f2] hover:border-[#2b2118] transition-all cursor-pointer shadow-xs"
              >
                {tag.label}
              </button>
            ))}
          </div>

          {/* Social Proof / Trust Strip */}
          <div className="mt-8 pt-6 border-t border-[#2b2118]/8 flex flex-wrap items-center gap-6 text-xs text-[#2b2118]/60">
            <div className="flex items-center gap-2">
              <span className="text-[#6b4a32] text-sm">✦</span>
              <span>100% Verified independent kitchens</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#6b4a32] text-sm">✦</span>
              <span>Bespoke orders direct with bakers</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Showcase */}
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] sm:aspect-[4/5] overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_24px_60px_rgba(43,33,24,0.12)] ring-1 ring-[#2b2118]/10 group bg-[#f4eee3]">
            <RemoteImage
              src={heroImage.src}
              alt={heroImage.alt}
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#2b2118]/80 via-[#2b2118]/15 to-transparent" />

            {/* Top editorial pill */}
            <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none">
              <div className="rounded-full bg-[#faf7f2]/95 backdrop-blur-md px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold text-[#2b2118] shadow-sm">
                Curated Selection
              </div>
              <div className="rounded-full bg-[#2b2118]/80 backdrop-blur-md px-3 py-1 text-[11px] text-[#faf7f2] font-medium">
                ★ 4.9 avg rating
              </div>
            </div>

            {/* Bottom caption */}
            <div className="absolute bottom-6 left-6 right-6 text-[#faf7f2]">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#faf7f2]/70 mb-1">
                Artisanal Celebration Tier
              </p>
              <p className="font-serif text-2xl sm:text-3xl leading-tight">
                Worth craving.
              </p>
              <p className="text-xs sm:text-sm text-[#faf7f2]/80 mt-1.5 leading-relaxed">
                Handcrafted small-batch treats by Mumbai&apos;s most talented home bakers.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
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
      className="max-w-7xl mx-auto px-5 sm:px-8 pt-12 sm:pt-20 pb-16 sm:pb-24"
    >
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          {/* Brand Tagline */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#faf6ef] px-3.5 py-1.5 ring-1 ring-[#2b2118]/8">
            <span className="inline-block w-2 h-2 rounded-full bg-[#c4a574]" />
            <p className="uppercase tracking-[0.24em] text-[11px] sm:text-xs text-[#2b2118]/60 font-medium">
              Discover Mumbai&apos;s finest home bakers
            </p>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.06] tracking-tight mt-6">
            The Baker&apos;s Edit
            <br />
            <span className="italic font-normal text-[#6b4a32]">worth craving.</span>
          </h1>

          <p className="max-w-xl mt-6 text-base sm:text-lg leading-relaxed text-[#2b2118]/70">
            A curated editorial discovery platform for independent home bakers, bespoke
            celebration cakes, and unforgettable artisanal desserts across Mumbai.
          </p>

          {/* Search Box */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 sm:mt-10 bg-[#faf6ef] rounded-[1.7rem] sm:rounded-full p-2 shadow-[0_22px_60px_rgba(43,33,24,0.12)] ring-1 ring-[#2b2118]/10 transition-all focus-within:ring-2 focus-within:ring-[#6b4a32]/40"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label htmlFor="craving-search" className="sr-only">
                What are you craving?
              </label>
              <input
                id="craving-search"
                type="search"
                name="q"
                value={craving}
                onChange={(e) => setCraving(e.target.value)}
                placeholder="What are you craving? (e.g. chocolate cake in Bandra)"
                className="flex-1 min-w-0 px-5 py-3.5 outline-none bg-transparent text-sm sm:text-base placeholder:text-[#2b2118]/40"
              />

              <label htmlFor="hero-location" className="sr-only">
                Location
              </label>
              <select
                id="hero-location"
                name="location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="mx-3 sm:mx-0 bg-transparent text-sm outline-none border-t sm:border-t-0 sm:border-l border-[#2b2118]/10 pt-3 sm:pt-0 sm:pl-4 text-[#2b2118] cursor-pointer"
              >
                <option value="all">📍 All Mumbai</option>
                {areas
                  .filter((a) => a !== "All Areas")
                  .map((area) => (
                    <option key={area} value={area}>
                      📍 {area}
                    </option>
                  ))}
              </select>

              <button
                type="submit"
                className="inline-flex items-center justify-center shrink-0 bg-[#2b2118] text-[#f6f1e8] rounded-full px-6 py-3.5 text-sm sm:text-base font-medium transition-all duration-300 hover:scale-[1.03] hover:bg-[#3a2c22]"
              >
                Explore Bakers
              </button>
            </div>
          </form>

          {/* Quick Filter Tags */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#2b2118]/50 font-medium">Curated edits:</span>
            <button
              type="button"
              onClick={() => handleQuickTagClick("Custom Cakes")}
              className="rounded-full bg-[#faf6ef] px-3 py-1 text-[#2b2118]/70 border border-[#2b2118]/8 hover:border-[#6b4a32] hover:text-[#2b2118] transition-colors"
            >
              🎂 Custom Cakes
            </button>
            <button
              type="button"
              onClick={() => handleQuickTagClick("Eggless")}
              className="rounded-full bg-[#faf6ef] px-3 py-1 text-[#2b2118]/70 border border-[#2b2118]/8 hover:border-[#6b4a32] hover:text-[#2b2118] transition-colors"
            >
              🌿 100% Eggless
            </button>
            <button
              type="button"
              onClick={() => handleQuickTagClick("Cheesecakes")}
              className="rounded-full bg-[#faf6ef] px-3 py-1 text-[#2b2118]/70 border border-[#2b2118]/8 hover:border-[#6b4a32] hover:text-[#2b2118] transition-colors"
            >
              🧀 Basque Cheesecakes
            </button>
            <button
              type="button"
              onClick={() => handleQuickTagClick("Brownies in Andheri")}
              className="rounded-full bg-[#faf6ef] px-3 py-1 text-[#2b2118]/70 border border-[#2b2118]/8 hover:border-[#6b4a32] hover:text-[#2b2118] transition-colors"
            >
              🍫 Brownies in Andheri
            </button>
          </div>
        </div>

        {/* Hero Food Photography */}
        <div className="relative min-h-72 sm:min-h-[30rem] overflow-hidden rounded-[2.5rem] shadow-[0_24px_50px_rgba(43,33,24,0.14)] ring-1 ring-[#2b2118]/8 group">
          <RemoteImage
            src={heroImage.src}
            alt={heroImage.alt}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2b2118]/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Floating Editorial Badge */}
          <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#faf6ef]/90 backdrop-blur-md border border-[#2b2118]/10 text-xs text-[#2b2118] shadow-lg flex items-center justify-between">
            <div>
              <p className="font-serif text-sm font-medium">Bespoke Artisan Bakery</p>
              <p className="text-[11px] text-[#2b2118]/60">Hand-decorated in Bandra West, Mumbai</p>
            </div>
            <span className="rounded-full bg-[#2b2118] text-[#f6f1e8] px-3 py-1 text-[11px] font-medium">
              Verified Edit
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

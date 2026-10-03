"use client";

import { useEffect } from "react";
import { Baker } from "@/lib/types";
import { RemoteImage } from "./RemoteImage";
import { getSimilarBakers, getSentimentSummary } from "@/lib/recommendations";

type BakerModalProps = {
  baker: Baker | null;
  allBakers: Baker[];
  onClose: () => void;
  onSelectBaker: (baker: Baker) => void;
};

export function BakerModal({
  baker,
  allBakers,
  onClose,
  onSelectBaker,
}: BakerModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (baker) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [baker, onClose]);

  if (!baker) return null;

  const similarBakers = getSimilarBakers(baker, allBakers, 3);
  const sentiment = getSentimentSummary(baker.reviews);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="baker-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto bg-[#2b2118]/70 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#faf7f2] rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_30px_100px_rgba(43,33,24,0.35)] ring-1 ring-[#2b2118]/10 text-[#2b2118]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close baker profile"
          className="absolute top-4 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-[#faf7f2]/95 text-[#2b2118] backdrop-blur-md shadow-md ring-1 ring-[#2b2118]/10 transition-all hover:scale-110 hover:bg-white cursor-pointer"
        >
          ✕
        </button>

        {/* Hero Cover Header */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden rounded-t-[2rem] sm:rounded-t-[2.5rem] bg-[#f4eee3]">
          <RemoteImage
            src={baker.coverImage || baker.profileImage}
            alt={baker.name}
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#2b2118]/95 via-[#2b2118]/30 to-transparent" />

          {/* Top badges */}
          <div className="absolute top-5 left-5 right-16 flex items-center justify-between pointer-events-none">
            {baker.verified && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#faf7f2]/95 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold text-[#2b2118] shadow-sm backdrop-blur-md">
                ✓ Verified Atelier
              </span>
            )}
          </div>

          {/* Hero Header Content */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#faf7f2]/70 mb-1.5 font-medium">
                  Independent Home Baker
                </p>

                <h2
                  id="baker-modal-title"
                  className="font-serif text-3xl sm:text-5xl text-[#faf7f2] leading-tight font-normal"
                >
                  {baker.name}
                </h2>

                <p className="mt-2 text-xs sm:text-sm text-[#faf7f2]/80">
                  📍 {baker.location}
                </p>
              </div>

              <div className="inline-flex self-start sm:self-auto items-center gap-2 rounded-full bg-[#faf7f2]/95 px-4 py-2 text-xs sm:text-sm font-medium text-[#2b2118] shadow-md backdrop-blur-md">
                <span className="text-[#c4a574]">★</span>
                {baker.rating.toFixed(1)}
                <span className="text-[#2b2118]/50">
                  · {baker.reviewCount} verified reviews
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 md:p-10 space-y-10">
          {/* Bio & Key Facts */}
          <div>
            <p className="text-base sm:text-lg leading-relaxed text-[#2b2118]/80 max-w-3xl">
              {baker.bio}
            </p>

            {/* Atelier Specification Strip */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="rounded-2xl bg-white p-3.5 ring-1 ring-[#2b2118]/8 shadow-xs">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#2b2118]/45 font-semibold">
                  Advance Notice
                </p>
                <p className="text-xs sm:text-sm font-medium text-[#2b2118] mt-1">
                  🕒 {baker.leadTime}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-3.5 ring-1 ring-[#2b2118]/8 shadow-xs">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#2b2118]/45 font-semibold">
                  Price Guide
                </p>
                <p className="text-xs sm:text-sm font-medium text-[#2b2118] mt-1">
                  🏷️ {baker.priceRange}
                </p>
              </div>

              <div className="col-span-2 sm:col-span-1 rounded-2xl bg-white p-3.5 ring-1 ring-[#2b2118]/8 shadow-xs">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#2b2118]/45 font-semibold">
                  Kitchen Location
                </p>
                <p className="text-xs sm:text-sm font-medium text-[#2b2118] mt-1 truncate">
                  📍 {baker.area || baker.location}
                </p>
              </div>
            </div>

            {/* Dietary Tags */}
            {baker.dietaryOptions.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {baker.dietaryOptions.map((opt) => (
                  <span
                    key={opt}
                    className="rounded-full bg-[#f4eee3] px-3.5 py-1.5 text-xs font-medium text-[#6b4a32] ring-1 ring-[#6b4a32]/15"
                  >
                    🌿 {opt}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Direct Atelier Actions */}
          <div className="flex flex-wrap gap-3">
            {baker.instagram && (
              <a
                href={baker.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 rounded-full bg-[#2b2118] px-6 py-3.5 text-xs uppercase tracking-wider font-medium text-[#faf7f2] transition-all hover:bg-[#3e2f23] hover:scale-[1.01] shadow-sm cursor-pointer"
              >
                <svg
                  className="w-4 h-4 fill-current opacity-90"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                View Instagram Portfolio
              </a>
            )}

            {baker.phone && (
              <a
                href={`https://wa.me/${baker.phone.replace(
                  /[^0-9]/g,
                  ""
                )}?text=Hi%20${encodeURIComponent(
                  baker.name
                )}%2C%20I%20found%20your%20bakery%20profile%20on%20The%20Baker's%20Edit!`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 rounded-full border border-[#2b2118]/25 bg-white px-6 py-3.5 text-xs uppercase tracking-wider font-medium text-[#2b2118] transition-all hover:border-[#2b2118] hover:bg-[#2b2118] hover:text-[#faf7f2] shadow-xs cursor-pointer"
              >
                💬 WhatsApp Inquiry
              </a>
            )}

            {baker.website && (
              <a
                href={baker.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#2b2118]/20 bg-white px-5 py-3.5 text-xs uppercase tracking-wider font-medium text-[#2b2118] hover:bg-[#f4eee3] transition cursor-pointer"
              >
                🌐 Visit Website
              </a>
            )}
          </div>

          {/* Signature Creations */}
          {baker.signatureDesserts && baker.signatureDesserts.length > 0 && (
            <div>
              <div className="flex items-end justify-between mb-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#6b4a32] font-semibold">
                    From the kitchen
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl mt-1 text-[#2b2118]">
                    Signature Creations
                  </h3>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {baker.signatureDesserts.map((dessert) => (
                  <div
                    key={dessert.id}
                    className="group flex gap-4 p-4 rounded-2xl bg-white ring-1 ring-[#2b2118]/8 shadow-xs transition-all hover:shadow-md"
                  >
                    <div className="relative h-22 w-22 shrink-0 rounded-xl overflow-hidden bg-[#f4eee3]">
                      <RemoteImage
                        src={dessert.image}
                        alt={dessert.name}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-medium text-sm text-[#2b2118]">
                            {dessert.name}
                          </h4>

                          <span className="text-xs font-semibold text-[#6b4a32] shrink-0">
                            ₹{dessert.price}
                          </span>
                        </div>

                        <p className="text-xs text-[#2b2118]/60 mt-1 line-clamp-2 leading-relaxed">
                          {dessert.description}
                        </p>
                      </div>

                      <div className="mt-2 flex gap-2 text-[10px] font-medium text-[#2b2118]/55">
                        {dessert.isEggless && <span>🌿 Eggless</span>}
                        {dessert.isVegan && <span>🌱 Vegan</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customer Reviews & Sentiments */}
          <div className="border-t border-[#2b2118]/10 pt-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-[#6b4a32] font-semibold">
                  What people are saying
                </p>

                <h3 className="font-serif text-2xl sm:text-3xl mt-1 text-[#2b2118]">
                  Customer Reviews
                </h3>
              </div>

              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-xs ring-1 ring-[#2b2118]/8 shadow-xs">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-600" />

                <span className="font-medium text-[#2b2118]">
                  {sentiment.positivePercent}% Positive
                </span>

                {sentiment.topAspects.length > 0 && (
                  <span className="text-[#2b2118]/45">
                    · {sentiment.topAspects.slice(0, 2).join(" · ")}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3.5">
              {baker.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 rounded-2xl bg-white ring-1 ring-[#2b2118]/7 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="font-medium text-sm text-[#2b2118]">
                        {rev.author}
                      </span>

                      <div className="mt-0.5 text-xs text-[#c4a574]">
                        {"★".repeat(Math.floor(rev.rating))}
                      </div>
                    </div>

                    <span className="text-xs text-[#2b2118]/40">
                      {rev.date}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-[#2b2118]/75 leading-relaxed italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>

                  {rev.aspects && rev.aspects.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {rev.aspects.map((aspect) => (
                        <span
                          key={aspect}
                          className="text-[9px] uppercase tracking-wider text-[#2b2118]/50 bg-[#f4eee3] px-2.5 py-1 rounded-full font-medium"
                        >
                          {aspect}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Similar Bakers Recommendations */}
          {similarBakers.length > 0 && (
            <div className="border-t border-[#2b2118]/10 pt-8">
              <div className="mb-5">
                <p className="text-[10px] uppercase tracking-[0.24em] text-[#6b4a32] font-semibold">
                  Personalized discovery
                </p>

                <h3 className="font-serif text-2xl sm:text-3xl mt-1 text-[#2b2118]">
                  You may also like
                </h3>

                <p className="text-xs text-[#2b2118]/55 mt-1">
                  Based on culinary style, locality, pricing and ratings.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {similarBakers.map((sim) => (
                  <button
                    key={sim.id}
                    type="button"
                    onClick={() => onSelectBaker(sim)}
                    className="group text-left rounded-2xl bg-white p-3 ring-1 ring-[#2b2118]/8 transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer shadow-xs"
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-[#f4eee3]">
                      <RemoteImage
                        src={sim.profileImage}
                        alt={sim.name}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <h4 className="font-medium text-sm text-[#2b2118] truncate group-hover:text-[#6b4a32] transition-colors">
                      {sim.name}
                    </h4>

                    <p className="text-xs text-[#2b2118]/50 mt-0.5">
                      {sim.area}
                    </p>

                    <p className="text-xs font-semibold text-[#6b4a32] mt-1.5">
                      ★ {sim.rating.toFixed(1)}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
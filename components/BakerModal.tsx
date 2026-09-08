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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-[#2b2118]/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#faf6ef] rounded-[2rem] shadow-2xl border border-[#2b2118]/10 text-[#2b2118]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#f6f1e8]/90 text-[#2b2118] backdrop-blur-md shadow-md transition-transform hover:scale-110"
        >
          ✕
        </button>

        {/* Cover / Profile Banner */}
        <div className="relative h-48 sm:h-64 w-full overflow-hidden rounded-t-[2rem]">
          <RemoteImage
            src={baker.coverImage || baker.profileImage}
            alt={baker.name}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2b2118]/80 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f6f1e8]/90 px-3 py-1 text-xs font-medium text-[#2b2118] backdrop-blur-md">
                📍 {baker.location}
              </span>
              <h2
                id="baker-modal-title"
                className="mt-2 font-serif text-3xl sm:text-4xl text-white drop-shadow-sm"
              >
                {baker.name}
              </h2>
            </div>
            <div className="rounded-full bg-[#2b2118] px-3.5 py-1.5 text-sm text-[#f6f1e8] shadow-md">
              ★ {baker.rating} ({baker.reviewCount})
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Quick Bio & Lead Time */}
          <div>
            <p className="text-base sm:text-lg leading-relaxed text-[#2b2118]/80">
              {baker.bio}
            </p>

            <div className="mt-4 flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center rounded-full bg-[#f6f1e8] px-3 py-1 text-xs text-[#2b2118]/70 border border-[#2b2118]/8">
                🕒 Lead Time: {baker.leadTime}
              </span>
              <span className="inline-flex items-center rounded-full bg-[#f6f1e8] px-3 py-1 text-xs text-[#2b2118]/70 border border-[#2b2118]/8">
                🏷️ Price Range: {baker.priceRange}
              </span>
              {baker.dietaryOptions.map((opt) => (
                <span
                  key={opt}
                  className="inline-flex items-center rounded-full bg-[#c4a574]/15 px-3 py-1 text-xs font-medium text-[#6b4a32]"
                >
                  🌿 {opt}
                </span>
              ))}
            </div>
          </div>

          {/* Direct CTA Bar */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-[#2b2118]/10">
            <a
              href={baker.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#2b2118] px-6 py-3 text-sm font-medium text-[#f6f1e8] transition-all hover:bg-[#3a2c22] hover:scale-[1.02]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Follow on Instagram
            </a>

            {baker.phone && (
              <a
                href={`https://wa.me/${baker.phone.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(baker.name)}%2C%20I%20found%20your%20bakery%20profile%20on%20The%20Baker's%20Edit!`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-[#2b2118] px-6 py-3 text-sm font-medium text-[#2b2118] transition-all hover:bg-[#2b2118] hover:text-[#f6f1e8]"
              >
                💬 WhatsApp Inquiry
              </a>
            )}
          </div>

          {/* Signature Desserts */}
          {baker.signatureDesserts && baker.signatureDesserts.length > 0 && (
            <div className="pt-2">
              <h3 className="font-serif text-2xl mb-4">Signature Creations</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {baker.signatureDesserts.map((dessert) => (
                  <div
                    key={dessert.id}
                    className="flex gap-4 p-3.5 rounded-2xl bg-[#f6f1e8] border border-[#2b2118]/8 items-center"
                  >
                    <div className="relative h-18 w-18 shrink-0 rounded-xl overflow-hidden">
                      <RemoteImage
                        src={dessert.image}
                        alt={dessert.name}
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-medium text-sm truncate">{dessert.name}</h4>
                        <span className="text-xs font-semibold text-[#6b4a32] shrink-0">
                          ₹{dessert.price}
                        </span>
                      </div>
                      <p className="text-xs text-[#2b2118]/65 mt-1 line-clamp-2">
                        {dessert.description}
                      </p>
                      <div className="mt-1.5 flex gap-2 text-[10px] text-[#2b2118]/50">
                        {dessert.isEggless && <span>🌿 Eggless</span>}
                        {dessert.isVegan && <span>🌱 Vegan</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Data Science Sentiment & Customer Reviews */}
          <div className="pt-2 border-t border-[#2b2118]/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <h3 className="font-serif text-2xl">Verified Customer Reviews</h3>
              {/* Sentiment Badge */}
              <div className="inline-flex items-center gap-2 bg-[#f6f1e8] px-3.5 py-1.5 rounded-full text-xs border border-[#2b2118]/10">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-600" />
                <span className="font-medium text-[#2b2118]/80">
                  {sentiment.positivePercent}% Positive Sentiment
                </span>
                <span className="text-[#2b2118]/45">
                  ({sentiment.topAspects.join(" • ")})
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {baker.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-2xl bg-[#f6f1e8] border border-[#2b2118]/8"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{rev.author}</span>
                      <span className="text-xs text-[#c4a574]">
                        {"★".repeat(Math.floor(rev.rating))}
                      </span>
                    </div>
                    <span className="text-xs text-[#2b2118]/40">{rev.date}</span>
                  </div>
                  <p className="mt-2 text-sm text-[#2b2118]/75 leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                  {rev.aspects && rev.aspects.length > 0 && (
                    <div className="mt-2 flex gap-1.5">
                      {rev.aspects.map((aspect) => (
                        <span
                          key={aspect}
                          className="text-[10px] uppercase tracking-wider text-[#2b2118]/40 bg-[#2b2118]/5 px-2 py-0.5 rounded-md"
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

          {/* Similar Bakers Recommendation (Data Science Feature) */}
          {similarBakers.length > 0 && (
            <div className="pt-2 border-t border-[#2b2118]/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#c4a574]">
                    AI Recommendation
                  </p>
                  <h3 className="font-serif text-xl">Similar Bakers in Mumbai</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {similarBakers.map((sim) => (
                  <div
                    key={sim.id}
                    onClick={() => onSelectBaker(sim)}
                    className="group cursor-pointer rounded-2xl bg-[#f6f1e8] p-3 border border-[#2b2118]/8 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-2">
                      <RemoteImage
                        src={sim.profileImage}
                        alt={sim.name}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h4 className="font-medium text-sm truncate">{sim.name}</h4>
                    <p className="text-xs text-[#2b2118]/55">{sim.area}</p>
                    <p className="text-xs font-semibold text-[#6b4a32] mt-1">
                      ★ {sim.rating}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

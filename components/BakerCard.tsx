"use client";

import { Baker } from "@/lib/types";
import { RemoteImage } from "./RemoteImage";

type BakerCardProps = {
  baker: Baker;
  onViewDetails?: (baker: Baker) => void;
};

export function BakerCard({ baker, onViewDetails }: BakerCardProps) {
  return (
    <article className="group flex flex-col bg-white rounded-[1.75rem] overflow-hidden ring-1 ring-[#2b2118]/8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_rgba(43,33,24,0.12)]">
      {/* Editorial Image Container */}
      <div
        className="relative aspect-[4/5] overflow-hidden cursor-pointer bg-[#f4eee3]"
        onClick={() => onViewDetails?.(baker)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onViewDetails?.(baker);
          }
        }}
        aria-label={`View profile for ${baker.name}`}
      >
        <RemoteImage
          src={baker.profileImage}
          alt={`Photo of ${baker.name}, artisanal home baker in ${baker.location}`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#2b2118]/85 via-[#2b2118]/15 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#faf7f2]/95 px-3 py-1.5 text-[11px] font-medium text-[#2b2118] backdrop-blur-md shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6b4a32]" />
            {baker.area || baker.location || "Mumbai"}
          </span>

          <span className="inline-flex items-center gap-1 rounded-full bg-[#2b2118]/85 text-[#faf7f2] px-2.5 py-1 text-[11px] font-medium backdrop-blur-md shadow-xs">
            <span className="text-[#c4a574]">★</span>
            {Number(baker?.rating ?? 5).toFixed(1)}
          </span>
        </div>

        {baker.verified && (
          <div className="absolute top-13 left-3.5 pointer-events-none">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#faf7f2]/90 px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] font-semibold text-[#2b2118] backdrop-blur-md shadow-xs">
              ✓ Verified Edit
            </span>
          </div>
        )}

        {/* Overlay Title on Image */}
        <div className="absolute bottom-4 left-4 right-4 text-[#faf7f2]">
          <p className="text-[9px] uppercase tracking-[0.25em] text-[#faf7f2]/70 mb-1 font-medium">
            Independent Atelier
          </p>

          <h3 className="font-serif text-2xl font-normal leading-tight group-hover:text-[#faf7f2] transition-colors">
            {baker.name}
          </h3>

          <p className="text-xs text-[#faf7f2]/80 mt-1 line-clamp-1 font-light">
            {baker.specialties}
          </p>
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="flex flex-1 flex-col p-5 bg-white">
        <p className="text-xs sm:text-[13px] text-[#2b2118]/70 leading-relaxed line-clamp-2 min-h-10">
          {baker.shortDescription || baker.bio}
        </p>

        {Array.isArray(baker.specialtyTags) && baker.specialtyTags.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {baker.specialtyTags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-wider bg-[#f4eee3] text-[#2b2118]/70 px-2.5 py-1 rounded-full ring-1 ring-[#2b2118]/6"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Pricing & Metadata strip */}
        <div className="mt-4 pt-3.5 border-t border-[#2b2118]/8 flex items-center justify-between text-xs">
          <div>
            <p className="text-[9px] uppercase tracking-[0.18em] text-[#2b2118]/45 font-medium">
              Price Guide
            </p>
            <p className="font-medium text-[#2b2118] mt-0.5">
              {baker.priceRange}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[9px] uppercase tracking-[0.18em] text-[#2b2118]/45 font-medium">
              Reviews
            </p>
            <p className="font-medium text-[#2b2118] mt-0.5">
              {baker.reviewCount} verified
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4.5 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onViewDetails?.(baker)}
            className="w-full inline-flex justify-center items-center rounded-full bg-[#2b2118] text-[#faf7f2] px-3 py-2.5 text-xs uppercase tracking-wider font-medium transition-all duration-300 hover:bg-[#3e2f23] hover:scale-[1.02] shadow-xs cursor-pointer"
          >
            View Profile
          </button>

          <a
            href={baker.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${baker.name}'s Instagram`}
            className="w-full inline-flex justify-center items-center gap-1.5 rounded-full border border-[#2b2118]/15 bg-transparent px-3 py-2.5 text-xs uppercase tracking-wider font-medium text-[#2b2118] transition-all duration-300 hover:border-[#2b2118]/40 hover:bg-[#f4eee3] cursor-pointer"
          >
            <svg
              className="w-3.5 h-3.5 fill-current opacity-80"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Instagram
          </a>
        </div>
      </div>
    </article>
  );
}
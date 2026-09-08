"use client";

import { RemoteImage } from "./RemoteImage";

type CategoryCardProps = {
  name: string;
  image: string;
  description?: string;
  itemCount?: number;
  onSelect?: (name: string) => void;
};

export function CategoryCard({
  name,
  image,
  description,
  itemCount,
  onSelect,
}: CategoryCardProps) {
  function handleClick(e: React.MouseEvent) {
    if (onSelect) {
      e.preventDefault();
      onSelect(name);
    }
  }

  return (
    <a
      href="#bakers"
      onClick={handleClick}
      className="group relative block overflow-hidden rounded-2xl min-h-44 sm:min-h-60 bg-[#faf6ef] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ring-1 ring-[#2b2118]/8"
    >
      <RemoteImage
        src={image}
        alt={`${name} by artisanal home bakers in Mumbai`}
        sizes="(max-width: 768px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2b2118]/90 via-[#2b2118]/30 to-transparent transition-opacity duration-300 group-hover:from-[#2b2118]/95" />

      {/* Floating Count badge */}
      {itemCount && (
        <span className="absolute top-3 right-3 rounded-full bg-[#f6f1e8]/90 px-2.5 py-0.5 text-[11px] font-medium text-[#2b2118] backdrop-blur-md">
          {itemCount} creations
        </span>
      )}

      {/* Category Info */}
      <div className="absolute bottom-4 left-4 right-4 text-white">
        <h3 className="font-serif text-lg sm:text-xl font-medium drop-shadow-sm">
          {name}
        </h3>
        {description && (
          <p className="text-xs text-white/75 mt-1 line-clamp-2 hidden sm:block">
            {description}
          </p>
        )}
        <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#c4a574] mt-2 group-hover:translate-x-1 transition-transform">
          Explore category →
        </span>
      </div>
    </a>
  );
}

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
      className="group relative block overflow-hidden rounded-2xl sm:rounded-3xl min-h-48 sm:min-h-64 bg-[#f4eee3] shadow-xs transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl ring-1 ring-[#2b2118]/8 cursor-pointer"
    >
      <RemoteImage
        src={image}
        alt={`${name} by artisanal home bakers in Mumbai`}
        sizes="(max-width: 768px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2b2118]/90 via-[#2b2118]/30 to-transparent transition-opacity duration-300 group-hover:from-[#2b2118]/95" />

      {/* Floating Count badge */}
      {typeof itemCount === "number" && itemCount > 0 && (
        <span className="absolute top-3.5 right-3.5 rounded-full bg-[#faf7f2]/90 px-3 py-1 text-[10px] uppercase tracking-wider font-semibold text-[#2b2118] backdrop-blur-md shadow-xs">
          {itemCount} creations
        </span>
      )}

      {/* Category Info */}
      <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 text-[#faf7f2]">
        <h3 className="font-serif text-lg sm:text-2xl font-normal leading-tight">
          {name}
        </h3>
        {description && (
          <p className="text-xs text-[#faf7f2]/75 mt-1.5 line-clamp-2 hidden sm:block leading-relaxed">
            {description}
          </p>
        )}
        <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-medium text-[#c4a574] mt-2 group-hover:translate-x-1 transition-transform duration-200">
          Explore category <span className="text-xs">→</span>
        </span>
      </div>
    </a>
  );
}

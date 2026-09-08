"use client";

import { RemoteImage } from "./RemoteImage";

type OccasionCardProps = {
  name: string;
  image: string;
  categorySlug?: string;
  onSelect?: (occasionName: string) => void;
};

export function OccasionCard({
  name,
  image,
  onSelect,
}: OccasionCardProps) {
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
      className="group relative min-h-36 sm:min-h-48 overflow-hidden rounded-2xl bg-[#faf6ef] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ring-1 ring-[#2b2118]/8"
    >
      <RemoteImage
        src={image}
        alt={`${name} desserts from Mumbai home bakers`}
        sizes="(max-width: 768px) 50vw, 20vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-[#2b2118]/45 group-hover:bg-[#2b2118]/30 transition-colors duration-300" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-3 text-center">
        <h3 className="font-serif text-xl sm:text-2xl drop-shadow-sm">{name}</h3>
        <span className="text-[10px] uppercase tracking-wider text-[#f6f1e8]/75 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          View Treats →
        </span>
      </div>
    </a>
  );
}

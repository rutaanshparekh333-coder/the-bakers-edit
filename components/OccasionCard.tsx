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
      className="group relative min-h-40 sm:min-h-52 overflow-hidden rounded-2xl sm:rounded-3xl bg-[#f4eee3] shadow-xs transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lg ring-1 ring-[#2b2118]/8 cursor-pointer flex flex-col justify-end p-4 sm:p-5"
    >
      <RemoteImage
        src={image}
        alt={`${name} desserts from Mumbai home bakers`}
        sizes="(max-width: 768px) 50vw, 20vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2b2118]/90 via-[#2b2118]/40 to-transparent transition-opacity duration-300 group-hover:from-[#2b2118]/95" />
      <div className="relative z-10 text-center flex flex-col items-center">
        <h3 className="font-serif text-xl sm:text-2xl text-[#faf7f2] font-normal leading-tight">
          {name}
        </h3>
        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-medium text-[#c4a574] mt-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 group-hover:translate-y-0 sm:translate-y-1">
          Explore bakes →
        </span>
      </div>
    </a>
  );
}

"use client";

import { forBakersImage } from "@/data/seedData";
import { RemoteImage } from "./RemoteImage";

type ForBakersProps = {
  onOpenJoinModal?: () => void;
};

export function ForBakers({ onOpenJoinModal }: ForBakersProps) {
  return (
    <section id="for-bakers" className="bg-[#2b2118] text-[#f6f1e8]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="relative hidden sm:block min-h-80 lg:min-h-96 rounded-[2rem] overflow-hidden shadow-2xl">
          <RemoteImage
            src={forBakersImage.src}
            alt={forBakersImage.alt}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="text-center lg:text-left">
          <p className="uppercase tracking-[0.3em] text-xs text-[#c4a574] font-medium">
            For independent home bakers
          </p>
          <h2 className="font-serif text-4xl md:text-5xl mt-5 leading-tight">
            Your craft deserves
            <br />
            to be discovered.
          </h2>
          <p className="max-w-lg mx-auto lg:mx-0 mt-6 text-[#f6f1e8]/75 leading-relaxed">
            Join Mumbai&apos;s curated community of independent home bakers. Get discovered
            by cake aficionados, birthday celebrants, and event planners looking for bespoke,
            kitchen-made desserts.
          </p>
          <button
            type="button"
            onClick={onOpenJoinModal}
            className="mt-8 inline-flex items-center justify-center bg-[#f6f1e8] text-[#2b2118] rounded-full px-8 py-3.5 font-medium transition-all duration-300 hover:scale-[1.03] hover:bg-white shadow-lg"
          >
            Join The Baker&apos;s Edit
          </button>
        </div>
      </div>
    </section>
  );
}

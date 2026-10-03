"use client";

import { forBakersImage } from "@/data/seedData";
import { RemoteImage } from "./RemoteImage";

type ForBakersProps = {
  onOpenJoinModal?: () => void;
};

export function ForBakers({ onOpenJoinModal }: ForBakersProps) {
  return (
    <section
      id="for-bakers"
      className="relative overflow-hidden bg-[#2b2118] text-[#faf7f2]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#c4a574]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-[30rem] h-[30rem] rounded-full bg-[#c4a574]/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24 lg:py-28 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-[500px] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-white/10">
            <RemoteImage
              src={forBakersImage.src}
              alt={forBakersImage.alt}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#2b2118]/70 via-transparent to-transparent" />

            <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7 bg-[#faf7f2]/95 text-[#2b2118] rounded-2xl px-5 py-4 backdrop-blur-md shadow-lg ring-1 ring-[#2b2118]/10">
              <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#8d7045]">
                The Baker&apos;s Edit
              </p>
              <p className="font-serif text-lg sm:text-xl mt-1 text-[#2b2118]">
                Craft over commercial volume.
              </p>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 text-center lg:text-left">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-[#c4a574]" />
            <p className="uppercase tracking-[0.3em] text-[11px] text-[#c4a574] font-semibold">
              For independent home bakers
            </p>
            <span className="w-8 h-px bg-[#c4a574] lg:hidden" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight text-[#faf7f2]">
            Your craft deserves
            <br />
            <span className="italic font-normal text-[#c4a574]">to be discovered.</span>
          </h2>

          <p className="max-w-xl mx-auto lg:mx-0 mt-6 sm:mt-7 text-[#faf7f2]/75 text-base sm:text-lg leading-relaxed">
            Join Mumbai&apos;s curated community of independent home bakers.
            Get discovered by cake aficionados, birthday celebrants, and event
            planners looking for bespoke, small-batch, kitchen-made desserts.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0 text-left">
            <div className="border border-[#faf7f2]/15 bg-white/5 rounded-2xl p-4 backdrop-blur-xs">
              <p className="font-serif text-xl sm:text-2xl text-[#c4a574]">01</p>
              <p className="text-xs text-[#faf7f2]/65 mt-1 font-medium">Submit Atelier</p>
            </div>

            <div className="border border-[#faf7f2]/15 bg-white/5 rounded-2xl p-4 backdrop-blur-xs">
              <p className="font-serif text-xl sm:text-2xl text-[#c4a574]">02</p>
              <p className="text-xs text-[#faf7f2]/65 mt-1 font-medium">Editorial Review</p>
            </div>

            <div className="border border-[#faf7f2]/15 bg-white/5 rounded-2xl p-4 backdrop-blur-xs">
              <p className="font-serif text-xl sm:text-2xl text-[#c4a574]">03</p>
              <p className="text-xs text-[#faf7f2]/65 mt-1 font-medium">Get Featured</p>
            </div>
          </div>

          <div className="mt-9">
            <button
              type="button"
              onClick={onOpenJoinModal}
              className="inline-flex items-center justify-center gap-3 bg-[#faf7f2] text-[#2b2118] rounded-full px-8 py-4 text-xs uppercase tracking-wider font-semibold transition-all duration-300 hover:scale-[1.02] hover:bg-white shadow-xl cursor-pointer"
            >
              <span>Apply to Join The Edit</span>
              <span className="text-sm">→</span>
            </button>
          </div>

          <p className="mt-3.5 text-xs text-[#faf7f2]/45">
            Every application is reviewed personally before being featured.
          </p>
        </div>
      </div>
    </section>
  );
}
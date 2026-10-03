type SectionHeadingProps = {
  kicker?: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  kicker,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl mb-10 sm:mb-12">
      {kicker ? (
        <div className="flex items-center gap-3 mb-2.5">
          <span className="h-px w-7 bg-[#b3874b]" />
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#6b4a32] font-semibold">
            {kicker}
          </p>
        </div>
      ) : null}
      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl mt-1 tracking-tight text-[#2b2118] leading-tight">
        {title}
      </h2>
      {description ? (
        <p className="mt-3.5 text-sm sm:text-base text-[#2b2118]/70 leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}

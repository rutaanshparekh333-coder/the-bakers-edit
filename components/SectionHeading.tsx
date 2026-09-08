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
    <div className="max-w-2xl mb-10">
      {kicker ? (
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.26em] text-[#2b2118]/45">
          {kicker}
        </p>
      ) : null}
      <h2 className="font-serif text-3xl sm:text-4xl mt-2 tracking-tight">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-[#2b2118]/65 leading-relaxed">{description}</p>
      ) : null}
    </div>
  );
}

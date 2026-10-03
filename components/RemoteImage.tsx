"use client";

import Image from "next/image";
import { useState } from "react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80";

type RemoteImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
};

export function RemoteImage({
  src,
  alt,
  className = "",
  fill = false,
  priority = false,
  sizes,
}: RemoteImageProps) {
  const [hasError, setHasError] = useState(false);

  const imgSrc =
    src && src.trim().length > 0
      ? src
      : FALLBACK_IMAGE;

  return (
    <Image
      src={hasError ? FALLBACK_IMAGE : imgSrc}
      alt={alt}
      fill={fill}
      width={!fill ? 1200 : undefined}
      height={!fill ? 800 : undefined}
      priority={priority}
      className={className}
      onError={() => setHasError(true)}
      sizes={sizes}
    />
  );
}

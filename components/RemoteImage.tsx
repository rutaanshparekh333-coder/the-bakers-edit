"use client";

import Image from "next/image";
import { useState } from "react";

type RemoteImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

// Reliable, curated fallback image in case any remote asset is blocked or unavailable
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80";

/**
 * Enhanced wrapper around next/image with resilient error handling.
 * If an image 404s or fails to load, gracefully falls back to a curated food photography asset.
 */
export function RemoteImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
}: RemoteImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  return (
    <Image
      src={hasError ? FALLBACK_IMAGE : imgSrc}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      priority={priority}
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setImgSrc(FALLBACK_IMAGE);
        }
      }}
    />
  );
}

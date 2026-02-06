/** biome-ignore-all lint/style/noRestrictedImports: importing next/image is necessary here */
import type { ImageProps } from "next/image";
import type { CSSProperties } from "react";
import { createSmartImage } from "tw-next-image";
import { inferImageSizes } from "tw-next-image/infer-sizes";
import { cn } from "@/lib/cn";

export type { StaticImageData } from "next/image";

type SmartImageSrc = ImageProps["src"];

const CAMEL_CASE_BOUNDARY = /([a-z])([A-Z])/g;
const WORD_DELIMITER = /[-_.]+/g;
const FILE_EXTENSION = /\.[^.]+$/;
const MULTI_SPACE = /\s+/g;

/** Extracts a human-readable alt from an image src path (e.g. "/icons/globe-dark.svg" → "Globe dark"). */
function inferAltFromSrc(src: SmartImageSrc): string | undefined {
  let resolved: string | undefined;
  if (typeof src === "string") {
    resolved = src;
  } else if (typeof src === "object" && src !== null && "src" in src && typeof src.src === "string") {
    resolved = src.src;
  }

  if (!resolved) {
    return undefined;
  }

  const filename = resolved.split("/").pop() ?? "";
  const stem = filename.replace(FILE_EXTENSION, "");
  const formatted = stem
    .replace(CAMEL_CASE_BOUNDARY, "$1 $2")
    .replace(WORD_DELIMITER, " ")
    .replace(MULTI_SPACE, " ")
    .trim();

  return formatted.length > 0 ? formatted[0].toUpperCase() + formatted.slice(1) : undefined;
}

/**
 * Project-configured `SmartImage`.
 *
 * Wraps `tw-next-image` with this project's `tailwind-merge` instance so Tailwind class
 * conflicts resolve correctly ("last class wins").
 */
const SmartImageImpl = createSmartImage({ cx: cn });

export function SmartImage<
  C extends string | undefined = undefined,
  S extends CSSProperties | undefined = undefined,
>(props: import("tw-next-image").SmartImageProps<C, S>) {
  const { alt, className, ratio, sizes, src, style } = props;
  const inferredSizes = sizes ?? inferImageSizes({ className, ratio, src, style });
  const isAriaHidden = props["aria-hidden"] === true || props["aria-hidden"] === "true";
  const resolvedAlt = alt ?? (isAriaHidden ? "" : inferAltFromSrc(src)) ?? "";

  return SmartImageImpl({
    ...props,
    alt: resolvedAlt,
    sizes: inferredSizes ?? "100vw",
  } as typeof props);
}

export type { SmartImageProps } from "tw-next-image";

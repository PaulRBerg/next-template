"use client";

import type { Route } from "next";
import NextLink from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { URL_PATTERNS } from "@/lib/regex";

type SmartLinkProps = ComponentPropsWithoutRef<"a"> & {
  external?: boolean;
  href: string;
};

export function SmartLink({ children, external, href, ...props }: SmartLinkProps) {
  const isExternal =
    typeof external === "boolean"
      ? external
      : URL_PATTERNS.absoluteHttp.test(href) || href.startsWith("mailto:");

  if (isExternal) {
    return (
      <a href={href} rel="noopener noreferrer" target="_blank" {...props}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href as Route} {...props}>
      {children}
    </NextLink>
  );
}

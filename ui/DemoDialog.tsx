"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Info, X } from "lucide-react";

const FEATURES = [
  "App Router with React 19 and Server Components",
  "Effect-ts for type-safe functional programming",
  "Tailwind CSS v4 with tailwind-variants",
  "Base UI headless components for accessibility",
  "BiomeJS linting and Bun runtime",
];

export function DemoDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border border-black/8 border-solid px-4 font-medium text-sm transition-colors hover:border-transparent hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 dark:border-white/[.145] dark:hover:bg-neutral-900">
        <Info className="size-4" />
        About this template
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/50 transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-black/8 bg-white p-6 shadow-xl transition-all data-[ending-style]:scale-95 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:border-white/[.145] dark:bg-neutral-900">
          <div className="flex items-start justify-between">
            <Dialog.Title className="font-semibold text-lg">About this template</Dialog.Title>
            <Dialog.Close className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
              <X className="size-4" />
            </Dialog.Close>
          </div>

          <Dialog.Description className="mt-2 text-gray-600 text-sm dark:text-gray-400">
            A production-ready Next.js starter with modern tooling.
          </Dialog.Description>

          <ul className="mt-4 space-y-2 text-sm">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-foreground" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-end">
            <Dialog.Close className="inline-flex h-9 cursor-pointer items-center justify-center rounded-full bg-foreground px-4 font-medium text-background text-sm transition-colors hover:bg-neutral-700 dark:hover:bg-neutral-300">
              Got it
            </Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

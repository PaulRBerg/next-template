import type { LucideIcon } from "lucide-react";
import { Blocks, Code, Component, Layers, Package, Palette, Shield, Zap } from "lucide-react";
import { Button } from "@/ui/Button";
import { ContactForm } from "@/ui/ContactForm";
import { DemoDialog } from "@/ui/DemoDialog";
import { SmartImage } from "@/ui/SmartImage";
import { SmartLink } from "@/ui/SmartLink";
import { Timestamp } from "@/ui/Timestamp";

type TechItem = {
  description: string;
  icon: LucideIcon;
  name: string;
  url: string;
  version: string;
};

const TECH_STACK: TechItem[] = [
  {
    description: "React framework",
    icon: Zap,
    name: "Next.js",
    url: "https://nextjs.org",
    version: "v16",
  },
  {
    description: "UI library",
    icon: Component,
    name: "React",
    url: "https://react.dev",
    version: "v19",
  },
  {
    description: "Typed functional effects",
    icon: Layers,
    name: "Effect-ts",
    url: "https://effect.website",
    version: "v3",
  },
  {
    description: "Type safety",
    icon: Code,
    name: "TypeScript",
    url: "https://typescriptlang.org",
    version: "v5",
  },
  {
    description: "Utility-first CSS",
    icon: Palette,
    name: "Tailwind CSS",
    url: "https://tailwindcss.com",
    version: "v4",
  },
  {
    description: "Fast runtime",
    icon: Package,
    name: "Bun",
    url: "https://bun.sh",
    version: "",
  },
  {
    description: "Linting & formatting",
    icon: Shield,
    name: "BiomeJS",
    url: "https://biomejs.dev",
    version: "",
  },
  {
    description: "Headless components",
    icon: Blocks,
    name: "Base UI",
    url: "https://base-ui.com",
    version: "v1",
  },
];

function HeaderSection() {
  return (
    <>
      <SmartImage alt="Next.js logo" className="aspect-[394/80] w-45 dark:invert" priority src="/next.svg" />
      <ol className="list-inside list-decimal text-center font-mono text-sm/6">
        <li className="mb-2 tracking-[-.01em]">
          Get started by editing{" "}
          <code className="rounded-sm bg-black/5 px-1 py-0.5 font-mono font-semibold dark:bg-white/6">
            app/page.tsx
          </code>
          .
        </li>
        <li className="tracking-[-.01em]">Save and see your changes instantly.</li>
      </ol>
    </>
  );
}

function TechCard({ tech }: { tech: TechItem }) {
  return (
    <SmartLink
      className="group cursor-pointer rounded-lg border border-black/8 bg-white/50 p-4 transition-colors hover:bg-black/5 dark:border-white/[.145] dark:bg-black/20 dark:hover:bg-white/5"
      href={tech.url}
    >
      <tech.icon className="mb-2 size-6 text-black dark:text-white" />
      <div className="font-semibold text-sm tracking-tight">
        {tech.name}
        {tech.version ? (
          <span className="ml-1 text-gray-600 dark:text-gray-400">{tech.version}</span>
        ) : null}
      </div>
      <div className="mt-1 text-gray-600 text-xs dark:text-gray-400">{tech.description}</div>
    </SmartLink>
  );
}

function TechStackSection() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-center font-semibold text-lg sm:text-left">Built with Modern Tools</h2>
      <div className="grid grid-cols-2 gap-3">
        {TECH_STACK.map((tech) => (
          <TechCard key={tech.name} tech={tech} />
        ))}
      </div>
    </div>
  );
}

function InteractiveUISection() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-center font-semibold text-lg sm:text-left">Interactive Components</h2>
      <div className="flex flex-col gap-4">
        {/* Button Variants */}
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button asChild size="md" variant="primary">
            <SmartLink href="https://vercel.com/new">
              <SmartImage alt="Vercel logomark" className="size-5 dark:invert" src="/vercel.svg" />
              Deploy now
            </SmartLink>
          </Button>
          <Button asChild size="md" variant="secondary">
            <SmartLink href="https://nextjs.org/docs">Read our docs</SmartLink>
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant="ghost">
            Ghost Button
          </Button>
          <Button size="sm" variant="primary">
            Small Primary
          </Button>
          <Button size="lg" variant="secondary">
            Large Secondary
          </Button>
        </div>

        {/* Headless UI with Base UI */}
        <div className="border-black/8 border-t pt-4 dark:border-white/[.145]">
          <p className="mb-3 text-gray-600 text-xs dark:text-gray-400">Headless UI with Base UI</p>
          <DemoDialog />
        </div>
      </div>
    </div>
  );
}

function FormSection() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-center font-semibold text-lg sm:text-left">
        Form Validation with Effect Schema
      </h2>
      <ContactForm />
    </div>
  );
}

const FOOTER_LINKS = [
  { href: "https://nextjs.org/learn", icon: "/file.svg", label: "Learn" },
  { href: "https://vercel.com/templates?framework=next.js", icon: "/window.svg", label: "Examples" },
  { href: "https://nextjs.org?utm_source=create-next-app", icon: "/globe.svg", label: "Go to nextjs.org \u2192" },
];

function FooterLinks() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      {FOOTER_LINKS.map((link) => (
        <Button key={link.href} asChild size="sm" variant="ghost">
          <SmartLink href={link.href}>
            <SmartImage aria-hidden className="size-4" src={link.icon} />
            {link.label}
          </SmartLink>
        </Button>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] place-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8">
        <HeaderSection />

        {/* Three Column Layout */}
        <div className="grid w-full max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
          <TechStackSection />
          <InteractiveUISection />
          <FormSection />
        </div>
      </main>
      <footer className="row-start-3 flex flex-col items-center justify-center gap-4">
        <FooterLinks />
        <Timestamp label="Template last updated" />
      </footer>
    </div>
  );
}

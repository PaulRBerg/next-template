import type { LucideIcon } from "lucide-react";
import { Code, Component, Layers, Package, Palette, Shield, Terminal, Zap } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/ui/Button";
import { ContactForm } from "@/ui/ContactForm";
import { Timestamp } from "@/ui/Timestamp";

type TechItem = {
  name: string;
  description: string;
  icon: LucideIcon;
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
    description: "Task runner",
    icon: Terminal,
    name: "Just",
    url: "https://just.systems",
    version: "",
  },
];

function HeaderSection() {
  return (
    <>
      <Image
        className="h-auto w-45 dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={0}
        height={0}
        priority
      />
      <ol className="list-inside list-decimal text-center font-mono text-sm/6">
        <li className="mb-2 tracking-[-.01em]">
          Get started by editing{" "}
          <code className="rounded bg-black/5 px-1 py-0.5 font-mono font-semibold dark:bg-white/6">
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
    <a
      href={tech.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group cursor-pointer rounded-lg border border-black/8 bg-white/50 p-4 transition-colors hover:bg-black/5 dark:border-white/[.145] dark:bg-black/20 dark:hover:bg-white/5"
    >
      <tech.icon className="mb-2 h-6 w-6 text-black dark:text-white" />
      <div className="font-semibold text-sm tracking-tight">
        {tech.name}
        {tech.version && (
          <span className="ml-1 text-gray-600 dark:text-gray-400">{tech.version}</span>
        )}
      </div>
      <div className="mt-1 text-gray-600 text-xs dark:text-gray-400">{tech.description}</div>
    </a>
  );
}

function TechStackSection() {
  const t = useTranslations("HomePage");

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-center font-semibold text-lg sm:text-left">{t("techStackHeading")}</h2>
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
      <h2 className="text-center font-semibold text-lg sm:text-left">
        Interactive UI with Tailwind Variants
      </h2>
      <div className="flex flex-col gap-4">
        {/* CVA Button Variants Demo */}
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button variant="primary" size="md" asChild>
            <a
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="h-5 w-5 dark:invert"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={0}
                height={0}
              />
              Deploy now
            </a>
          </Button>
          <Button variant="secondary" size="md" asChild>
            <a
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read our docs
            </a>
          </Button>
        </div>

        {/* Additional CVA Button Examples */}
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="ghost" size="sm">
            Ghost Button
          </Button>
          <Button variant="primary" size="sm">
            Small Primary
          </Button>
          <Button variant="secondary" size="lg">
            Large Secondary
          </Button>
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

function FooterLinks() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-[24px]">
      <Button variant="ghost" size="sm" asChild>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
      </Button>
      <Button variant="ghost" size="sm" asChild>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
      </Button>
      <Button variant="ghost" size="sm" asChild>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </Button>
    </div>
  );
}

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
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

import dayjs from "dayjs";
import { Code, Component, FileCheck, Package, Palette, Shield, Terminal, Zap } from "lucide-react";
import Image from "next/image";
import { ContactForm } from "./components/contact-form";
import { Timestamp } from "./components/timestamp";
import { Button } from "./components/ui/button";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">Save and see your changes instantly.</li>
        </ol>

        {/* Three Column Layout */}
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1: Tech Stack Showcase */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-center sm:text-left">
              Built with Modern Tools
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  description: "React framework",
                  icon: Zap,
                  name: "Next.js",
                  url: "https://nextjs.org",
                  version: "16",
                },
                {
                  description: "UI library",
                  icon: Component,
                  name: "React",
                  url: "https://react.dev",
                  version: "19",
                },
                {
                  description: "Type safety",
                  icon: Code,
                  name: "TypeScript",
                  url: "https://www.typescriptlang.org",
                  version: "5",
                },
                {
                  description: "Utility-first CSS",
                  icon: Palette,
                  name: "Tailwind CSS",
                  url: "https://tailwindcss.com",
                  version: "4",
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
                  description: "Code formatter",
                  icon: FileCheck,
                  name: "Prettier",
                  url: "https://prettier.io",
                  version: "",
                },
                {
                  description: "Task runner",
                  icon: Terminal,
                  name: "Just",
                  url: "https://just.systems",
                  version: "",
                },
              ].map((tech) => (
                <a
                  key={tech.name}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 rounded-lg border border-black/[.08] dark:border-white/[.145] bg-white/50 dark:bg-black/20 hover:bg-black/[.05] dark:hover:bg-white/[.05] transition-colors cursor-pointer"
                >
                  <tech.icon className="h-6 w-6 mb-2 text-black dark:text-white" />
                  <div className="font-semibold text-sm tracking-tight">
                    {tech.name}
                    {tech.version && (
                      <span className="ml-1 text-gray-600 dark:text-gray-400">{tech.version}</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {tech.description}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Interactive UI with Tailwind Variants */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-center sm:text-left">
              Interactive UI with Tailwind Variants
            </h2>
            <div className="flex flex-col gap-4">
              {/* CVA Button Variants Demo */}
              <div className="flex gap-4 items-center flex-col sm:flex-row">
                <Button variant="primary" size="md" asChild>
                  <a
                    href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      className="dark:invert"
                      src="/vercel.svg"
                      alt="Vercel logomark"
                      width={20}
                      height={20}
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
              <div className="flex gap-2 items-center flex-wrap">
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

          {/* Column 3: Form Validation with Zod */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-center sm:text-left">
              Form Validation with Zod
            </h2>
            <ContactForm />
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex flex-col gap-4 items-center justify-center">
        <div className="flex gap-[24px] flex-wrap items-center justify-center">
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
        <Timestamp date={dayjs().toDate()} label="Template last updated" />
      </footer>
    </div>
  );
}

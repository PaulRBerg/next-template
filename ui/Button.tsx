import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import { cloneElement } from "react";
import type { VariantProps } from "tailwind-variants";
import { tv } from "tailwind-variants";
import { cn } from "@/lib/cn";

const buttonVariants = tv({
  base: "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
  variants: {
    size: {
      lg: "h-12 px-6 text-base",
      md: "h-10 px-4 text-sm sm:h-12 sm:px-5 sm:text-base",
      sm: "h-9 px-3 text-sm",
    },
    variant: {
      ghost: "hover:bg-gray-100 dark:hover:bg-gray-800",
      primary: "bg-foreground text-background hover:bg-neutral-700 dark:hover:bg-neutral-300",
      secondary:
        "border border-black/8 border-solid hover:border-transparent hover:bg-neutral-100 dark:border-white/[.145] dark:hover:bg-neutral-900",
    },
  },
});

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    children: ReactNode;
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ size, variant }), className);

  if (asChild && typeof children === "object" && children !== null) {
    const child = children as ReactElement<{ className?: string }>;
    return cloneElement(child, {
      ...props,
      className: cn(child.props.className, classes),
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

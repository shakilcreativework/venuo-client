"use client";

import type { ReactNode, MouseEvent } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "danger" | "custom";
type Size = "sm" | "md" | "lg";
type As = "button" | "link" | "a";

interface BaseButtonProps {
  children?: ReactNode;
  text?: string;
  className?: string;

  onClick?: (
    event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;

  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";

  as?: As;
  href?: string;

  variant?: Variant;
  size?: Size;

  leftIcon?: ReactNode;
  rightIcon?: ReactNode;

  animated?: boolean;
  animatedSpanOne?: string;
  animatedSpanTwo?: string;
}

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  outline: "border border-primary text-primary hover:bg-surface",
  ghost: "text-foreground hover:bg-surface",
  danger: "bg-red-500 text-white hover:bg-red-600", // fine to keep — no destructive-action token defined, and red for danger is a near-universal convention
  custom: "",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-full",
  md: "px-5 py-2.5 text-base rounded-full",
  lg: "px-6 py-3 text-lg rounded-full",
};

const BaseButton = ({
  children,
  text,
  className,
  onClick,
  disabled = false,
  loading = false,
  type = "button",
  as = "button",
  href,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  animated = false,
  animatedSpanOne,
  animatedSpanTwo,
}: BaseButtonProps) => {
  const baseStyles = cn(
    "relative inline-flex items-center justify-center",
    "font-medium whitespace-nowrap overflow-hidden",
    "transition-all duration-300 ease-in-out",
    "hover:scale-105 active:scale-95",
    "gap-2.5 cursor-pointer",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    variants[variant],
    sizes[size],
    className
  );

  const content = (
    <>
      {animated && (
        <>
          <span
            className={cn(
              "absolute inset-0 rounded-full bg-orange-300 opacity-30 animate-bounce",
              animatedSpanOne
            )}
          />
          <span
            className={cn(
              "absolute inset-0 rounded-full bg-orange-400 opacity-20 blur-lg scale-110",
              animatedSpanTwo
            )}
          />
        </>
      )}

      <span className="relative z-10 flex items-center gap-2">
        {loading ? (
          <span className="size-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
        ) : (
          leftIcon
        )}

        {children ?? text}

        {!loading && rightIcon}
      </span>
    </>
  );

  if (as === "link" && href) {
    return (
      <Link
        href={href}
        className={baseStyles}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {content}
      </Link>
    );
  }

  if (as === "a" && href) {
    return (
      <a
        href={href}
        className={baseStyles}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={baseStyles}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      onClick={
        disabled || loading
          ? undefined
          : (onClick as React.MouseEventHandler<HTMLButtonElement>)
      }
    >
      {content}
    </button>
  );
};

export default BaseButton;
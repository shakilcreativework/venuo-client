"use client";

import { InputHTMLAttributes, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { cn } from "@/lib/utils";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function FormField({ label, error, className, id, type, ...props }: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const inputId = id ?? props.name;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={isPasswordField ? (showPassword ? "text" : "password") : type}
          className={cn(
            "w-full rounded-lg border bg-card px-3.5 py-2.5 text-foreground",
            "placeholder:text-muted outline-none transition-colors",
            "focus:border-primary",
            isPasswordField && "pr-11",
            error ? "border-red-500" : "border-border hover:border-border-hover",
            className,
          )}
          {...props}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
          >
            {showPassword ? (
              <AiFillEyeInvisible className="text-lg" />
            ) : (
              <AiFillEye className="text-lg" />
            )}
          </button>
        )}
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
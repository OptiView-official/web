"use client";

import * as React from "react";

type ButtonVariant = "default" | "secondary" | "ghost" | "outline";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg" | "primary";
};

const variantToClass: Record<ButtonVariant, string> = {
  default: "bg-[#35E7FF] text-primary hover:bg-[#35E7FF]/80",
  secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
  ghost: "bg-transparent hover:bg-slate-100 text-slate-900",
  outline:
    "bg-transparent text-slate-900 border border-slate-300 hover:bg-slate-50",
};

const sizeToClass = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-4 text-sm",
  lg: "h-10 px-5 text-base",
  primary: "rounded-[50px] text-base font-medium h-[50px] px-[30px]",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantToClass[variant]} ${sizeToClass[size]} ${className}`}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export default Button;



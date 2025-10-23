import React from "react";
import {
  Button as ShadcnButton,
  type ButtonProps as ShadcnButtonProps,
} from "../button";
import { cn } from "@/lib/utils";

interface ButtonProps extends Omit<ShadcnButtonProps, "variant"> {
  variant?: "primary" | "secondary" | "selected";
  fullWidth?: boolean;
}

export const CustomButton: React.FC<ButtonProps> = ({
  variant = "primary",
  fullWidth = false,
  className,
  ...props
}) => {
  const shadcnVariant =
    variant === "primary"
      ? "default"
      : variant === "secondary"
      ? "secondary"
      : variant === "selected"
      ? "default"
      : "default";

  return (
    <ShadcnButton
      variant={shadcnVariant}
      className={cn(
        {
          "bg-primary text-white hover:bg-primary-hover font-bold uppercase":
            variant === "primary",
          "bg-gray-100 text-text-primary hover:bg-gray-200 font-bold uppercase":
            variant === "secondary",
          "bg-success text-white hover:bg-success-hover font-bold uppercase":
            variant === "selected",
        },
        {
          "w-full": fullWidth,
        },
        className
      )}
      {...props}
    />
  );
};

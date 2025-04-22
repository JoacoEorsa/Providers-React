import { type ComponentProps } from "react";
import { Slot } from "@radix-ui/react-slot";
import { tv, type VariantProps } from "tailwind-variants";

import { Icons } from "@/components/ui";
import type { Styled } from "@/types/styles";

const buttonVariants = tv({
  base: "focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-all duration-300 ease-in-out focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  variants: {
    variant: {
      default:
        "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 focus-visible:ring-primary/50 shadow",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80 focus-visible:ring-destructive/50 shadow-sm",
      outline:
        "border-input hover:bg-accent hover:text-accent-foreground border bg-transparent shadow-sm",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/80 focus-visible:ring-secondary/50 shadow-sm",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      sm: "px-1.5 py-1 text-xs md:px-2 md:py-1.5 md:text-sm",
      default: "px-1.5 py-1 text-sm md:px-2 md:py-1.5 md:text-base",
      lg: "px-3 py-2 text-lg",
      icon: "p-3",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants>,
    Styled {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = ({
  asChild = false,
  children,
  className,
  disabled,
  isLoading = false,
  size,
  variant,
  ...props
}: ButtonProps) => {
  return asChild ? (
    <Slot className={buttonVariants({ variant, size, className })} {...props}>
      {children}
    </Slot>
  ) : (
    <button
      className={buttonVariants({ variant, size, className })}
      disabled={isLoading || disabled}
      type="button"
      {...props}
    >
      {isLoading ? <Icons.LoaderCircle className="animate-spin" /> : null}
      {children}
    </button>
  );
};

export { Button, buttonVariants };

import { type ComponentProps } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { tv, type VariantProps } from 'tailwind-variants';

import { Icons } from '@/components/ui';
import type { Styled } from '@/types/styles';

const buttonVariants = tv({
  base: 'focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm',
      outline:
        'border-input bg-background hover:bg-accent hover:text-accent-foreground border shadow-sm',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
    },
    size: {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 rounded-md px-3 text-xs',
      lg: 'h-10 rounded-md px-8',
      icon: 'px-4 py-2',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface ButtonProps
  extends ComponentProps<'button'>,
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

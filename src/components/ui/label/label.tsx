import { type ComponentPropsWithoutRef, type ComponentRef, forwardRef } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { tv } from 'tailwind-variants';

import type { Styled } from '@/types/styles';

const labelVariants = tv({
  base: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
});

const Label = forwardRef<
  ComponentRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & Styled
>(({ className, ...props }, ref) => {
  return <LabelPrimitive.Root className={labelVariants({ className })} ref={ref} {...props} />;
});

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

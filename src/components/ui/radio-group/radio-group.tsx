import type { ComponentProps } from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { tv } from "tailwind-variants";

const radioGroupVariants = tv({
  slots: {
    root: "grid gap-3 disabled:opacity-50",
    item: "peer border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
    indicator: "relative flex items-center justify-center",
  },
});

const { indicator, item, root } = radioGroupVariants();

const Root = ({ className, ...props }: ComponentProps<typeof RadioGroupPrimitive.Root>) => {
  return (
    <RadioGroupPrimitive.Root className={root({ className })} data-slot="radio-group" {...props} />
  );
};

const Indicator = ({
  className,
  ...props
}: ComponentProps<typeof RadioGroupPrimitive.Indicator>) => {
  return (
    <RadioGroupPrimitive.Indicator
      className={indicator({ className })}
      data-slot="radio-group-indicator"
      {...props}
    />
  );
};

const Item = ({ className, ...props }: ComponentProps<typeof RadioGroupPrimitive.Item>) => {
  return (
    <RadioGroupPrimitive.Item
      className={item({ className })}
      data-slot="radio-group-item"
      {...props}
    />
  );
};

export const RadioGroup = { Root, Item, Indicator };

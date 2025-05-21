import { type ComponentProps, type ReactNode } from "react";
import { tv } from "tailwind-variants";

import { IconWrapper } from "@/components/ui";
import { SIZE, type Size, type Styled } from "@/types/styles";

const inputVariants = tv({
  slots: {
    container: "relative flex w-full flex-col gap-1.5",
    input:
      "border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
    wrapper: "relative flex flex-row items-center rounded-md",
    leftIcon: "pointer-events-none absolute top-1/2 left-2 flex -translate-y-1/2 items-center",
    rightIcon: "absolute top-1/2 right-2 flex -translate-y-1/2 items-center",
  },
  variants: {
    size: {
      [SIZE.X_SMALL]: { input: "py-1.5" },
      [SIZE.SMALL]: { input: "py-2" },
      [SIZE.MEDIUM]: { input: "py-3" },
      [SIZE.LARGE]: { input: "py-4" },
      [SIZE.X_LARGE]: { input: "py-5" },
    },
    left: {
      [SIZE.X_SMALL]: { input: "pl-8" },
      [SIZE.SMALL]: { input: "pl-9" },
      [SIZE.MEDIUM]: { input: "pl-10" },
      [SIZE.LARGE]: { input: "pl-10" },
      [SIZE.X_LARGE]: { input: "pl-11" },
    },
    right: {
      [SIZE.X_SMALL]: { input: "pr-8" },
      [SIZE.SMALL]: { input: "pr-9" },
      [SIZE.MEDIUM]: { input: "pr-10" },
      [SIZE.LARGE]: { input: "pr-10" },
      [SIZE.X_LARGE]: { input: "pr-11" },
    },
  },
});

const { container, input, leftIcon, rightIcon, wrapper } = inputVariants();

type InputProps = {
  containerClassName?: string;
  left?: ReactNode;
  right?: ReactNode;
  size?: Size;
} & Omit<ComponentProps<"input">, "size"> &
  Styled;

const Input = ({
  className,
  containerClassName,
  left,
  right,
  size = SIZE.MEDIUM,
  ...props
}: InputProps) => {
  return (
    <div className={container({ className: containerClassName })}>
      <div className={wrapper()}>
        {left ? (
          <IconWrapper className={leftIcon()} size={size}>
            {left}
          </IconWrapper>
        ) : null}

        <input
          className={input({
            className,
            size,
            left: left ? size : undefined,
            right: right ? size : undefined,
          })}
          {...props}
        />

        {right ? (
          <IconWrapper className={rightIcon()} size={size}>
            {right}
          </IconWrapper>
        ) : null}
      </div>
    </div>
  );
};

export { Input };

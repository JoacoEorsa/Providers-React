import { type ComponentProps, useContext } from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { tv } from "tailwind-variants";

import { Icons } from "@/components";

const inputOtpVariants = tv({
  slots: {
    root: "disabled:cursor-not-allowed",
    container: "flex items-center gap-2 has-disabled:opacity-50",
    group: "flex items-center",
    slot: "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
    caretWrapper: "pointer-events-none absolute inset-0 flex items-center justify-center",
    caret: "h-4 w-0.5 animate-caret-blink bg-black duration-1000",
  },
});

const { caret, caretWrapper, container, group, root, slot } = inputOtpVariants();

export const Root = ({
  className,
  containerClassName,
  ...props
}: ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) => {
  return (
    <OTPInput
      className={root({ className })}
      containerClassName={container({ className: containerClassName })}
      data-slot="input-otp"
      {...props}
    />
  );
};

export const Group = ({ className, ...props }: ComponentProps<"div">) => {
  return <div className={group({ className })} data-slot="input-otp-group" {...props} />;
};

export const Slot = ({
  className,
  index,
  ...props
}: ComponentProps<"div"> & {
  index: number;
}) => {
  const inputOTPContext = useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      className={slot({ className })}
      data-active={isActive}
      data-slot="input-otp-slot"
      {...props}
    >
      {char}
      {hasFakeCaret ? <Caret /> : null}
    </div>
  );
};

export const Caret = () => {
  return (
    <div className={caretWrapper()}>
      <div className={caret()} />
    </div>
  );
};

export const Separator = (props: ComponentProps<"div">) => {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <Icons.Minus />
    </div>
  );
};

export const InputOTP = {
  Root,
  Group,
  Slot,
  Separator,
};

import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { REGEXP_ONLY_CHARS, REGEXP_ONLY_DIGITS } from "input-otp";

import { InputOTP } from "./input-otp";

const meta = {
  component: InputOTP.Root,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  title: "Components/UI/InputOTP",
} satisfies Meta<typeof InputOTP.Root>;

export default meta;

type Story = StoryObj<ComponentProps<typeof InputOTP.Root>>;

export const Default: Story = {
  render: () => {
    return (
      <InputOTP.Root maxLength={4}>
        <InputOTP.Group>
          <InputOTP.Slot index={0} />
          <InputOTP.Slot index={1} />
          <InputOTP.Slot index={2} />
          <InputOTP.Slot index={3} />
        </InputOTP.Group>
      </InputOTP.Root>
    );
  },
};

export const WithSeparator: Story = {
  render: () => {
    return (
      <InputOTP.Root maxLength={6}>
        <InputOTP.Group>
          <InputOTP.Slot index={0} />
          <InputOTP.Slot index={1} />
          <InputOTP.Slot index={2} />
        </InputOTP.Group>
        <InputOTP.Separator />
        <InputOTP.Group>
          <InputOTP.Slot index={3} />
          <InputOTP.Slot index={4} />
          <InputOTP.Slot index={5} />
        </InputOTP.Group>
      </InputOTP.Root>
    );
  },
};

export const OnlyNumbers: Story = {
  render: () => {
    return (
      <InputOTP.Root maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
        <InputOTP.Group>
          <InputOTP.Slot index={0} />
          <InputOTP.Slot index={1} />
          <InputOTP.Slot index={2} />
        </InputOTP.Group>
        <InputOTP.Separator />
        <InputOTP.Group>
          <InputOTP.Slot index={3} />
          <InputOTP.Slot index={4} />
          <InputOTP.Slot index={5} />
        </InputOTP.Group>
      </InputOTP.Root>
    );
  },
};

export const OnlyCharacters: Story = {
  render: () => {
    return (
      <InputOTP.Root maxLength={6} pattern={REGEXP_ONLY_CHARS}>
        <InputOTP.Group>
          <InputOTP.Slot index={0} />
          <InputOTP.Slot index={1} />
          <InputOTP.Slot index={2} />
        </InputOTP.Group>
        <InputOTP.Separator />
        <InputOTP.Group>
          <InputOTP.Slot index={3} />
          <InputOTP.Slot index={4} />
          <InputOTP.Slot index={5} />
        </InputOTP.Group>
      </InputOTP.Root>
    );
  },
};

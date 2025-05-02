import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Icons, Label, RadioGroup } from "@/components/ui";

const meta: Meta<typeof RadioGroup.Root> = {
  component: RadioGroup.Root,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  title: "Components/UI/RadioGroup",
} satisfies Meta<typeof RadioGroup.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { value: "one", label: "One" },
  { value: "two", label: "Two" },
  { value: "three", label: "Three" },
];

const disabledGroupItems = [
  { value: "four", label: "Four" },
  { value: "five", label: "Five" },
  { value: "six", label: "Six" },
];

export const Default: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] = useState<string>();

    return (
      <div className="flex flex-col gap-2">
        <RadioGroup.Root onValueChange={setSelectedItem}>
          {items.map((item) => {
            return (
              <div className="flex items-center space-x-2" key={item.value}>
                <RadioGroup.Item id={item.value} value={item.value}>
                  <RadioGroup.Indicator>
                    <Icons.Circle className="bg-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full" />
                  </RadioGroup.Indicator>
                </RadioGroup.Item>
                <Label htmlFor={item.value}>{item.label}</Label>
              </div>
            );
          })}
        </RadioGroup.Root>
        <p className="text-sm font-semibold">Selected item: {selectedItem}</p>
      </div>
    );
  },
};

export const DisabledGroup: Story = {
  render: () => {
    return (
      <RadioGroup.Root disabled>
        {disabledGroupItems.map((item) => {
          return (
            <div className="flex items-center space-x-2" key={item.value}>
              <RadioGroup.Item id={item.value} value={item.value}>
                <RadioGroup.Indicator>
                  <Icons.Circle className="bg-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full" />
                </RadioGroup.Indicator>
              </RadioGroup.Item>
              <Label htmlFor={item.value}>{item.label}</Label>
            </div>
          );
        })}
      </RadioGroup.Root>
    );
  },
};

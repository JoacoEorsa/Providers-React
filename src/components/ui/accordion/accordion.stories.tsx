import type { Meta, StoryObj } from "@storybook/react";

import { Accordion } from "./accordion";

const meta: Meta<typeof Accordion> = {
  component: Accordion.Root,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  title: "Components/UI/Accordion",
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { header: "Header one", value: "1" },
  { header: "Header two", value: "2" },
  { header: "Header three", value: "3" },
];

export const Single: Story = {
  render: () => {
    return (
      <Accordion.Root className="mx-auto max-w-md" type="single" collapsible>
        {items.map((item) => {
          return (
            <Accordion.Item key={item.value} value={item.value}>
              <Accordion.Header>
                <Accordion.Trigger>{item.header}</Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="py-4">
                This is the accordion content. You can place any content here such as text, lists,
                or even other components.
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    );
  },
};

export const Multiple: Story = {
  render: () => {
    return (
      <Accordion.Root className="mx-auto max-w-md" type="multiple">
        {items.map((item) => {
          return (
            <Accordion.Item key={item.value} value={item.value}>
              <Accordion.Header>
                <Accordion.Trigger>{item.header}</Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="py-4">
                This is the accordion content. You can place any content here such as text, lists,
                or even other components.
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    );
  },
};

export const DefaultValue: Story = {
  render: () => {
    return (
      <Accordion.Root className="mx-auto max-w-md" defaultValue="2" type="single">
        {items.map((item) => {
          return (
            <Accordion.Item key={item.value} value={item.value}>
              <Accordion.Header>
                <Accordion.Trigger>{item.header}</Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="py-4">
                This is the accordion content. You can place any content here such as text, lists,
                or even other components.
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    );
  },
};

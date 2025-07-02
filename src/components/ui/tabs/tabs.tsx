import type { ComponentProps } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { tv } from "tailwind-variants";

const tabsVariants = tv({
  slots: {
    root: "flex flex-col gap-2",
    list: "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-1",
    trigger:
      "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-1 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm",
    content: "bg-muted flex-1 rounded-lg p-4 outline-none",
  },
});

const { content, list, root, trigger } = tabsVariants();

const Root = ({ className, ...props }: ComponentProps<typeof TabsPrimitive.Root>) => {
  return <TabsPrimitive.Root className={root({ className })} data-slot="tabs" {...props} />;
};

const List = ({ className, ...props }: ComponentProps<typeof TabsPrimitive.List>) => {
  return <TabsPrimitive.List className={list({ className })} data-slot="tabs-list" {...props} />;
};

const Trigger = ({ className, ...props }: ComponentProps<typeof TabsPrimitive.Trigger>) => {
  return (
    <TabsPrimitive.Trigger className={trigger({ className })} data-slot="tabs-trigger" {...props} />
  );
};

const Content = ({ className, ...props }: ComponentProps<typeof TabsPrimitive.Content>) => {
  return (
    <TabsPrimitive.Content className={content({ className })} data-slot="tabs-content" {...props} />
  );
};

export const Tabs = { Root, List, Trigger, Content };

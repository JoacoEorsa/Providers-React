import type { ComponentProps } from "react";
import { useTranslation } from "react-i18next";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { tv } from "tailwind-variants";

import { Icons } from "@/components/ui";

const dialogVariants = tv({
  slots: {
    overlay:
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80",
    content:
      "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
    close:
      "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not-[class*='size-']]:size-4",
    header: "flex flex-col gap-2",
    footer: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
    title: "text-lg leading-none font-semibold",
    description: "text-muted-foreground text-sm",
  },
});

const { close, content, description, footer, header, overlay, title } = dialogVariants();

const Root = ({ ...props }: ComponentProps<typeof DialogPrimitive.Root>) => {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
};

const Trigger = ({ ...props }: ComponentProps<typeof DialogPrimitive.Trigger>) => {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
};

const Portal = ({ ...props }: ComponentProps<typeof DialogPrimitive.Portal>) => {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
};

const Close = ({ ...props }: ComponentProps<typeof DialogPrimitive.Close>) => {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
};

const Overlay = ({ ...props }: ComponentProps<typeof DialogPrimitive.Overlay>) => {
  return <DialogPrimitive.Overlay className={overlay()} data-slot="dialog-overlay" {...props} />;
};

const Content = ({
  children,
  isDismissible = true,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content> & {
  isDismissible?: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <Portal data-slot="dialog-portal">
      <Overlay />
      <DialogPrimitive.Content
        className={content()}
        data-slot="dialog-content"
        {...props}
        onEscapeKeyDown={(event) => {
          if (!isDismissible) {
            event.preventDefault();

            return;
          }

          return props.onEscapeKeyDown && props.onEscapeKeyDown(event);
        }}
        onInteractOutside={(event) => {
          if (!isDismissible) {
            event.preventDefault();

            return;
          }

          return props.onInteractOutside && props.onInteractOutside(event);
        }}
      >
        {children}
        {isDismissible ? (
          <DialogPrimitive.Close className={close()}>
            <Icons.Close />
            <span className="sr-only">{t("common.close")}</span>
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </Portal>
  );
};

const Header = ({ ...props }: ComponentProps<"div">) => {
  return <div className={header()} data-slot="dialog-header" {...props} />;
};

const Footer = ({ ...props }: ComponentProps<"div">) => {
  return <div className={footer()} data-slot="dialog-footer" {...props} />;
};

const Title = ({ ...props }: ComponentProps<typeof DialogPrimitive.Title>) => {
  return <DialogPrimitive.Title className={title()} data-slot="dialog-title" {...props} />;
};

const Description = ({ ...props }: ComponentProps<typeof DialogPrimitive.Description>) => {
  return (
    <DialogPrimitive.Description
      className={description()}
      data-slot="dialog-description"
      {...props}
    />
  );
};

export const Dialog = {
  Root,
  Close,
  Content,
  Description,
  Footer,
  Header,
  Title,
  Trigger,
};

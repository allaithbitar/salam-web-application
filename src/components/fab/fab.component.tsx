import React, { ComponentProps, ReactNode } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const defaultButtonClassname = "rounded-full p-0 size-11";

type TFabButton = {
  id: number;
} & (
  | {
      label?: string;
      icon: ReactNode;
      onClick: () => void;
      buttonProps?: ComponentProps<typeof Button>;
      renderButton?: never;
    }
  | {
      label?: never;
      icon?: never;
      onClick?: never;
      buttonProps?: never;
      renderButton: ({
        defaultClassname,
      }: {
        defaultClassname: string;
      }) => ReactNode;
    }
);
const Fab = ({ buttons = [] }: { buttons: TFabButton[] }) => {
  return (
    <div className="fixed bottom-5 left-5 flex flex-col gap-2">
      {buttons.map(
        ({ id, renderButton, buttonProps, onClick, icon, label }) => {
          if (renderButton)
            return renderButton({ defaultClassname: defaultButtonClassname });

          const { className, ...restButtonProps } = buttonProps;
          return (
            <Button
              onClick={onClick}
              key={id}
              className={cn(defaultButtonClassname, className)}
              {...restButtonProps}
            >
              {label}
              {icon}
            </Button>
          );
        },
      )}
    </div>
  );
};

export default Fab;

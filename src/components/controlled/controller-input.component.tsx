import React, { ReactNode } from "react";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseControllerProps,
  UseFormStateReturn,
} from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";

function ControlledInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  helperText,
  children,
  className,
}: {
  control: UseControllerProps<TFieldValues, TName>["control"];
  name: UseControllerProps<TFieldValues, TName>["name"];
  label?: string;
  helperText?: ReactNode;
  className?: string;
  children: (Props: {
    field: ControllerRenderProps<TFieldValues, TName>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<TFieldValues>;
  }) => ReactNode;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState, formState }) => (
        <FormItem className={cn("w-full", className)}>
          <FormLabel
            className={cn(
              "font-bold text-md",
              !fieldState.error?.message && "text-primary/90",
            )}
          >
            {label}
            {/* <span className="text-destructive/80 ms-1">*</span> */}
          </FormLabel>
          <div className="flex gap-2 items-center">
            <FormControl>
              {children({ field, fieldState, formState })}
            </FormControl>
          </div>
          {helperText && typeof helperText === "string" ? (
            <FormDescription>{helperText}</FormDescription>
          ) : (
            helperText
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default ControlledInput;

import React, { ComponentProps, ReactNode } from "react";
import { FieldPath, FieldValues, UseControllerProps } from "react-hook-form";
import { Input } from "../ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";

function ControlledTextField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  helperText,
  componentProps,
  actionArea,
}: {
  control: UseControllerProps<TFieldValues, TName>["control"];
  name: UseControllerProps<TFieldValues, TName>["name"];
  label: string;
  helperText?: ReactNode;
  componentProps?: ComponentProps<typeof Input>;
  actionArea?: ReactNode;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="w-full">
          <FormLabel
            className={cn(
              "font-bold text-md",
              !fieldState.error?.message && "text-primary/90",
            )}
          >
            {label}
          </FormLabel>
          <div className="flex gap-2 items-center">
            <FormControl>
              <Input {...field} {...componentProps} />
            </FormControl>
            {actionArea}
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

export default ControlledTextField;

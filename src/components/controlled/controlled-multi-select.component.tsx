import React, { ComponentProps, ReactNode } from "react";
import { FieldPath, FieldValues, UseControllerProps } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";
import { MultiSelect } from "../ui/multi-select";

function ControlledMutliSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  helperText,
  options,
}: {
  control: UseControllerProps<TFieldValues, TName>["control"];
  name: UseControllerProps<TFieldValues, TName>["name"];
  label: string;
  helperText?: ReactNode;
  options: ComponentProps<typeof MultiSelect>["options"];
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
          <FormControl>
            <MultiSelect
              placeholder=""
              options={options}
              onValueChange={(v) => field.onChange(v)}
            />
          </FormControl>
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

export default ControlledMutliSelect;

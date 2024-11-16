import { ReactNode } from "react";
import { FieldPath, FieldValues, UseControllerProps } from "react-hook-form";

export type TControlledComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = (T: {
  control: any;
  name: UseControllerProps<TFieldValues, TName>["name"];
  label: string;
  helperText?: ReactNode;
}) => ReactNode;

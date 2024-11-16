"use client";
import { DirectionProvider as RadixDirectionProvider } from "@radix-ui/react-direction";
import { ReactNode } from "react";

const DirectionProvider = ({ children }: { children: ReactNode }) => (
  <RadixDirectionProvider dir="rtl">{children}</RadixDirectionProvider>
);

export default DirectionProvider;

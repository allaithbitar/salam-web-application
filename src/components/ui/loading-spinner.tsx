import { cn } from "@/lib/utils";
import { LoaderCircleIcon } from "lucide-react";

export const LoadingSpinner = ({
  className,
  size = 50,
}: {
  className?: string;
  size?: number;
}) => {
  return (
    <LoaderCircleIcon
      className={cn("text-primary animate-spin", className)}
      size={size}
    />
  );
};

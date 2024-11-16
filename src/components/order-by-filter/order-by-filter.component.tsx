import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

const OrderByFilter = ({
  value,
  onChange,
  options,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  className?: string;
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="ترتيب حسب" />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => {
          const ascValue = `asc_${o.value}`;
          const ascLabel = `${o.label} - تصاعديا`;
          const dscValue = `dsc_${o.value}`;
          const dscLabel = `${o.label} - تنازليا`;
          return (
            <React.Fragment key={o.value}>
              <SelectItem value={dscValue}>{dscLabel}</SelectItem>
              <SelectItem value={ascValue}>{ascLabel}</SelectItem>
            </React.Fragment>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default OrderByFilter;

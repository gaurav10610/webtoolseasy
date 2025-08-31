import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { map } from "lodash-es";

export interface SelectItem {
  key: string;
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectItem[];
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  selectLabel: string;
  className?: string;
}

export function SelectWithLabel({
  options,
  value,
  onChange,
  selectLabel,
  className = "",
}: SelectProps) {
  return (
    <div className={className}>
      <FormControl variant="outlined" size="small" fullWidth>
        <InputLabel size="small">{selectLabel}</InputLabel>
        <Select
          label={selectLabel}
          onChange={onChange}
          size="small"
          value={value}
        >
          {map(options, (item) => (
            <MenuItem key={item.key} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { map } from "lodash-es";

interface SelectItem {
  key: string;
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectItem[];
  defaultOption: SelectItem;
  onChange: (event: SelectChangeEvent<string>) => void;
  selectLabel: string;
  classes?: string;
}

export function SelectWithProps({
  defaultOption,
  options,
  onChange,
  selectLabel,
  classes = "",
}: SelectProps) {
  return (
    <div className={`w-[8rem] ${classes}`}>
      <FormControl variant="outlined" size="small" fullWidth>
        <InputLabel size="small">Output Format</InputLabel>
        <Select
          value={defaultOption.value}
          label={selectLabel}
          onChange={onChange}
          size="small"
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

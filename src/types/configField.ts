export type ConfigFieldType = "select" | "number" | "toggle" | "slider";

export interface BaseConfigField {
  type: ConfigFieldType;
  key: string;
  label: string;
  helpText?: string;
}

export interface SelectConfigField extends BaseConfigField {
  type: "select";
  options: { label: string; value: string | number }[];
}

export interface NumberConfigField extends BaseConfigField {
  type: "number";
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export interface ToggleConfigField extends BaseConfigField {
  type: "toggle";
}

export interface SliderConfigField extends BaseConfigField {
  type: "slider";
  min: number;
  max: number;
  step?: number;
  unit?: string;
}

export type ConfigField =
  | SelectConfigField
  | NumberConfigField
  | ToggleConfigField
  | SliderConfigField;

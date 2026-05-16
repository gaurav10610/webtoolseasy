import { ConfigField } from "./configField";
import { InfraService } from "@/data/pricingEngine";

export interface ServiceConfig {
  service: InfraService | string;
  displayName: string;
  category: string;
  icon: string;
  description: string;
  color: string; // Tailwind gradient classes
  configSchema: ConfigField[];
  defaultConfig: Record<string, any>;
}

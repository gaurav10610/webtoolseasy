export interface DescriptionBlock {
  heading?: string;
  listData?: string[];
  blockData?: string[];
  links?: DescriptionLink[];
}

export interface DescriptionLink {
  displayText: string;
  url: string;
}

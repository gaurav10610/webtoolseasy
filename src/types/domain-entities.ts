export interface PageMetadata {
  title: string;
  description: string;
}

export interface UpdatedBy {
  name: string;
  gender: string;
}

export interface BlogEntity {
  pageMetadata: PageMetadata;
  html: string;
  heading: string;
  pageUrl: string;
  updatedAt: string;
  updatedBy: UpdatedBy;
  tags: string[];
  isDisabled: string;
}

export interface BlogEntityOverview {
  heading: string;
  pageUrl: string;
  updatedAt: string;
  updatedBy: UpdatedBy;
}

export interface ApplicationState {
  /**
   * save application state
   */
  saveState(): Promise<void>;

  /**
   * restore application state
   */
  restoreState(): void;
}

export interface ToolComponentProps {
  hostname?: string;
  queryParams: { [key: string]: string };
}

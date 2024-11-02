/* eslint-disable @typescript-eslint/no-explicit-any */
export enum PopupFormType {
  VIDEO_CONVERT_SETTINGS = "video-convert-sttings",
}

export enum PopupFormElementType {
  DROPDOWN = "dropdown",
  BUTTON = "button",
}

export interface PopupFormElement {
  type: PopupFormElementType;
  data: any;
  propertyName: string;
}

export interface PopupFormContextColumn {
  element: PopupFormElement;
}

export interface PopupFormContextRow {
  elements: PopupFormElement[];
}

export interface PopupFormContext {
  rows: PopupFormContextRow[];
  type: PopupFormType;
  referenceId: string;
}

export interface PopupFormSubmitResult {
  type: PopupFormType;
  data: any;
  referenceId: string;
}

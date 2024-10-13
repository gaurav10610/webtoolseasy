import { nanoid } from "nanoid";
import * as _ from "lodash-es";

export function formatDate(date?: Date): string {
  if (_.isNil(date)) {
    return "";
  }

  const padStart = (num: number): string => num.toString().padStart(2, "0");

  const day = padStart(date.getDate());
  const month = padStart(date.getMonth() + 1);
  const year = date.getFullYear().toString();

  return `${day}-${month}-${year}`;
}

export function getRandomId(): string {
  return nanoid();
}

import { nanoid as baseNanoid } from "nanoid";

export function nanoid(size = 8): string {
  return baseNanoid(size);
}

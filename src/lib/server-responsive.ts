import MobileDetect from "mobile-detect";
import { headers } from "next/headers";

export function isMobileDevice() {
  const userAgent = headers().get("user-agent") || "";
  const md = new MobileDetect(userAgent);
  return !!md.mobile();
}

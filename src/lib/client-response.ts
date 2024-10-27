"use client";

import MobileDetect from "mobile-detect";

export function isMobileDevice() {
  const userAgent = navigator.userAgent || "";
  const md = new MobileDetect(userAgent);
  return !!md.mobile();
}

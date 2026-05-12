export interface PackDeprecationRule {
  oldSlug: string;
  newSlug?: string;
  deprecateAfter: string; // ISO date
  sunsetAfter: string; // ISO date
  reason: string;
}

export interface DeprecationResolution {
  status: "active" | "deprecated" | "sunset" | "not_found";
  redirectTo?: string;
  message: string;
}

export function _resolvePackDeprecation(
  slug: string,
  rules: PackDeprecationRule[],
  now: Date = new Date(),
): DeprecationResolution {
  const rule = rules.find((item) => item.oldSlug === slug);
  if (!rule) {
    return {
      status: "not_found",
      message: `No deprecation rule for ${slug}`,
    };
  }

  const deprecateAt = new Date(rule.deprecateAfter);
  const sunsetAt = new Date(rule.sunsetAfter);

  if (now < deprecateAt) {
    return {
      status: "active",
      message: `${slug} remains active until ${rule.deprecateAfter}`,
    };
  }

  if (now >= deprecateAt && now < sunsetAt) {
    return {
      status: "deprecated",
      redirectTo: rule.newSlug,
      message: `${slug} is deprecated: ${rule.reason}`,
    };
  }

  return {
    status: "sunset",
    redirectTo: rule.newSlug,
    message: `${slug} is sunset and should redirect`,
  };
}

export function _buildRedirectMap(
  rules: PackDeprecationRule[],
  now: Date = new Date(),
): Record<string, string> {
  const redirects: Record<string, string> = {};

  for (const rule of rules) {
    const resolution = _resolvePackDeprecation(rule.oldSlug, [rule], now);
    if (
      (resolution.status === "deprecated" || resolution.status === "sunset") &&
      resolution.redirectTo
    ) {
      redirects[`/workflows/${rule.oldSlug}`] =
        `/workflows/${resolution.redirectTo}`;
    }
  }

  return redirects;
}

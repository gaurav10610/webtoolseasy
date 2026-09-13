import React from "react";

const sizeClasses = {
  inherit: "w-[1em] h-[1em]",
  small: "w-5 h-5",
  medium: "w-6 h-6",
  large: "w-8 h-8",
} as const;

export function CustomSvgIcon({
  children,
  size = "small",
  className = "",
}: Readonly<{
  children: React.ReactNode;
  size?: "inherit" | "large" | "medium" | "small";
  sx?: Record<string, unknown>;
  className?: string;
}>) {
  const normalizedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement<React.SVGProps<SVGSVGElement>>(child)) {
      return child;
    }

    return React.cloneElement(child, {
      width: "100%",
      height: "100%",
      focusable: "false",
      "aria-hidden": true,
    });
  });

  return (
    <span
      className={`inline-flex items-center justify-center flex-shrink-0 leading-none [&>svg]:block [&>svg]:w-full [&>svg]:h-full ${sizeClasses[size]} ${className}`}
    >
      {normalizedChildren}
    </span>
  );
}

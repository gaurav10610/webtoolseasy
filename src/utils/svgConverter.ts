export type SvgConverterOptions = {
  useCurrentColor?: boolean;
  isReactNative?: boolean;
  typescript?: boolean;
};

// Map of SVG kebab-case attributes to React camelCase
const attrMap: Record<string, string> = {
  "accent-height": "accentHeight",
  "alignment-baseline": "alignmentBaseline",
  "arabic-form": "arabicForm",
  "baseline-shift": "baselineShift",
  "cap-height": "capHeight",
  "clip-path": "clipPath",
  "clip-rule": "clipRule",
  "color-interpolation": "colorInterpolation",
  "color-interpolation-filters": "colorInterpolationFilters",
  "color-profile": "colorProfile",
  "color-rendering": "colorRendering",
  "dominant-baseline": "dominantBaseline",
  "enable-background": "enableBackground",
  "fill-opacity": "fillOpacity",
  "fill-rule": "fillRule",
  "flood-color": "floodColor",
  "flood-opacity": "floodOpacity",
  "font-family": "fontFamily",
  "font-size": "fontSize",
  "font-size-adjust": "fontSizeAdjust",
  "font-stretch": "fontStretch",
  "font-style": "fontStyle",
  "font-variant": "fontVariant",
  "font-weight": "fontWeight",
  "glyph-name": "glyphName",
  "glyph-orientation-horizontal": "glyphOrientationHorizontal",
  "glyph-orientation-vertical": "glyphOrientationVertical",
  "horiz-adv-x": "horizAdvX",
  "horiz-origin-x": "horizOriginX",
  "image-rendering": "imageRendering",
  "letter-spacing": "letterSpacing",
  "lighting-color": "lightingColor",
  "marker-end": "markerEnd",
  "marker-mid": "markerMid",
  "marker-start": "markerStart",
  "overline-position": "overlinePosition",
  "overline-thickness": "overlineThickness",
  "paint-order": "paintOrder",
  "panose-1": "panose1",
  "pointer-events": "pointerEvents",
  "rendering-intent": "renderingIntent",
  "shape-rendering": "shapeRendering",
  "stop-color": "stopColor",
  "stop-opacity": "stopOpacity",
  "strikethrough-position": "strikethroughPosition",
  "strikethrough-thickness": "strikethroughThickness",
  "stroke-dasharray": "strokeDasharray",
  "stroke-dashoffset": "strokeDashoffset",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-miterlimit": "strokeMiterlimit",
  "stroke-opacity": "strokeOpacity",
  "stroke-width": "strokeWidth",
  "text-anchor": "textAnchor",
  "text-decoration": "textDecoration",
  "text-rendering": "textRendering",
  "underline-position": "underlinePosition",
  "underline-thickness": "underlineThickness",
  "unicode-bidi": "unicodeBidi",
  "unicode-range": "unicodeRange",
  "units-per-em": "unitsPerEm",
  "v-alphabetic": "vAlphabetic",
  "v-hanging": "vHanging",
  "v-ideographic": "vIdeographic",
  "v-mathematical": "vMathematical",
  "vector-effect": "vectorEffect",
  "vert-adv-y": "vertAdvY",
  "vert-origin-x": "vertOriginX",
  "vert-origin-y": "vertOriginY",
  "word-spacing": "wordSpacing",
  "writing-mode": "writingMode",
  "xmlns:xlink": "xmlnsXlink",
  "x-height": "xHeight",
  "class": "className"
};

function kebabToCamel(str: string): string {
  if (str.startsWith("data-") || str.startsWith("aria-")) return str;
  return attrMap[str] || str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

function nodeToJsx(node: Element, indent: string, options: SvgConverterOptions): string {
  let jsx = "";
  const tagName = options.isReactNative 
    ? node.tagName.charAt(0).toUpperCase() + node.tagName.slice(1)
    : node.tagName;

  jsx += `${indent}<${tagName}`;

  // Process attributes
  for (const attr of Array.from(node.attributes)) {
    let name = kebabToCamel(attr.name);
    let value = attr.value;

    if (options.useCurrentColor && (name === "fill" || name === "stroke")) {
      if (value !== "none" && value !== "transparent") {
        value = "currentColor";
      }
    }

    if (tagName.toLowerCase() === "svg" && name === "width") {
      value = "{props.size || 24}";
    } else if (tagName.toLowerCase() === "svg" && name === "height") {
      value = "{props.size || 24}";
    } else if (tagName.toLowerCase() === "svg" && name === "className") {
      // Skip hardcoded class for the wrapper
      continue;
    } else {
      value = `"${value}"`;
    }

    jsx += ` ${name}=${value}`;
  }

  // Add props spread to root SVG
  if (tagName.toLowerCase() === "svg") {
    jsx += ` className={props.className} {...props}`;
  }

  if (node.childNodes.length === 0) {
    jsx += " />\n";
  } else {
    jsx += ">\n";
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === 1) { // Element node
        jsx += nodeToJsx(child as Element, indent + "  ", options);
      }
    }
    jsx += `${indent}</${tagName}>\n`;
  }

  return jsx;
}

export function convertSvgToReact(svgString: string, options: SvgConverterOptions = {}): string {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString.trim(), "image/svg+xml");
    
    const parserError = doc.querySelector("parsererror");
    if (parserError) {
      throw new Error("Invalid SVG markup");
    }

    const svgElement = doc.querySelector("svg");
    if (!svgElement) {
      throw new Error("No <svg> element found");
    }

    const jsxBody = nodeToJsx(svgElement, "    ", options);
    
    let imports = "";
    if (options.isReactNative) {
      // Find unique tags
      const tags = new Set<string>();
      const walk = (node: Element) => {
        tags.add(node.tagName.charAt(0).toUpperCase() + node.tagName.slice(1));
        Array.from(node.children).forEach(walk);
      };
      walk(svgElement);
      const components = Array.from(tags).join(", ");
      imports = `import { ${components} } from "react-native-svg";\n\n`;
    }

    let propsType = "";
    if (options.typescript) {
      if (options.isReactNative) {
        propsType = "import { SvgProps } from \"react-native-svg\";\n\ntype IconProps = SvgProps & { size?: number | string };\n\n";
      } else {
        propsType = "import { SVGProps } from \"react\";\n\ntype IconProps = SVGProps<SVGSVGElement> & { size?: number | string };\n\n";
      }
    }

    const funcSignature = options.typescript 
      ? `export const Icon = (props: IconProps) => (`
      : `export const Icon = (props) => (`;

    return `${imports}${propsType}${funcSignature}\n${jsxBody});\n`;
  } catch (error: any) {
    throw new Error(error.message || "Failed to parse SVG");
  }
}

export function jsonToTypescript(jsonObj: any, rootName = "Root"): string {
  let interfaces: Record<string, string> = {};

  function getType(val: any): string {
    if (val === null) return "null";
    if (Array.isArray(val)) {
      if (val.length === 0) return "any[]";
      return `${getType(val[0])}[]`;
    }
    if (typeof val === "object") {
      return "object";
    }
    return typeof val;
  }

  function parseObject(obj: any, name: string) {
    if (typeof obj !== "object" || obj === null || Array.isArray(obj)) return;

    let props = "";
    for (const [key, value] of Object.entries(obj)) {
      let type = getType(value);
      
      if (type === "object") {
        const nestedName = key.charAt(0).toUpperCase() + key.slice(1);
        parseObject(value, nestedName);
        type = nestedName;
      } else if (type === "object[]" && Array.isArray(value) && value.length > 0) {
        const nestedName = key.charAt(0).toUpperCase() + key.slice(1) + "Item";
        parseObject(value[0], nestedName);
        type = `${nestedName}[]`;
      }
      
      // Determine if key needs quotes
      const safeKey = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(key) ? key : `"${key}"`;
      props += `  ${safeKey}: ${type};\n`;
    }
    
    interfaces[name] = `export interface ${name} {\n${props}}\n`;
  }

  if (Array.isArray(jsonObj)) {
    if (jsonObj.length > 0 && typeof jsonObj[0] === "object" && jsonObj[0] !== null) {
      parseObject(jsonObj[0], rootName + "Item");
      return `export type ${rootName} = ${rootName}Item[];\n\n` + Object.values(interfaces).join("\n");
    }
    return `export type ${rootName} = ${getType(jsonObj[0])}[];\n`;
  } else if (typeof jsonObj === "object" && jsonObj !== null) {
    parseObject(jsonObj, rootName);
    // Reverse so the root is at the bottom or top depending on preference. Let's return as is.
    return Object.values(interfaces).reverse().join("\n");
  }

  return `export type ${rootName} = ${typeof jsonObj};\n`;
}

export function jsonToZod(jsonObj: any, rootName = "rootSchema"): string {
  function parseValue(val: any, indentLevel = 1): string {
    const ind = "  ".repeat(indentLevel);
    if (val === null) return "z.null()";
    if (typeof val === "string") return "z.string()";
    if (typeof val === "number") return "z.number()";
    if (typeof val === "boolean") return "z.boolean()";
    
    if (Array.isArray(val)) {
      if (val.length === 0) return "z.array(z.any())";
      return `z.array(${parseValue(val[0], indentLevel)})`;
    }
    
    if (typeof val === "object") {
      let props = "";
      for (const [key, value] of Object.entries(val)) {
        const safeKey = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(key) ? key : `"${key}"`;
        props += `${ind}  ${safeKey}: ${parseValue(value, indentLevel + 1)},\n`;
      }
      return `z.object({\n${props}${ind}})`;
    }
    
    return "z.any()";
  }

  const importStmt = `import { z } from "zod";\n\n`;
  
  if (Array.isArray(jsonObj) || (typeof jsonObj === "object" && jsonObj !== null)) {
    return importStmt + `export const ${rootName} = ${parseValue(jsonObj, 0)};\n\nexport type ${rootName.charAt(0).toUpperCase() + rootName.slice(1)}Type = z.infer<typeof ${rootName}>;\n`;
  }

  return importStmt + `export const ${rootName} = ${parseValue(jsonObj, 0)};\n`;
}

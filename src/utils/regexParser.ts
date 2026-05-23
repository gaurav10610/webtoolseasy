import * as regexpTree from "regexp-tree";

export type RegexExplanationNode = {
  type: string;
  value?: string;
  description: string;
  children?: RegexExplanationNode[];
};

function mapAstToExplanation(node: any): RegexExplanationNode {
  if (!node) return { type: "Unknown", description: "Unknown element" };

  switch (node.type) {
    case "RegExp":
      return {
        type: "Expression",
        description: `Regular Expression with flags: ${node.flags || 'none'}`,
        children: node.body ? [mapAstToExplanation(node.body)] : []
      };
    
    case "Alternative":
      return {
        type: "Alternative",
        description: "Matches all of the following in sequence",
        children: node.expressions.map(mapAstToExplanation)
      };

    case "Disjunction":
      return {
        type: "Disjunction",
        description: "Matches either the left or the right",
        children: [mapAstToExplanation(node.left), mapAstToExplanation(node.right)]
      };

    case "Group":
      if (node.capturing) {
        return {
          type: "Capturing Group",
          description: `Captures the matched sub-expression (Group ${node.number}${node.name ? ` / <${node.name}>` : ''})`,
          children: node.expression ? [mapAstToExplanation(node.expression)] : []
        };
      } else {
        return {
          type: "Non-Capturing Group",
          description: "Groups the sub-expression without capturing it",
          children: node.expression ? [mapAstToExplanation(node.expression)] : []
        };
      }

    case "Assertion":
      if (node.kind === "^") return { type: "Start Anchor", description: "Matches the beginning of the string (or line)" };
      if (node.kind === "$") return { type: "End Anchor", description: "Matches the end of the string (or line)" };
      if (node.kind === "\\b") return { type: "Word Boundary", description: "Matches a word boundary position" };
      if (node.kind === "\\B") return { type: "Non-Word Boundary", description: "Matches a position that is not a word boundary" };
      if (node.kind === "Lookahead") return {
        type: `${node.negative ? 'Negative' : 'Positive'} Lookahead`,
        description: `Matches if followed by ${node.negative ? 'NOT ' : ''}this expression`,
        children: node.assertion ? [mapAstToExplanation(node.assertion)] : []
      };
      if (node.kind === "Lookbehind") return {
        type: `${node.negative ? 'Negative' : 'Positive'} Lookbehind`,
        description: `Matches if preceded by ${node.negative ? 'NOT ' : ''}this expression`,
        children: node.assertion ? [mapAstToExplanation(node.assertion)] : []
      };
      return { type: "Assertion", description: `Assertion: ${node.kind}` };

    case "Repetition":
      let quant = "unknown times";
      if (node.quantifier.kind === "*") quant = "0 or more times";
      else if (node.quantifier.kind === "+") quant = "1 or more times";
      else if (node.quantifier.kind === "?") quant = "0 or 1 time (optional)";
      else if (node.quantifier.kind === "Range") {
        if (node.quantifier.to === undefined) quant = `${node.quantifier.from} or more times`;
        else if (node.quantifier.from === node.quantifier.to) quant = `exactly ${node.quantifier.from} times`;
        else quant = `between ${node.quantifier.from} and ${node.quantifier.to} times`;
      }
      
      const lazy = !node.quantifier.greedy ? " (lazy)" : "";

      return {
        type: "Repetition",
        description: `Repeats the previous element ${quant}${lazy}`,
        children: [mapAstToExplanation(node.expression)]
      };

    case "CharacterClass":
      return {
        type: "Character Class",
        description: `Matches ${node.negative ? 'ANY character EXCEPT' : 'ONE of'} the following`,
        children: node.expressions.map(mapAstToExplanation)
      };
      
    case "ClassRange":
      return {
        type: "Character Range",
        value: `${node.from.value}-${node.to.value}`,
        description: `Matches a character in the range '${node.from.value}' to '${node.to.value}'`
      };

    case "Char":
      if (node.kind === "meta") {
        let metaDesc = `Meta character: ${node.value}`;
        if (node.value === ".") metaDesc = "Matches any character (except newlines)";
        if (node.value === "\\d") metaDesc = "Matches any digit (0-9)";
        if (node.value === "\\D") metaDesc = "Matches any non-digit";
        if (node.value === "\\w") metaDesc = "Matches any word character (a-z, A-Z, 0-9, _)";
        if (node.value === "\\W") metaDesc = "Matches any non-word character";
        if (node.value === "\\s") metaDesc = "Matches any whitespace character";
        if (node.value === "\\S") metaDesc = "Matches any non-whitespace character";
        return { type: "Meta Character", value: node.value, description: metaDesc };
      }
      return {
        type: "Character",
        value: node.value,
        description: `Matches the literal character '${node.value}'`
      };
      
    case "Backreference":
      return {
        type: "Backreference",
        description: `Matches the same text as most recently matched by group ${node.number}${node.reference ? ` / ${node.reference}` : ''}`
      };

    default:
      return { type: node.type, description: `Parsed as ${node.type}` };
  }
}

export function parseRegexExplanation(regexString: string): { ast?: RegexExplanationNode, error?: string } {
  try {
    // Basic formatting to ensure it starts/ends with slashes for the parser
    let toParse = regexString.trim();
    if (!toParse.startsWith("/")) {
      toParse = `/${toParse}/`;
    }
    const ast = regexpTree.parse(toParse);
    return { ast: mapAstToExplanation(ast) };
  } catch (err: any) {
    return { error: err.message || "Invalid Regular Expression syntax" };
  }
}

export function evaluateRegexMatches(regexString: string, testString: string): { match: string, index: number, groups: Record<string, string> }[] | null {
  try {
    let flags = "g";
    let pattern = regexString;
    
    // Extract flags if present
    const match = regexString.match(/^\/(.*)\/([a-z]*)$/);
    if (match) {
      pattern = match[1];
      flags = match[2].includes('g') ? match[2] : match[2] + 'g';
    }

    const re = new RegExp(pattern, flags);
    const matches: any[] = [];
    
    let result;
    // To prevent infinite loops with zero-width matches
    let lastIndex = -1;
    
    while ((result = re.exec(testString)) !== null) {
      if (re.lastIndex === lastIndex) {
        re.lastIndex++;
        continue;
      }
      lastIndex = re.lastIndex;
      
      matches.push({
        match: result[0],
        index: result.index,
        groups: result.groups || {}
      });
    }
    return matches;
  } catch {
    return null; // Invalid regex won't match anything
  }
}

import YAML from 'yaml';

export type ConversionDirection = 'yaml-to-json' | 'json-to-yaml';

export interface ConvertResult {
  output: string;
  error?: string;
  detectedDirection?: ConversionDirection;
}

export function convert(input: string, direction: ConversionDirection): ConvertResult {
  if (!input.trim()) {
    return { output: '' };
  }

  try {
    if (direction === 'yaml-to-json') {
      const parsed = YAML.parse(input);
      if (parsed === undefined || typeof parsed === 'string' && parsed === input.trim()) {
         return { output: '', error: 'Input is not valid YAML or is just a string' };
      }
      return { output: JSON.stringify(parsed, null, 2) };
    } else {
      // JSON to YAML
      const parsed = JSON.parse(input);
      return { output: YAML.stringify(parsed, { indent: 2 }) };
    }
  } catch (err: any) {
    return { output: '', error: err.message || 'Conversion failed' };
  }
}

export function autoDetectAndConvert(input: string, currentDirection: ConversionDirection): ConvertResult {
  if (!input.trim()) {
    return { output: '' };
  }
  
  // Quick heuristic: If it starts with { or [, it's likely JSON
  const trimmed = input.trim();
  const startsWithJson = trimmed.startsWith('{') || trimmed.startsWith('[');
  
  if (startsWithJson && currentDirection !== 'json-to-yaml') {
    // Try to parse as JSON first
    try {
      JSON.parse(trimmed);
      // If it parsed successfully as JSON, we should flip the direction to json-to-yaml and convert
      return {
        ...convert(input, 'json-to-yaml'),
        detectedDirection: 'json-to-yaml'
      };
    } catch {
      // Fall through to current direction
    }
  } else if (!startsWithJson && currentDirection !== 'yaml-to-json') {
    // If it doesn't look like JSON and current is json-to-yaml, try parsing as YAML
    try {
      const parsed = YAML.parse(trimmed);
      if (parsed !== undefined && typeof parsed !== 'string') {
        return {
          ...convert(input, 'yaml-to-json'),
          detectedDirection: 'yaml-to-json'
        };
      }
    } catch {
      // Fall through to current direction
    }
  }
  
  return convert(input, currentDirection);
}

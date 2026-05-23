import { v4 as uuidv4, v7 as uuidv7 } from 'uuid';
import { ulid, decodeTime } from 'ulid';

export type IdType = 'uuidv4' | 'uuidv7' | 'ulid';

export function generateIds(type: IdType, count: number): string[] {
  const ids: string[] = [];
  for (let i = 0; i < count; i++) {
    if (type === 'uuidv4') {
      ids.push(uuidv4());
    } else if (type === 'uuidv7') {
      ids.push(uuidv7());
    } else if (type === 'ulid') {
      ids.push(ulid());
    }
  }
  return ids;
}

export interface DecodedId {
  isValid: boolean;
  type?: 'UUIDv7' | 'ULID' | 'Unknown/NotTimeSortable';
  timestamp?: number;
  date?: Date;
  error?: string;
}

export function decodeId(idStr: string): DecodedId {
  if (!idStr) return { isValid: false, error: 'Empty ID' };
  
  const trimmed = idStr.trim();
  
  // Check ULID (26 chars base32)
  if (trimmed.length === 26 && /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/i.test(trimmed)) {
    try {
      const time = decodeTime(trimmed.toUpperCase());
      return {
        isValid: true,
        type: 'ULID',
        timestamp: time,
        date: new Date(time)
      };
    } catch (e) {
      return { isValid: false, error: 'Invalid ULID' };
    }
  }
  
  // Check UUID (8-4-4-4-12)
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(trimmed)) {
    // Check version (the 13th hex char is the version)
    const version = trimmed.charAt(14);
    
    if (version === '7') {
      // UUIDv7 timestamp extraction: first 48 bits (first 8 hex chars + next 4)
      const hexTime = trimmed.substring(0, 8) + trimmed.substring(9, 13);
      const timeMs = parseInt(hexTime, 16);
      return {
        isValid: true,
        type: 'UUIDv7',
        timestamp: timeMs,
        date: new Date(timeMs)
      };
    } else {
      return {
        isValid: true,
        type: 'Unknown/NotTimeSortable',
        error: `Valid UUIDv${version}, but does not contain a standard creation timestamp.`
      };
    }
  }
  
  return { isValid: false, error: 'Format not recognized' };
}

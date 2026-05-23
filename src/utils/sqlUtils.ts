import { format, SqlLanguage } from 'sql-formatter';

export type KeywordCase = 'upper' | 'lower' | 'preserve';

export interface SqlFormatterOptions {
  dialect: SqlLanguage;
  keywordCase: KeywordCase;
  tabWidth: number;
  useTabs: boolean;
  linesBetweenQueries: number;
}

export interface SqlFormatResult {
  formattedSql: string;
  error?: string;
}

export function formatSql(sql: string, options: SqlFormatterOptions): SqlFormatResult {
  if (!sql.trim()) {
    return { formattedSql: '' };
  }

  try {
    const formattedSql = format(sql, {
      language: options.dialect,
      keywordCase: options.keywordCase,
      tabWidth: options.tabWidth,
      useTabs: options.useTabs,
      linesBetweenQueries: options.linesBetweenQueries,
    });
    return { formattedSql };
  } catch (error: any) {
    // Return the original SQL and the error message
    return { 
      formattedSql: sql, 
      error: error.message || 'Failed to parse SQL'
    };
  }
}

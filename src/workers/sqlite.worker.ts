import initSqlJs, { Database } from 'sql.js';
import Papa from 'papaparse';

let db: Database | null = null;
let dbInitialized = false;

// Initialize SQL.js
async function initDb() {
  if (dbInitialized) return;
  const SQL = await initSqlJs({
    // Needs to fetch the WASM file from the public folder
    locateFile: file => `/${file}`
  });
  db = new SQL.Database();
  dbInitialized = true;
  self.postMessage({ type: 'READY' });
}

self.onmessage = async (e: MessageEvent) => {
  const { type, payload, id } = e.data;

  if (type === 'INIT') {
    try {
      await initDb();
    } catch (err: any) {
      self.postMessage({ type: 'ERROR', error: err.message, id });
    }
    return;
  }

  if (!dbInitialized || !db) {
    self.postMessage({ type: 'ERROR', error: 'Database not initialized', id });
    return;
  }

  try {
    switch (type) {
      case 'EXEC': {
        const results = db.exec(payload.sql);
        // results is an array of objects { columns: string[], values: any[][] }
        self.postMessage({ type: 'SUCCESS', data: results, id });
        break;
      }
      
      case 'IMPORT_CSV': {
        const { csvText, tableName } = payload;
        
        // Parse CSV using PapaParse
        const parsed = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true, // auto convert numbers
        });

        if (parsed.errors.length > 0 && parsed.data.length === 0) {
          throw new Error('Failed to parse CSV: ' + parsed.errors[0].message);
        }

        const data = parsed.data as Record<string, any>[];
        if (data.length === 0) {
          throw new Error('CSV is empty');
        }

        const columns = Object.keys(data[0]);
        if (columns.length === 0) {
          throw new Error('No columns found in CSV');
        }

        // Sanitize table name and column names
        const safeTableName = tableName.replace(/[^a-zA-Z0-9_]/g, '_');
        const safeColumns = columns.map(c => c.replace(/[^a-zA-Z0-9_]/g, '_'));

        // Determine simple schema (everything is TEXT for simplicity, except if we want to infer types)
        // Let's infer type from first row
        const schema = safeColumns.map((col, i) => {
          const val = data[0][columns[i]];
          let type = 'TEXT';
          if (typeof val === 'number') type = Number.isInteger(val) ? 'INTEGER' : 'REAL';
          else if (typeof val === 'boolean') type = 'INTEGER'; // SQLite has no boolean
          return `"${col}" ${type}`;
        });

        const createTableSql = `CREATE TABLE IF NOT EXISTS "${safeTableName}" (${schema.join(', ')});`;
        db.run(createTableSql);

        // Prepare insert statement
        const placeholders = safeColumns.map(() => '?').join(', ');
        const insertSql = `INSERT INTO "${safeTableName}" ("${safeColumns.join('", "')}") VALUES (${placeholders})`;
        
        // Use a transaction for bulk insert
        db.run('BEGIN TRANSACTION;');
        const stmt = db.prepare(insertSql);
        
        try {
          for (const row of data) {
            const values = columns.map(col => {
              const val = row[col];
              if (typeof val === 'boolean') return val ? 1 : 0;
              return val;
            });
            stmt.run(values);
          }
        } finally {
          stmt.free();
        }
        db.run('COMMIT;');
        
        // Return table info
        const tableInfo = db.exec(`PRAGMA table_info("${safeTableName}");`);
        const rowCount = db.exec(`SELECT COUNT(*) as count FROM "${safeTableName}";`);
        
        self.postMessage({ 
          type: 'SUCCESS', 
          data: {
            tableName: safeTableName,
            columns: safeColumns,
            rowsInserted: rowCount[0].values[0][0]
          }, 
          id 
        });
        break;
      }
      
      case 'GET_TABLES': {
        const results = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';");
        self.postMessage({ type: 'SUCCESS', data: results, id });
        break;
      }

      default:
        self.postMessage({ type: 'ERROR', error: `Unknown command ${type}`, id });
    }
  } catch (err: any) {
    // Make sure we catch execution errors
    self.postMessage({ type: 'ERROR', error: err.message, id });
  }
};

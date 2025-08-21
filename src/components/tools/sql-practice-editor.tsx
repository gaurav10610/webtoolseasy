"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Alert,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tooltip,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import StorageIcon from "@mui/icons-material/Storage";
import TableViewIcon from "@mui/icons-material/TableView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SchemaIcon from "@mui/icons-material/Schema";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";

// SQL.js types - simplified
interface Database {
  exec(sql: string): ExecResult[];
  run(sql: string, params?: unknown[]): void;
  export(): Uint8Array;
  close(): void;
}

interface ExecResult {
  columns: string[];
  values: unknown[][];
}

// Sample data for the database
const sampleTables = {
  employees: {
    name: "employees",
    schema: {
      id: "INTEGER PRIMARY KEY",
      name: "TEXT NOT NULL",
      department_id: "INTEGER",
      salary: "DECIMAL(10,2)",
      hire_date: "DATE",
      email: "TEXT UNIQUE",
    },
    data: [
      [1, "John Doe", 1, 75000, "2020-01-15", "john.doe@company.com"],
      [2, "Jane Smith", 2, 68000, "2019-06-20", "jane.smith@company.com"],
      [3, "Mike Johnson", 1, 82000, "2018-03-10", "mike.johnson@company.com"],
      [4, "Sarah Wilson", 3, 71000, "2021-11-08", "sarah.wilson@company.com"],
      [5, "David Brown", 2, 64000, "2022-02-28", "david.brown@company.com"],
      [6, "Lisa Davis", 1, 79000, "2017-09-12", "lisa.davis@company.com"],
      [7, "Tom Anderson", 3, 72000, "2020-07-03", "tom.anderson@company.com"],
      [8, "Emily Taylor", 2, 66000, "2021-05-17", "emily.taylor@company.com"],
    ],
  },
  departments: {
    name: "departments",
    schema: {
      id: "INTEGER PRIMARY KEY",
      name: "TEXT NOT NULL",
      location: "TEXT",
      manager_id: "INTEGER",
    },
    data: [
      [1, "Engineering", "New York", 3],
      [2, "Marketing", "Los Angeles", 2],
      [3, "Sales", "Chicago", 4],
      [4, "HR", "Boston", null],
    ],
  },
  customers: {
    name: "customers",
    schema: {
      id: "INTEGER PRIMARY KEY",
      name: "TEXT NOT NULL",
      email: "TEXT UNIQUE",
      city: "TEXT",
      registration_date: "DATE",
    },
    data: [
      [1, "ABC Corp", "contact@abccorp.com", "New York", "2021-03-15"],
      [2, "XYZ Ltd", "info@xyzltd.com", "San Francisco", "2020-11-22"],
      [3, "Tech Solutions", "hello@techsolutions.com", "Seattle", "2022-01-08"],
      [4, "Global Industries", "contact@global.com", "Austin", "2021-07-19"],
      [
        5,
        "Innovation Hub",
        "support@innovationhub.com",
        "Denver",
        "2022-05-12",
      ],
    ],
  },
  orders: {
    name: "orders",
    schema: {
      id: "INTEGER PRIMARY KEY",
      customer_id: "INTEGER",
      product_name: "TEXT",
      quantity: "INTEGER",
      price: "DECIMAL(10,2)",
      order_date: "DATE",
    },
    data: [
      [1, 1, "Software License", 5, 2500.0, "2023-01-15"],
      [2, 2, "Consulting Service", 1, 15000.0, "2023-02-20"],
      [3, 1, "Support Package", 3, 4500.0, "2023-03-10"],
      [4, 3, "Hardware Setup", 2, 8000.0, "2023-04-05"],
      [5, 4, "Training Program", 10, 12000.0, "2023-05-18"],
      [6, 2, "Software License", 8, 4000.0, "2023-06-22"],
      [7, 5, "Consulting Service", 2, 30000.0, "2023-07-14"],
      [8, 3, "Support Package", 1, 1500.0, "2023-08-09"],
    ],
  },
};

const sqlExamples = [
  {
    title: "Basic SELECT",
    query: "SELECT * FROM employees LIMIT 5;",
    description: "Retrieve first 5 employees",
  },
  {
    title: "JOIN Tables",
    query: `SELECT e.name, d.name as department, e.salary 
FROM employees e 
JOIN departments d ON e.department_id = d.id;`,
    description: "Join employees with departments",
  },
  {
    title: "Aggregate Functions",
    query: `SELECT d.name as department, 
       COUNT(*) as employee_count,
       AVG(e.salary) as avg_salary
FROM employees e 
JOIN departments d ON e.department_id = d.id 
GROUP BY d.name;`,
    description: "Count and average salary by department",
  },
  {
    title: "Customer Orders",
    query: `SELECT c.name, SUM(o.price * o.quantity) as total_spent
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name
ORDER BY total_spent DESC;`,
    description: "Total spending by customer",
  },
  {
    title: "Subquery Example",
    query: `SELECT name, salary 
FROM employees 
WHERE salary > (SELECT AVG(salary) FROM employees);`,
    description: "Employees earning above average",
  },
];

export default function SqlPracticeEditor({
  hostname,
}: Readonly<ToolComponentProps>) {
  const [sqlCode, setSqlCode] = useState(
    "-- Welcome to SQL Practice Editor!\n-- Try running: SELECT * FROM employees LIMIT 10;\n\nSELECT * FROM employees LIMIT 10;"
  );
  const [queryResult, setQueryResult] = useState<ExecResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [database, setDatabase] = useState<Database | null>(null);
  const [sqlLoaded, setSqlLoaded] = useState(false);

  const editorConfig = useEditorConfig({
    language: "sql",
    value: sqlCode,
    onChange: (value) => {
      setSqlCode(value || "");
    },
  });

  const { isFullScreen, toggleFullScreen, snackBar, actions } = useToolState({
    hostname: hostname || "",
    queryParams: { content: sqlCode },
  });

  // Load SQL.js and initialize database
  useEffect(() => {
    const loadSqlJs = async () => {
      try {
        setIsLoading(true);
        // Load SQL.js from CDN
        const sqlPromise = new Promise<unknown>((resolve, reject) => {
          const script = document.createElement("script");
          script.src =
            "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js";
          script.onload = () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any)
              .initSqlJs({
                locateFile: (file: string) =>
                  `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`,
              })
              .then(resolve)
              .catch(reject);
          };
          script.onerror = reject;
          document.head.appendChild(script);
        });

        const SQL = await sqlPromise;

        // Create database and populate with sample data
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const db = new (SQL as any).Database();

        // Create tables and insert sample data
        Object.values(sampleTables).forEach((table) => {
          // Create table
          const columns = Object.entries(table.schema)
            .map(([name, type]) => `${name} ${type}`)
            .join(", ");
          db.run(`CREATE TABLE ${table.name} (${columns})`);

          // Insert data
          table.data.forEach((row) => {
            const placeholders = row.map(() => "?").join(", ");
            db.run(`INSERT INTO ${table.name} VALUES (${placeholders})`, row);
          });
        });

        setDatabase(db);
        setSqlLoaded(true);
      } catch (err) {
        setError(
          `Failed to load SQL.js: ${
            err instanceof Error ? err.message : "Unknown error"
          }`
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadSqlJs();
  }, []);

  const executeSelectedQuery = useCallback(async () => {
    if (!database) {
      setError("Database not loaded yet.");
      return;
    }

    // Try to get selected text using browser selection API
    let queryToExecute = "";
    const selection = window.getSelection();

    if (selection && selection.toString().trim()) {
      queryToExecute = selection.toString().trim();
    } else {
      // If no selection, use the entire content
      queryToExecute = sqlCode.trim();
    }

    if (!queryToExecute) {
      setError("No query selected or editor is empty.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setQueryResult([]);

    const startTime = performance.now();

    try {
      const result = database.exec(queryToExecute);
      const endTime = performance.now();

      setQueryResult(result);
      setExecutionTime(endTime - startTime);

      if (result.length === 0) {
        setError("Query executed successfully but returned no results.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [database, sqlCode]);

  const executeAllQueries = useCallback(async () => {
    if (!database || !sqlCode.trim()) return;

    setIsLoading(true);
    setError(null);
    setQueryResult([]);

    const startTime = performance.now();

    try {
      // Split queries by semicolon and filter out empty ones
      const queries = sqlCode
        .split(";")
        .map((q) => q.trim())
        .filter((q) => q.length > 0);

      if (queries.length === 0) {
        setError("No valid queries found.");
        return;
      }

      const allResults: ExecResult[] = [];
      let hasErrors = false;

      // Execute each query sequentially
      for (let i = 0; i < queries.length; i++) {
        try {
          const result = database.exec(queries[i]);
          allResults.push(...result);
        } catch (err) {
          setError(
            `Error in query ${i + 1}: ${
              err instanceof Error ? err.message : "Unknown error"
            }`
          );
          hasErrors = true;
          break;
        }
      }

      if (!hasErrors) {
        const endTime = performance.now();
        setQueryResult(allResults);
        setExecutionTime(endTime - startTime);

        if (allResults.length === 0) {
          setError(
            "All queries executed successfully but returned no results."
          );
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [database, sqlCode]);

  const loadExample = useCallback((example: (typeof sqlExamples)[0]) => {
    setSqlCode(example.query);
    // Auto-clear previous results when loading a new example
    setQueryResult([]);
    setError(null);
    setExecutionTime(null);
  }, []);

  const copyToClipboard = useCallback(
    async (text: string) => {
      actions.copyText(text, `Copied: ${text}`);
    },
    [actions]
  );

  const commonButtons = useMemo(
    () =>
      createCommonButtons({
        onCopy: () =>
          actions.copyText(sqlCode, "SQL query copied to clipboard!"),
        onShareLink: () =>
          actions.copyShareableLink(sqlCode, "Share link copied!"),
        onFullScreen: toggleFullScreen,
      }),
    [sqlCode, actions, toggleFullScreen]
  );

  const controls = useMemo(
    () => [
      {
        type: "custom" as const,
        text: "Execute Selected",
        icon: <PlayArrowIcon />,
        onClick: executeSelectedQuery,
        variant: "contained" as const,
        color: "primary" as const,
        disabled: !sqlLoaded || isLoading,
      },
      {
        type: "custom" as const,
        text: "Execute All",
        icon: <PlaylistPlayIcon />,
        onClick: executeAllQueries,
        variant: "contained" as const,
        color: "success" as const,
        disabled: !sqlLoaded || isLoading,
      },
      ...commonButtons,
    ],
    [
      executeSelectedQuery,
      executeAllQueries,
      sqlLoaded,
      isLoading,
      commonButtons,
    ]
  );

  const renderTableSchema = () => (
    <Accordion expanded={true}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box display="flex" alignItems="center" gap={1}>
          <SchemaIcon color="primary" />
          <Typography variant="h6">Database Schema</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          {Object.values(sampleTables).map((table) => (
            <Grid item xs={12} md={6} key={table.name}>
              <Card variant="outlined">
                <CardContent>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <TableViewIcon color="primary" fontSize="small" />
                    <Typography variant="subtitle1" fontWeight="bold">
                      {table.name}
                    </Typography>
                  </Box>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <strong>Column</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Type</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(table.schema).map(([column, type]) => (
                        <TableRow key={column}>
                          <TableCell>{column}</TableCell>
                          <TableCell>
                            <Chip
                              label={type}
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );

  const renderExamples = () => (
    <Accordion expanded={true}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box display="flex" alignItems="center" gap={1}>
          <StorageIcon color="primary" />
          <Typography variant="h6">SQL Examples</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          {sqlExamples.map((example, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                variant="outlined"
                className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
                onClick={() => loadExample(example)}
              >
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                  >
                    {example.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {example.description}
                  </Typography>
                  <Box
                    component="pre"
                    className="bg-gray-100 p-2 rounded text-xs overflow-auto font-mono"
                  >
                    {example.query}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );

  const renderQueryResults = () => {
    if (isLoading) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          className="py-8"
        >
          <LinearProgress className="w-4/5 mb-6 h-1.5 rounded-lg" />
          <Typography variant="body1" color="primary" className="font-medium">
            🔄 Executing SQL query...
          </Typography>
        </Box>
      );
    }

    if (error) {
      return (
        <Alert
          severity="error"
          className="mt-4 rounded-lg [&_.MuiAlert-icon]:text-2xl"
        >
          <Typography variant="body2">
            <strong>❌ Error:</strong> {error}
          </Typography>
        </Alert>
      );
    }

    if (queryResult.length === 0) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          className="py-12 text-gray-500 text-center bg-gradient-to-br from-slate-50 to-blue-100 rounded-lg border-2 border-dashed border-gray-300"
        >
          <Typography variant="h5" className="mb-4 opacity-80">
            📝 Ready to execute queries
          </Typography>
          <Typography variant="body1" className="mb-4 max-w-md">
            Write your SQL query above and click &quot;Execute Selected&quot; or
            &quot;Execute All&quot;
          </Typography>
          <Typography variant="body2" className="opacity-60">
            💡 Try one of the example queries below to get started
          </Typography>
        </Box>
      );
    }

    return (
      <Box>
        {executionTime && (
          <Box className="flex justify-between items-center mb-6 p-4 bg-green-100 rounded-lg border border-green-400">
            <Box display="flex" alignItems="center" gap={1}>
              <Typography
                variant="body2"
                className="font-semibold text-green-800"
              >
                ⚡ Query executed in {executionTime.toFixed(2)}ms
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography
                variant="body2"
                className="font-semibold text-green-800"
              >
                📊{" "}
                {queryResult.reduce(
                  (total, result) => total + result.values.length,
                  0
                )}{" "}
                rows returned
              </Typography>
            </Box>
          </Box>
        )}

        {queryResult.map((result, index) => (
          <Box key={index} className="mb-6">
            {queryResult.length > 1 && (
              <Typography
                variant="subtitle1"
                className="mb-4 font-semibold text-blue-600 flex items-center gap-2"
              >
                🔢 Result Set {index + 1}
              </Typography>
            )}
            {result.columns.length > 4 && (
              <Typography
                variant="caption"
                className="block mb-2 text-gray-600 italic"
              >
                💡 Scroll horizontally to view all {result.columns.length}{" "}
                columns
              </Typography>
            )}
            <TableContainer
              component={Paper}
              className="mb-4 max-h-96 rounded-lg shadow-lg border border-gray-300 overflow-y-auto overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-black/10 [&::-webkit-scrollbar-track]:rounded [&::-webkit-scrollbar-thumb]:bg-black/30 [&::-webkit-scrollbar-thumb]:rounded hover:[&::-webkit-scrollbar-thumb]:bg-black/50"
            >
              <Table
                stickyHeader
                size="small"
                className={`${
                  result.columns.length > 4 ? "min-w-[800px]" : ""
                } table-auto`}
              >
                <TableHead>
                  <TableRow>
                    {result.columns.map((column, colIndex) => (
                      <TableCell
                        key={colIndex}
                        className="bg-blue-600 text-white font-bold text-sm border-b-2 border-blue-800 whitespace-nowrap min-w-[120px]"
                      >
                        <Box display="flex" alignItems="center" gap={1}>
                          <strong>{column}</strong>
                          <Tooltip title="Copy column name" placement="top">
                            <IconButton
                              size="small"
                              onClick={() => copyToClipboard(column)}
                              className="text-white hover:bg-blue-800"
                            >
                              <ContentCopyIcon fontSize="inherit" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {result.values.map((row, rowIndex) => (
                    <TableRow
                      key={rowIndex}
                      hover
                      className="odd:bg-gray-50 hover:bg-blue-50 transition-colors duration-200"
                    >
                      {row.map((cell, cellIndex) => (
                        <TableCell
                          key={cellIndex}
                          className="border-b border-gray-300 font-mono text-sm whitespace-nowrap min-w-[120px] max-w-[300px] overflow-hidden text-ellipsis"
                        >
                          {cell === null ? (
                            <Chip
                              label="NULL"
                              size="small"
                              variant="outlined"
                              color="warning"
                              className="font-semibold rounded"
                            />
                          ) : (
                            <Box className="text-gray-900 font-medium">
                              {String(cell)}
                            </Box>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ))}
      </Box>
    );
  };

  if (!sqlLoaded && isLoading) {
    return (
      <ToolLayout
        isFullScreen={isFullScreen}
        snackBar={
          snackBar
            ? {
                ...snackBar,
                onClose: snackBar.close,
              }
            : undefined
        }
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="400px"
        >
          <LinearProgress className="w-1/2 mb-4" />
          <Typography>Loading SQL Practice Editor...</Typography>
        </Box>
      </ToolLayout>
    );
  }

  return (
    <ToolLayout
      isFullScreen={isFullScreen}
      snackBar={
        snackBar
          ? {
              ...snackBar,
              onClose: snackBar.close,
            }
          : undefined
      }
    >
      <SEOContent
        title="SQL Practice Editor"
        description="Learn and practice SQL with our interactive online editor featuring sample databases"
      />

      {/* Button Controls on Top */}
      <Box mb={3}>
        <Box mb={2}>
          <Typography variant="body2" color="text.secondary">
            💡 <strong>Tip:</strong> To execute only selected text, highlight
            the specific SQL query in the editor and click &quot;Execute
            Selected&quot;. If no text is selected, it will run the entire
            editor content. Click &quot;Execute All&quot; to run all queries
            separated by semicolons. Previous results are automatically cleared
            when running new queries.
          </Typography>
        </Box>
        <ToolControls buttons={controls} />
      </Box>

      {/* SQL Query Editor and Query Results in Single Column Layout */}
      <Box mb={4}>
        {/* SQL Query Editor */}
        <Box mb={3}>
          <SingleCodeEditorWithHeaderV2
            editorHeading="SQL Query Editor"
            codeEditorProps={editorConfig}
            themeOption="vs-dark"
            editorOptions={{
              minimap: { enabled: false },
              lineNumbers: "on",
              wordWrap: "on",
              scrollBeyondLastLine: false,
            }}
          />
        </Box>

        {/* Query Results */}
        <Box>
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            mb={2}
            className="pb-2 border-b-2 border-blue-600"
          >
            <Typography
              variant="body1"
              color="primary"
              className="!text-sm md:!text-lg lg:!text-xl !font-semibold flex items-center gap-2"
            >
              📊 Query Results
            </Typography>
            {queryResult.length > 0 && (
              <Chip
                label={`${queryResult.length} result set${
                  queryResult.length > 1 ? "s" : ""
                }`}
                size="small"
                color="primary"
                variant="outlined"
                className="font-semibold"
              />
            )}
          </Box>

          <Box className="min-h-[400px] border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
            {renderQueryResults()}
          </Box>
        </Box>
      </Box>

      {/* Database Schema and Examples Below */}
      <Box mb={3}>{renderTableSchema()}</Box>

      <Box mb={3}>{renderExamples()}</Box>
    </ToolLayout>
  );
}

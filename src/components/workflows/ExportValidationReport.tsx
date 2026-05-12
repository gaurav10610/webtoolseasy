"use client";

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Alert,
  LinearProgress,
  Chip,
  Button,
  Collapse,
  IconButton,
  Grid,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  ExportValidationReport,
  ValidationCheckResult,
  generateValidationReportText,
} from "@/lib/exportValidation";

/**
 * ValidationCheck Item Component
 *
 * Displays a single validation check result with icon and details
 */
interface ValidationCheckItemProps {
  check: ValidationCheckResult;
  expandedId?: string;
  onToggleExpand?: (id: string) => void;
}

const ValidationCheckItem: React.FC<ValidationCheckItemProps> = ({
  check,
  expandedId,
  onToggleExpand,
}) => {
  const isExpanded = expandedId === check.id;
  const severityIcon = {
    error: <ErrorIcon sx={{ color: "error.main", fontSize: "1.25rem" }} />,
    warning: (
      <WarningIcon sx={{ color: "warning.main", fontSize: "1.25rem" }} />
    ),
    info: <InfoIcon sx={{ color: "info.main", fontSize: "1.25rem" }} />,
  };

  const severityBgColor = {
    error: "error.light",
    warning: "warning.light",
    info: "info.light",
  };

  const severityLabel = {
    error: "Error",
    warning: "Warning",
    info: "Info",
  };

  return (
    <Box
      sx={{
        p: 1.5,
        mb: 1,
        bgcolor: severityBgColor[check.severity],
        borderRadius: 1,
        border: "1px solid",
        borderColor: `${check.severity}.main`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: onToggleExpand ? "pointer" : "default",
        }}
        onClick={() => onToggleExpand?.(check.id)}
      >
        {severityIcon[check.severity]}

        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {check.title}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: `${check.severity}.dark` }}
          >
            {severityLabel[check.severity]}
          </Typography>
        </Box>

        {(check.description || check.suggestedFix) && onToggleExpand && (
          <IconButton
            size="small"
            sx={{
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
          >
            <ExpandMoreIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      {(isExpanded || !onToggleExpand) && (
        <>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" sx={{ mb: check.suggestedFix ? 1 : 0 }}>
            {check.description}
          </Typography>
          {check.suggestedFix && (
            <Box
              sx={{
                p: 1,
                bgcolor: "background.paper",
                borderRadius: 0.5,
                mt: 1,
                borderLeft: "3px solid",
                borderColor: "primary.main",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontWeight: 600, display: "block" }}
              >
                💡 Suggested Fix:
              </Typography>
              <Typography variant="caption">{check.suggestedFix}</Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

/**
 * ExportValidationReport Component
 *
 * Displays complete validation report with summary and detailed checks
 */
interface ExportValidationReportProps {
  report: ExportValidationReport;
  onProceed?: () => void;
  onCancel?: () => void;
  showDetails?: boolean;
}

export const ExportValidationReportCard: React.FC<
  ExportValidationReportProps
> = ({ report, onProceed, onCancel, showDetails = true }) => {
  const [expandedCheckId, setExpandedCheckId] = React.useState<
    string | undefined
  >();

  const progressValue =
    report.checks.length === 0
      ? 100
      : ((report.checks.length - report.summary.errorCount) /
          report.checks.length) *
        100;

  return (
    <Card sx={{ mb: 2, borderRadius: 1 }}>
      <CardContent>
        {/* Header with status */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          {report.isValid ? (
            <CheckCircleIcon sx={{ color: "success.main", fontSize: "2rem" }} />
          ) : (
            <ErrorIcon sx={{ color: "error.main", fontSize: "2rem" }} />
          )}

          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {report.isValid
                ? "✅ Export is ready!"
                : "⚠️ Validation issues found"}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {report.checks.length === 0
                ? "All checks passed"
                : `${report.summary.errorCount} error(s), ${report.summary.warningCount} warning(s), ${report.summary.infoCount} info`}
            </Typography>
          </Box>

          <Chip
            label={report.canProceed ? "Ready to export" : "Blocked"}
            color={report.canProceed ? "success" : "error"}
            variant="outlined"
            sx={{ fontWeight: 600 }}
          />
        </Box>

        {/* Progress bar */}
        {report.checks.length > 0 && (
          <>
            <Box sx={{ mb: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 0.5,
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  Validation Progress
                </Typography>
                <Typography variant="caption">
                  {Math.round(progressValue)}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={progressValue}
                sx={{
                  height: 8,
                  borderRadius: 1,
                  backgroundColor: "#f0f0f0",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor:
                      progressValue === 100 ? "#4caf50" : "#ff9800",
                  },
                }}
              />
            </Box>

            {/* Summary stats */}
            <Grid container spacing={1} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Box
                  sx={{
                    p: 1,
                    textAlign: "center",
                    bgcolor: "error.light",
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "error.main" }}
                  >
                    {report.summary.errorCount}
                  </Typography>
                  <Typography variant="caption">Error(s)</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box
                  sx={{
                    p: 1,
                    textAlign: "center",
                    bgcolor: "warning.light",
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "warning.main" }}
                  >
                    {report.summary.warningCount}
                  </Typography>
                  <Typography variant="caption">Warning(s)</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box
                  sx={{
                    p: 1,
                    textAlign: "center",
                    bgcolor: "info.light",
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "info.main" }}
                  >
                    {report.summary.infoCount}
                  </Typography>
                  <Typography variant="caption">Info</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box
                  sx={{
                    p: 1,
                    textAlign: "center",
                    bgcolor: report.canProceed
                      ? "success.light"
                      : "action.hover",
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: report.canProceed
                        ? "success.main"
                        : "text.secondary",
                    }}
                  >
                    {report.canProceed ? "✓" : "✗"}
                  </Typography>
                  <Typography variant="caption">
                    {report.canProceed ? "Can proceed" : "Blocked"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </>
        )}

        {/* Status alert */}
        {!report.canProceed && report.summary.errorCount > 0 && (
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
              Export blocked by {report.summary.errorCount} error(s)
            </Typography>
            <Typography variant="body2">
              Please fix the errors below before exporting
            </Typography>
          </Alert>
        )}

        {report.canProceed && report.summary.warningCount > 0 && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
              {report.summary.warningCount} warning(s) detected
            </Typography>
            <Typography variant="body2">
              You can proceed, but please review the warnings below
            </Typography>
          </Alert>
        )}

        {report.isValid && report.checks.length === 0 && (
          <Alert severity="success" sx={{ mb: 2 }}>
            All validation checks passed. You're ready to export!
          </Alert>
        )}

        {/* Detailed checks */}
        {showDetails && report.checks.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
              Detailed Checks
            </Typography>
            {report.checks.map((check) => (
              <ValidationCheckItem
                key={check.id}
                check={check}
                expandedId={expandedCheckId}
                onToggleExpand={setExpandedCheckId}
              />
            ))}
          </>
        )}

        {/* Action buttons */}
        {onProceed || onCancel ? (
          <Box
            sx={{ display: "flex", gap: 1, mt: 2, justifyContent: "flex-end" }}
          >
            {onCancel && (
              <Button variant="outlined" onClick={onCancel}>
                Cancel Export
              </Button>
            )}
            {onProceed && (
              <Button
                variant="contained"
                onClick={onProceed}
                disabled={!report.canProceed}
              >
                {report.canProceed ? "Proceed to Export" : "Fix Issues First"}
              </Button>
            )}
          </Box>
        ) : null}
      </CardContent>
    </Card>
  );
};

/**
 * InlineValidationStatus Component
 *
 * Lightweight status indicator for workflows
 */
interface InlineValidationStatusProps {
  report: ExportValidationReport;
  compact?: boolean;
}

export const InlineValidationStatus: React.FC<InlineValidationStatusProps> = ({
  report,
  compact = false,
}) => {
  if (compact) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {report.isValid ? (
          <>
            <CheckCircleIcon sx={{ color: "success.main", fontSize: "1rem" }} />
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              Ready to export
            </Typography>
          </>
        ) : (
          <>
            <ErrorIcon sx={{ color: "error.main", fontSize: "1rem" }} />
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              {report.summary.errorCount} issue(s)
            </Typography>
          </>
        )}
      </Box>
    );
  }

  return (
    <Alert severity={report.isValid ? "success" : "error"} sx={{ mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {report.isValid ? (
          <CheckCircleIcon sx={{ fontSize: "1.25rem" }} />
        ) : (
          <ErrorIcon sx={{ fontSize: "1.25rem" }} />
        )}
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {report.isValid
              ? "Export Validation Passed"
              : `${report.summary.errorCount} Validation Error(s)`}
          </Typography>
          <Typography variant="caption">
            {report.checks.length} total checks run
          </Typography>
        </Box>
      </Box>
    </Alert>
  );
};

/**
 * ValidationSummary Component
 *
 * Quick summary suitable for embedding in other components
 */
interface ValidationSummaryProps {
  report: ExportValidationReport;
}

export const ValidationSummary: React.FC<ValidationSummaryProps> = ({
  report,
}) => {
  return (
    <Box sx={{ p: 1.5, bgcolor: "action.hover", borderRadius: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          Validation Results
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          {report.summary.errorCount > 0 && (
            <Chip
              size="small"
              icon={<ErrorIcon />}
              label={`${report.summary.errorCount} error`}
              color="error"
              variant="outlined"
            />
          )}
          {report.summary.warningCount > 0 && (
            <Chip
              size="small"
              icon={<WarningIcon />}
              label={`${report.summary.warningCount} warning`}
              color="warning"
              variant="outlined"
            />
          )}
          {report.summary.infoCount > 0 && (
            <Chip
              size="small"
              icon={<InfoIcon />}
              label={`${report.summary.infoCount} info`}
              color="info"
              variant="outlined"
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Divider,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  type AccordionDetailsProps,
  type AccordionProps,
  type AccordionSummaryProps,
  type BoxProps,
  type CardActionsProps,
  type CardContentProps,
  type CardProps,
  type ChipProps,
  type ContainerProps,
  type DividerProps,
  type InputAdornmentProps,
  type PaperProps,
  type StackProps,
  type TextFieldProps,
  type TypographyProps,
} from "@mui/material";
import type { ElementType } from "react";

export function AppContainer({ children, ...props }: ContainerProps) {
  return <Container {...props}>{children}</Container>;
}

export function AppBox({ children, ...props }: BoxProps) {
  return <Box {...props}>{children}</Box>;
}

export function AppStack({ children, ...props }: StackProps) {
  return <Stack {...props}>{children}</Stack>;
}

export function AppSurface({ children, ...props }: PaperProps) {
  return <Paper {...props}>{children}</Paper>;
}

export function AppCard({ children, ...props }: CardProps) {
  return <Card {...props}>{children}</Card>;
}

export function AppCardBody({ children, ...props }: CardContentProps) {
  return <CardContent {...props}>{children}</CardContent>;
}

export function AppCardFooter({ children, ...props }: CardActionsProps) {
  return <CardActions {...props}>{children}</CardActions>;
}

export function AppText<C extends ElementType = "span">({
  children,
  ...props
}: TypographyProps<C, { component?: C }>) {
  return <Typography {...props}>{children}</Typography>;
}

export function AppChip(props: ChipProps) {
  return <Chip {...props} />;
}

export function AppField(props: TextFieldProps) {
  return <TextField {...props} />;
}

export function AppRule(props: DividerProps) {
  return <Divider {...props} />;
}

export function AppAdornment({ children, ...props }: InputAdornmentProps) {
  return <InputAdornment {...props}>{children}</InputAdornment>;
}

export function AppAccordion(props: AccordionProps) {
  return <Accordion {...props} />;
}

export function AppAccordionHeader({
  children,
  ...props
}: AccordionSummaryProps) {
  return <AccordionSummary {...props}>{children}</AccordionSummary>;
}

export function AppAccordionBody({
  children,
  ...props
}: AccordionDetailsProps) {
  return <AccordionDetails {...props}>{children}</AccordionDetails>;
}

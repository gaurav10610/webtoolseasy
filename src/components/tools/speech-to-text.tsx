"use client";

import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Alert,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  LinearProgress,
  SelectChangeEvent,
} from "@mui/material";
import {
  Mic,
  MicOff,
  Download,
  CloudUpload,
  Clear,
  VolumeUp,
} from "@mui/icons-material";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";

// TypeScript interface for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  serviceURI: string;
  grammars: SpeechGrammarList;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((event: Event) => void) | null;
  onend: ((event: Event) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onnomatch: ((event: Event) => void) | null;
  onsoundstart: ((event: Event) => void) | null;
  onsoundend: ((event: Event) => void) | null;
  onspeechstart: ((event: Event) => void) | null;
  onspeechend: ((event: Event) => void) | null;
  onaudiostart: ((event: Event) => void) | null;
  onaudioend: ((event: Event) => void) | null;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechGrammarList {
  readonly length: number;
  item(index: number): SpeechGrammar;
  [index: number]: SpeechGrammar;
  addFromURI(src: string, weight?: number): void;
  addFromString(string: string, weight?: number): void;
}

interface SpeechGrammar {
  src: string;
  weight: number;
}

declare const SpeechRecognition: {
  prototype: SpeechRecognition;
  new (): SpeechRecognition;
};

export default function SpeechToText({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
  });

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const [interimTranscript, setInterimTranscript] = useState<string>("");
  const [language, setLanguage] = useState<string>("en-US");
  const [error, setError] = useState<string>("");
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState<boolean>(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const languages = [
    { code: "en-US", name: "English (US)" },
    { code: "en-GB", name: "English (UK)" },
    { code: "es-ES", name: "Spanish (Spain)" },
    { code: "es-MX", name: "Spanish (Mexico)" },
    { code: "fr-FR", name: "French" },
    { code: "de-DE", name: "German" },
    { code: "it-IT", name: "Italian" },
    { code: "pt-BR", name: "Portuguese (Brazil)" },
    { code: "ja-JP", name: "Japanese" },
    { code: "ko-KR", name: "Korean" },
    { code: "zh-CN", name: "Chinese (Simplified)" },
    { code: "zh-TW", name: "Chinese (Traditional)" },
    { code: "ar-SA", name: "Arabic" },
    { code: "hi-IN", name: "Hindi" },
    { code: "ru-RU", name: "Russian" },
  ];

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsRecording(true);
        setError("");
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        setError(`Speech recognition error: ${event.error}`);
        setIsRecording(false);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interim = "";
        let final = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            final += result[0].transcript;
          } else {
            interim += result[0].transcript;
          }
        }

        if (final) {
          setTranscript((prev) => prev + final + " ");
        }
        setInterimTranscript(interim);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language]);

  const startRecording = useCallback(() => {
    if (recognitionRef.current && !isRecording) {
      setError("");
      setInterimTranscript("");
      recognitionRef.current.start();
    }
  }, [isRecording]);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
    }
  }, [isRecording]);

  const clearTranscript = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
  }, []);

  const downloadTranscript = useCallback(() => {
    if (!transcript.trim()) return;

    const element = document.createElement("a");
    const file = new Blob([transcript], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "transcript.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }, [transcript]);

  const handleLanguageChange = useCallback((event: SelectChangeEvent) => {
    setLanguage(event.target.value);
    if (recognitionRef.current) {
      recognitionRef.current.lang = event.target.value;
    }
  }, []);

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        if (!file.type.startsWith("audio/")) {
          setError("Please select a valid audio file");
          return;
        }
        setAudioFile(file);
        setError("");

        // Note: For actual file processing, you would need a service like Google Cloud Speech-to-Text
        // This is a placeholder for demonstration
        setIsProcessingFile(true);
        setTimeout(() => {
          setIsProcessingFile(false);
          setError(
            "Audio file processing requires a backend service. Currently only live speech recognition is supported."
          );
        }, 2000);
      }
    },
    []
  );

  const buttons = useMemo(
    () => [
      ...(isSupported
        ? [
            {
              type: "custom" as const,
              text: isRecording ? "Stop Recording" : "Start Recording",
              onClick: isRecording ? stopRecording : startRecording,
              icon: isRecording ? <MicOff /> : <Mic />,
              disabled: isProcessingFile,
            },
          ]
        : []),
      ...(transcript.trim()
        ? [
            {
              type: "custom" as const,
              text: "Download",
              onClick: downloadTranscript,
              icon: <Download />,
            },
            {
              type: "custom" as const,
              text: "Clear",
              onClick: clearTranscript,
              icon: <Clear />,
            },
          ]
        : []),
      ...createCommonButtons({
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [
      isSupported,
      isRecording,
      transcript,
      isProcessingFile,
      toolState,
      startRecording,
      stopRecording,
      downloadTranscript,
      clearTranscript,
    ]
  );

  return (
    <ToolLayout
      isFullScreen={toolState.isFullScreen}
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      <SEOContent
        title="Speech to Text Converter"
        description="Convert speech to text using your microphone. Real-time speech recognition with multiple language support."
        exampleCode="Click Start Recording and speak into your microphone"
        exampleOutput="Live transcription of spoken words converted to text"
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <div className="w-full space-y-6">
        {/* Browser Support Check */}
        {!isSupported && (
          <Alert severity="error">
            Speech recognition is not supported in your browser. Please use
            Chrome, Edge, or Safari.
          </Alert>
        )}

        {/* Language Selection */}
        {isSupported && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Settings
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Language</InputLabel>
              <Select
                value={language}
                label="Language"
                onChange={handleLanguageChange}
                disabled={isRecording}
              >
                {languages.map((lang) => (
                  <MenuItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
        )}

        {/* Audio File Upload */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Upload Audio File
          </Typography>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="audio/*"
            style={{ display: "none" }}
          />
          <Button
            variant="outlined"
            startIcon={<CloudUpload />}
            onClick={() => fileInputRef.current?.click()}
            fullWidth
            sx={{ mb: 2 }}
            disabled={isRecording || isProcessingFile}
          >
            Choose Audio File
          </Button>
          {audioFile && (
            <Alert severity="info">Selected: {audioFile.name}</Alert>
          )}
          <Typography variant="body2" color="text.secondary">
            Note: Audio file transcription requires backend processing.
            Currently only live speech recognition is fully supported.
          </Typography>
        </Paper>

        {/* Processing Indicator */}
        {isProcessingFile && (
          <Paper sx={{ p: 3 }}>
            <Typography gutterBottom>Processing audio file...</Typography>
            <LinearProgress />
          </Paper>
        )}

        {/* Recording Status */}
        {isSupported && (
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <VolumeUp />
              <Typography variant="h6">Live Speech Recognition</Typography>
              {isRecording && (
                <Chip
                  label="Recording..."
                  color="error"
                  variant="outlined"
                  icon={<Mic />}
                />
              )}
            </Box>
            <Typography variant="body2" color="text.secondary">
              {isRecording
                ? "Speak now... Your speech will be converted to text in real-time."
                : 'Click "Start Recording" to begin speech recognition.'}
            </Typography>
          </Paper>
        )}

        {/* Error Display */}
        {error && <Alert severity="error">{error}</Alert>}

        {/* Transcript Display */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Transcript
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={10}
            value={transcript + interimTranscript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder={
              isSupported
                ? "Start recording to see your speech converted to text here..."
                : "Speech recognition is not supported in your browser."
            }
            variant="outlined"
            sx={{
              "& .MuiInputBase-input": {
                fontSize: "1.1rem",
                lineHeight: 1.6,
              },
            }}
          />
          {interimTranscript && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, display: "block" }}
            >
              Interim results are shown in gray and will be finalized
              automatically.
            </Typography>
          )}
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Characters: {transcript.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Words:{" "}
              {
                transcript
                  .trim()
                  .split(/\s+/)
                  .filter((word) => word.length > 0).length
              }
            </Typography>
          </Box>
        </Paper>
      </div>
    </ToolLayout>
  );
}

"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Switch,
  FormControlLabel,
  LinearProgress,
  Box,
  TextareaAutosize,
} from "@mui/material";
import { SnackBarWithPosition } from "../lib/snackBar";
import { ToolComponentProps } from "@/types/component";

// Icons
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import DownloadIcon from "@mui/icons-material/Download";
import CopyIcon from "@mui/icons-material/ContentCopy";
import ClearIcon from "@mui/icons-material/Clear";
import SettingsIcon from "@mui/icons-material/Settings";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
  timestamp: number;
}

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string;
        confidence: number;
      };
      isFinal: boolean;
      length: number;
    };
    length: number;
  };
}

// Extend Window interface for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message?: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  serviceURI: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onstart: () => void;
  onend: () => void;
  onspeechstart: () => void;
  onspeechend: () => void;
  onaudiostart: () => void;
  onaudioend: () => void;
  onsoundstart: () => void;
  onsoundend: () => void;
  onnomatch: () => void;
}

const SUPPORTED_LANGUAGES = [
  { code: "en-US", label: "English (United States)" },
  { code: "en-GB", label: "English (United Kingdom)" },
  { code: "en-AU", label: "English (Australia)" },
  { code: "en-CA", label: "English (Canada)" },
  { code: "es-ES", label: "Spanish (Spain)" },
  { code: "es-MX", label: "Spanish (Mexico)" },
  { code: "fr-FR", label: "French (France)" },
  { code: "fr-CA", label: "French (Canada)" },
  { code: "de-DE", label: "German (Germany)" },
  { code: "it-IT", label: "Italian (Italy)" },
  { code: "pt-BR", label: "Portuguese (Brazil)" },
  { code: "pt-PT", label: "Portuguese (Portugal)" },
  { code: "ru-RU", label: "Russian (Russia)" },
  { code: "zh-CN", label: "Chinese (Mandarin, China)" },
  { code: "zh-TW", label: "Chinese (Taiwan)" },
  { code: "ja-JP", label: "Japanese (Japan)" },
  { code: "ko-KR", label: "Korean (South Korea)" },
  { code: "hi-IN", label: "Hindi (India)" },
  { code: "ar-SA", label: "Arabic (Saudi Arabia)" },
  { code: "nl-NL", label: "Dutch (Netherlands)" },
];

export default function SpeechToText({}: Readonly<ToolComponentProps>) {
  // State management
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [language, setLanguage] = useState("en-US");
  const [continuous, setContinuous] = useState(true);
  const [interimResults, setInterimResults] = useState(true);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [isSupported, setIsSupported] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [results, setResults] = useState<SpeechRecognitionResult[]>([]);

  // Refs
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Snackbar handler
  const handleSnackBarClose = () => setIsSnackBarOpen(false);

  const showMessage = (message: string) => {
    setSnackBarMessage(message);
    setIsSnackBarOpen(true);
  };

  // Check browser support
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSupported(true);
    } else {
      setError(
        "Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari."
      );
    }
  }, []);

  // Timer for recording duration
  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording, isPaused]);

  // Initialize speech recognition
  const initializeRecognition = useCallback(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech recognition not supported");
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;
    recognition.lang = language;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsRecording(true);
      setError("");
      showMessage("Speech recognition started");
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscriptText = "";
      let finalTranscriptText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcriptPart = result[0].transcript;
        const confidenceScore = result[0].confidence;

        if (result.isFinal) {
          finalTranscriptText += transcriptPart + " ";

          // Add to results history
          const newResult: SpeechRecognitionResult = {
            transcript: transcriptPart,
            confidence: confidenceScore || 0,
            isFinal: true,
            timestamp: Date.now(),
          };

          setResults((prev) => [...prev, newResult]);
          setConfidence(confidenceScore || null);
        } else {
          interimTranscriptText += transcriptPart;
        }
      }

      if (finalTranscriptText) {
        setTranscript((prev) => prev + finalTranscriptText);
      }
      setInterimTranscript(interimTranscriptText);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setError(`Speech recognition error: ${event.error}`);
      setIsRecording(false);
      setIsPaused(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
      setIsPaused(false);
      setInterimTranscript("");
      showMessage("Speech recognition stopped");
    };

    return recognition;
  }, [language, continuous, interimResults]);

  // Start recording
  const startRecording = useCallback(() => {
    if (!isSupported) {
      setError("Speech recognition not supported");
      return;
    }

    const recognition = initializeRecognition();
    if (recognition) {
      recognitionRef.current = recognition;
      recognition.start();
      setRecordingTime(0);
    }
  }, [isSupported, initializeRecognition]);

  // Stop recording
  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  // Pause/Resume recording
  const togglePause = useCallback(() => {
    if (isPaused) {
      // Resume recording
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
      setIsPaused(false);
    } else {
      // Pause recording
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsPaused(true);
    }
  }, [isPaused]);

  // Clear transcript
  const clearTranscript = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
    setResults([]);
    setConfidence(null);
    showMessage("Transcript cleared");
  }, []);

  // Copy to clipboard
  const copyToClipboard = useCallback(async () => {
    const textToCopy = transcript + interimTranscript;
    if (!textToCopy.trim()) {
      showMessage("No text to copy");
      return;
    }

    try {
      await navigator.clipboard.writeText(textToCopy);
      showMessage("Text copied to clipboard");
    } catch {
      setError("Failed to copy text to clipboard");
    }
  }, [transcript, interimTranscript]);

  // Download as text file
  const downloadTranscript = useCallback(() => {
    const textToDownload = transcript + interimTranscript;
    if (!textToDownload.trim()) {
      showMessage("No text to download");
      return;
    }

    const blob = new Blob([textToDownload], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `speech-transcript-${
      new Date().toISOString().split("T")[0]
    }.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showMessage("Transcript downloaded");
  }, [transcript, interimTranscript]);

  // Format recording time
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <SnackBarWithPosition
        message={snackBarMessage}
        open={isSnackBarOpen}
        autoHideDuration={3000}
        handleClose={handleSnackBarClose}
      />

      {error && (
        <Alert severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {!isSupported && (
        <Alert severity="warning">
          <strong>Browser Not Supported:</strong> Speech recognition requires
          Chrome, Edge, or Safari with microphone permissions.
        </Alert>
      )}

      {/* Main Controls */}
      <Card>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Typography variant="h6" className="flex items-center gap-2">
              <RecordVoiceOverIcon color="primary" />
              Speech Recognition Controls
            </Typography>
            {isRecording && (
              <Chip
                icon={<VolumeUpIcon />}
                label={`Recording: ${formatTime(recordingTime)}`}
                color="error"
                variant="filled"
              />
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              startIcon={isRecording ? <MicOffIcon /> : <MicIcon />}
              onClick={isRecording ? stopRecording : startRecording}
              disabled={!isSupported}
              variant="contained"
              color={isRecording ? "error" : "primary"}
              size="large"
            >
              {isRecording ? "Stop Recording" : "Start Recording"}
            </Button>

            {isRecording && (
              <Button
                startIcon={isPaused ? <PlayArrowIcon /> : <PauseIcon />}
                onClick={togglePause}
                variant="outlined"
                color="secondary"
                size="large"
              >
                {isPaused ? "Resume" : "Pause"}
              </Button>
            )}

            <Button
              startIcon={<ClearIcon />}
              onClick={clearTranscript}
              disabled={!transcript && !interimTranscript}
              variant="outlined"
              color="warning"
            >
              Clear
            </Button>

            <Button
              startIcon={<CopyIcon />}
              onClick={copyToClipboard}
              disabled={!transcript && !interimTranscript}
              variant="outlined"
            >
              Copy
            </Button>

            <Button
              startIcon={<DownloadIcon />}
              onClick={downloadTranscript}
              disabled={!transcript && !interimTranscript}
              variant="outlined"
              color="success"
            >
              Download
            </Button>
          </div>

          {isRecording && (
            <Box className="mb-4">
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Listening for speech...
              </Typography>
              <LinearProgress color="error" />
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardContent>
          <Typography variant="h6" className="flex items-center gap-2 mb-4">
            <SettingsIcon color="primary" />
            Recognition Settings
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormControl fullWidth size="small">
              <InputLabel>Language</InputLabel>
              <Select
                value={language}
                label="Language"
                onChange={(e) => setLanguage(e.target.value)}
                disabled={isRecording}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <MenuItem key={lang.code} value={lang.code}>
                    {lang.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Switch
                  checked={continuous}
                  onChange={(e) => setContinuous(e.target.checked)}
                  disabled={isRecording}
                />
              }
              label="Continuous Recording"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={interimResults}
                  onChange={(e) => setInterimResults(e.target.checked)}
                  disabled={isRecording}
                />
              }
              label="Show Interim Results"
            />
          </div>

          {confidence !== null && (
            <div className="mt-4">
              <Typography variant="body2" gutterBottom>
                Recognition Confidence: {Math.round(confidence * 100)}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={confidence * 100}
                color={
                  confidence > 0.8
                    ? "success"
                    : confidence > 0.6
                    ? "warning"
                    : "error"
                }
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transcript Display */}
      <Card>
        <CardContent>
          <Typography variant="h6" className="mb-4">
            Live Transcript
          </Typography>

          <div className="border rounded-lg p-4 min-h-48 bg-gray-50">
            <TextareaAutosize
              value={transcript + interimTranscript}
              placeholder="Your speech will appear here as you speak..."
              className="w-full border-none resize-none bg-transparent outline-none"
              minRows={6}
              style={{ fontSize: "16px", lineHeight: 1.5 }}
              readOnly
            />
          </div>

          {(transcript || interimTranscript) && (
            <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
              <span>
                Words:{" "}
                {
                  (transcript + interimTranscript)
                    .split(/\s+/)
                    .filter((word) => word.length > 0).length
                }
              </span>
              <span>Characters: {(transcript + interimTranscript).length}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results History */}
      {results.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-4">
              Recognition History
            </Typography>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {results.map((result, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded border">
                  <div className="flex justify-between items-start mb-2">
                    <Typography variant="body2" color="textSecondary">
                      {new Date(result.timestamp).toLocaleTimeString()}
                    </Typography>
                    <Chip
                      label={`${Math.round(result.confidence * 100)}%`}
                      size="small"
                      color={
                        result.confidence > 0.8
                          ? "success"
                          : result.confidence > 0.6
                          ? "warning"
                          : "error"
                      }
                    />
                  </div>
                  <Typography variant="body1">{result.transcript}</Typography>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips and Information */}
      <Card>
        <CardContent>
          <Typography variant="h6" className="mb-4">
            Tips for Better Recognition
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Audio Quality
              </Typography>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• Use a quiet environment</li>
                <li>• Speak clearly and at normal pace</li>
                <li>• Keep microphone close but not too close</li>
                <li>• Avoid background noise</li>
              </ul>
            </div>

            <div>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Browser Tips
              </Typography>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• Allow microphone permissions</li>
                <li>• Use Chrome, Edge, or Safari</li>
                <li>• Ensure stable internet connection</li>
                <li>• Keep browser tab active</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import {
  Typography,
  Button,
  Alert,
  SelectChangeEvent,
  Slider,
  TextField,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import SpeedIcon from "@mui/icons-material/Speed";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { PaperWithChildren } from "../lib/papers";
import { SelectWithLabel } from "../lib/select";

interface Voice {
  voice: SpeechSynthesisVoice;
  name: string;
  lang: string;
}

export default function TextToSpeech(): React.ReactElement {
  const [text, setText] = useState(
    "Welcome to our Text to Speech converter. Type or paste your text here to hear it spoken aloud with natural voice synthesis."
  );
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [rate, setRate] = useState<number>(1.0);
  const [pitch, setPitch] = useState<number>(1.0);
  const [volume, setVolume] = useState<number>(1.0);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [error, setError] = useState<string>("");
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "",
    color: "success" as "success" | "error" | "info" | "warning",
  });

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        const voiceList = availableVoices.map((voice) => ({
          voice,
          name: voice.name,
          lang: voice.lang,
        }));
        setVoices(voiceList);

        // Set default voice (prefer English)
        const englishVoice = voiceList.find((v) => v.lang.startsWith("en"));
        if (englishVoice && !selectedVoice) {
          setSelectedVoice(englishVoice.voice.name);
        } else if (voiceList.length > 0 && !selectedVoice) {
          setSelectedVoice(voiceList[0].voice.name);
        }
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, [selectedVoice]);

  // Check if browser supports speech synthesis
  useEffect(() => {
    if (!window.speechSynthesis) {
      setError(
        "Your browser does not support Text to Speech. Please use a modern browser like Chrome, Edge, or Safari."
      );
    }
  }, []);

  const handleSpeak = useCallback(() => {
    if (!text.trim()) {
      setSnackBar({
        open: true,
        message: "Please enter some text to speak",
        color: "warning",
      });
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    // Find and set selected voice
    const voice = voices.find((v) => v.voice.name === selectedVoice)?.voice;
    if (voice) {
      utterance.voice = voice;
    }

    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.onstart = () => {
      setSpeaking(true);
      setPaused(false);
    };

    utterance.onend = () => {
      setSpeaking(false);
      setPaused(false);
    };

    utterance.onerror = (event) => {
      setSpeaking(false);
      setPaused(false);
      setSnackBar({
        open: true,
        message: `Speech error: ${event.error}`,
        color: "error",
      });
    };

    window.speechSynthesis.speak(utterance);
  }, [text, voices, selectedVoice, rate, pitch, volume]);

  const handlePause = useCallback(() => {
    if (speaking && !paused) {
      window.speechSynthesis.pause();
      setPaused(true);
    }
  }, [speaking, paused]);

  const handleResume = useCallback(() => {
    if (speaking && paused) {
      window.speechSynthesis.resume();
      setPaused(false);
    }
  }, [speaking, paused]);

  const handleStop = useCallback(() => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setPaused(false);
  }, []);

  const handleVoiceChange = useCallback((event: SelectChangeEvent<string>) => {
    setSelectedVoice(event.target.value);
  }, []);

  const handleSnackBarClose = useCallback(() => {
    setSnackBar((prev) => ({ ...prev, open: false }));
  }, []);

  const voiceOptions = useMemo(
    () =>
      voices.map((v) => ({
        key: v.voice.name,
        value: v.voice.name,
        label: `${v.name} (${v.lang})`,
      })),
    [voices]
  );

  return (
    <ToolLayout
      snackBar={{
        open: snackBar.open,
        message: snackBar.message,
        onClose: handleSnackBarClose,
        color: snackBar.color,
      }}
    >
      <SEOContent
        title="Text to Speech Converter"
        description="Convert text to natural speech with adjustable voice, speed, pitch, and volume. Free online TTS tool."
        exampleCode="Hello, welcome to our text to speech converter!"
        exampleOutput="🔊 Spoken audio output"
      />

      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      {/* Text Input */}
      <PaperWithChildren variant="outlined" className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <RecordVoiceOverIcon color="primary" />
          <Typography variant="h6" color="primary">
            Enter Text
          </Typography>
        </div>

        <TextField
          fullWidth
          multiline
          minRows={6}
          maxRows={15}
          value={text}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setText(e.target.value)
          }
          placeholder="Type or paste your text here..."
          variant="outlined"
        />

        <Typography variant="caption" color="textSecondary" className="mt-2">
          {text.length} characters
        </Typography>
      </PaperWithChildren>

      {/* Voice Settings */}
      <PaperWithChildren variant="outlined" className="p-4">
        <Typography variant="h6" color="primary" className="mb-3">
          Voice Settings
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Voice Selection */}
          <div className="col-span-1 md:col-span-2">
            <SelectWithLabel
              selectLabel="Voice"
              options={voiceOptions}
              value={selectedVoice}
              onChange={handleVoiceChange}
              className="w-full"
            />
          </div>

          {/* Speed Control */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <SpeedIcon color="action" fontSize="small" />
              <Typography variant="body2" color="textSecondary">
                Speed: {rate.toFixed(1)}x
              </Typography>
            </div>
            <Slider
              value={rate}
              onChange={(_, value) => setRate(value as number)}
              min={0.5}
              max={2.0}
              step={0.1}
              marks={[
                { value: 0.5, label: "0.5x" },
                { value: 1.0, label: "1x" },
                { value: 2.0, label: "2x" },
              ]}
              valueLabelDisplay="auto"
            />
          </div>

          {/* Pitch Control */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <GraphicEqIcon color="action" fontSize="small" />
              <Typography variant="body2" color="textSecondary">
                Pitch: {pitch.toFixed(1)}
              </Typography>
            </div>
            <Slider
              value={pitch}
              onChange={(_, value) => setPitch(value as number)}
              min={0.5}
              max={2.0}
              step={0.1}
              marks={[
                { value: 0.5, label: "Low" },
                { value: 1.0, label: "Normal" },
                { value: 2.0, label: "High" },
              ]}
              valueLabelDisplay="auto"
            />
          </div>

          {/* Volume Control */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <div className="flex items-center gap-2">
              <VolumeUpIcon color="action" fontSize="small" />
              <Typography variant="body2" color="textSecondary">
                Volume: {Math.round(volume * 100)}%
              </Typography>
            </div>
            <Slider
              value={volume}
              onChange={(_, value) => setVolume(value as number)}
              min={0}
              max={1}
              step={0.1}
              marks={[
                { value: 0, label: "0%" },
                { value: 0.5, label: "50%" },
                { value: 1, label: "100%" },
              ]}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
            />
          </div>
        </div>
      </PaperWithChildren>

      {/* Playback Controls */}
      <PaperWithChildren variant="outlined" className="p-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {!speaking && (
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<PlayArrowIcon />}
              onClick={handleSpeak}
              disabled={!text.trim() || !!error}
            >
              Speak
            </Button>
          )}

          {speaking && !paused && (
            <Button
              variant="contained"
              color="warning"
              size="large"
              startIcon={<PauseIcon />}
              onClick={handlePause}
            >
              Pause
            </Button>
          )}

          {speaking && paused && (
            <Button
              variant="contained"
              color="success"
              size="large"
              startIcon={<PlayArrowIcon />}
              onClick={handleResume}
            >
              Resume
            </Button>
          )}

          {speaking && (
            <Button
              variant="outlined"
              color="error"
              size="large"
              startIcon={<StopIcon />}
              onClick={handleStop}
            >
              Stop
            </Button>
          )}
        </div>

        {speaking && (
          <div className="mt-3 text-center">
            <Typography variant="body2" color="primary">
              {paused ? "⏸️ Paused" : "🔊 Speaking..."}
            </Typography>
          </div>
        )}
      </PaperWithChildren>

      {/* Info */}
      <Alert severity="info">
        <Typography variant="body2">
          <strong>Tip:</strong> This tool uses your browser&apos;s built-in
          speech synthesis. Voice quality and selection vary by browser and OS.
          Chrome and Edge typically offer the best voices. All processing
          happens locally in your browser for complete privacy.
        </Typography>
      </Alert>
    </ToolLayout>
  );
}

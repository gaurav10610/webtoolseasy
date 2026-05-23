"use client";

import { useState, useRef, useCallback } from "react";
import { saveChunk, getAllChunks, clearDB } from "./indexedDB";

export type RecorderState = "idle" | "recording" | "paused" | "saving";

interface RecorderOptions {
  withMic: boolean;
  withCamera: boolean;
  withSystemAudio: boolean;
}

export function useScreenRecorder() {
  const [state, setState] = useState<RecorderState>("idle");
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunkIndexRef = useRef<number>(0);
  const timerRef = useRef<number | null>(null);
  
  // Streams
  const screenStreamRef = useRef<MediaStream | null>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  
  // Canvas for PiP compositing
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  
  // Preview
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);

  const cleanupStreams = useCallback(() => {
    [screenStreamRef, cameraStreamRef, micStreamRef].forEach(ref => {
      if (ref.current) {
        ref.current.getTracks().forEach(track => track.stop());
        ref.current = null;
      }
    });
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startRecording = useCallback(async (options: RecorderOptions) => {
    try {
      setError(null);
      await clearDB();
      chunkIndexRef.current = 0;
      setDuration(0);

      // 1. Get Screen + System Audio
      try {
        screenStreamRef.current = await navigator.mediaDevices.getDisplayMedia({
          video: { frameRate: { ideal: 30 } },
          audio: options.withSystemAudio ? {
            echoCancellation: false,
            noiseSuppression: false,
          } : false
        });
      } catch (e) {
        throw new Error("Screen capture was denied or not supported.");
      }

      // 2. Get Camera / Mic if requested
      if (options.withCamera || options.withMic) {
        try {
          const userMedia = await navigator.mediaDevices.getUserMedia({
            video: options.withCamera ? { width: 320, height: 240 } : false,
            audio: options.withMic ? {
              echoCancellation: true,
              noiseSuppression: true,
            } : false
          });
          
          if (options.withCamera) {
            cameraStreamRef.current = new MediaStream(userMedia.getVideoTracks());
          }
          if (options.withMic) {
            micStreamRef.current = new MediaStream(userMedia.getAudioTracks());
          }
        } catch (e) {
          throw new Error("Camera/Microphone access was denied.");
        }
      }

      // Setup final stream
      let finalStream: MediaStream;

      if (options.withCamera) {
        // Need to composite screen and camera onto a canvas
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Could not get canvas context");
        canvasRef.current = canvas;

        const screenVideo = document.createElement("video");
        screenVideo.srcObject = screenStreamRef.current;
        screenVideo.muted = true;
        await screenVideo.play();

        const cameraVideo = document.createElement("video");
        cameraVideo.srcObject = cameraStreamRef.current;
        cameraVideo.muted = true;
        await cameraVideo.play();

        // Match canvas to screen size
        const videoTrack = screenStreamRef.current.getVideoTracks()[0];
        const settings = videoTrack.getSettings();
        canvas.width = settings.width || 1920;
        canvas.height = settings.height || 1080;

        const drawFrame = () => {
          if (!ctx) return;
          // Draw screen
          ctx.drawImage(screenVideo, 0, 0, canvas.width, canvas.height);
          
          // Draw camera in bottom right (PiP)
          const pipWidth = canvas.width * 0.2;
          const pipHeight = (pipWidth / 4) * 3; // 4:3 aspect ratio
          const margin = 20;
          const pipX = canvas.width - pipWidth - margin;
          const pipY = canvas.height - pipHeight - margin;
          
          // Add border/shadow to PiP
          ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
          ctx.shadowBlur = 10;
          ctx.fillStyle = '#000';
          ctx.fillRect(pipX, pipY, pipWidth, pipHeight);
          ctx.shadowBlur = 0;
          
          ctx.drawImage(cameraVideo, pipX, pipY, pipWidth, pipHeight);
          
          rafRef.current = requestAnimationFrame(drawFrame);
        };
        drawFrame();

        // Get stream from canvas (30fps)
        finalStream = canvas.captureStream(30);
      } else {
        // Just use screen video directly
        finalStream = new MediaStream(screenStreamRef.current.getVideoTracks());
      }

      // Mix Audio
      const audioContext = new AudioContext();
      const dest = audioContext.createMediaStreamDestination();
      
      let hasAudio = false;

      if (options.withSystemAudio && screenStreamRef.current && screenStreamRef.current.getAudioTracks().length > 0) {
        const source = audioContext.createMediaStreamSource(new MediaStream(screenStreamRef.current.getAudioTracks()));
        source.connect(dest);
        hasAudio = true;
      }
      
      if (options.withMic && micStreamRef.current && micStreamRef.current.getAudioTracks().length > 0) {
        const source = audioContext.createMediaStreamSource(new MediaStream(micStreamRef.current.getAudioTracks()));
        source.connect(dest);
        hasAudio = true;
      }

      if (hasAudio) {
        dest.stream.getAudioTracks().forEach(track => finalStream.addTrack(track));
      }

      // Set up preview
      if (previewVideoRef.current) {
        previewVideoRef.current.srcObject = finalStream;
        previewVideoRef.current.play();
      }

      // Initialize MediaRecorder
      const mimeType = MediaRecorder.isTypeSupported('video/webm; codecs=vp9') 
        ? 'video/webm; codecs=vp9' 
        : 'video/webm';

      const mediaRecorder = new MediaRecorder(finalStream, {
        mimeType,
        videoBitsPerSecond: 3000000 // 3 Mbps
      });

      mediaRecorder.ondataavailable = async (e) => {
        if (e.data && e.data.size > 0) {
          try {
            await saveChunk(e.data, chunkIndexRef.current++);
          } catch (err) {
            console.error("Failed to save chunk to IDB", err);
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
              mediaRecorderRef.current.stop();
            }
            setError("Storage failed. Your disk may be full.");
          }
        }
      };

      mediaRecorder.onstop = async () => {
        setState("saving");
        cleanupStreams();
        
        try {
          // Read all chunks from IDB
          const chunks = await getAllChunks();
          if (chunks.length === 0) throw new Error("No data recorded");

          // Combine and download
          const blob = new Blob(chunks, { type: chunks[0].type });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          document.body.appendChild(a);
          a.style.display = "none";
          a.href = url;
          a.download = `webtoolseasy-recording-${new Date().toISOString().slice(0, 10)}.webm`;
          a.click();
          URL.revokeObjectURL(url);
          a.remove();

          await clearDB();
        } catch (err: any) {
          setError("Failed to compile video: " + err.message);
        } finally {
          setState("idle");
          setDuration(0);
          if (previewVideoRef.current) {
            previewVideoRef.current.srcObject = null;
          }
        }
      };

      // Listen for user stopping screen share via browser UI
      screenStreamRef.current.getVideoTracks()[0].onended = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
          mediaRecorderRef.current.stop();
        }
      };

      mediaRecorder.start(1000); // 1 second chunks for safety
      mediaRecorderRef.current = mediaRecorder;

      setState("recording");

      timerRef.current = window.setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);

    } catch (err: any) {
      cleanupStreams();
      setError(err.message || "Failed to start recording.");
      setState("idle");
    }
  }, [cleanupStreams]);

  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.pause();
      if (timerRef.current) clearInterval(timerRef.current);
      setState("paused");
    }
  }, []);

  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "paused") {
      mediaRecorderRef.current.resume();
      timerRef.current = window.setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
      setState("recording");
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  }, []);

  // Format seconds to MM:SS
  const formattedDuration = new Date(duration * 1000).toISOString().substring(14, 19);

  return {
    state,
    duration: formattedDuration,
    error,
    previewVideoRef,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording
  };
}

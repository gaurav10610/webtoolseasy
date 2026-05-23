"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/Badge";
import { useScreenRecorder } from "./useScreenRecorder";

export default function ScreenRecorderPage() {
  const {
    state,
    duration,
    error,
    previewVideoRef,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording
  } = useScreenRecorder();

  const [withMic, setWithMic] = useState(false);
  const [withSystemAudio, setWithSystemAudio] = useState(true);
  const [withCamera, setWithCamera] = useState(false);

  const handleStart = () => {
    startRecording({ withMic, withSystemAudio, withCamera });
  };

  return (
    <AppLayout mainClassName="relative">
      <div className="pointer-events-none absolute left-[10%] top-[20%] h-[30%] w-[40%] rounded-full bg-red-600/10 blur-[100px]" />
      
      <div className="mx-auto max-w-6xl pt-10 pb-20">
        <div className="text-center mb-10">
          <Badge variant="error" className="mb-4">No Watermark & Privacy First</Badge>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Advanced Screen Recorder
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Record your screen, camera, and microphone directly in your browser. Video chunks are safely written to local IndexedDB to prevent memory crashes on long recordings.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm font-semibold text-center max-w-2xl mx-auto">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Video Preview Area */}
          <div className="lg:col-span-2 bg-[#121214]/90 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                {state === 'recording' && <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />}
                Live Preview
              </h2>
              {state !== 'idle' && (
                <div className="font-mono text-xl font-bold text-red-400">
                  {duration}
                </div>
              )}
            </div>
            
            <div className="aspect-video bg-black rounded-2xl border border-white/5 overflow-hidden relative shadow-inner">
              <video 
                ref={previewVideoRef} 
                className="w-full h-full object-contain" 
                muted 
                playsInline
              />
              {state === 'idle' && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-medium">
                  Preview will appear when recording starts
                </div>
              )}
              {state === 'saving' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-10">
                  <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-white mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-white font-bold text-lg animate-pulse">Compiling video from IndexedDB...</p>
                  <p className="text-gray-400 text-sm mt-2">Please do not close this tab.</p>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="mt-6 flex justify-center gap-4">
              {state === 'idle' && (
                <button
                  onClick={handleStart}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3" fill="currentColor"></circle></svg>
                  Start Recording
                </button>
              )}
              
              {state === 'recording' && (
                <button
                  onClick={pauseRecording}
                  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-all"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                  Pause
                </button>
              )}

              {state === 'paused' && (
                <button
                  onClick={resumeRecording}
                  className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-xl transition-all"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  Resume
                </button>
              )}

              {(state === 'recording' || state === 'paused') && (
                <button
                  onClick={stopRecording}
                  className="flex items-center gap-2 bg-white text-red-600 font-bold py-3 px-8 rounded-xl transition-all hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
                  Stop & Download
                </button>
              )}
            </div>
          </div>

          {/* Settings Sidebar */}
          <div className="bg-[#121214]/90 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-6">Capture Settings</h2>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${withSystemAudio ? 'bg-indigo-500/20 text-indigo-400' : 'bg-gray-800 text-gray-500'}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">System Audio</div>
                    <div className="text-gray-500 text-xs">Browser tab or system sound</div>
                  </div>
                </div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={withSystemAudio} onChange={(e) => setWithSystemAudio(e.target.checked)} disabled={state !== 'idle'} />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                </div>
              </label>

              <label className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${withMic ? 'bg-indigo-500/20 text-indigo-400' : 'bg-gray-800 text-gray-500'}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">Microphone</div>
                    <div className="text-gray-500 text-xs">Record your voice</div>
                  </div>
                </div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={withMic} onChange={(e) => setWithMic(e.target.checked)} disabled={state !== 'idle'} />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                </div>
              </label>

              <label className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${withCamera ? 'bg-indigo-500/20 text-indigo-400' : 'bg-gray-800 text-gray-500'}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 7l-7 5 7 5V7z"></path><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">Webcam PiP</div>
                    <div className="text-gray-500 text-xs">Picture-in-picture overlay</div>
                  </div>
                </div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={withCamera} onChange={(e) => setWithCamera(e.target.checked)} disabled={state !== 'idle'} />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                </div>
              </label>
            </div>

            <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <h3 className="text-yellow-400 font-bold text-sm mb-2 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                Important Note
              </h3>
              <p className="text-yellow-200/70 text-xs leading-relaxed">
                If you enable System Audio, make sure to check <strong>"Share tab audio"</strong> or <strong>"Share system audio"</strong> in the browser popup when selecting your screen. 
                Recordings are saved directly to your Downloads folder as a `.webm` file.
              </p>
            </div>

          </div>
        </div>

      </div>
    </AppLayout>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

// interface VideoFileData

export default function VideoToAudioConverter() {
  const [isFFmpegLoaded, setIsFFmpegLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef(null);

  const onComponentLoad = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.7/dist/umd";

    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      console.log(message);
    });

    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
    setIsFFmpegLoaded(true);
  };

  useEffect(() => {
    onComponentLoad();
  }, []);

  return <div className="flex flex-col w-full gap-3"></div>;
}

export interface FileProcessingOptions {
  chunkSize?: number;
  onProgress?: (progress: number) => void;
  signal?: AbortSignal;
}

export class FileProcessor {
  static async readFileAsText(
    file: File,
    options: FileProcessingOptions = {}
  ): Promise<string> {
    const { chunkSize = 64 * 1024, onProgress, signal } = options;

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      let offset = 0;
      let content = "";

      const readChunk = () => {
        if (signal?.aborted) {
          reject(new Error("Operation was aborted"));
          return;
        }

        const chunk = file.slice(offset, offset + chunkSize);
        reader.readAsText(chunk);
      };

      reader.onload = (event) => {
        content += event.target?.result as string;
        offset += chunkSize;

        const progress = Math.min((offset / file.size) * 100, 100);
        onProgress?.(progress);

        if (offset < file.size) {
          // Add small delay to prevent UI blocking
          setTimeout(readChunk, 10);
        } else {
          resolve(content);
        }
      };

      reader.onerror = () => {
        reject(new Error("Failed to read file"));
      };

      readChunk();
    });
  }

  static async readFileAsArrayBuffer(
    file: File,
    options: FileProcessingOptions = {}
  ): Promise<ArrayBuffer> {
    const { onProgress, signal } = options;

    return new Promise((resolve, reject) => {
      if (signal?.aborted) {
        reject(new Error("Operation was aborted"));
        return;
      }

      const reader = new FileReader();

      reader.onload = (event) => {
        onProgress?.(100);
        resolve(event.target?.result as ArrayBuffer);
      };

      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          onProgress?.(progress);
        }
      };

      reader.onerror = () => {
        reject(new Error("Failed to read file"));
      };

      if (signal) {
        signal.addEventListener("abort", () => {
          reader.abort();
          reject(new Error("Operation was aborted"));
        });
      }

      reader.readAsArrayBuffer(file);
    });
  }

  static async readFileAsDataURL(
    file: File,
    options: FileProcessingOptions = {}
  ): Promise<string> {
    const { onProgress, signal } = options;

    return new Promise((resolve, reject) => {
      if (signal?.aborted) {
        reject(new Error("Operation was aborted"));
        return;
      }

      const reader = new FileReader();

      reader.onload = (event) => {
        onProgress?.(100);
        resolve(event.target?.result as string);
      };

      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          onProgress?.(progress);
        }
      };

      reader.onerror = () => {
        reject(new Error("Failed to read file"));
      };

      if (signal) {
        signal.addEventListener("abort", () => {
          reader.abort();
          reject(new Error("Operation was aborted"));
        });
      }

      reader.readAsDataURL(file);
    });
  }

  static createObjectURL(file: File): string {
    return URL.createObjectURL(file);
  }

  static revokeObjectURL(url: string): void {
    URL.revokeObjectURL(url);
  }

  static downloadFile(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  static async compressImage(
    file: File,
    options: {
      maxWidth?: number;
      maxHeight?: number;
      quality?: number;
      format?: string;
    } = {}
  ): Promise<Blob> {
    const {
      maxWidth = 1920,
      maxHeight = 1080,
      quality = 0.8,
      format = "image/jpeg",
    } = options;

    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Failed to compress image"));
            }
          },
          format,
          quality
        );
      };

      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };

      img.src = URL.createObjectURL(file);
    });
  }

  static getFileExtension(filename: string): string {
    return filename.split(".").pop()?.toLowerCase() || "";
  }

  static getMimeTypeFromExtension(extension: string): string {
    const mimeTypes: { [key: string]: string } = {
      // Images
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      webp: "image/webp",
      svg: "image/svg+xml",

      // Videos
      mp4: "video/mp4",
      webm: "video/webm",
      ogg: "video/ogg",
      avi: "video/x-msvideo",
      mov: "video/quicktime",

      // Audio
      mp3: "audio/mpeg",
      wav: "audio/wav",
      "ogg-audio": "audio/ogg",
      aac: "audio/aac",
      flac: "audio/flac",

      // Documents
      pdf: "application/pdf",
      txt: "text/plain",
      csv: "text/csv",
      json: "application/json",
      xml: "application/xml",

      // Archives
      zip: "application/zip",
      rar: "application/x-rar-compressed",
      "7z": "application/x-7z-compressed",
    };

    return mimeTypes[extension.toLowerCase()] || "application/octet-stream";
  }

  static isImageFile(file: File): boolean {
    return file.type.startsWith("image/");
  }

  static isVideoFile(file: File): boolean {
    return file.type.startsWith("video/");
  }

  static isAudioFile(file: File): boolean {
    return file.type.startsWith("audio/");
  }

  static isTextFile(file: File): boolean {
    return (
      file.type.startsWith("text/") ||
      file.type === "application/json" ||
      file.type === "application/xml"
    );
  }
}

export interface FileValidationOptions {
  maxSize?: number;
  allowedTypes?: string[];
  allowedExtensions?: string[];
  minSize?: number;
}

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateFile(
  file: File,
  options: FileValidationOptions = {}
): FileValidationResult {
  const { maxSize, allowedTypes, allowedExtensions, minSize } = options;

  // Check file size
  if (maxSize && file.size > maxSize) {
    return {
      isValid: false,
      error: `File "${
        file.name
      }" is too large. Maximum size allowed is ${formatBytes(maxSize)}.`,
    };
  }

  if (minSize && file.size < minSize) {
    return {
      isValid: false,
      error: `File "${
        file.name
      }" is too small. Minimum size required is ${formatBytes(minSize)}.`,
    };
  }

  // Check file type
  if (allowedTypes && allowedTypes.length > 0) {
    const isTypeAllowed = allowedTypes.some((type) => {
      if (type.endsWith("/*")) {
        return file.type.startsWith(type.slice(0, -1));
      }
      return file.type === type;
    });

    if (!isTypeAllowed) {
      return {
        isValid: false,
        error: `File type "${
          file.type
        }" is not allowed. Allowed types: ${allowedTypes.join(", ")}.`,
      };
    }
  }

  // Check file extension
  if (allowedExtensions && allowedExtensions.length > 0) {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const normalizedExtensions = allowedExtensions.map((ext) =>
      ext.toLowerCase().replace(".", "")
    );

    if (!fileExtension || !normalizedExtensions.includes(fileExtension)) {
      return {
        isValid: false,
        error: `File extension ".${fileExtension}" is not allowed. Allowed extensions: ${allowedExtensions.join(
          ", "
        )}.`,
      };
    }
  }

  return { isValid: true };
}

export function validateFiles(
  files: FileList,
  options: FileValidationOptions = {}
): FileValidationResult {
  for (let i = 0; i < files.length; i++) {
    const result = validateFile(files[i], options);
    if (!result.isValid) {
      return result;
    }
  }
  return { isValid: true };
}

// Helper function to format bytes
function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

// Common file type presets
export const FILE_TYPE_PRESETS = {
  IMAGES: [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
  ],
  VIDEOS: [
    "video/mp4",
    "video/webm",
    "video/ogg",
    "video/avi",
    "video/mov",
    "video/wmv",
    "video/flv",
  ],
  AUDIO: [
    "audio/mp3",
    "audio/wav",
    "audio/ogg",
    "audio/aac",
    "audio/flac",
    "audio/m4a",
  ],
  DOCUMENTS: [
    "application/pdf",
    "text/plain",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  SPREADSHEETS: [
    "text/csv",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
  ARCHIVES: [
    "application/zip",
    "application/x-rar-compressed",
    "application/x-7z-compressed",
    "application/x-tar",
  ],
  CODE: [
    "text/javascript",
    "text/typescript",
    "text/html",
    "text/css",
    "application/json",
    "text/xml",
  ],
};

// Common size presets (in bytes)
export const FILE_SIZE_PRESETS = {
  SMALL: 1024 * 1024, // 1MB
  MEDIUM: 5 * 1024 * 1024, // 5MB
  LARGE: 10 * 1024 * 1024, // 10MB
  EXTRA_LARGE: 50 * 1024 * 1024, // 50MB
  HUGE: 100 * 1024 * 1024, // 100MB
  MASSIVE: 500 * 1024 * 1024, // 500MB
  GIGANTIC: 1024 * 1024 * 1024, // 1GB
};

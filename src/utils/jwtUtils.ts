export type JwtData = {
  isValid: boolean;
  header: any;
  payload: any;
  signature: string;
  error?: string;
};

// Standard Base64Url decode (browser safe)
export function base64UrlDecode(str: string): string {
  // Convert Base64Url to Base64
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  
  // Pad string with '=' until its length is a multiple of 4
  while (base64.length % 4 !== 0) {
    base64 += "=";
  }
  
  try {
    // Decode base64 to string using browser API
    return decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch (err) {
    throw new Error("Failed to decode base64url string");
  }
}

// Standard Base64Url encode (browser safe)
export function base64UrlEncode(str: string): string {
  try {
    // Encode string to base64 using browser API
    const base64 = btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
      })
    );
    // Convert Base64 to Base64Url
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  } catch (err) {
    throw new Error("Failed to encode string to base64url");
  }
}

export function decodeJwt(token: string): JwtData {
  if (!token || typeof token !== "string") {
    return { isValid: false, header: null, payload: null, signature: "", error: "Empty token" };
  }

  const parts = token.split(".");
  
  if (parts.length !== 3) {
    return { 
      isValid: false, 
      header: null, 
      payload: null, 
      signature: "", 
      error: "JWT must have 3 parts (Header, Payload, Signature)" 
    };
  }

  try {
    const headerStr = base64UrlDecode(parts[0]);
    const payloadStr = base64UrlDecode(parts[1]);
    
    let header, payload;
    try {
      header = JSON.parse(headerStr);
    } catch {
      throw new Error("Invalid JSON in header");
    }
    
    try {
      payload = JSON.parse(payloadStr);
    } catch {
      throw new Error("Invalid JSON in payload");
    }

    return {
      isValid: true,
      header,
      payload,
      signature: parts[2]
    };
  } catch (err: any) {
    return {
      isValid: false,
      header: null,
      payload: null,
      signature: parts[2] || "",
      error: err.message || "Invalid JWT encoding"
    };
  }
}

// Rebuilds the JWT string given raw header/payload objects and an existing signature
export function encodeJwt(headerObj: any, payloadObj: any, signature: string): string {
  try {
    const headerStr = JSON.stringify(headerObj);
    const payloadStr = JSON.stringify(payloadObj);
    
    const encodedHeader = base64UrlEncode(headerStr);
    const encodedPayload = base64UrlEncode(payloadStr);
    
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  } catch (err) {
    // If JSON stringify fails, return empty
    return "";
  }
}

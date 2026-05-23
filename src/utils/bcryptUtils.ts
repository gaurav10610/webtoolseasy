import bcrypt from 'bcryptjs';

export async function generateBcryptHash(password: string, rounds: number = 10): Promise<string> {
  if (!password) return "";
  try {
    const salt = await bcrypt.genSalt(rounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new Error("Failed to generate hash");
  }
}

export async function verifyBcryptHash(password: string, hash: string): Promise<boolean> {
  if (!password || !hash) return false;
  try {
    // bcryptjs supports verifying directly
    const isValid = await bcrypt.compare(password, hash);
    return isValid;
  } catch (error) {
    return false;
  }
}

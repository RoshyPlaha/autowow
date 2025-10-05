import * as crypto from 'crypto';

export function encryptPassword(password: string): string {
    // Using SHA-256 for hashing
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
    
    // Return combined salt and hash
    return `${salt}:${hash}`;
}

// Optional: Add a verification function if needed for login
export function verifyPassword(storedPassword: string, inputPassword: string): boolean {
    const [salt, originalHash] = storedPassword.split(':');
    const hash = crypto.pbkdf2Sync(inputPassword, salt, 1000, 64, 'sha256').toString('hex');
    return hash === originalHash;
} 
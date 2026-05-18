import crypto from 'crypto';

export function generateGJP2(password: string): string {
    const salt = 'mI293fgJ4sA';
    const hash = crypto.createHash('sha1');
    hash.update(password + salt);
    return hash.digest('hex');
}

import { Buffer } from 'buffer';
import zlib from 'zlib';
export function xor(input, key) {
    return Array.from(input).map((char, i) => String.fromCharCode(char.charCodeAt(0) ^ key[i % key.length])).join('');
}
export function base64Decode(input) {
    let formatted = input.replace(/-/g, '+').replace(/_/g, '/');
    while (formatted.length % 4) {
        formatted += '=';
    }
    return Buffer.from(formatted, 'base64').toString('utf-8');
}
export function decompressGzip(input) {
    return new Promise((resolve, reject) => {
        const formatted = input.replace(/-/g, '+').replace(/_/g, '/');
        const buffer = Buffer.from(formatted, 'base64');
        zlib.gunzip(buffer, (err, decoded) => {
            if (err)
                reject(err);
            else
                resolve(decoded.toString('utf-8'));
        });
    });
}

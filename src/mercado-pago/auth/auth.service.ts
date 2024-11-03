import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    generateCodeVerifier(length = 128): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    async base64UrlEncode(string: string): Promise<string> {
        const buffer = new TextEncoder().encode(string);
        const hash = await crypto.subtle.digest('SHA-256', buffer);
        return btoa(String.fromCharCode(...new Uint8Array(hash)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    async createCodeChallenge(codeVerifier: string): Promise<string> {
        return await this.base64UrlEncode(codeVerifier);
    }

    async generateCodeChallenge(): Promise<{ codeVerifier: string; codeChallenge: string }> {
        const codeVerifier = this.generateCodeVerifier();
        const codeChallenge = await this.createCodeChallenge(codeVerifier);
        return { codeVerifier, codeChallenge };
    }
}

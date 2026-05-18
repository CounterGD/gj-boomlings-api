import { parseLevelResponse } from './parser/levelParser.js';
import { parseProfileResponse } from './parser/profileParser.js';
import { parseLeaderboardResponse } from './parser/leaderboardParser.js';
import { generateGJP2 } from './crypto/auth.js';
export class GeometryDashClient {
    baseUrl;
    session = null;
    constructor(customServerUrl) {
        this.baseUrl = customServerUrl || 'https://www.boomlings.com/database';
    }
    async request(endpoint, body) {
        const formData = new URLSearchParams(body);
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': '' },
            body: formData.toString(),
        });
        if (!response.ok)
            throw new Error(`HTTP Error ${response.status}`);
        return await response.text();
    }
    async login(username, password) {
        const gjp2 = generateGJP2(password);
        const rawData = await this.request('/loginGJAccount.php', { userName: username, password: password, secret: 'Wmfd2893gb7' });
        if (rawData === '-1' || rawData.startsWith('-'))
            throw new Error('Authentication failed.');
        const [accountIdStr, playerIdStr] = rawData.split(',');
        this.session = { accountId: parseInt(accountIdStr, 10), playerId: parseInt(playerIdStr, 10), gjp2 };
        return this.session;
    }
    async downloadLevel(levelId) {
        const rawData = await this.request('/downloadGJLevel22.php', { levelID: levelId.toString(), secret: 'Wmfd2893gb7' });
        if (rawData === '-1')
            throw new Error('Level not found.');
        return parseLevelResponse(rawData.split('#')[0]);
    }
    async getProfile(target) {
        const rawData = await this.request('/getGJUserInfo20.php', { targetAccountID: target.toString(), secret: 'Wmfd2893gb7' });
        if (rawData === '-1')
            throw new Error('Profile not found.');
        return parseProfileResponse(rawData);
    }
    async getLeaderboard(type = 'top', count = 50) {
        const payload = {
            type: type === 'relative' ? '1' : type === 'creators' ? '2' : '0',
            count: count.toString(), secret: 'Wmfd2893gb7'
        };
        if (type === 'relative') {
            if (!this.session)
                throw new Error('Must log in for relative leaderboard.');
            payload.accountID = this.session.accountId.toString();
            payload.gjp2 = this.session.gjp2;
        }
        const rawData = await this.request('/getGJScores20.php', payload);
        return parseLeaderboardResponse(rawData);
    }
}

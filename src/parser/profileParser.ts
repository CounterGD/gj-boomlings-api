import { GDProfile } from '../types/gd.js';

const PROFILE_MAPPING: Record<string, string> = {
    '1': 'username', '2': 'playerId', '3': 'stars', '4': 'demons', '6': 'creatorPoints',
    '16': 'accountId', '20': 'youtube', '21': 'cubeIcon', '22': 'shipIcon', '23': 'ballIcon',
    '24': 'ufoIcon', '25': 'waveIcon', '26': 'robotIcon', '28': 'glowEnabled', '30': 'globalRank',
    '43': 'spiderIcon', '44': 'twitter', '45': 'twitch', '46': 'diamonds', '49': 'moderatorStatus',
    '52': 'moons', '53': 'swingIcon', '54': 'jetpackIcon'
};

export function parseProfileResponse(rawString: string): GDProfile {
    const parts = rawString.split(':');
    const data: Record<string, any> = {};
    for (let i = 0; i < parts.length; i += 2) { data[PROFILE_MAPPING[parts[i]] || ''] = parts[i + 1]; }
    return {
        username: data.username || 'Unknown', playerId: parseInt(data.playerId, 10) || 0, accountId: parseInt(data.accountId, 10) || 0,
        stars: parseInt(data.stars, 10) || 0, moons: parseInt(data.moons, 10) || 0, demons: parseInt(data.demons, 10) || 0,
        creatorPoints: parseInt(data.creatorPoints, 10) || 0, diamonds: parseInt(data.diamonds, 10) || 0, globalRank: parseInt(data.globalRank, 10) || 0,
        moderatorStatus: parseInt(data.moderatorStatus, 10) || 0,
        youtube: data.youtube && data.youtube !== '0' ? `https://youtube.com/channel/${data.youtube}` : null,
        twitter: data.twitter && data.twitter !== '0' ? data.twitter : null, twitch: data.twitch && data.twitch !== '0' ? data.twitch : null,
        icons: {
            cube: parseInt(data.cubeIcon, 10) || 1, ship: parseInt(data.shipIcon, 10) || 1, ball: parseInt(data.ballIcon, 10) || 1,
            ufo: parseInt(data.ufoIcon, 10) || 1, wave: parseInt(data.waveIcon, 10) || 1, robot: parseInt(data.robotIcon, 10) || 1,
            spider: parseInt(data.spiderIcon, 10) || 1, swing: parseInt(data.swingIcon, 10) || 1, jetpack: parseInt(data.jetpackIcon, 10) || 1,
            primaryColor: parseInt(parts[parts.indexOf('10') + 1], 10) || 0, secondaryColor: parseInt(parts[parts.indexOf('11') + 1], 10) || 0,
            glowEnabled: data.glowEnabled === '1',
        }
    };
}

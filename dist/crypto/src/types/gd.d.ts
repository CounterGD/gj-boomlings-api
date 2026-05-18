export interface GDLevel {
    id: number;
    name: string;
    description: string;
    author: string;
    stars: number;
    coins: number;
    isPlatformer: boolean;
    likes: number;
    downloads: number;
    version: number;
    sfxCount: number;
    shaderCount: number;
    rawLevelData?: string;
}
export interface GDProfile {
    playerId: number;
    accountId: number;
    username: string;
    stars: number;
    moons: number;
    demons: number;
    creatorPoints: number;
    diamonds: number;
    globalRank: number;
    moderatorStatus: number;
    youtube: string | null;
    twitter: string | null;
    twitch: string | null;
    icons: {
        cube: number;
        ship: number;
        ball: number;
        ufo: number;
        wave: number;
        robot: number;
        spider: number;
        swing: number;
        jetpack: number;
        primaryColor: number;
        secondaryColor: number;
        glowEnabled: boolean;
    };
}
export interface GDLeaderboardUser {
    rank: number;
    username: string;
    playerId: number;
    accountId: number;
    stars: number;
    moons: number;
    demons: number;
    creatorPoints: number;
    diamonds: number;
}
export interface GDAuthSession {
    accountId: number;
    playerId: number;
    gjp2: string;
}

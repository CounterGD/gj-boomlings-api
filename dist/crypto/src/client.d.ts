import { GDLevel, GDProfile, GDLeaderboardUser, GDAuthSession } from './types/gd';
export declare class GeometryDashClient {
    private baseUrl;
    private session;
    constructor(customServerUrl?: string);
    private request;
    login(username: string, password: string): Promise<GDAuthSession>;
    downloadLevel(levelId: number): Promise<GDLevel>;
    getProfile(target: string | number): Promise<GDProfile>;
    getLeaderboard(type?: 'top' | 'relative' | 'creators', count?: number): Promise<GDLeaderboardUser[]>;
}

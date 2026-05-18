export function parseLeaderboardResponse(rawString) {
    if (!rawString || rawString === '-1')
        return [];
    const userStrings = rawString.split('|');
    const users = [];
    for (const userStr of userStrings) {
        if (!userStr)
            continue;
        const parts = userStr.split(':');
        const data = {};
        for (let i = 0; i < parts.length; i += 2) {
            data[parts[i]] = parts[i + 1];
        }
        users.push({
            username: data['1'] || 'Unknown', playerId: parseInt(data['2'], 10) || 0, stars: parseInt(data['3'], 10) || 0,
            demons: parseInt(data['4'], 10) || 0, rank: parseInt(data['6'], 10) || 0, creatorPoints: parseInt(data['8'], 10) || 0,
            accountId: parseInt(data['16'], 10) || 0, diamonds: parseInt(data['46'], 10) || 0, moons: parseInt(data['52'], 10) || 0
        });
    }
    return users;
}

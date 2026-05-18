const LEVEL_MAPPING = {
    '1': 'id', '2': 'name', '3': 'description', '4': 'rawLevelData', '5': 'version',
    '10': 'downloads', '14': 'likes', '18': 'stars', '37': 'coins', '57': 'sfxCount', '61': 'shaderCount',
};
export function parseLevelResponse(rawString) {
    const parts = rawString.split(':');
    const levelData = {};
    for (let i = 0; i < parts.length; i += 2) {
        const key = parts[i];
        const value = parts[i + 1];
        const mappedKey = LEVEL_MAPPING[key];
        if (mappedKey) {
            if (['id', 'stars', 'coins', 'downloads', 'likes', 'version', 'sfxCount', 'shaderCount'].includes(mappedKey)) {
                levelData[mappedKey] = parseInt(value, 10) || 0;
            }
            else {
                levelData[mappedKey] = value;
            }
        }
    }
    levelData.isPlatformer = (parseInt(parts[parts.indexOf('40') + 1], 10) === 1);
    return levelData;
}

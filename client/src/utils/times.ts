export const formatTimeToView = (secondsDelta: number) => new Date(secondsDelta * 1000).toISOString().substr(11, 8);

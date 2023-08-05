export const colorMap: { [key: string]: string } = {
    red: '#f44336',
    blue: '#326AF9',
    green: '#4caf50',
}

export const getColorHexadecimal = (color: string): string => {
    return colorMap[color.toLowerCase()];
}
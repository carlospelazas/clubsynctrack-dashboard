export const colorMap: { [key: string]: string } = {
    red: '#f44336',
    blue: '#326AF9',
    green: '#4caf50',
    gray: '#6E6E6E',
}

export const getColorHexadecimal = (color: string): string => {
    return colorMap[color.toLowerCase()];
}
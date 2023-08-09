export function removeLeadingZero(numberString: string) {
    if (numberString.length === 2 && numberString[0] === '0') {
      return numberString[1];
    }
    return numberString;
  }
export const availableTimes: string[] = [];
  for (let hour = 7; hour <= 22; hour++) {
    for (let minute = 0; minute <= 45; minute += 15) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      availableTimes.push(timeString);
    }
  }
  availableTimes.push("23:00");
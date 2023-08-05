export function calculateDurationInMinutes(startHour: string, endHour: string): number {
    const startTime = new Date(`1970-01-01T${startHour}:00`);
    const endTime = new Date(`1970-01-01T${endHour}:00`);
    
    // Calculate the difference in milliseconds between the two times
    const durationInMilliseconds = endTime.getTime() - startTime.getTime();
  
    // Convert the duration from milliseconds to minutes
    const durationInMinutes = durationInMilliseconds / (1000 * 60);
  
    return durationInMinutes;
  }
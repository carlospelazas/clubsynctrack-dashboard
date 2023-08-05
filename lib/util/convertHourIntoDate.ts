export function convertTimeStringToDate(timeString: string): Date {
    // Set a common date for all time values (January 1, 1970)
    const referenceDate = new Date('1970-01-01');
  
    // Split the time string into hours and minutes
    const [hours, minutes] = timeString.split(':').map(Number);
  
    // Create a new Date object with the reference date and the specified hours and minutes
    const resultDate = new Date(referenceDate);
    resultDate.setHours(hours);
    resultDate.setMinutes(minutes);
  
    return resultDate;
  }
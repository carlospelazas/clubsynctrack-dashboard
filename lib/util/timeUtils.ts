export function calculateEndHour(startHour: string, duration: number): string {
  // Convert the startHour string to a Date object
  const startDate = new Date(`2000-01-01T${startHour}`);

  // Add the duration minutes to the startDate
  startDate.setMinutes(startDate.getMinutes() + duration);

  // Format the result as HH:mm
  const endHour = startDate.toTimeString().slice(0, 5);

  return endHour;
}

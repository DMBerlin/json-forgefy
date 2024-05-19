export function isValidDateString(dateString: string): boolean {
  const date: Date = new Date(dateString);
  return !isNaN(date.getTime());
}

export function diffInDays(startDate: Date, endDate: Date): number {
  const diffTime: number = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function diffInMonths(startDate: Date, endDate: Date): number {
  const diffTime: number = endDate.getTime() - startDate.getTime();
  return Math.floor(diffTime / (1000 * 3600 * 24 * 30));
}

export function diffInYears(startDate: Date, endDate: Date): number {
  const diffTime: number = endDate.getTime() - startDate.getTime();
  return Math.floor(diffTime / (1000 * 3600 * 24 * 365));
}

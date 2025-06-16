import { format, addHours } from 'date-fns';

export function formatToLocalTime(
  dateInput: string | Date,
  formatStr = 'dd MMM yyyy HH:mm',
): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  const offset = -new Date().getTimezoneOffset() / 60;

  return format(addHours(date, offset), formatStr);
}

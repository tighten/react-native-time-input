import { format } from 'date-fns';

export default function getLocaleTimeString(
  dateTimeString: Date | null = null
): string {
  return format(
    dateTimeString ? new Date(dateTimeString) : new Date(),
    'hh:mm a'
  );
}

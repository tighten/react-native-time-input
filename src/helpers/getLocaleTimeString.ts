import { format } from 'date-fns';

export default function getLocaleTimeString(dateTimeString: string|null = null): string {
  return format(dateTimeString ? new Date(dateTimeString) : new Date(), 'hh:mm a');
}
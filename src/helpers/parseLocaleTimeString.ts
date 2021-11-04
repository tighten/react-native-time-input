import type { TimeParts } from '../typing/TimeParts';

export default function parseLocaleTimeString(localeTime: string): TimeParts {
  let arr = localeTime.split(' ');
  return {
    time: arr[0],
    meridiem: arr[1],
  };
}

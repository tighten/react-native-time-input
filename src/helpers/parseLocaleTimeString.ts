import type TimePartsType from '../typing/TimeParts';

export default function parseLocaleTimeString(
  localeTime: string
): TimePartsType {
  let arr = localeTime.split(' ');
  return {
    time: arr[0],
    meridiem: arr[1],
  };
}

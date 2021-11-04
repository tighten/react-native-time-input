import type TimeInputStyle from './TimeInputStyle';
import type TimeInputTheme from './TimeInputTheme';

export default interface TimeInputProps {
  errorText?: string | null;
  showErrorText?: boolean;
  initialTime?: Date | null; // TODO: add stronger typing here for a date string?
  onTimeChange?: Function;
  setCurrentTime?: boolean;
  styles?: TimeInputStyle;
  theme?: TimeInputTheme;
}

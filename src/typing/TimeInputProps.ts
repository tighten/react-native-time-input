import type TimeInputStyle from './TimeInputStyle';
import type TimeInputTheme from './TimeInputTheme';


export default interface TimeInputProps {
  errorText?: string | null;
  showErrorText: boolean;
  initialTime?: Date | null;
  onTimeChange?: Function;
  setCurrentTime?: boolean;
  styles?: TimeInputStyle;
  theme?: TimeInputTheme;
}
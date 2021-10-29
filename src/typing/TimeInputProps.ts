import type TimeInputStyle from './TimeInputStyle';
import type TimeInputTheme from './TimeInputTheme';


export default interface TimeInputProps {
  errorText?: String | null;
  initialTime?: Date | null;
  onTimeChange?: Function;
  setCurrentTime?: Boolean;
  styles?: TimeInputStyle;
  theme?: TimeInputTheme;
}
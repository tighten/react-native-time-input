import type { TextStyle, ViewStyle } from 'react-native';
import type { AnimatedViewStyle } from './AnimatedViewStyle';

export default interface TimeInputStyle {
  componentContainer: ViewStyle;
  container: ViewStyle;
  input: TextStyle;
  toggle: ViewStyle;
  toggleButton: ViewStyle;
  toggleButtonActive: AnimatedViewStyle | ViewStyle;
  errorText: TextStyle;
}

import type TimeInputTheme from 'src/typing/TimeInputTheme';

export const colors = {
  black: '#2e2e2e',
  blue: '#2980b9',
  grey: '#a6a6a6',
  lightGrey: '#d7d7d7',
  offWhite: '#e6e6e6',
  red: '#c0392b',
  white: '#ffffff',
}

export default {
  errorTextColor: colors.red,
  inputBackgroundColor: colors.white,
  inputBorderColor: colors.grey,
  inputTextColor: colors.black,
  toggleBackgroundColor: colors.offWhite,
  toggleButtonActiveBackgroundColor: colors.grey,
  toggleButtonActiveTextColor: colors.white,
  toggleButtonBackground: colors.offWhite,
  toggleButtonTextColor: colors.black,
} as TimeInputTheme;
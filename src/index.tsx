import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import type TimeInputProps from './typing/TimeInputProps';
import type TimeInputStyle from './typing/TimeInputStyle';
import type TimeInputTheme from './typing/TimeInputTheme';
import defaultTheme from './utils/theme';
import defaultStyles from './utils/style';

const TimeInput = ({
  errorText = null,
  initialTime = null,
  onTimeChange = () => {},
  setCurrentTime = false,
  styles,
  theme,
}: TimeInputProps): JSX.Element | null => {
  const [componentReady, setComponentReady] = useState<boolean>(false);
  const [componentTheme, setComponentTheme] = useState<TimeInputTheme | null>(null);
  const [componentStyle, setComponentStyle] = useState<TimeInputStyle | null>(null);

  // Init component after setting the theme and styles
  useEffect((): void => {
    if (!componentStyle || !componentTheme) return;
    setComponentReady(true);
  }, [componentStyle, componentTheme, setComponentReady]);

  useEffect((): void => {
    setComponentStyle(StyleSheet.flatten([defaultStyles, styles]));
    setComponentTheme(StyleSheet.flatten([defaultTheme, theme]));
  }, [styles, theme, setComponentStyle, setComponentTheme]);


  if (!componentReady) return null;

  return (
    <Text>Time Input Component</Text>
  );
};

export default TimeInput;
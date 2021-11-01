import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TimeTextField from './components/TimeTextField';
import _ from 'lodash';
import defaultStyles from './utils/style';
import defaultTheme from './utils/theme';
import type TimeInputProps from './typing/TimeInputProps';
import type TimeInputStyle from './typing/TimeInputStyle';
import type TimeInputTheme from './typing/TimeInputTheme';

export default function TimeInput (
  {
    errorText = 'Entered time is invalid.',
    initialTime = null,
    onTimeChange = () => {},
    setCurrentTime = false,
    styles,
    theme,
  }: TimeInputProps
): JSX.Element | null {
  const initialRender = useRef(true);
  const [componentReady, setComponentReady] = useState<boolean>(false);
  const [componentTheme, setComponentTheme] = useState<TimeInputTheme | null>(null);
  const [componentStyle, setComponentStyle] = useState<TimeInputStyle | null>(null);
  const [validTime, setValidTime] = useState<boolean>(true);

  // Init component after setting the theme and styles
  useEffect((): void => {
    if (!componentStyle || !componentTheme) return;
    setComponentReady(true);
  }, [componentStyle, componentTheme, setComponentReady]);

  useEffect((): void => {
    setComponentStyle(StyleSheet.create(_.merge({}, defaultStyles, styles)));
    setComponentTheme(_.assign({}, defaultTheme, theme));
  }, [styles, theme, setComponentStyle, setComponentTheme]);

  const handleTimeValueReady = (isValid: boolean): void => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    setValidTime(isValid);
  }


  if (!componentReady || !componentStyle || !componentTheme) return null;

  return (
    <View style={componentStyle.componentContainer}>
      <View style={componentStyle.container}>
        <TimeTextField 
          style={[componentStyle.input, {
            backgroundColor: componentTheme.inputBackgroundColor,
            borderColor: componentTheme.inputBorderColor,
            color: componentTheme.inputTextColor,
          }]}
          onTimeValueReady={handleTimeValueReady}
        />
      </View>

      <Text 
        style={[componentStyle.errorText, {
          color: componentTheme.errorTextColor,
        }]}
      >
        { validTime ? '' : errorText }
      </Text>
    </View>
  );
}
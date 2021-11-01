import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import type TimeInputProps from './typing/TimeInputProps';
import type TimeInputStyle from './typing/TimeInputStyle';
import type TimeInputTheme from './typing/TimeInputTheme';
import defaultTheme from './utils/theme';
import defaultStyles from './utils/style';
import _ from 'lodash';

export default function TimeInput (
  {
    errorText = null,
    initialTime = null,
    onTimeChange = () => {},
    setCurrentTime = false,
    styles,
    theme,
  }: TimeInputProps
): JSX.Element | null {
  const [componentReady, setComponentReady] = useState<boolean>(false);
  const [componentTheme, setComponentTheme] = useState<TimeInputTheme | null>(null);
  const [componentStyle, setComponentStyle] = useState<TimeInputStyle | null>(null);

  // Init component after setting the theme and styles
  useEffect((): void => {
    if (!componentStyle || !componentTheme) return;
    setComponentReady(true);
  }, [componentStyle, componentTheme, setComponentReady]);

  useEffect((): void => {
    setComponentStyle(StyleSheet.create(_.merge({}, defaultStyles, styles)));
    setComponentTheme(_.assign({}, defaultTheme, theme));
  }, [styles, theme, setComponentStyle, setComponentTheme]);


  if (!componentReady || !componentStyle || !componentTheme) return null;

  return (
    <View style={componentStyle.componentContainer}>
      <View style={componentStyle.container}>
        <TextInput
          keyboardType="number-pad"
          maxLength={5}
          onChangeText={(text: string) => {}}
          placeholder="08:00"
          value=""
          style={[componentStyle.input, {
            backgroundColor: componentTheme.inputBackgroundColor,
            borderColor: componentTheme.inputBorderColor,
            color: componentTheme.inputTextColor,
          }]}
        />
      </View>
    </View>
  );
}
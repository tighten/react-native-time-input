import React from 'react';
import {
  Animated,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import type { AnimatedViewStyle } from 'src/typing/AnimatedViewStyle';

type ToggleProps = {
  children?: JSX.Element | JSX.Element[];
  toggleStyles?: ViewStyle[];
};

type ToggleButtonProps = {
  children?: JSX.Element | JSX.Element[];
  toggleButtonStyles?: ViewStyle[] | AnimatedViewStyle[];
  activeButton?: boolean;
  onPress?: () => void;
};

export function ToggleButton({
  children,
  toggleButtonStyles,
  activeButton = false,
  onPress,
}: ToggleButtonProps): JSX.Element {
  if (activeButton) {
    return <Animated.View style={toggleButtonStyles}>{children}</Animated.View>;
  }

  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback onPress={onPress}>
        <View style={toggleButtonStyles}>{children}</View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={toggleButtonStyles}>{children}</View>
    </TouchableOpacity>
  );
}

export default function Toggle({
  children,
  toggleStyles,
}: ToggleProps): JSX.Element {
  return <View style={toggleStyles}>{children}</View>;
}

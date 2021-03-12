# react-native-time-input

## Preview

## Installation

You can install this package by running one of the following  commands:

**NPM**

`npm i @tighten/react-native-time-input`

**Yarn**

`yarn add @tighten/react-native-time-input`

### Basic Example

```js
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import TimeInput from '@tighten/react-native-time-input';

const MyApp = () => {
  const [time, setTime] = useState('');

  const handleTimeChange = (value, valueIsValid) => {
    if (!valueIsValid) return;

    setTime(value);
  }

  return (
    <View>
      <TimeInput 
        setCurrentTime 
        onTimeChange={(time, isValidTime) => handleTimeChange(time, isValidTime)} 
      />

      <Text>Current time entered is: {time}</Text>
    </View>
  );
}

export default MyApp;
```

## Props
Lorem ipsum dolor.

### Main
| Prop         | Default     | Type        | Description |
| ------------ | ----------- | ----------- | ----------- |
| `theme` |  | object | See the [customization](#customization) section below for configuration instructions |
| `styles` |  | object | See the [customization](#customization) section below for configuration instructions |
| `initialValue` | null | Date | Title |
| `setCurrentTime` | false | boolean | Title |
| `onTimeChange` | | function | A callback function that runs when the value of the time input or meridiem is changed. Returns a locale time string (`hh:mm a`) and a boolean value specifying if the time is valid. |

## Customization

The look and feel of this component is completely customizable.

### Themes

You can implement minimal changes to the look and feel by adjusting the default theme's hex values for different pieces of the component.
Here's what's available:

| Prop        | Default    |
| ----------- | ----------- |
| `errorTextColor`| `#c0392b` | <span style="background-color: #c0392b; padding: 8px; display: block;"></span> |
| `inputBackgroundColor`   | `#ffffff` | <span style="background-color: #ffffff; padding: 8px; display: block;"></span> |
| `inputBorderColor`   | `#a6a6a6` | <span style="background-color: #a6a6a6; padding: 8px; display: block;"></span> |
| `inputTextColor`   | `#2e2e2e` | <span style="background-color: #2e2e2e; padding: 8px; display: block;"></span> |
| `toggleBackgroundColor` | `#e6e6e6` | <span style="background-color: #e6e6e6; padding: 8px; display: block;"></span> |
| `toggleButtonActiveBackgroundColor` | `#a6a6a6` | <span style="background-color: #a6a6a6; padding: 8px; display: block;"></span> |
| `toggleButtonActiveTextColor` | `#ffffff` | <span style="background-color: #ffffff; padding: 8px; display: block;"></span> |
| `toggleButtonBackgroundColor` | `#ffffff` | <span style="background-color: #ffffff; padding: 8px; display: block;"></span> |
| `toggleButtonTextColor` | `#2e2e2e` | <span style="background-color: #2e2e2e; padding: 8px; display: block;"></span> |

**Example**

```js
import React from 'react';
import TimeInput from '@tighten/react-native-time-input';

export const MyApp = () => {
  return (
    <TimeInput 
      theme={{
        inputBackgroundColor: '#000000',
        inputTextColor: '#ffff00',
      }} 
    />
  )
};
```

### Styles

If you want to make adjustments to the component's layout, you can pass in a style object to override the default styles.

| Prop        | Description |
| ----------- | ----------- |
| `componentContainer`| A wrapper `View` element that surrounds all elements in the component |
| `container`   | A wrapper `View` element that surrounds the text input and meridiem toggle |
| `input`   | The `TextInput` field |
| `toggle`   | A wrapper `View` element that surrounds the meridiem toggle and buttons |
| `toggleButton` | The `TouchableOpacity` (iOS) or `TouchableNativeFeedback` (Android) element for AM and PM |
| `toggleButtonActive` | An `Animated.View` element |

**Example**

```js
import React from 'react';
import TimeInput from '@tighten/react-native-time-input';

export const MyApp = () => {
  return (
    <TimeInput 
      styles={{
        componentContainer: {
          borderStyle: 'solid',
          borderWidth: 2,
          paddingHorizontal: 20,
        },
      }} 
    />
  )
};
```

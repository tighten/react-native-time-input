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
| initialValue | null | Date | Title |
| setCurrentTime | false | boolean | Title |
| onTimeChange |  | function | A callback function that runs when the value of the time input or meridiem is changed. Returns a locale time string (`hh:mm a`) and a boolean value specifying if the time is valid. |

### Customization
| Prop        | Default     | Type        | Description |
| ----------- | ----------- | ----------- | ----------- |
| Header      | Title       | Title       | Title       |
| Paragraph   | Text        | Title       | Title       |


import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import TimeInput from 'react-native-time-input';

export default function App() {
  const [time, setTime] = React.useState<string>('');
  const [valid, setValid] = React.useState<boolean>(true);

  const handleOnTimeChange = (time: string, valid: boolean): void =>  {
    setTime(time);
    setValid(valid);
  };

  return (
    <View style={styles.container}>
      <TimeInput
        onTimeChange={handleOnTimeChange}
        initialTime={new Date().getTime()}
      />

      { (valid && Boolean(time.length)) && <Text>Set time: {time}</Text> }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import TimeInput from 'react-native-time-input';

export default function App() {
  return (
    <View style={styles.container}>
      <TimeInput
        errorText="Custom error text."
        onTimeChange={(time, valid) => console.log(time, valid)}
        initialTime={new Date().getTime()}
      />
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

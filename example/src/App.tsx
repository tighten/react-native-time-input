import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import TimeInput from 'react-native-time-input';

export default function App() {
  return (
    <View style={styles.container}>
      <TimeInput />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});

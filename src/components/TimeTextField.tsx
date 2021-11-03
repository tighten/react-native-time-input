import React, { useEffect, useState } from 'react';
import { TextInput, TextStyle } from 'react-native';
import * as TimeInputHelper from '../helpers/timeInput';
import type TimeParts from 'src/typing/TimeParts';
import useDebounce from '../hooks/useDebounce';

type TimeTextFieldProps = {
  style: TextStyle[];
  onTimeValueReady: Function;
  givenTime: TimeParts | null;
};

export default function TimeTextField({
  givenTime,
  onTimeValueReady,
  style,
}: TimeTextFieldProps): JSX.Element {
  const [time, setTime] = useState<string>('');
  const { state: debouncedTime, setDebouncedState: setDebouncedTime } =
    useDebounce(time, 250);

  useEffect(() => {
    if (!givenTime) return;
    setTime(givenTime.time);
  }, [givenTime, setTime]);

  useEffect((): void => {
    onTimeValueReady(TimeInputHelper.validate(debouncedTime), debouncedTime);
  }, [debouncedTime, onTimeValueReady]);

  useEffect((): void => {
    setDebouncedTime(time);
  }, [time, setDebouncedTime]);

  return (
    <TextInput
      keyboardType="number-pad"
      maxLength={5}
      onChangeText={(text: string) => setTime(TimeInputHelper.mask(text))}
      placeholder="08:00"
      value={time}
      style={style}
    />
  );
}

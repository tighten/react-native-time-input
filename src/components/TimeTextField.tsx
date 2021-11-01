import React, { useEffect, useState } from 'react';
import { TextInput, TextStyle } from 'react-native';
import useDebounce from '../hooks/useDebounce';

type TimeTextFieldProps = {
  style: TextStyle[];
  onTimeValueReady: Function;
  givenTime: string;
}

const maskTimeValue = (value: string): string => {
  // replace non-numeric characters
  value = value.replace(/:|[a-zA-Z]/g, '');

  let totalCharactersInValue = value.length;
  
  if (totalCharactersInValue === 3) {
    return value.substr(0, 1) + ':' + value.substr(1);
  }

  if (totalCharactersInValue === 4) {
    return value.substr(0, 2) + ':' + value.substr(2);
  }

  return value;
}

const isTimeValueValid = (value: string): boolean => {
  let regex = new RegExp('^(0?[1-9]|1[012]):[0-5][0-9]$');
  return value.length ? regex.test(value) : true;
};

export default function TimeTextField(props: TimeTextFieldProps): JSX.Element {
  const [time, setTime] = useState<string>('');
  const {
    state: debouncedTime,
    setDebouncedState: setDebouncedTime,
  } = useDebounce(time, 250);

  useEffect(() => {
    setTime(props.givenTime);
  }, [props.givenTime, setTime]);

  useEffect((): void => {
    props.onTimeValueReady(isTimeValueValid(debouncedTime));
  }, [debouncedTime, props.onTimeValueReady, isTimeValueValid]);

  useEffect((): void => {
    setDebouncedTime(time);
  }, [time, setDebouncedTime]);

  return (
    <TextInput
      keyboardType="number-pad"
      maxLength={5}
      onChangeText={(text: string) => setTime(maskTimeValue(text))}
      placeholder="08:00"
      value={time}
      {...props}
    />
  );
}
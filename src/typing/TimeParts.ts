enum ETimeParts {
  time = 'time',
  meridiem = 'meridiem',
}

export type TimeParts = {
  [key in ETimeParts]: string;
};

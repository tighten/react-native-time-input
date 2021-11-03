enum ETimeParts {
  time = 'time',
  meridiem = 'meridiem',
}

type TimeParts = {
  [key in ETimeParts]: string;
};

export default TimeParts;

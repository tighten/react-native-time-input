export const mask = (value: string): string => {
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
};

export const validate = (value: string): boolean => {
  let regex = new RegExp('^(0?[1-9]|1[012]):[0-5][0-9]$');
  return value.length ? regex.test(value) : true;
};

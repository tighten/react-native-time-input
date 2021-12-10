import React from 'react';
import TimeInput from '@tighten/react-native-time-input';
import { act, fireEvent, render } from '@testing-library/react-native';
import { format } from 'date-fns';

describe('<TimeInput />', () => {
  let d: Date;

  beforeEach(() => {
    d = new Date();
    d.setHours(0, 0, 0, 0);

    jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
    jest.mock('lodash/debounce', () => jest.fn((fn) => fn));
    jest.useFakeTimers('modern');
    jest.setSystemTime(d);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders default elements', () => {
    const { getAllByText, getByPlaceholderText } = render(<TimeInput />);

    expect(getAllByText('AM')).toHaveLength(2);
    expect(getAllByText('PM')).toHaveLength(1);
    expect(getByPlaceholderText('08:00')).toBeTruthy();
  });

  it('renders with an initial time set', () => {
    const { getAllByText, getByPlaceholderText } = render(
      <TimeInput initialTime={new Date('04/16/2021 12:15 PM')} />
    );

    expect(getAllByText('AM')).toHaveLength(1);
    expect(getAllByText('PM')).toHaveLength(2);
    expect(getByPlaceholderText('08:00')).toBeTruthy();
  });

  it('renders with the current time set', () => {
    const { getAllByText, getByPlaceholderText } = render(
      <TimeInput setCurrentTime />
    );
    const date = format(new Date(), 'hh:mm a');
    const meridiem = date.split(' ')[1];

    expect(getAllByText(meridiem)).toHaveLength(2);
    expect(getByPlaceholderText('08:00')).toBeTruthy();
  });

  it('updates the time meridiem when AM is clicked', () => {
    const { getByText, queryAllByText } = render(
      <TimeInput initialTime={new Date('04/16/2021 12:15 PM')} />
    );
    const button = getByText('AM');
    const toggle = queryAllByText('PM')[1];

    fireEvent.press(button.parent);

    expect(toggle.props.children).toBe('AM');
  });

  it('updates the time meridiem when PM is clicked', () => {
    const { getByText, queryAllByText } = render(
      <TimeInput initialTime={new Date('04/16/2021 12:15 AM')} />
    );
    const button = getByText('PM');
    const toggle = queryAllByText('AM')[1];

    fireEvent.press(button.parent);

    expect(toggle.props.children).toBe('PM');
  });

  it('renders an error message when the given time is invalid', () => {
    const { getByDisplayValue, getByText } = render(
      <TimeInput initialTime={new Date('04/16/2021 12:15 PM')} />
    );
    const input = getByDisplayValue('12:15');

    act(() => {
      fireEvent.changeText(input, '12');
      jest.runAllTimers();
    });

    expect(input.props.value).toBe('12');
    expect(getByText('Please enter a valid time.')).toBeTruthy();
  });

  it('renders a custom error message when the given time is invalid', () => {
    const { getByDisplayValue, getByText } = render(
      <TimeInput
        initialTime={new Date('04/16/2021 12:15 PM')}
        errorText="Sorry, your input is invalid."
      />
    );
    const input = getByDisplayValue('12:15');

    act(() => {
      fireEvent.changeText(input, '12');
      jest.runAllTimers();
    });

    expect(input.props.value).toBe('12');
    expect(getByText('Sorry, your input is invalid.')).toBeTruthy();
  });
});

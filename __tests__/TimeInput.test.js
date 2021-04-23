import * as React from 'react';
import TimeInput from '../lib/TimeInput';
import { format } from 'date-fns';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';

describe('<TimeInput>', () => {
    beforeAll(() => {
        jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
        jest.useFakeTimers();
    });

    it('renders without an initial time set and setCurrentTime is set to false', async () => {
        const { findByDisplayValue } = render(<TimeInput />);
        const input = await findByDisplayValue('');

        expect(input).toBeTruthy();
    });

    it('renders with an initial time set', async () => {
        const { findByDisplayValue } = render(<TimeInput initialTime={new Date('04/16/2021 12:15 PM')} />);
        const input = await findByDisplayValue('12:15');

        expect(input).toBeTruthy();
    });

    it('renders with the current time set', async () => {
        const { findByDisplayValue } = render(<TimeInput setCurrentTime />);
        const date = format(new Date(), 'hh:mm a');
        const input = await findByDisplayValue(date.split(' ')[0]);

        expect(input).toBeTruthy();
    });

    it('updates the time meridiem when AM is clicked', () => {
        const { getByText, queryAllByText } = render(<TimeInput initialTime={new Date('04/16/2021 12:15 PM')} />);
        const button = getByText('AM');
        const toggle = queryAllByText('PM')[1];

        fireEvent.press(button.parent);

        expect(toggle.props.children).toBe('AM');
    });

    it('updates the time meridiem when PM is clicked', () => {
        const { getByText, queryAllByText } = render(<TimeInput initialTime={new Date('04/16/2021 12:15 AM')} />);
        const button = getByText('PM');
        const toggle = queryAllByText('AM')[1];

        fireEvent.press(button.parent);

        expect(toggle.props.children).toBe('PM');
    });

    it('renders an error message when the given time is invalid', () => {
        const { getByText, getByDisplayValue, queryByText } = render(
            <TimeInput initialTime={new Date('04/16/2021 12:15 PM')} />
        );
        const input = getByDisplayValue('12:15');

        expect(queryByText('Entered time is invalid')).toBeFalsy();

        fireEvent.changeText(input, '12');

        expect(input.props.value).toBe('12');

        jest.advanceTimersByTime(1000);

        expect(getByText(/Entered time is invalid./)).toBeTruthy();
    });
});

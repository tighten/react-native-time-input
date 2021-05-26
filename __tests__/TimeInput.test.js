import * as React from 'react';
import TimeInput from '../lib/TimeInput';
import { format } from 'date-fns';
import { fireEvent, render } from '@testing-library/react-native';

describe('<TimeInput />', () => {
    beforeAll(() => {
        jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
        jest.useFakeTimers();
        jest.advanceTimersByTime(1000);
    });

    it('renders default elements', () => {
        const { getAllByText, getByPlaceholderText } = render(<TimeInput />);

        expect(getAllByText('AM')).toHaveLength(2);
        expect(getAllByText('PM')).toHaveLength(1);
        expect(getByPlaceholderText('08:00')).toBeTruthy();
    });

    it('renders with an initial time set', async () => {
        const { getAllByText, getByPlaceholderText } = render(
            <TimeInput initialTime={new Date('04/16/2021 12:15 PM')} />
        );

        expect(getAllByText('AM')).toHaveLength(1);
        expect(getAllByText('PM')).toHaveLength(2);
        expect(getByPlaceholderText('08:00')).toBeTruthy();
    });

    it('renders with the current time set', async () => {
        const { getAllByText, getByPlaceholderText } = render(<TimeInput setCurrentTime />);
        const date = format(new Date(), 'hh:mm a');
        const meridiem = date.split(' ')[1];

        expect(getAllByText(meridiem)).toHaveLength(2);
        expect(getByPlaceholderText('08:00')).toBeTruthy();
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
        const mockCallback = jest.fn();
        const { getByDisplayValue, getByText } = render(
            <TimeInput initialTime={new Date('04/16/2021 12:15 PM')} onTimeChange={mockCallback} />
        );
        const input = getByDisplayValue('12:15');

        fireEvent.changeText(input, '12');

        expect(mockCallback).toBeCalled();
        expect(input.props.value).toBe('12');
        expect(getByText('Entered time is invalid.')).toBeTruthy();
    });

    it('renders a custom error message when the given time is invalid', () => {
        const mockCallback = jest.fn();
        const { getByDisplayValue, getByText } = render(
            <TimeInput
                initialTime={new Date('04/16/2021 12:15 PM')}
                onTimeChange={mockCallback}
                errorText="Sorry, your input is invalid."
            />
        );
        const input = getByDisplayValue('12:15');

        fireEvent.changeText(input, '12');

        expect(mockCallback).toBeCalled();
        expect(input.props.value).toBe('12');
        expect(getByText('Sorry, your input is invalid.')).toBeTruthy();
    });
});

import * as React from 'react';
import TimeInput from '../lib/TimeInput';
import { render } from '@testing-library/react-native';

describe('TimeInput', () => {
    beforeAll(() => {
        jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
        jest.useFakeTimers();
    });

    it('renders without an initial time set', () => {
        const { getByPlaceholderText } = render(<TimeInput />);
        const element = getByPlaceholderText('08:00');

        expect(element.props.value).toEqual('');
    });

    it('renders with an initial time set', () => {
        const { getByPlaceholderText } = render(<TimeInput initialTime={new Date('04/16/2021 12:15 PM')} />);
        const element = getByPlaceholderText('08:00');

        expect(element.props.value).toEqual('12:15');
    });
});

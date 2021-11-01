import { useCallback, useState } from 'react';
import _ from 'lodash';

export default (obj: string = '', wait: number = 1000) => {
    const [state, setState] = useState(obj);

    const setDebouncedState = (value: string) => {
        debounce(value);
    };

    const debounce = useCallback(
        _.debounce((prop) => {
            setState(prop);
        }, wait),
        []
    );

    return {state, setDebouncedState};
};
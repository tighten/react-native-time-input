import React, { useCallback, useState } from 'react';
import _ from 'lodash';

export default (obj = null, wait = 1000) => {
    const [state, setState] = useState(obj);

    const setDebouncedState = (value) => {
        debounce(value);
    };

    const debounce = useCallback(
        _.debounce((prop) => {
            setState(prop);
        }, wait),
        []
    );

    return [state, setDebouncedState];
};

import React, { useCallback, useEffect, useRef, useState } from 'react';
import useDebounce from './hooks/useDebounce';
import {
    Animated,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableNativeFeedback,
    TouchableOpacity,
    View,
} from 'react-native';
import { format } from 'date-fns';

const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

const getLocaleTimeString = (dateTimeString = null) => {
    return format(dateTimeString ? new Date(dateTimeString) : new Date(), 'hh:mm a');
};

const TimeInput = ({ theme, styles, initialValue = null, setCurrentTime = false, onTimeChange = () => {} }) => {
    const anim = useRef(new Animated.Value(0)).current;
    const debounceRate = useRef(250).current;
    const [debouncedTime, setDebouncedTime] = useDebounce(time, debounceRate);
    const firstLaunch = useRef(true);
    const [finalStyles, setFinalStyles] = useState(null);
    const [finalTheme, setFinalTheme] = useState(null);
    const [localeTime, setLocaleTime] = useState(getLocaleTimeString());
    const [meridiem, setMeridiem] = useState(null);
    const [ready, setReady] = useState(false);
    const [time, setTime] = useState('');
    const [validTime, setValidTime] = useState(true);

    const handleMeridiemChange = () => {
        Animated.timing(anim, {
            toValue: meridiem === 'PM' ? 40 : 0,
            delay: 0,
            duration: 225,
            useNativeDriver: true,
        }).start();
    };

    const parseLocaleTimeString = useCallback(
        (timeStr) => {
            let arr = timeStr.split(' ');

            setMeridiem(arr[1]);
            setTime(arr[0]);
            onTimeChange(`${timeStr}`, true);
        },
        [setMeridiem, setTime, onTimeChange]
    );

    const validateTime = () => {
        let regex = new RegExp('^(0?[1-9]|1[012]):[0-5][0-9]$');
        return regex.test(debouncedTime);
    };

    useEffect(() => {
        setFinalStyles(StyleSheet.flatten([defaultStyles, styles]));
        setFinalTheme(StyleSheet.flatten([defaultTheme, theme]));
    }, [setFinalStyles, setFinalTheme]);

    useEffect(() => {
        if (!finalTheme || !finalStyles) return;

        setReady(true);
    }, [finalStyles, finalTheme, setReady]);

    useEffect(() => {
        if (firstLaunch.current || !Boolean(debouncedTime)) return;

        let validationPassed = validateTime();

        setValidTime(validationPassed);
        onTimeChange(`${time} ${meridiem}`, validationPassed);
    }, [debouncedTime, firstLaunch, meridiem, setValidTime, onTimeChange, validateTime]);

    useEffect(() => {
        if (!meridiem) {
            setMeridiem('AM');
            return;
        }

        handleMeridiemChange();

        return () => {
            anim.stopAnimation();
        };
    }, [meridiem, setMeridiem]);

    useEffect(() => {
        let numInTimeCount = time.replace(/[^0-9]/g, '').length;
        let newTime = null;
        let str = time.replace(/:|[a-zA-Z]/g, '');

        if (time.length === 3 && numInTimeCount === 2) {
            newTime = str;
        } else if (time.length === 3 || numInTimeCount === 3) {
            newTime = `${str.substr(0, 1)}:${str.substr(1)}`;
        } else if (time.length === 5) {
            newTime = `${str.substr(0, 2)}:${str.substr(2)}`;
        } else {
            newTime = str;
        }

        if (firstLaunch.current) {
            if (initialValue) {
                parseLocaleTimeString(getLocaleTimeString(initialValue));
            } else if (!initialValue && setCurrentTime) {
                parseLocaleTimeString(localeTime);
            } else {
                // do nothing
            }

            firstLaunch.current = false;
            return;
        }

        setTime(newTime);
        setDebouncedTime(newTime);
    }, [time, setDebouncedTime, setMeridiem, setTime, parseLocaleTimeString, getLocaleTimeString]);

    if (!ready) return null;

    return (
        <View style={finalStyles.componentContainer}>
            <View style={finalStyles.container}>
                <TextInput
                    keyboardType="number-pad"
                    maxLength={5}
                    onChangeText={(text) => setTime(text)}
                    placeholder="08:00"
                    style={[
                        finalStyles.input,
                        { borderColor: finalTheme.inputBorderColor, color: finalTheme.inputTextColor },
                    ]}
                    value={time}
                />

                <View style={[finalStyles.toggle, { backgroundColor: finalTheme.toggleBackgroundColor }]}>
                    <Touchable
                        activeOpacity={1}
                        onPress={() => {
                            setMeridiem('AM');
                        }}
                        style={[finalStyles.toggleButton, { color: finalTheme.toggleButtonTextColor }]}
                    >
                        <Text>AM</Text>
                    </Touchable>

                    <Touchable
                        activeOpacity={1}
                        onPress={() => {
                            setMeridiem('PM');
                        }}
                        style={[finalStyles.toggleButton, { color: finalTheme.toggleButtonTextColor }]}
                    >
                        <Text>PM</Text>
                    </Touchable>

                    <Animated.View
                        style={[
                            finalStyles.toggleButton,
                            finalStyles.toggleButtonActive,
                            {
                                backgroundColor: finalTheme.toggleButtonActiveBackgroundColor,
                                transform: [{ translateX: anim }],
                            },
                        ]}
                    >
                        <Text style={{ color: finalTheme.toggleButtonActiveTextColor }}>{meridiem}</Text>
                    </Animated.View>
                </View>
            </View>

            {!validTime && <Text style={{ marginTop: 10, color: defaultColors.red }}>Entered time is invalid.</Text>}
        </View>
    );
};

const defaultColors = {
    black: '#2e2e2e',
    blue: '#2980b9',
    grey: '#a6a6a6',
    lightGrey: '#d7d7d7',
    offWhite: '#e6e6e6',
    red: '#c0392b',
    white: '#fff',
};

const defaultTheme = {
    inputBackgroundColor: defaultColors.white,
    inputBorderColor: defaultColors.grey,
    inputTextColor: defaultColors.black,
    toggleBackgroundColor: defaultColors.offWhite,
    toggleButtonActiveBackgroundColor: defaultColors.grey,
    toggleButtonActiveTextColor: defaultColors.white,
    toggleButtonBackground: defaultColors.white,
    toggleButtonTextColor: defaultColors.black,
};

const defaultStyles = StyleSheet.create({
    componentContainer: {},
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    input: {
        borderRadius: 6,
        borderStyle: 'solid',
        borderWidth: 1.5,
        fontSize: 14,
        height: 40,
        marginRight: 24,
        padding: 10,
        paddingRight: 34,
        width: 90,
    },
    toggle: {
        borderRadius: 6,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        height: 40,
        position: 'relative',
        width: 80,
    },
    toggleButton: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        width: '50%',
    },
    toggleButtonActive: {
        borderRadius: 6,
        height: 42,
        left: 0,
        position: 'absolute',
        top: -1,
    },
});

export default TimeInput;

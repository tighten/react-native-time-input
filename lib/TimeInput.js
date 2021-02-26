import React, { useEffect, useState } from 'react';
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

const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

const TimeInput = ({ theme, styles }) => {
    const [finalTheme, setFinalTheme] = useState(null);
    const [finalStyles, setFinalStyles] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setFinalStyles(StyleSheet.flatten([defaultStyles, styles]));
        setFinalTheme(StyleSheet.flatten([defaultTheme, theme]));
    }, [setFinalTheme, setFinalStyles]);

    useEffect(() => {
        if (!finalTheme || !finalStyles) return;

        setReady(true);
    }, [finalStyles, finalTheme, setReady]);

    if (!ready) return null;

    return (
        <View style={finalStyles.componentContainer}>
            <View style={finalStyles.container}>
                <TextInput
                    keyboardType="number-pad"
                    maxLength={5}
                    onChangeText={() => {}}
                    placeholder="08:00"
                    style={[
                        finalStyles.input,
                        { borderColor: finalTheme.inputBorderColor, color: finalTheme.inputTextColor },
                    ]}
                />

                <View style={[finalStyles.toggle, { backgroundColor: finalTheme.toggleBackgroundColor }]}>
                    <Touchable
                        activeOpacity={1}
                        onPress={() => {}}
                        style={[finalStyles.toggleButton, { color: finalTheme.toggleButtonTextColor }]}
                    >
                        <Text>AM</Text>
                    </Touchable>

                    <Touchable
                        activeOpacity={1}
                        onPress={() => {}}
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
                                color: finalTheme.toggleButtonActiveTextColor,
                            },
                        ]}
                    >
                        <Text>AM</Text>
                    </Animated.View>
                </View>
            </View>
        </View>
    );
};

const defaultColors = {
    black: '#2e2e2e',
    blue: '#2980b9',
    grey: '#a6a6a6',
    lightGrey: '#d7d7d7',
    red: '#c0392b',
    white: '#fff',
};

const defaultTheme = {
    inputBackgroundColor: defaultColors.white,
    inputBorderColor: defaultColors.grey,
    inputTextColor: defaultColors.black,
    toggleBackgroundColor: defaultColors.white,
    toggleButtonActiveBackground: defaultColors.blue,
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

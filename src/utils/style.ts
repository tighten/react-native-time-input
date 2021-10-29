import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
      overflow: 'hidden',
      position: 'relative',
      width: 80,
  },
  toggleButton: {
      alignItems: 'center',
      height: '100%',
      justifyContent: 'center',
      width: 40,
  },
  toggleButtonActive: {
      borderRadius: 6,
      height: 42,
      left: 0,
      position: 'absolute',
      top: -1,
  },
});